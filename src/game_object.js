import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import config from './config';

export default class GameObject {
    constructor(pos, shader_path, scale) {
        this._pos = new THREE.Vector3(...pos);
        this._shader_path = shader_path;
        this._scale = new THREE.Vector3(...scale);
    }
    async init() {
        let loader = new GLTFLoader();
        let gltf = await loader.loadAsync(this._shader_path);
        this._mesh = gltf.scene;
        this._mesh.scale.copy(this._scale);
        this._mesh.position.copy(this._pos);
        this.collider = new THREE.Box3();
        this.collider.setFromObject(this._mesh);
        this._bbHelper = new THREE.BoxHelper(this._mesh, 0xff0000);
        console.log(this.collider);
    }
    get_mesh() {
        return this._mesh;
    }
    getSize() {
        return this._size;
    }

    getBBHelper() {
        return this._bbHelper;
    }
    update_position() {
        this._pos.clamp(
            new THREE.Vector3(config.minx, config.miny, -100),
            new THREE.Vector3(config.maxx, config.maxy, 100)
        );
        this._mesh.position.copy(this._pos);
        this._bbHelper.update();
    }

    movex(value) {
        this._pos.x += value;
        this.update_position();
    }
    movey(value) {
        this._pos.y += value;
        this.update_position();
    }

    move_with_camera(miny) {
        this._pos.y = Math.max(miny, this._pos.y);
        this.update_position();
    }
}

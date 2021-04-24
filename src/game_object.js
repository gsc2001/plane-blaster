import * as THREE from 'three';
import { Euler, Vector2, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import config from './config';

const vecy = new Vector3(0, 1, 0);
const vecz = new Vector3(0, 0, 1);

export default class GameObject {
    constructor(pos, shader_path, scale, front = [0, 1, 0]) {
        this._pos = new THREE.Vector3(...pos);
        this._shader_path = shader_path;
        this._scale = new THREE.Vector3(...scale);
        this._front = new Vector3(front[0], front[1], 0);
        this._front.normalize();
    }
    is_active() {
        return this._mesh.visible;
    }
    destroy() {
        this._mesh.visible = false;
        this._bbHelper.visible = false;
    }
    async init() {
        let loader = new GLTFLoader();
        let gltf = await loader.loadAsync(this._shader_path);
        this._bbHelper = new THREE.BoxHelper(this._mesh, 0xff0000);
        this.collider = new THREE.Box3();
        this._mesh = gltf.scene;
        this.update_dims();
    }
    update_dims() {
        this._front.normalize();
        const coszt = vecy.dot(this._front);
        let angle = Math.acos(coszt);
        if (this._front.x > 0) angle = -angle;

        this._mesh.scale.copy(this._scale);
        this._mesh.position.copy(this._pos);
        this._mesh.setRotationFromAxisAngle(vecz, angle);
        this.collider.setFromObject(this._mesh);
    }
    get_mesh() {
        return this._mesh;
    }
    getSize() {
        return this._size;
    }

    getPos() {
        return this._pos;
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
        this.collider.setFromObject(this._mesh);
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

    static collided(o1, o2) {
        if (!o1.is_active() || !o2.is_active()) return false;
        return o1.collider.intersectsBox(o2.collider);
    }
}

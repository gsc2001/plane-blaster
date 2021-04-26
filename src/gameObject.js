import * as THREE from 'three';
import { Euler, Vector2, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import config from './config';

const vecy = new Vector3(0, 1, 0);
const vecz = new Vector3(0, 0, 1);
const vec0 = new Vector3(0, 0, 0);

export default class GameObject {
    constructor(pos, shaderPath, scale, front = [0, 1, 0]) {
        this._pos = new THREE.Vector3(...pos);
        this._shader_path = shaderPath;
        this._scale = new THREE.Vector3(...scale);
        this._front = new Vector3(front[0], front[1], 0);
        this._front.normalize();
    }
    is_active() {
        return this._mesh && this._mesh.visible;
    }
    destroy() {
        this._mesh.visible = false;
        this._bbHelper.visible = false;
    }
    async init() {
        let loader = new GLTFLoader();
        let gltf = await loader.loadAsync(this._shader_path);
        this._mesh = gltf.scene;
        this._bbHelper = new THREE.BoxHelper(this._mesh, 0xff0000);
        this.collider = new THREE.Box3();
        this.updatePosition();
    }
    getMesh() {
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

    updatePosition() {
        this._front.normalize();
        const coszt = vecy.dot(this._front);
        let angle = Math.acos(coszt);
        if (this._front.x > 0) angle = -angle;
        this._mesh.scale.copy(this._scale);
        this._mesh.rotation.z = angle;
        this._mesh.rotation.y = Math.max(
            -config.player.maxRoll,
            this._mesh.rotation.y
        );
        this._mesh.rotation.y = Math.min(
            config.player.maxRoll,
            this._mesh.rotation.y
        );

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
        if (value > 0) this._mesh.rotation.y += config.player.rollSpeed;
        if (value < 0) this._mesh.rotation.y -= config.player.rollSpeed;
        this.updatePosition();
    }
    movey(value) {
        this._pos.y += value;
        this.updatePosition();
    }

    moveWithCamera(miny) {
        this._pos.y = Math.max(miny, this._pos.y);
        this.updatePosition();
        console.log(this._front);
    }
    static collided(o1, o2) {
        if (!o1.is_active() || !o2.is_active()) return false;
        return o1.collider.intersectsBox(o2.collider);
    }

    reset_rotation() {
        console.log('called');
        this._mesh.rotation.y = 0;
        this._mesh.rotation.x = 0;
    }
}

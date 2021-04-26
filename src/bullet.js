import * as THREE from 'three';
import GameObject from './gameObject';
import config from './config';

export default class Bullet extends GameObject {
    constructor(pos, direction) {
        let vec = new THREE.Vector3(...direction);
        vec.normalize();
        super(pos, '/models/bullet.gltf', [0.8, 1.6, 0.8], vec.toArray());
    }

    update() {
        if (this._mesh) {
            this._pos.add(
                this._front.clone().multiplyScalar(config.bulletSpeed)
            );
            if (
                this._pos.x >= config.maxx ||
                this._pos.x <= config.minx ||
                this._pos.y <= config.miny ||
                this._pos.y >= config.maxy
            ) {
                this.destroy();
                return true;
            }
            this.updatePosition();
        }
        return false;
    }
}

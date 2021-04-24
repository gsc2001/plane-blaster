import * as THREE from 'three';
import GameObject from './gameObject';
import config from './config';

export default class Bullet extends GameObject {
    constructor(pos, direction) {
        let vec = new THREE.Vector3(...direction);
        console.log(vec);
        vec.normalize();
        super(
            pos,
            '/models/sphere/new_sphere.gltf',
            [0.2, 0.6, 0.2],
            vec.toArray()
        );
    }

    update() {
        if (this._mesh) {
            this._pos.add(
                this._front.clone().multiplyScalar(config.bulletSpeed)
            );
            this.updatePosition();
        }
    }
}

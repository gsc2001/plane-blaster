import GameObject from './gameObjects';
import config from './config';

export default class Bullet extends GameObject {
    constructor(pos, direction) {
        let vec = direction.clone();
        vec.normalize();
        super(pos, '/models/sphere/new_sphere.gltf', [0.2, 0.6, 0.2], vec);
    }

    update() {
        this._pos.add(config.bulletSpeed * this._front);
    }
}

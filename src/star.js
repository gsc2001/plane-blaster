import GameObject from './game_object';

class Star extends GameObject {
    constructor(pos) {
        super(pos, '/models/sphere/new_sphere.gltf', [0.6, 0.6, 0.6]);
    }
}

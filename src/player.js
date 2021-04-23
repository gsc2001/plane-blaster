import GameObject from './game_object';

export default class Player extends GameObject {
    constructor(pos) {
        super(pos, '/models/sphere/new_sphere.gltf', [0.6, 0.6, 0.6]);
    }
}

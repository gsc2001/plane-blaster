import { LiveObject } from './liveObject';

export default class Player extends LiveObject {
    constructor(pos) {
        super(pos, '/models/sphere/new_sphere.gltf', [0.6, 0.6, 0.6]);
    }
}

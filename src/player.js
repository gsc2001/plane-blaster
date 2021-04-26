import { Vector3 } from 'three';
import { LiveObject } from './liveObject';
const vecz = new Vector3(0, 0, 1);

export default class Player extends LiveObject {
    constructor(pos) {
        // super(pos, '/models/sphere/new_sphere.gltf', [0.6, 0.6, 0.6]);
        super(pos, '/models/sphere/new_sphere.gltf', [0.6, 0.6, 0.6]);
    }
    rotate(value) {
        console.log(this._front);
        this._front.applyAxisAngle(vecz, value);
        console.log(this._front);
        this.updatePosition();
    }
}

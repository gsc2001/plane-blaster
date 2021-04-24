import GameObject from './gameObjects';
import config from './config';

class Star extends GameObject {
    constructor(pos) {
        super(pos, '/models/sphere/new_sphere.gltf', [0.2, 0.2, 0.2]);
    }
    handleCollisionPlayer() {
        // TODO: Update Score
        this.destroy();
        return config.scoreAdd;
    }
}

export default Star;

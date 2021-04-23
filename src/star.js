import GameObject from './game_object';
import config from './config';

class Star extends GameObject {
    constructor(pos) {
        super(pos, '/models/sphere/new_sphere.gltf', [0.2, 0.2, 0.2]);
    }
    handle_collision_player() {
        // TODO: Update Score
        this.destroy();
        return config.scoreAdd;
    }
}

export default Star;

import GameObject from './gameObject';
import config from './config';
import { randint, rand } from './utils';

class Star extends GameObject {
    constructor(pos) {
        super(pos, '/models/sphere/new_sphere.gltf', [0.2, 0.2, 0.2]);
    }
    static getStars() {
        const nStars = randint(config.starsMin, config.startMax);
        const stars = [];
        for (let i = 0; i < nStars; i++) {
            let x = rand(config.minx, config.maxx);
            let y = rand(config.miny + 2, config.maxy - 10);
            stars.push(new Star([x, y]));
        }
        return stars;
    }

    handleCollisionPlayer() {
        // TODO: Update Score
        this.destroy();
        return config.scoreAdd;
    }
}

export default Star;

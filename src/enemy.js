import * as THREE from 'three';
import { LiveObject } from './liveObject';
import config from './config';
import { rand, randint } from './utils';

export default class Enemy extends LiveObject {
    constructor(pos, playerPos) {
        const vpos = new THREE.Vector3(...pos);
        super(
            pos,
            '/models/sphere/new_sphere.gltf',
            [0.6, 0.6, 0.6],
            vpos.sub(playerPos)
        );
    }
    static getEnemies(playerPos) {
        if (config.debug) {
            return [new Enemy([0, 10, 0], playerPos)];
        } else {
            const nEnemies = randint(config.enemiesMin, config.enemiesMax);
            let enemies = [];
            for (let i = 0; i < nEnemies; i++) {
                let x = rand(config.minx, config.maxx);
                let y = rand(config.miny + 8, config.maxy);
                enemies.push(new Enemy([x, y], playerPos));
            }
            return enemies;
        }
    }

    followPlayer(playerVec) {
        const diff = playerVec.clone().sub(this._pos);
        diff.normalize();
        if (!config.debug)
            this._pos.add(diff.multiplyScalar(config.enemiesSpeed));
        this._front.copy(diff);
        this.updatePosition();
    }
}

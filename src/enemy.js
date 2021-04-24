import * as THREE from 'three';
import GameObject from './game_object';
import config from './config';
import { rand, randint } from './utils';

export default class Enemy extends GameObject {
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
    follow_player(player_pos) {
        const diff = player_pos.clone().sub(this._pos);
        diff.normalize();
        this._front.copy(diff);
        this.update_dims();
    }
}

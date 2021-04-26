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
        this._bulletInterval = undefined;
        this._activated = false;
    }
    async init() {
        await super.init();
        // if (!config.debugaaaa)
    }
    activate(addToScene) {
        console.log('activated');
        this._activated = true;
        this._bulletInterval = setInterval(() => {
            this.fireBullet().then(bul => {
                if (bul) addToScene(bul);
            });
        }, config.enemyBulletDelay);
    }
    destroy() {
        console.log(this._activated);
        if (this._activated) clearInterval(this._bulletInterval);
        console.log(this._activated);
        super.destroy();
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

    followPlayer(playerVec, addToScene) {
        const diff = playerVec.clone().sub(this._pos);
        if (diff.length() <= config.enemyActivateDist && !this._activated) {
            this.activate(addToScene);
        }
        if (!this._activated) {
            return;
        }
        diff.normalize();
        this._pos.add(diff.multiplyScalar(config.enemiesSpeed));
        this._front.copy(diff);
        this.updatePosition();
    }
}

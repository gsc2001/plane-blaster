import * as THREE from 'three';
import { LiveObject } from './liveObject';
import config from './config';
import { rand, randint } from './utils';
import { PlaneGeometry, Vector3 } from 'three';

const backVec = [0, -1, 0];
let prev = new Vector3(0, -1, 0);
export default class Enemy extends LiveObject {
    constructor(pos, playerPos) {
        const vpos = new THREE.Vector3(...pos);
        console.log(playerPos);
        super(
            pos,
            '/models/enemy.glb',
            // '/models/sphere/new_sphere.gltf',
            [0.6, 0.6, 0.6],
            playerPos.sub(vpos).toArray()
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
            return [new Enemy([0, 10, config.playing_z], playerPos)];
        } else {
            const nEnemies = randint(config.enemiesMin, config.enemiesMax);
            let enemies = [];
            for (let i = 0; i < nEnemies; i++) {
                let x = rand(config.minx, config.maxx);
                let y = rand(config.miny + 31, config.maxy);
                enemies.push(
                    new Enemy([x, y, config.playing_z], playerPos.clone())
                );
            }
            return enemies;
        }
    }

    followPlayer(playerVec, addToScene) {
        if (!this.is_active()) {
            return;
        }
        const diff = playerVec.clone().sub(this._pos);
        if (diff.length() <= config.enemyActivateDist && !this._activated) {
            this.activate(addToScene);
        }
        if (!this._activated) {
            return;
        }
        diff.normalize();
        let movement = diff.multiplyScalar(config.enemiesSpeed);
        this._pos.add(movement);
        this._front.copy(diff);
        this.updatePosition();
    }
}

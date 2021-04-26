import * as THREE from 'three';

import GameObject from './gameObject';
import config from './config';
import Bullet from './bullet';
import { Vector3 } from 'three';

export class LiveObject extends GameObject {
    constructor(pos, shaderPath, scale, front = [0, 1, 0]) {
        super(pos, shaderPath, scale, front);
        this._bullets = [];
        this.lastFire = Date.now();
    }

    async fireBullet() {
        console.log('hi');
        if (Date.now() - this.lastFire < config.bulletMinDelay) {
            return;
        }
        const bullet = new Bullet(this._pos.toArray(), this._front.toArray());
        this._bullets.push(bullet);
        await bullet.init();
        this.lastFire = Date.now();
        return bullet;
    }
    updateBullets() {
        this._bullets = this._bullets.filter(bullet => {
            return !bullet.update();
        });
    }

    getBullets() {
        return this._bullets;
    }
}

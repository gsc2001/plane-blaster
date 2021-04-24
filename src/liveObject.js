import * as THREE from 'three';

import GameObject from './gameObject';
import config from './config';
import Bullet from './bullet';

export class LiveObject extends GameObject {
    constructor(pos, shaderPath, scale, front = [0, 1, 0]) {
        super(pos, shaderPath, scale, front);
        this._bullets = [];
        this.lastFire = Date.now();
    }

    async fireBullet() {
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
        for (let bullet of this._bullets) bullet.update();
    }
}

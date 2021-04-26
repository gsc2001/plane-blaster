import * as THREE from 'three';
import * as dat from 'dat.gui';
import config from './config';

import Player from './player';
import Ground from './ground';
import Star from './star';
import Enemy from './enemy';
import GameObject from './gameObject';

export default class Game {
    constructor() {
        this._renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        this._scene = new THREE.Scene();
        this._camera = new THREE.PerspectiveCamera(
            config.camera.view_angle,
            window.innerWidth / window.innerHeight,
            config.camera.near,
            config.camera.far
        );
        this._score = 0;
        this._health = config.player.health;
    }

    sceneAdd(obj) {
        this._scene.add(obj.getMesh());
        this._scene.add(obj.getBBHelper());
    }

    async init() {
        this._camera.position.set(...config.camera.initial_position);
        this._camera.lookAt(...config.camera.lookAt);
        this._move_camera = !config.debug;

        this._renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this._renderer.domElement);

        this._scene.background = new THREE.Color('black');
        const groundSize = [
            config.maxx - config.minx + 10,
            config.maxy - config.miny,
        ];
        const groundPos = [
            (config.maxx + config.minx) / 2,
            (config.maxy + config.miny) / 2,
        ];

        this._camera_min_vec = new THREE.Vector3(
            ...config.player.initial_position
        ).sub(this._camera.position);

        this._player = new Player(config.player.initial_position);
        this.ground = new Ground(groundPos, groundSize);
        this.star = new Star([5, 5, config.playing_z]);
        this._enemies = Enemy.getEnemies(this._player.getPos());
        await Promise.all([
            this._player.init(),
            this.star.init(),
            ...this._enemies.map(e => e.init(obj => this.sceneAdd(obj))),
        ]);

        this._scene.add(this.ground.getMesh());
        this.sceneAdd(this._player);
        this.sceneAdd(this.star);
        this._enemies.forEach(e => this.sceneAdd(e));
        this.setLightings();
    }

    setLightings() {
        if (config.lighting.ambient.on) {
            this.amb_light = new THREE.AmbientLight(
                0xffffff,
                config.lighting.ambient.intensity
            );
            this._scene.add(this.amb_light);
        }
        if (config.lighting.point.on) {
            this.point_light = new THREE.PointLight(
                0xffffff,
                config.lighting.point.intensity
            );
            this.point_light.position
                .set(...config.lighting.point.position)
                .normalize();
            this._scene.add(this.point_light);
        }
        if (config.lighting.directional.on) {
            this.directional_light = new THREE.DirectionalLight(
                0xffffff,
                config.lighting.directional.intensity
            );
            this.directional_light.position
                .set(...config.lighting.directional.position)
                .normalize();
            // this.directional_light.lookAt(
            //     ...config.lighting.directional.lookAt
            // );
            this._scene.add(this.directional_light);
        }
    }

    handleInputs(event) {
        var keycode = event.which;
        const char = String.fromCharCode(keycode);
        console.log(char);
        if (char == 'W') this._player.movey(config.player.speed);
        if (char == 'A') this._player.movex(-config.player.speed);
        if (char == 'S') this._player.movey(-config.player.speed);
        if (char == 'D') this._player.movex(config.player.speed);
        if (char == 'Q') this._player.rotate(config.player.rotationSpeed);
        if (char == 'E') this._player.rotate(-config.player.rotationSpeed);
        if (char == 'F') {
            this._player.fireBullet().then(bul => {
                if (bul) this.sceneAdd(bul);
            });
        }
        // DEBUGs
        if (config.debug) {
            switch (char) {
                case 'M':
                    this._move_camera = !this._move_camera;
                    break;
                case 'H':
                    this._camera.position.x -= 0.1;
                    break;
                case 'L':
                    this._camera.position.x += 0.1;
                    break;
                case 'J':
                    this._camera.position.y -= 0.1;
                    break;
                case 'K':
                    this._camera.position.y += 0.1;
                    break;
            }
        }
    }

    detectCollisions() {
        // player and stars
        if (GameObject.collided(this._player, this.star)) {
            this._score += this.star.handleCollisionPlayer();
        }
        const enemybullets = this._enemies
            .map(e => e.getBullets())
            .reduce((prev, v) => [...prev, ...v]);
        const playerBullets = this._player.getBullets();

        for (let bullet of enemybullets) {
            if (GameObject.collided(bullet, this._player)) {
                this._health -= config.player.hitHealthDecrease;
                bullet.destroy();
            }
        }

        for (let bullet of playerBullets) {
            for (let enemy of this._enemies) {
                if (GameObject.collided(enemy, bullet)) {
                    enemy.destroy();
                    bullet.destroy();
                }
            }
        }
    }

    update() {
        // move camera by some velocity
        if (this._move_camera) {
            this._camera.position.y += config.camera.speed;
            let temp_vec = this._camera_min_vec.clone();
            const camera_min = temp_vec.add(this._camera.position).y;
            this._player.moveWithCamera(camera_min);
        }
        this._player.updateBullets();
        for (let enemy of this._enemies) {
            enemy.followPlayer(this._player.getPos(), obj =>
                this.sceneAdd(obj)
            );
            enemy.updateBullets();
        }
        this.detectCollisions();

        // Health checking
        if (this._health <= 0) {
            // TODO: End game
            console.log('You lost');
        }
    }

    render() {
        this._renderer.render(this._scene, this._camera);
    }
}

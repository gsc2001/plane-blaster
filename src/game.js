import * as THREE from 'three';
import * as dat from 'dat.gui';
import config from './config';

import Player from './player';
import Ground from './ground';

export default class Game {
    constructor() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            config.camera.view_angle,
            window.innerWidth / window.innerHeight,
            config.camera.near,
            config.camera.far
        );
    }

    async init() {
        this.camera.position.set(...config.camera.initial_position);
        this.camera.lookAt(0, 0, 0);
        this.move_camera = !config.debug;

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.scene.background = new THREE.Color('black');
        const groundSize = [
            config.maxx - config.minx + 10,
            config.maxy - config.miny,
        ];
        const groundPos = [
            (config.maxx + config.minx) / 2,
            (config.maxy + config.miny) / 2,
        ];

        this.camera_min_vec = new THREE.Vector3(
            ...config.player.initial_position
        ).sub(this.camera.position);

        this.player = new Player(config.player.initial_position);
        this.ground = new Ground(groundPos, groundSize);
        await this.player.init();
        this.scene.add(this.player.get_mesh());
        this.scene.add(this.ground.get_mesh());
        this.scene.add(this.player.getBBHelper());
        this.setLightings();
    }

    setLightings() {
        if (config.lighting.ambient.on) {
            this.amb_light = new THREE.AmbientLight(
                0xffffff,
                config.lighting.ambient.intensity
            );
            this.scene.add(this.amb_light);
        }
        if (config.lighting.point.on) {
            this.point_light = new THREE.PointLight(
                0xffffff,
                config.lighting.point.intensity
            );
            this.point_light.position
                .set(...config.lighting.point.position)
                .normalize();
            this.scene.add(this.point_light);
        }
        if (config.lighting.directional.on) {
            this.directional_light = new THREE.DirectionalLight(
                0xffffff,
                config.lighting.directional.intensity
            );
            this.directional_light.position
                .set(...config.lighting.directional.position)
                .normalize();
            this.directional_light.lookAt(
                ...config.lighting.directional.lookAt
            );
            this.scene.add(this.directional_light);
        }
    }

    handleInputs(event) {
        var keycode = event.which;
        const char = String.fromCharCode(keycode);
        console.log(char);
        switch (char) {
            case 'W':
                this.player.movey(config.player.speed);
                break;
            case 'A':
                this.player.movex(-config.player.speed);
                break;
            case 'S':
                this.player.movey(-config.player.speed);
                break;
            case 'D':
                this.player.movex(config.player.speed);
                break;
        }
        // DEBUGs
        if (config.debug) {
            switch (char) {
                case 'M':
                    this.move_camera = !this.move_camera;
                    break;
                case 'H':
                    this.camera.position.x -= 0.1;
                    break;
                case 'L':
                    this.camera.position.x += 0.1;
                    break;
                case 'J':
                    this.camera.position.y -= 0.1;
                    break;
                case 'K':
                    this.camera.position.y += 0.1;
                    break;
            }
        }
    }

    spawnStars() {}

    update() {
        // move camera by some velocity
        if (this.move_camera) {
            this.camera.position.y += config.camera.speed;
            let temp_vec = this.camera_min_vec.clone();
            const camera_min = temp_vec.add(this.camera.position).y;
            this.player.move_with_camera(camera_min);
        }
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}

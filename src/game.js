import * as THREE from 'three';
import config from './config';

import Player from './player';
import GameObject from './game_object';
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

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.scene.background = new THREE.Color('black');

        this.player = new Player([0, 0, config.playing_z]);
        const groundSize = [
            config.maxx - config.minx + 10,
            config.maxy - config.miny,
        ];
        const groundPos = [
            (config.maxx + config.minx) / 2,
            (config.maxy + config.miny) / 2,
        ];
        console.log(groundSize, groundPos);
        this.ground = new Ground(groundPos, groundSize);
        console.log(this.ground);

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
    }

    spawnStars() {}

    update() {
        // if (this.player.mesh && this.player.mesh.rotation)
        //     this.player.mesh.rotation.z -= 0.005;
        this.renderer.render(this.scene, this.camera);
    }
}

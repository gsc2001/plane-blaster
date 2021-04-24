import * as THREE from 'three';

import GameObject from './game_object';
import config from './config';

// Only for dev
// TODO: Change with a better ground
class Ground {
    constructor(pos, size) {
        const geometry = new THREE.PlaneGeometry(
            config.maxx - config.minx + 10,
            config.maxy - config.miny + 100
        );
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
        });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(...pos, config.ground.z);
    }

    get_mesh() {
        return this.mesh;
    }
}

export default Ground;

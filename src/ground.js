import * as THREE from 'three';

import { rand } from './utils';
import config from './config';

// Only for dev
// TODO: Change with a better ground
class Ground {
    constructor(pos, size) {
        // const geometry = new THREE.PlaneGeometry(
        //     config.maxx - config.minx + 10,
        //     config.maxy - config.miny + 100
        // );
        // const material = new THREE.MeshBasicMaterial({
        //     color: 0x000000,
        //     side: THREE.DoubleSide,
        // });
        // this.mesh = new THREE.Mesh(geometry, material);
        // this.mesh.position.set(...pos, config.ground.z);
    }
    async init() {
        let pointsGeo = new THREE.BufferGeometry();
        let points = [];
        for (let i = 0; i <= 6000; i++) {
            let point = [rand(-100, 100), rand(0, 100), rand(-10, 10)];
            points = [...points, ...point];
        }
        let sprite = new THREE.TextureLoader().load(
            '/images/star.png'
        );
        let pointsMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.1,
            map: sprite,
            alphaTest: 0.5,
        });
        pointsGeo.setAttribute(
            'position',
            new THREE.BufferAttribute(new Float32Array(points), 3)
        );
        this.points = new THREE.Points(pointsGeo, pointsMaterial);
    }

    getMesh() {
        return this.points;
    }
}

export default Ground;

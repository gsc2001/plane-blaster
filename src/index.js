import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const renderer = new THREE.WebGLRenderer();
const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
const scene = new THREE.Scene();
let Mesh;
let light;

function init() {
    scene.background = new THREE.Color('black');
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function setLight() {
    // let l = new THREE.AmbientLight(0xffffff, 1);
    // scene.add(l);
    light = new THREE.PointLight(0xffffff, 5); // soft white light
    light.position.set(1, 1, 1).normalize();
    light.lookAt(0, 0, 0);
    scene.add(light);
}

function loadGLTF() {
    let balloonLoader = new GLTFLoader();

    balloonLoader.load('/models/sphere/new_sphere.gltf', gltf => {
        Mesh = gltf.scene;
        Mesh.scale.set(0.2, 0.2, 0.2);
        scene.add(Mesh);
        Mesh.position.x = 0;
        Mesh.position.y = 0;
        Mesh.position.z = 0;
    });
}

function animate() {
    requestAnimationFrame(animate);
    if (Mesh && Mesh.rotation) {
        Mesh.rotation.y -= 0.005;
    }
    renderer.render(scene, camera);
}

init();
setLight();
loadGLTF();
animate();

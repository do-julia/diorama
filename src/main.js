import * as THREE from 'three';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

// Instantiate the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);
const canvas = renderer.domElement;

// Load the 3D model
const loader = new GLTFLoader();
loader.load( 'assets/final.glb', function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
})

// Set skybox
const cubeTextureLoader = new THREE.CubeTextureLoader().setPath('assets/skybox/');
const cubeTexture = await cubeTextureLoader.loadAsync( [
    'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'
] );
scene.background = cubeTexture;

// Instantiate the camera
camera.position.set( 0, 2, 0 );

// Set up OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0,2,-1);
controls.update();

// Set the lighting
const color = 0xFFFFFF;
const intensity = 10;
const light = new THREE.HemisphereLight('#2B5061FF', '#62483DFF', 1);
scene.add(light);


// Render the scene; Add any animation here
function animate(time) {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Open & Close of the Info button
const openButton = document.getElementById("openModal");
const closeButton = document.getElementById("closeModal");
const modal = document.getElementById("modal");
const modalInner = document.getElementById("modal-inner");

openButton.addEventListener("click", function() {
    modal.classList.add("open");
})
closeButton.addEventListener("click", function() {
    modal.classList.remove("open");
})
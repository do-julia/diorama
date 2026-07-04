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

// Loading screen
const loadingManager = new THREE.LoadingManager()
const progressBar = document.getElementById("progress-bar");
loadingManager.onProgress = function (url, loaded, total) {
    progressBar.value = (loaded / total) * 100;
}

const progressBarContainer = document.getElementById("progress-bar-container");
const infoContainer = document.getElementById("info-container");
loadingManager.onLoad = function () {
    progressBarContainer.style.display = "none";
    infoContainer.style.opacity = "1";
}

// Load the 3D model
const loader = new GLTFLoader(loadingManager);
loader.load( './final.glb', function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error(error);
})

// Set skybox
const cubeTextureLoader = new THREE.CubeTextureLoader().setPath('./skybox/');
const cubeTexture = await cubeTextureLoader.loadAsync( [
    'px.png', 'nx.png', 'py.png', 'ny.png', 'pz.png', 'nz.png'
] );
scene.background = cubeTexture;

// Set ground mesh
const textureLoader = new THREE.TextureLoader();
const groundTexture = await textureLoader.loadAsync('./concreteTexture.png');
const groundMaterial = new THREE.MeshBasicMaterial({map: groundTexture});

const groundGeometry = new THREE.BoxGeometry(275, .01, 275)
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(groundMesh);

// Instantiate the camera
camera.position.set( -20, 2, 10 );

// Set up OrbitControls
const controls = new OrbitControls(camera, canvas);
controls.target.set(0,2,-1);
controls.enableDamping = true;
controls.maxDistance = 30;
controls.maxPolarAngle = Math.PI / 2;
controls.enablePan = false;
controls.minDistance = 5;
controls.update();

// Set the lighting
const hemisphereLight = new THREE.HemisphereLight('#2B5061', 'lightgray', 5);
scene.add(hemisphereLight);
// const directionalLight = new THREE.DirectionalLight('#a89443',  1);
// scene.add(directionalLight);

// Render the scene; Add any animation here
function animate(time) {
    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Automatically resize scene
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Open & Close of the Info button
const openButton = document.getElementById("openModal");
const closeButton = document.getElementById("closeModal");
const modal = document.getElementById("modal");

openButton.addEventListener("click", function() {
    modal.classList.add("open");
})
closeButton.addEventListener("click", function() {
    modal.classList.remove("open");
})
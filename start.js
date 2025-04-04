//main.js - Main game file: Three.js setup, components, game loop.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Initialize scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Set up overhead camera position
camera.position.set(0, 20, 0);  // Position camera 20m above the scene
camera.lookAt(0, 0, 0);         // Look at the center of the scene

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Adjusted intensity slightly
scene.add(ambientLight);

// Add directional light for better shading and highlights
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
directionalLight.position.set(5, 10, 7); // Position it somewhere above and to the side
scene.add(directionalLight);

// Create materials
const waterMaterial = new THREE.MeshPhongMaterial({
  color: 0x0077be,  // Blue color for water
  shininess: 50,
});

const groundMaterial = new THREE.MeshPhongMaterial({
  color: 0x228b22,  // Green color for ground
  shininess: 10,
});

// Create invisible material by setting visible to false
const invisibleMaterial = new THREE.MeshPhongMaterial({
  visible: false,
});

// --- Add Rowboat ---
// Create a material for the boat
const boatMaterial = new THREE.MeshPhongMaterial({
  color: 0x8B4513, // A brown color (SaddleBrown)
  shininess: 30,
});

// Create the main hull of the boat (approx 1m long)
// BoxGeometry(width, height, depth) -> maps to boat's (width, height, length)
// We want length = 1, so depth = 1. Width ~0.4m, Height ~0.2m
const hullGeometry = new THREE.BoxGeometry(0.4, 0.2, 1);
const hullMesh = new THREE.Mesh(hullGeometry, boatMaterial);
// hullMesh is centered at (0,0,0) relative to the boat group for now

// Create simple seats (thwarts)
const seatGeometry = new THREE.BoxGeometry(0.35, 0.03, 0.1); // Width, Height, Depth
const seatMaterial = boatMaterial; // Reuse the same material

const seat1 = new THREE.Mesh(seatGeometry, seatMaterial);
// Position seat relative to the hull center (0,0,0)
// y position: slightly above hull bottom (hull height/2 - seat height/2 = 0.1 - 0.015 = 0.085)
// z position: move forward/backward along the boat's length
seat1.position.set(0, 0.085, 0.25); // Position seat towards one end

const seat2 = new THREE.Mesh(seatGeometry, seatMaterial);
seat2.position.set(0, 0.085, -0.25); // Position seat towards the other end

// Group all boat parts together
const rowboat = new THREE.Group();
rowboat.add(hullMesh);
rowboat.add(seat1);
rowboat.add(seat2);

// Position the entire boat group in the scene
// Place it at the center (0, 0, 0) horizontally.
// Assuming the water plane ('water_plane' in your GLTF) is at y=0,
// we need to lift the boat so it floats. The hull bottom is at y = -0.1 relative
// to the group's origin. Setting the group's y position to 0.1 will place
// the hull bottom exactly at y=0.
rowboat.position.set(0, 0.1, 0);

// Add the complete boat group to the scene
scene.add(rowboat);
// --- End Add Rowboat ---


// Load the GLTF model
const loader = new GLTFLoader();
loader.load(
  // Resource URL
  'blender/start.gltf',
  // Called when the resource is loaded
  function(gltf) {
    // Process each object in the scene
    gltf.scene.traverse(function(child) {
      if (child.isMesh) {
        // Apply materials based on object name
        if (child.name === 'water_plane') {
          child.material = waterMaterial;
        } else if (child.name === 'ground') {
          child.material = groundMaterial;
        } else if (child.name === 'boundary') {
          child.material = invisibleMaterial;
        }
      }
    });

    // Add the model to the scene
    scene.add(gltf.scene);
  },
  // Called while loading is progressing
  function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  // Called when loading has errors
  function(error) {
    console.error('An error happened while loading the model:', error);
  }
);

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
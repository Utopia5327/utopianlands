console.log('this file is loaded')

// import three library
import * as THREE from 'three';

// addons
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// get a reference to the container that will hold the scene
const container = document.querySelector('#scene-container');

/*
  ===== GLOBAL VARIABLES
*/
const WIDTH = container.clientWidth
const HEIGHT = container.clientHeight

const FOV = 75
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 100

/*
  ===== SCENE
*/
const scene = new THREE.Scene();
scene.background = new THREE.Color('#233143');

/*
  ===== CAMERA
*/
const camera = new THREE.PerspectiveCamera( FOV, ASPECT, NEAR, FAR );
camera.position.set(4, 8, 10)
camera.lookAt(scene.position);

/*
  ===== GRID HELPER
*/
const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );

/*
  ===== RENDERER
*/
const renderer = new THREE.WebGLRenderer();
// set the size
renderer.setSize( WIDTH, HEIGHT );
// set device pixel ratio
renderer.setPixelRatio(window.devicePixelRatio);
// add automatically created canvas element to the webpage
container.appendChild( renderer.domElement );

/*
  ===== LOAD GLTF FILES
*/

// Instantiate a loader
const loader = new GLTFLoader();

// Load a glTF resource
loader.load('../three-blender-starter/Avocado/Avocado.gltf', function(gltf){
  scene.add( gltf.scene );
  gltf.scene.scale.set(100, 100, 100)
}, undefined, function ( error ) { 
  console.error( error ); 
} );

// Function to load models
function loadModel(element) {
  loader.load(
      `../three-blender-starter/Avocado_Copy${element}.gltf`, 
      function (gltf) {
          const model = gltf.scene;
          model.position.set(element % 10 * 2, 0, Math.floor(element / 10) * 2); // Positioning models in a grid
          scene.add(model);
      },
      undefined,
      function (error) {
          console.error('An error happened', error);
      }
  );
}

// Load 20 models
for (let i = 0; i < 20; i++) {
  loadModel(i);
}

/*
  ===== LIGHTING
*/
const ambientLight = new THREE.AmbientLight("white", 0.6)
scene.add(ambientLight)

// add orbit controls
const controls = new OrbitControls( camera, renderer.domElement );

/*
  ===== ANIMATION LOOP
*/
function animate() {
    requestAnimationFrame( animate );
  
    renderer.render(scene, camera);
  }
  
  animate()

  window.addEventListener('resize', () => {
    // Update the camera
    camera.aspect = WIDTH/ HEIGHT;
    camera.updateProjectionMatrix();
    //Update the renderer
    renderer.setSize(WIDTH, HEIGHT);
  })
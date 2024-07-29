console.log('this works')
// import the THREE library
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// get a reference to the scene-container element that will eventually hold the scene
const container = document.querySelector('#scene-container');

// global variables
const WIDTH = container.clientWidth
const HEIGHT = container.clientHeight

const FOV = 75
const ASPECT = WIDTH / HEIGHT
const NEAR = 0.1
const FAR = 100

// create a scene
const scene = new THREE.Scene();
//scene.background = new THREE.Color('#233143');
scene.background = new THREE.TextureLoader().load('../simple-threejs-starter/nx.jpg')


const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('/skybox');
const skyboxTexture = cubeTextureLoader.load([
     'nx.jpg', 'ny.jpg', 'nz.jpg',
     'px.jpg', 'py.jpg', 'pz.jpg'
]);
scene.background = skyboxTexture;

// create a camera
const camera = new THREE.PerspectiveCamera( FOV, ASPECT, NEAR, FAR );
camera.position.set(0, 0, 10)
camera.lookAt(scene.position)

// create the Box geometry
const geometry = new THREE.BoxGeometry( 4, 4, 4 ); 
// create the material
const material = new THREE.MeshPhongMaterial({ color: 0xffff00 }); 
// create the mesh
const cube = new THREE.Mesh( geometry, material );

// set position
cube.position.set(0, 3, 0);
// pass mesh to the scene
scene.add(cube)

// Create an ambient light
//const ambientLight = new THREE.AmbientLight('white', 0.5)
// add it to the scene
//scene.add(ambientLight)

// Create a directional light
const directionalLight = new THREE.DirectionalLight('white', 8)
// add it to the scene
scene.add(directionalLight)
// move the light right, up, and towards us
directionalLight.position.set(-10, 10, 10)

//const hemisphereLight = THREE.HemisphereLight(skyColor, groundColor, intensity = 1)

// create the renderer
const renderer = new THREE.WebGLRenderer();
// set the size
renderer.setSize( WIDTH, HEIGHT );

// orbit controls allow us to pan with the mouse
const controls = new OrbitControls( camera, renderer.domElement );

// add automatically created canvas element to the webpage
container.appendChild( renderer.domElement );

const animate = () => {
    // call the animate() function every frame - creates a loop
    requestAnimationFrame(animate)

    // increase the cube's rotation each frame
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  cube.rotation.z += 0

    // render the updated scene and camera
    renderer.render(scene, camera);
  }
  // don't forget to call the function
  animate()

  
# Web-Based Cross Reality (WebXR)

WebXR is a group of standards which are used together to support rendering 3D scenes to hardware designed for presenting virtual worlds (virtual reality, or VR), or for adding graphical imagery to the real world, (augmented reality, or AR). The [WebXR Device API]("https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API") provides access to input ([pose information]("https://en.wikipedia.org/wiki/Pose_tracking") from headset and controllers) and output (hardware display) capabilities commonly associated with Virtual Reality (VR) and Augmented Reality (AR) devices.

At its simplest, WebXR allows three-dimensional experiences directly in your browser on mobile, tablet or desktop without needing additional devices. It eliminates the need to download specialized applications or use specific hardware.

### What are we building?

<screenshot>

### Directory and File Setup

```md​​
hello-cube-vr-app
├── assets/
   ├── components/
   └── models/
├── styles.css
├── main.js
└── index.html
```

## What is A-Frame?

A-Frame is an open-source web framework created by Mozilla for building virtual reality (VR) experiences using HTML-like syntax. It is based on top of HTML, making it simple to get started. A-Frame uses the [WebXR Device API]("https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API") to gain access to VR headset sensor data (position, orientation) to transform the camera and to render content directly to VR headsets.

A-Frame supports most VR headsets through browsers such as HTC Vive, Oculus Rift, Cardboard, Oculus Quest, etc and can also be used for augmented reality on AR headsets like Hololens and Magic Leap as well as on mobile via ARKit, ARCore and [magic window]("https://developers.google.com/vr/develop/unity/guides/magic-window").

### Getting Started

Spin up a local server in the `hello-cube-vr-starter`

### Create an HTML Structure

In the `index.html` file, start by creating a simple HTML document with basic head and body tags. Then, include the A-Frame CDN `<script>` in the `<head>` tag.
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Simple A-Frame Project</title>
    <!-- A-Frame CDN -->
    <script src="https://aframe.io/releases/1.6.0/aframe.min.js"></script>
  </head>
  <body>
    <!-- HTML goes here -->
  </body>
</html>
```
### Define the Scene

In A-Frame, [scenes](https://aframe.io/docs/1.6.0/core/scene.html) are enclosed in `<a-scene></a-scene>` tags. It's what creates the stage for you to place 3D objects in, initializes the camera, the WebGL renderer and handles other boilerplate. It should be the outermost element wrapping everything else inside it.

Let's create an empty scene by adding an `<a-scene>` element inside the `<body>` element:

```html
<body>
    <a-scene></a-scene>
</body>
```
### Add background

#### Using Color

A sky box is a background in the 3D world. Every scene needs a background which can be a color or 360° image. In A-Frame, it’s represented by the [a-sky primitive](https://aframe.io/docs/1.6.0/primitives/a-sky.html). A sky is a large sphere with a color or texture mapped to the inside. Looking around in your scene would give the impression of being inside an open sky, a loft apartment or rolling fields of grass.

A sky with a simple color looks like the following:
```html
<body>
    <a-scene>
	    <a-sky color="#A6CFE2"></a-sky>
    </a-scene>
</body>
```
Save the code and refresh your browser. You should immediately see a blue background.

The [a-plane primitive](https://aframe.io/docs/1.6.0/primitives/a-plane.html) creates flat surfaces. You can give it a few attributes like color, width, and rotation. In order to make the plane parallel to the ground or make a plane the ground itself, it must be rotated around the X-axis. 
```html
<a-plane
  rotation="-90 0 0"
  color="#52430e"
  height="20"
  width="100">
</a-plane>
```
#### Using 360° Images

Background images should be equirectangular and can be found in abundance on [Flickr](https://www.flickr.com/groups/equirectangular/):

```html
<a-assets>
  <img id="city" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg">
</a-assets>

<a-sky src="#city"></a-sky>
```
A-Frame’s [asset management system](https://aframe.io/docs/0.9.0/core/asset-management-system.html), allows us to preload our assets, such as models and textures, before rendering the scene. This makes sure that assets aren’t missing visually, and this is beneficial for performance to ensure scenes don’t try to fetch assets while rendering. Assets include:

  - a-asset-item
  - audio 
  - img
  - video

To set a texture to an entity, we need to specify the src property. src can be a selector to any element in the asset management system. It is customary in A-Frame to use ID selectors for assets: we assign an id to the asset in the asset management system, and then use an ID selector in the primitive we want to apply that asset in. For example, to set a simple texture to an <a-box> primitive, we simply load the texture to the asset management system, assign it an id of `custom-texture` and specify the source in our primitive as being `#custom-texture`.

```html
<a-scene>
  <a-assets>
    <img id="custom-texture" src="./assets/textures/texture-01.png" />
  </a-assets>

  <a-box material="src: #custom-texture"></a-entity>
</a-scene>
```

A-Frame takes care of setting up everything you need:
* A default light source and camera are included, so the cube is visible.
* The controls on your mouse and keyboard are already working: for the keyboard try the W, A, S and D keys
* There is also and “Enter VR Mode” button in the bottom right corner of the screen

### Launch the A-Frame Inspector

The [A-Frame Instector]("https://aframe.io/docs/master/introduction/visual-inspector-and-dev-tools.html") is a visual tool for inspecting and tweaking scenes. The Inspector is similar to the browser’s DOM inspector but tailored for 3D and A-Frame. With the Inspector, we can perform the following actions:
  - Drag, rotate, and scale entities using handles and helpers
  - Tweak an entity’s components and their properties using widgets
  - Immediately see results from changing values without having to go back and forth between code and the browser

Access the A-Frame inspector by: 
* `<ctrl>` + `<alt>` + i (Windows)
* `<ctrl>` + `<option>` + i (Mac)

![](../assets/03_images/webvr_example_01.png)

The Inspector is composed of:
1. Scene Graph on the left. It is a tree-based representation of the scene. We can use the scene graph to select, search, delete, clone, and add entities or exporting HTML. Entities are displayed using their HTML ID or HTML tag name.
2. Viewport in the middle. The viewport displays the scene from the Inspector’s point of the view. We can rotate, pan, or zoom the viewport to change the view of the scene:
  * Rotate: hold down left mouse button (or one finger down on a trackpad) and drag
  * Pan: hold down right mouse button (or two fingers down on a trackpad) and drag
  * Zoom: scroll up and down (or two-finger scroll on a trackpad)
3. Components Panel on the right. The components panel displays the selected entity’s components and properties. We can modify values of common components (e.g., position, rotation, scale) and add and remove components. We can copy the HTML output of individual components. This is useful for visually tweaking and finding the desired value of a component and then syncing it back to source code.

### Populate the Environment

There are two ways that we can populate the scene we’ve just created:
1. use primitive shapes; and 
2. import 3D models.

#### Primitive Shapes

We've already been introduced to `<a-sky>` and `<a-plane>`. Let's take a look at a few others:

| Primitive      | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| `<a-box>`      | The box primitive creates shapes such as boxes, cube, or walls     |
| `<a-cylinder>` | The cylinder primitive is used to create tubes and curved surfaces |
| `<a-sphere>`   | The sphere primitive creates a spherical or polyhedron shapes      |

Let’s jump to the AFRAME documentation with the [sphere primitive](https://aframe.io/docs/1.6.0/primitives/a-sphere.html). The sphere primitive creates a spherical or polyhedron shape. The following sphere has two attributes, color and radius; however, we can also add attributes like scale and position.

```html
<a-sphere 
    color="yellow" 
    radius="5" 
    position="0 4 -10" 
    scale="0.25 0.25 0.25">
</a-sphere>
```

![](../assets/03_images/webvr_example_02.png)

We can also use an [entity](https://aframe.io/docs/1.6.0/core/entity.html) element (I liken it to a div in HTML) and add attributes like geometry, material, and animation.

```html
<a-entity
    id='ball'
    position="0.05 1 -2"
    material="color: red"
    geometry="primitive:sphere; radius: 0.5;">
</a-entity>
```

An entity by itself has no appearance, behavior, or functionality. We must attach components to it to make it render something or do something. To give it shape and appearance, we can attach the `geometry` and `material` components.

To make the entity emit light, we can further attach the light component:

```html
<a-entity
    id='ball'
    position="0.05 1 -2"
    material="color: red"
    light="type: point; intensity: 2.0"
    geometry="primitive:sphere; radius: 0.5;">
</a-entity>
```

#### Material

The [material](https://aframe.io/docs/1.6.0/components/material.html) component gives appearance to an entity. Define the material on the ball entity by adding a material attribute to the `a-entity`. In the attribute we can set up the color, opacity and its roughness (a rougher material will scatter reflected light in more directions than a smooth material):

```html
<a-entity
  id='ball'
  position="0.05 1 -5"
  material="roughness:0.5; metalness:0.5"
  geometry="primitive:sphere; radius: 0.05;">
</a-entity>
```

#### 3D Models

For characters in the game, we are going to use a 3D model created in [SketchFab](https://sketchfab.com/search?q=pacman&sort_by=-pertinence&type=models). A-Frame uses the [glTF format](https://aframe.io/docs/0.9.0/components/gltf-model.html). We can load a glTF model by pointing to an asset that specifies the `src` for the file:

```html
<a-scene>
  <a-assets>
    <a-asset-item id="model-name" src="/path/to/model-name.gltf"></a-asset-item>
  </a-assets>

  <a-entity gltf-model="#model-name"></a-entity>
</a-scene>
```
First, download the model. Places to find 3D models include:
* [Sketchfab](https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount)
* [Sketchup 3D Warehouse](https://3dwarehouse.sketchup.com/)

Then, create a `assets/models` folder and add the downloaded models into the folder. Preload the models using `<a-asset-item>` tag and then add it to the assets section of your code base:
```html
<a-scene>
  <a-assets>
    <a-asset-item id="model-name" src="./assets/models/Model-Name.gltf"></a-asset-item>
  </a-assets>

  <a-entity gltf-model="#model-name"></a-entity>
</a-scene>
```
Outside the `<a-assets>` section, create several entities to load the  model:
```html
<a-entity 
  class="item" 
  cursor-listener 
  gltf-model="#model-name" 
  position="0.05 1 -1" 
  scale="2 2 2">
</a-entity>
```
The additional attributes available on our entity -- `position`, which sets x, y, and z coordinates on each entity; `scale`, which defines a shrinking, stretching, or skewing transformation of an entity; and the `gltf-model`, which loads the model into the frame -- allow us to customize the placement etc of each entity.

![](../assets/03_images/webvr_example_03.png)

If you’d prefer to create your own 3D models, here are some places to start:
* Rhino/Grasshopper
* Blender
* Autodesk Maya
* Maxon Cinema4D 

### Specify a Camera

A camera is situated by default at the average height of human eye level (1.6 meters). Add a camera to the scene with default origin at 0 1.6 0 in desktop mode and 0 0 0 in VR mode. This roughly corresponds to the average eye height of most humans.
```html
<a-camera position="0 1.6 0">
  <a-cursor></a-cursor>
</a-camera>
```
Note: the `<a-cursor>` inside of the camera. This will draw a little circular cursor, which is important for displays that don’t have controllers, such as Google Cardboard.

The cursor primitive is a reticle that allows for clicking and basic interactivity with a scene on devices that do not have a hand controller. 

### Add Lights

The basic light types in A-Frame are directional and ambient. Add one of each to see the impact it makes on the sphere and the ground plane.
```html
<a-light type="directional" color="#FFF" intensity="0.5" position="-1 1 2"></a-light>

<a-light type="ambient" color="#FFF"></a-light>
```
The directional light has a white (`#FFF`) color, its intensity is set to `0.5`, and it is placed at position `-1 1 2`. The ambient light only needs a color, which is also white.

### Add Interactivity

According to the A-Frame documentation, it is best practice to encapsulate your JavaScript code within [A-Frame components](https://aframe.io/docs/1.6.0/core/component.html). Components modularize code, make logic and behavior visible from HTML, and ensure that code is executed at the correct time (e.g., after the scene and entities have attached and initialized).

Register an A-Frame component. We must register components before we use them anywhere in <a-scene>. Meaning from an HTML file, components should come in order before <a-scene>.

```js
// Registering a custom component called change-color-on-hover.js
AFRAME.registerComponent('change-color-on-hover', {
  schema: {
    color: 'red'
  },
  init: function () {
    // Do something when component first attached.
  },
  update: function () {
    // Do something when component's data is updated.
  },
  tick: function (time, timeDelta) {
    // Do something on every scene tick or frame.
  },
  remove: function () {
    // Do something the component or its entity is detached.
  },
  pause: function () {},
  play: function () {}
});
```

When you use the component `change-color-on-hover`. 

```html
<!-- Usage of `foo` component. -->
<html>
  <head>
    <meta charset="utf-8">
    <title>Simple A-Frame Project</title>
    <!-- A-Frame CDN -->
    <script src="https://aframe.io/releases/1.6.0/aframe.min.js"></script>
    <!-- Customized Registered Component -->
    <script src="./assets/components/change-color-on-hover.js"></script>
  </head>
  <body>
    <a-scene>
      <a-entity change-color-on-hover="color: blue"></a-entity>
    </a-scene>
  </body>
</html>
```

#### Getting Entities by Querying and Traversing

The wonderful thing about the DOM as a scene graph is that the standard DOM provides utilities for traversal, querying, finding, and selecting through `.querySelector()` and `.querySelectorAll()`. Let’s grab the scene element:

```javascript
const sceneElement = document.querySelector('a-scene');
console.log(sceneElement.querySelector('#box'));
```

Note, if we were working within a component, we’d already have a reference to the scene element without needing to query.

```javascript
AFRAME.registerComponent('change-color-on-hover', {
  init: function () {
    console.log(this.el.sceneEl);  // Reference to the scene element.
  }
});
```

Let's grab a group of elements:

```javascript
console.log(sceneElement.querySelectorAll('a-box'));
```

Iterate over a group of elements. If we grabbed a group of entities using `.querySelectorAll()`, we can loop over them with a for loop. Let’s loop over every element in the scene with `*`.

```js
var elements = sceneElement.querySelectorAll('*');
for (let i = 0; i < elements.length; i++) {
  console.log(elements[i]);
}
```

Dynamically add and remove entities as we would with normal HTML elements. To create an entity, we can use document.createElement. This will give us a blank entity:

```js
const element = document.createElement('a-entity');
```

First, we must attach it to the scene and provide the entity with attributes such as color or position using [`setAttribute` method](https://aframe.io/docs/1.6.0/core/entity.html#setattribute-componentname-value-propertyvalue-clobber).

```js
const sceneElement = document.querySelector('a-scene');

const entityElement = document.createElement('a-entity');
entityElement.setAttribute('position', { x: 1, y: 2, z: 3 })
entityElement.setAttribute('material', 'color', 'crimson')

sceneElement.appendChild(entityElement);
```

> Note: the [appendChild](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) method adds a new child node to an existing parent node. It is commonly used to dynamically modify the structure of an HTML document.

#### Components

A-Frame relies on events and event listeners for interactivity and dynamicity. However because A-Frame is a JavaScript framework and everything is done in WebGL, A-Frame’s events are [synthetic custom events]("https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events") that can be emitted by any component describing any event:

```js
const sceneElement = document.querySelector('a-scene');
```

```js
AFRAME.registerComponent('change-color-on-hover', {
  init: function () {
    console.log(this.el.sceneElement);  // Reference to the scene element.
  }
});
```

With A-Frame, you need to identify both how the interaction takes place (via mouse, gaze, controller etc.) and which objects are controllable via interaction.

#### Dynamically Add Entities to the Scene

Let’s start with something trivial like a sphere or cube. Add a `<script>` tag just before the closing body tag:

```html
<body>
    <a-scene>

    </a-scene>
    <script src="main.js"></script>
</body>
```
In the `main.js` file, query the scene entity from the `index.html` file. Create a new entity called, cube.
```js
// query the scene
const scene = document.querySelector("a-scene");
// create a new entity
const cube = document.createElement("a-box");
```
Then, set the attributes for the cube: color, height, depth, width and position. Finally, append the cube to the scene.
```js
// set the cube attributes
cube.setAttribute('color', 'tomato')
cube.setAttribute('height', '2')
cube.setAttribute('depth', '2')
cube.setAttribute('width', '2')
cube.setAttribute("position", "3 1 0");
// append the cube to the scene
scene.appendChild(cube);
```
You should now see a reddish colored box in the scene.

#### Animation

The [animation](https://aframe.io/docs/1.6.0/components/animation.html) component lets us animate and tween values including:

  - Component values (e.g., position, visible)
  - Component property values (e.g., light.intensity)

We can animate an entity by placing the [animation](https://aframe.io/docs/1.4.0/components/animation.html) attribute on the entity you want to animate and passing it several properties – duration, easing, and position.


#### Translation
In this animation, we want the box to move towards us from the back of the scene along the z axis, so we define the `position` and `to` attributes:

```html
<a-box 
  color="blue"
  position="0.05 1 -5"
  animation="property: position; to: 0.25 1.5 0.5; dur: 5000; easing: linear"
  ></a-box>
```

* Duration -- indicates how long (in milliseconds) each cycle of the animation is.
* Easing -- defines how you want the entity to move/or what pattern do you want your animation to follow. In this case the easing is “linear”, which makes the animation constant in its movement.
* Loop -- defines how many times the animation should repeat. If the value is true, the animation will repeat infinitely.

Let's make the reddish box move using JavaScript. Define a `moveRight()` function that updates the cube's position on every frame. 

```js
let count = 0;
const moveRight = () => {
  count += 0.01
  requestAnimationFrame(render);
  cube.setAttribute('position', `${Math.sin(count * 2) + 1} 3 0`)
} 
moveRight()
```

> [Math.sin]("https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin"). Sin is the sine function, which is one of the basic functions encountered in trigonometry.

#### Rotation
In this animation, we want the model to rotate at 360° in the y axis, so we define the `to` attribute to that value. We animate the rotation attribute from 20 0 0 to 20 360 0, so it will do a full spin. 

```html
  <a-entity 
    gltf-model="#abby-avocado" 
    position="20 0 0" 
    scale="2 2 2" 
    animation="property: rotation; to: 20 360 0; loop: true; dur: 10000"></a-entity>
```

* Loop -- indicates how many times the animation should repeat. If the value is true, the animation will repeat infinitely.
* Property -- identifies the property to animate. It can be a component name, or a plain attribute.

#### Scaling

The initial, default scale is `1 1 1,` and we're going to animate it to `1 0.5 1`, so the y axis will be scaled from 1 to 0.5. The easing we're going to use is linear. 

```html
<a-box 
  color="#0AB300"
  position="0.05 1 -5"
  animation="property: scale; to: 1 0.5 1; dur: 5000; easing: linear"
  ></a-box>
```

### Add Audio

To add sound to the scene, a good resource is [freesound.org](https://freesound.org/browse/) or a CDN. When adding sound, like images you must preload and cache the audio tag within the asset management system:
```html
<audio id="crickets" src="https://cdn.aframe.io/basic-guide/audio/backgroundnoise.wav" autoplay preload></audio>
```
Then, add the sound component to one of the entities in the scene:
```html
<a-entity sound="src: #crickets"></a-entity>
```

The End.

***

## WebAR

The first AR experience was developed in 1968 at Harvard when a computer scientist named Ivan Sutherland created a special head-mounted AR display system.

AR.JS is a lightweight JavaScript library that allows users to integrate Augmented Reality into web applications.

There are three types of tracking in augmented reality that allow us to place digital content in different environments:
  1. Image Tracking
  2. Location Based
  3. Marker Tracking

Let's set up the environment for a standard augmented reality application and then look at each type of tracking separately.

### Create an HTML Structure

In the index.html, add the A-Frame and ar.js scripts just before the closing head tag. These scripts contain the code that will allow you to add the augmented reality functionality to this tab.
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Hello Cube Augmented Reality</title>
  <script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
</head>
<body>

  <script src="main.js"></script>
</body>
</html>
```

### Define the Scene

In ARjs, scenes are enclosed in <a-scene></a-scene> tags. It should be the outermost element wrapping everything else inside it.

Let's create an empty scene by adding an <a-scene> element inside the <body> element:
```html
<body>
    <a-scene embedded arjs>
	
    </a-scene>
</body>
```
The `arjs` attribute specifies that the scene should use the `AR.js` library to display the augmented reality content.

### Image Based Tracking

Image Tracking makes it possible to scan a picture, a drawing, any image, and show content over it. The software tracks interesting points in the image and using them, it estimates the position of the camera.  These interesting points (aka "Image Descriptors") are created using the NFT Marker Creator, a tool available for creating NFT markers.

Resource: [Creating Good Image Markers](https://github.com/Carnaux/NFT-Marker-Creator/wiki/Creating-good-markers)

#### Import the Library

```js
// import the ar.js with image tracking just below the aframe library
<script src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
<script src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar-nft.js"></script>
```

#### Add the Loader

You can add any custom loader that will be removed when image descriptors are loaded, just use the `.arjs-loader` CSS class on it.

```html
  <!-- minimal loader shown until image descriptors are loaded ... loading may take a while according to the device computational power -->
  <div class="arjs-loader">
    <div>Loading, please wait...</div>
  </div>
```
Use the following styles on the loader:

```css
.arjs-loader {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.arjs-loader div {
    text-align: center;
    font-size: 1.25em;
    color: white;
}
```
#### Creating Image Descriptors

Image descriptors are a set of files that describe your image and are needed by the tracking algorithm. We will use the web-based version of the [NFT Marker Creator](https://carnaux.github.io/NFT-Marker-Creator/#/). Upload your image and click `generate` to create the descriptors. Once the image is processed __three files__ will automatically download with `.fset`, `.fset3`, and `.iset` extensions. 

![](../assets/04_images/nft-image-creator.png)

#### Spin Up the Local HTTP Server

```bash
python3 -m http.server 3000
```

#### Scene Attributes

```html
<body>
    <a-scene 
      vr-mode-ui="enabled: false"
      renderer="logarithmicDepthBuffer: true; precision: medium;"
      embedded 
      arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;">
    </a-scene>
</body>
```

* The [vr-mode-ui](https://aframe.io/docs/1.4.0/components/vr-mode-ui.html) component allows disabling of UI such as an Enter VR button, compatibility modal, and orientation modal for mobile.
* [embedded](https://aframe.io/docs/1.4.0/components/embedded.html) component removes fullscreen CSS styles from A-Frame’s `<canvas>` element, making it easier to embed within the layout of an existing webpage. Embedding removes the default fixed positioning from the canvas and makes the Enter VR button smaller.
* The [renderer](https://aframe.io/docs/1.4.0/components/renderer.html) system configures a scene’s `THREE.WebGLRenderer` instance. 
  * [logarithmicDepthBuffer](https://aframe.io/docs/1.4.0/components/renderer.html#logarithmicdepthbuffer) provides better sorting and rendering in scenes containing very large differences of scale and distance
  * [precision](https://aframe.io/docs/1.4.0/components/renderer.html#precision) attribute sets precision in fragment shaders. Main use is to address issues in older hardware / drivers. Set to `medium` as a workaround. It will improve performance, in mobile in particular but be aware that might cause visual artifacts in shaders / textures.

#### Load the NFT Marker

Point the url to the path containing the Image Descriptors you generated and downloaded before: `../assets/dino-image/dino-image-tracking`. Those files will have a common name. 

```html
<a-nft
  type="nft"
  url="./assets/dino-image/dino-image-tracking"
  smooth="true"
  smoothCount="10"
  smoothTolerance=".01"
  smoothThreshold="5"
></a-nft>
```
It is suggested to use `smooth`, `smoothCount` and `smoothTolerance` because of weak stabilization of content in Image Tracking. 

List of NFT Generators:
* [NFT Marker Creator](https://carnaux.github.io/NFT-Marker-Creator/#/), Web version
* [NFT Marker Creator](https://github.com/Carnaux/NFT-Marker-Creator), NodeJS version
* [Creating Good Markers](https://github.com/Carnaux/NFT-Marker-Creator/wiki/Creating-good-markers)

#### Load the 3D Model

Define the content to display the augmented reality content when you hover over the tracking image.

```html
  <a-entity
    gltf-model="./assets/animated-cube/AnimatedCube.gltf"
    scale="5 5 5"
    position="50 150 0"
  >
  </a-entity>
```

You can replace the model above with any other assets: 2D videos, images, audio files. Any A-Frame `a-entity` is a valid child of the `a-nft` anchor.

#### Camera

The [camera](https://aframe.io/docs/1.4.0/components/camera.html) component defines from which perspective the user views the scene.

```html
<a-entity camera></a-entity>
```

Now the user can visit the website. It will create the AR experience and present the user with the asset loading screen. Once it is completed, point to the image, and you will be presented with the AR content specified in the code block.

### Location Based Tracking

Location-based tracking uses real-world coordinates to place AR content in context. It can be used for indoor (but with low precision) and outdoor geopositioning of AR content. WHen using it outdoors, users can move freely (with better precision) and content associated with their location will be scaled and placed accordingly (e.g: content will render bigger / smaller based on distance to the user).

You as a developer can specify places fo interest represented by real-world coordinates on which the AR content will appear. With locatiopn-based tracking you can build experiences like cities and museum tours, restaurant guides, treasure hunts, biology or history learning games or place virtual art on any real world location.

#### Import the Library

```js
    // aframe
    <script type='text/javascript' src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
    // Pure Three.js code that the A-Frame components use for location-based AR 
    <script type='text/javascript' src='https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar-threex-location-only.js'></script>
    // AR.js A-Frame components 
    <script type='text/javascript' src='https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js'></script>
```

#### Scene Attributes

```html
<body>
    <a-scene 
      vr-mode-ui="enabled: false"
      renderer="antialias: true; alpha: true;"
      embedded 
      arjs="sourceType: webcam; debugUIEnabled: false; videoTexture: true;">
    </a-scene>
</body>
```

* The `videoTexture` attribute is set to true. This is vital in an outdoor location-based AR app as it allows distant augmented content - such at the peaks we are going to eventually visualise - to be seen. (It does this by using a three.js texture for the camera feed which can be easily combined with our augmented content).

#### Load Model

The following example shows how to place a cube on a fixed position in the real world. Make sure you replace your `current latitude` and `current longitude` with values close to your actual position.

```html
<a-entity 
  material='color: red' 
  geometry='primitive: box' 
  gps-new-entity-place="latitude: 40.7788305; longitude: -73.9451072" 
  scale="10 10 10">
</a-entity>
```
If you are not seeing the cube, try to scale it up or choose a closer location. Replace the cube with any content you like, you can display 3D models, videos, images: Any `<a-entity>` will be tracked as expected.

#### Camera

The `gps-new-camera` component which automatically converts latitudes and longitudes into 3D world coordinates, allowing us to use latitude and longitude, rather than world coordinates, when adding places.

```html
<a-camera gps-new-camera='gpsMinDistance: 5'></a-camera>
```

Now the user can visit the website. It will create the AR experience and present the user with the asset loading screen. Once it is completed, point to the image, and you will be presented with the AR content specified in the code block.

### Marker Based Tracking

Markers are a sort of simplified qr-codes. AR.js defines specific 3D scenes for specific markers, so when the camera recognizes a marker, the web-app shows the 3D model on top of it. Marker based tracking requires barcodes, patterns or actual QR codes to activate the experience.

#### Import the Library

```js
    // aframe
    <script type='text/javascript' src="https://aframe.io/releases/1.0.4/aframe.min.js"></script>
    // AR.js A-Frame components 
    <script type="text/javascript" src="https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js"></script>
```

#### Scene Attributes

Initialize [ar.js](https://ar-js-org.github.io/AR.js-Docs/) in `<a-scene>`.

```html
<body>
    <a-scene embedded arjs>
    
    </a-scene>
</body>
```

#### Camera

Define the camera which will move according to the marker position. This element tells A-Frame that you wnat arjs to control the camera.

```html
<a-marker-camera preset='hiro'></a-marker-camera>
```

#### Load 3D Model

You can load a model exactly as you would in A-Frame. To load a primitive shape like a cube or a sphere:

```html
<a-box position='0 0.5 0' material='opacity: 0.5;'></a-box>
```

To load a GLTF model:

```html
<!-- define your gltf asset -->
<a-assets>
  <a-asset-item id="cube" src="./assets/animated-cube"></a-asset-item>
</a-assets>
<!-- use your gltf model -->
<a-entity gltf-model="##cube"></a-entity>
```

In this scene, the camera is being moved by AR.js, and the origin of your scene is at the center of the marker. All the rest is normal A-Frame. So if you want to add new objects in the augmented reality, just add it near the <a-box>

List of Marker Generators:
* [Custom Marker Generator](https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html)
* [AR Marker Generator](https://au.gmented.com/app/marker/marker.php)
* [Pattern Markers](https://github.com/artoolkit/artoolkit5/tree/master/doc/patterns)
* [QR Code Generator](https://www.qrcode-monkey.com/)

Resource: [Ten Tips to Enhance Your ARjs application](https://medium.com/chialab-open-source/10-tips-to-enhance-your-ar-js-app-8b44c6faffca), Nicolò Carpignoli, Medium

### The End.
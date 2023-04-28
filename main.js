import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.4, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(200);
camera.position.setX(-20);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(14, 10, 10);

// const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight);


const loader = new GLTFLoader();


// loader.load( './crocigator/scene.gltf', function ( gltf ) {
//   console.log(gltf)

//   gltf.scene.scale.set(100,100,100)
// 	scene.add( gltf.scene );

// })

// loader.load( '/victorian_bed/scene.gltf', function ( gltf ) {
//   console.log(gltf)

//   let bed = gltf

//   gltf.scene.scale.set(10,10,10)
// 	scene.add( gltf.scene );

// })


// {
//   const gltfLoader = new GLTFLoader();
//   gltfLoader.load('https://threejs.org/manual/examples/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf', (gltf) => {
//     const root = gltf.scene;
//     scene.add(root);
// }

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);
controls.update()

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space2.jpg');
scene.background = spaceTexture;

// Avatar

const jeffTexture = new THREE.TextureLoader().load('Aidan.jpg');

const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));

scene.add(jeff);

// Moon

const moonTexture = new THREE.TextureLoader().load('Velvet.jpeg');
const normalTexture = new THREE.TextureLoader().load('normal.png');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0005;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop


function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.001;
  torus.rotation.y += 0.0003;
  torus.rotation.z += 0.0003;


  controls.update();

  renderer.render(scene, camera);
}


//adjust for window shrink

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener("resize", () => {
  sizes.width=window.innerWidth
  sizes.height=window.innerHeight

  camera.aspect = sizes.width / sizes.height
  renderer.setSize(sizes.width, sizes.height)
})

animate();


// old
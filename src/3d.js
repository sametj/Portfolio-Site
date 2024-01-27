import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const sizes = {
  width: document.body.scrollWidth,
  height: document.body.scrollHeight,
};

//canvas
const cavas = document.querySelector(".webgl");

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

const rederer = new THREE.WebGLRenderer({
  canvas: cavas,
  antialias: true,
  alpha: true,
});

rederer.setSize(sizes.width, sizes.height);
rederer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 10000 * 3;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  const index = i * 3;
  posArray[index] = (Math.random() - 0.5) * document.body.scrollWidth;
  posArray[index + 1] = (Math.random() - 0.5) * document.body.scrollHeight;
  posArray[index + 2] = (Math.random() - 0.5) * document.body.scrollHeight;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);
//material
const particlesMaterial = new THREE.PointsMaterial({
  size: 1,
  color: "white",
});
//mesh
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

//camera
const camera = new THREE.PerspectiveCamera(55, sizes.width / sizes.height);
camera.position.set(0, 0, 3);
scene.add(camera);

//resize
window.addEventListener("resize", () => {
  sizes.width = document.body.scrollWidth;
  sizes.height = document.body.scrollHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  rederer.setSize(sizes.width, sizes.height);
  rederer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

//clock
const clock = new THREE.Clock();

//animation
const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //update particles
  particlesMesh.rotation.y = elapsedTime * 0.01;
  particlesMesh.rotation.x = elapsedTime * 0.01;
  particlesMesh.rotation.z = -elapsedTime * 0.01;
  particlesMesh.position.y = Math.sin(elapsedTime * 0.1);
  particlesMesh.position.x = Math.cos(elapsedTime * 0.1);
  particlesMesh.position.z = Math.cos(elapsedTime * 0.1);

  rederer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();

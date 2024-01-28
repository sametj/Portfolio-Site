import "../style.css";
import * as THREE from "three";

const sizes = {
  width: document.body.scrollWidth,
  height: document.body.scrollHeight,
};

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);

loadingManager.onStart = () => {
  console.log("loading started");
};
loadingManager.onProgress = () => {
  console.log("loading progressing");
};

loadingManager.onLoad = () => {
  console.log("loading completed");
};
loadingManager.onError = (error) => {
  console.log("loading error" + error);
};

//MaterialLoader
const particleTexture = textureLoader.load("/particles/9.png");

//canvas
const cavas = document.querySelector(".webgl");

//scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

const rederer = new THREE.WebGLRenderer({
  canvas: cavas,
  antialias: true,
});

rederer.setSize(sizes.width, sizes.height);
rederer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000 * 3;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  const index = i * 3;
  posArray[index] = (Math.random() - 0.5) * sizes.width;
  posArray[index + 1] = (Math.random() - 0.5) * sizes.height;
  posArray[index + 2] = (Math.random() - 0.5) * sizes.width;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);
//material
const particlesMaterial = new THREE.PointsMaterial();
particlesMaterial.size = 5;
particlesMaterial.sizeAttenuation = true;
particlesMaterial.transparent = true;
particlesMaterial.alphaMap = particleTexture;
particlesMaterial.depthWrite = false;
particlesMaterial.blending = THREE.AdditiveBlending;

//mesh
const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: "grey" });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.scale.set(0.5, 0.5, 0.5);

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

//camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);
scene.add(sphere);

//controls

//light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
scene.add(pointLight);

//mouse

//scroll

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

  //update controls

  //update particles
  particles.rotation.y = elapsedTime * 0.01;
  particles.rotation.x = elapsedTime * 0.01;
  particles.rotation.z = -elapsedTime * 0.01;

  rederer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();

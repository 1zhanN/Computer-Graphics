// npm run dev for local server
// ctrl + C to close local server

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 500);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0, 0, 50);
camera.lookAt(0, 0, 0);


//material 
const material = new THREE.LineBasicMaterial({ color: 0xffffff });

// flag layout
const l_points = [];
l_points.push(new THREE.Vector3(10, 10, 0));
l_points.push(new THREE.Vector3(-10, 10, 0));
l_points.push(new THREE.Vector3(-10, -10, 0));
l_points.push(new THREE.Vector3(10, -10, 0));
l_points.push(new THREE.Vector3(10, 10, 0));
l_points.push(new THREE.Vector3(-5, 10, 0));
l_points.push(new THREE.Vector3(-5, -10, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(l_points);
const line = new THREE.Line(geometry, material);


// star
const s_points = [];
s_points.push(new THREE.Vector3(5, 5.1, 0));
s_points.push(new THREE.Vector3(6, 7.5, 0));
s_points.push(new THREE.Vector3(6.5, 5, 0));
s_points.push(new THREE.Vector3(5, 6.6, 0));
s_points.push(new THREE.Vector3(7, 6.6, 0));
s_points.push(new THREE.Vector3(5, 5.1, 0));

const geometry2 = new THREE.BufferGeometry().setFromPoints(s_points);
const star = new THREE.Line(geometry2, material);

//crescent
const c_points = [];
c_points.push(new THREE.Vector3(2.5, 6.5, 0));
c_points.push(new THREE.Vector3(2.4, 5.6, 0));
c_points.push(new THREE.Vector3(2.3, 4.7, 0));
c_points.push(new THREE.Vector3(2.5, 4, 0));

c_points.push(new THREE.Vector3(2.9, 3.1, 0));
c_points.push(new THREE.Vector3(3.6, 2.7, 0));
c_points.push(new THREE.Vector3(4.6, 2.5, 0));
c_points.push(new THREE.Vector3(5.4, 2.6, 0));
c_points.push(new THREE.Vector3(6, 2.9, 0));

c_points.push(new THREE.Vector3(5.8, 2.1, 0));
c_points.push(new THREE.Vector3(5.5, 1.8, 0));
c_points.push(new THREE.Vector3(4.7, 1.5, 0));
c_points.push(new THREE.Vector3(4, 1.3, 0));
c_points.push(new THREE.Vector3(2.5, 1.45, 0));
c_points.push(new THREE.Vector3(2.2, 1.68, 0));
c_points.push(new THREE.Vector3(1.7, 2, 0));

c_points.push(new THREE.Vector3(1.3, 3, 0));
c_points.push(new THREE.Vector3(1.24, 4, 0));
c_points.push(new THREE.Vector3(1.5, 5, 0));
c_points.push(new THREE.Vector3(2.5, 6.5, 0));



const geometry3 = new THREE.BufferGeometry().setFromPoints(c_points);
const crescent = new THREE.Line(geometry3, material);

scene.add(line);
scene.add(star);
scene.add(crescent);

function animate() {

     line.rotation.y = 1;
     star.rotation.y = 1;
     crescent.rotation.y = 1;
     star.position.setY(-2);
     crescent.position.setY(-2);

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};

animate();


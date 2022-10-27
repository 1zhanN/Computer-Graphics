const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(1400, 800)
const camera = new THREE.PerspectiveCamera(45, 1400 / 800, 1, 1000);
camera.position.z = 9;
const scene = new THREE.Scene();

// const geometry = new THREE.CircleGeometry( 2, 18,0,2*Math.PI );
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
// const circle = new THREE.Mesh( geometry, material );
// scene.add( circle );
// renderer.render(scene, camera);
const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });

let n = 40
let radius = 2;

let t;
let xNot;
let yNot;

let points = []
// let xarr = []
// let yarr = []
// let tarr = []

for (let i = 0; i < n; i++) {
    t = (2 * Math.PI / n) * i
    xNot = radius * Math.cos(t);
    yNot = radius * Math.sin(t);
    points.push(new THREE.Vector3(xNot, yNot, 0));


}
const geometry = new THREE.BufferGeometry().setFromPoints(points);
const circle = new THREE.Mesh(geometry, material);
scene.add(circle);
renderer.render(scene, camera);

console.log('Vertices', points)
// console.log('yarr', yarr)
// console.log('tarr', tarr)





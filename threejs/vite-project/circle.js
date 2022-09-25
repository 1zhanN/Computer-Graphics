import fs from "fs"
// npm run dev for local server
// ctrl + C to close local server

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 500);
const renderer = new THREE.WebGLRenderer({
    canvas:document.querySelector(".three")
});     // links to the canvas in html  
renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement); //creates new canvas

camera.position.set(0, 0, 50);
camera.lookAt(0, 0, 0);

//material 
const material = new THREE.LineBasicMaterial({ color: 0xFFD700 });

// circle
var c_points = [];
var r = 20;  //radius of the circle
const tmax = 2 * Math.PI;
const tmin = 0;
const total_points = 40;

console.log("|   "+"i"+"   |      "+"t"+"     |       "+"x"+"     |      "+"y"+"      |")
for(let i = 0; i < total_points + 1; i++){

    let t = ((tmax - tmin)/total_points) * i
    let x = r * Math.cos(t)
    let y = r * Math.sin(t)
    c_points.push(new THREE.Vector3(x, y, 0))

    console.log("|   "+i+"   |    "+t.toFixed(2)+"   |    "+x.toFixed(2)+"   |    "+y.toFixed(2)+"   |")
}

const geometry = new THREE.BufferGeometry().setFromPoints(c_points);
const circle = new THREE.Line(geometry, material);
scene.add(circle);

// plane 
const geometry2 = new THREE.PlaneBufferGeometry(40, 40, 2, 2);
const material2 = new THREE.MeshBasicMaterial({
    color: 0x808080, 
    side: THREE.DoubleSide,
    wireframe:true
} );
const plane = new THREE.Mesh(geometry2, material2);
scene.add(plane);

function animate() {
    let x = plane.rotation.x = 5;
    let y = plane.rotation.y = 0;
    let z = plane.rotation.z = 0;
    
    plane.scale.set(1, 1, 0)
    circle.scale.set( 0.5, 0.5, 0) 

    if (x != circle.rotation.x){
        circle.rotation.x = x;
    }
    if (y != circle.rotation.y){
        circle.rotation.y = y;
    }
    if (z != circle.rotation.z){
        circle.rotation.z = z;
    }
    if (circle.scale.x > plane.scale.x){
        circle.scale.x = plane.scale.x;
    }
    if (circle.scale.y > plane.scale.y){
        circle.scale.y = plane.scale.y;
    }
    //circle.position.set(80, 0 ,0);
    //circle.scale.set(15, 15, 0);
    //circle.rotation.y += 0.01; 
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};
animate();

//(c_points[0].x, c_points[0].y, 0)
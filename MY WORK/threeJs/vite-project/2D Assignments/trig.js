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

// sin
var c_points = [];
const tmax = 2 * Math.PI;
const tmin = 0;
const total_points = 100;



for(let i = 0; i < total_points + 1; i++){
    
    let x = ((tmax - tmin)/total_points) * i 
    let y =  Math.cos(x)

    c_points.push(new THREE.Vector3(x, y, 0))

    
}

const geometry = new THREE.BufferGeometry().setFromPoints(c_points);
const wave = new THREE.Line(geometry, material);
scene.add(wave);


function animate() {

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};
animate();

//(c_points[0].x, c_points[0].y, 0)
let scene, camera, renderer;

function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 500);
    renderer = new THREE.WebGLRenderer({
        canvas:document.querySelector(".three")     // links to the canvas in html  
    });     
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate() {
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};


init();

camera.position.set(0, 0, 50);


// body

//material 
const material = new THREE.LineBasicMaterial({ color: 0xffffff });


var list = [];
var l_points = [];
const pointer = new THREE.Vector2();

function draw(event) {     // handler
	pointer.x = ( event.clientX / 150);
	pointer.y = - ( event.clientY / 150);
// save and display points
    
    list.push(new THREE.Vector3(pointer.x, pointer.y, 0))
    console.log(list)
    if (list.length === 2){
        const geometry = new THREE.BufferGeometry().setFromPoints(list);
        const line = new THREE.Line(geometry, material);
        scene.add(line)
        list = [];
    }
}

function clear(){
    while(scene.children.length > 0){ 
        scene.remove(scene.children[0]); 
    }

}

window.addEventListener('mousedown', draw);  // listener
window.addEventListener('mouseup', draw);  // listener
window.addEventListener('contextmenu', clear);  // listener


    l_points.push(new THREE.Vector3(0, 20, 0));
    l_points.push(new THREE.Vector3(0, -20, 0));
    l_points.push(new THREE.Vector3(0, 0, 0));
    l_points.push(new THREE.Vector3(20, 0, 0));
    l_points.push(new THREE.Vector3(-20, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(l_points);
const line = new THREE.Line(geometry, material);
scene.add(line)
animate();
// events (click,, dblclick, mouseover, mouseout, mousedown, mouseup)
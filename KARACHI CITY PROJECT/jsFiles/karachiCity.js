import { canvasRender } from "./canvas.js";
import {Movement} from "./cameraMoving.js";
import {boxTexture,simpleTexture} from './texture.js';


function toRadian(degree){
  return degree * Math.PI/180;
}


const canvas = document.getElementById("myCanvas");
// //Canvas
// var canvas = document.getElementById("myCanvas");

// //Scene Perspective and Render
// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(40, canvas.offsetWidth / canvas.offsetHeight, 0.1, 1000);

// var renderer = new THREE.WebGLRenderer({ canvas: myCanvas });

// renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
// //Initilize empty Canvas
// renderer.render(scene, camera);

const CVOBJ = new canvasRender(canvas)

CVOBJ.setRenderer();


const axesHelper = new THREE.AxesHelper( 5 );
CVOBJ.scene.add( axesHelper );


//Camera Position and Movement----------------------------------------------------- 
CVOBJ.camera.position.set(0,10,100);
var movement = new Movement(window,CVOBJ.camera);
window.onkeyup = function (e) {
   movement.keyRelease(e);
  }
  window.onkeydown = function (e) {
    movement.keyPress(e);
  }


// TEXTURE------------------------------------------------------------------
let skyboxTextureMaterial = boxTexture("material/skybox/","skybox_");
let roadTexture = simpleTexture("material/road/","road1");


var skyboxGeo = new THREE.BoxGeometry(400, 400, 400);
var skybox = new THREE.Mesh(skyboxGeo, skyboxTextureMaterial);
  
CVOBJ.scene.add(skybox);

// plane 
const planeGeometry = new THREE.PlaneGeometry(200, 200, 4, 4);

const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x808080, 
    side: THREE.DoubleSide,
    wireframe: true
} );
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
CVOBJ.scene.add(plane);

plane.rotation.set(toRadian(-90), 0, 0) //plane rotatin set
plane.position.set(0, -5, 0)



//Creating Cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh( geometry, material );
CVOBJ.scene.add( cube );

var radian = (angle) => angle*180/Math.PI;
//Rotation variable
var i = 0.001


//random building generator in a 
let x = 0
let ran = 0
let buildings = 8

let texture = new THREE.TextureLoader().load("material\\buildingTex\\buildingtex1.bmp");


for(let i = 0; i < buildings; i++){
const cubeGeometry = new THREE.BoxGeometry(4, 7+10*ran, 10+ 10*ran);
const materialArray2 = new THREE.MeshBasicMaterial({
  map: texture
});

const cube = new THREE.Mesh(cubeGeometry, materialArray2);
plane.add(cube);

cube.scale.set(2, 2 ,2)
cube.position.set(x,0,(cube.scale.z*cube.geometry.parameters.depth/2)+0.1) // since plane itself is a 2D coordinate system, and cube is the child of plane, if we increase z it will effect cube's height (y axis acc to the eye)
console.log()
x+=12;
ran = Math.random()

}




//FPS
var last_time = 0;
var current_time = 0
var FPS = 120;
var delta_time = 1000 / FPS;





//Variables update function
var update = () => {
    cube.rotation.x += radian(i);
    cube.rotation.y += radian(i);
    cube.rotation.z += radian(i);
    
};

var render = () => CVOBJ.render();


//GAMELOOP
var GameLoop = () => {
    update();

    current_time = new Date().getTime();
    if ((current_time - last_time ) >=  delta_time) {
        render();
        last_time = current_time;
    }

    requestAnimationFrame(GameLoop);
};

GameLoop();
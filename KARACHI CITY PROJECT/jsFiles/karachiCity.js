import { canvasRender } from "./canvas.js";
import {Movement} from "./cameraMoving.js";
import {boxTexture} from './texture.js';

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




//Camera Position and Movement----------------------------------------------------- 
CVOBJ.camera.position.set(0,10,100);
var movement = new Movement(window,CVOBJ.camera);
window.onkeyup = function (e){
   movement.keyRelease();
  }
  window.onkeydown = function (e) {   
    movement.keyPress(e);
  }

// SKY BOX TEXTURE------------------------------------------------------------------
let skyboxTextureMaterial = boxTexture("material/skybox/","skybox_");



var skyboxGeo = new THREE.BoxGeometry(400, 400, 400);
var skybox = new THREE.Mesh(skyboxGeo, skyboxTextureMaterial);
  
CVOBJ.scene.add(skybox);

// plane 
const planeGeometry = new THREE.PlaneGeometry(180, 180, 2, 2);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x808080, 
    side: THREE.DoubleSide,
    wireframe: false
} );
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
CVOBJ.scene.add(plane);

plane.rotation.set(4.66, 0, 0)
plane.position.set(0, -5, 0)



//Creating Cube
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh( geometry, material );
CVOBJ.scene.add( cube );

var radian = (angle) => angle*180/Math.PI;
//Rotation variable
var i = 0.001







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
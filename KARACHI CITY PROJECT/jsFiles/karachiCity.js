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
CVOBJ.camera.position.set(0,100,300);
CVOBJ.camera.rotateX(toRadian(-20));
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

// Plane ---------------------------------------------------------------------
let p_widht = 320;
let p_length = 180;
let xTiles = 8;
let yTiles = 3;
let p_topCornerVertex = {
                          x:-p_widht/2,
                          y:p_length/2
                      }; 
const planeGeometry = new THREE.PlaneGeometry(p_widht, p_length, xTiles, yTiles);

const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x808080, 
    side: THREE.DoubleSide,
    wireframe: false
} );
const plane = new THREE.Mesh(planeGeometry, planeGeometry);
CVOBJ.scene.add(plane);

plane.rotation.set(toRadian(-90), 0, 0) //plane rotatin set
plane.position.set(0, -5, 0)

//Road-------------------------------------------------------------------------
let road_offsetX = 5
let road_offsetY = 5



//random building generator in a 
let b_width = +2
let x = 0
let ran = 0
let buildings = 8

let texture = new THREE.TextureLoader().load("material\\buildingTex\\buildingtex1.bmp");


for(let i = 0; i < buildings; i++){
const cubeGeometry = new THREE.BoxGeometry(4, 7+10*ran, 10+ 10*ran);
var materialArray2 = new THREE.MeshBasicMaterial({
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


//Building Position Generator--------------------------------------------------
function generateRandomSize(maxW,maxL,maxH) {
  let W = Math.floor(Math.random() * maxW) + 1;
  let L = Math.floor(Math.random() * maxL) + 1;
  let H = Math.floor(Math.random() * maxH) + 1;
  if (W<10) {
    W = 10;
  }
  if (L<20) {
    L = 20;
  }
  if (H<40) {
    H = 40;
  }
  return [W,L,H]
}
function buildingPositionGenerator(scene,planeW,planeH,topCorner,xOffset,yOffset,xTiles,yTiles) {

  let leftBorder = {
                x: topCorner.x + xOffset , 
                y: topCorner.y - yOffset
            };
  
  let singleTile = { W:planeW / xTiles, L: planeH / yTiles};

  let buildingTile = { W:singleTile.W - 2*xOffset, L: singleTile.L - 2*yOffset };
  

  let buildingDiv = 2;
  let maxBuildingSize = { W: buildingTile.W / buildingDiv , L: buildingTile.L / buildingDiv };
  
  
  let b_one, b_two;


  //position generator of buildings
  let positionArray = []
  for (let row = 0; row < yTiles; row++) {
    b_one = {x: leftBorder.x + maxBuildingSize.W / 2 , y: leftBorder.y - maxBuildingSize.L / 2 };
    b_one.y -= row*(buildingTile.L + 2*xOffset);
    b_two = {x: b_one.x ,y: b_one.y - maxBuildingSize.L};
    for (let col = 0; col < xTiles*2; col++) {
      let pos1 = [b_one.x + col*maxBuildingSize.W, b_one.y];
      let pos2 = [b_two.x + col*maxBuildingSize.W, b_two.y];
      positionArray.push(pos1,pos2);
      if (col % 2 != 0) {
        b_one.x += 2*xOffset;
        b_two = {x: b_one.x ,y: b_one.y - maxBuildingSize.L};
      }
      
    }
  }


  let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );

  for (let index = 0; index < positionArray.length; index++) {

    const coor = positionArray[index];

    let size = generateRandomSize(maxBuildingSize.W,maxBuildingSize.L,100);
    const geometry = new THREE.BoxGeometry( size[0]+0.5, size[1], size[2] );

    var cube = new THREE.Mesh( geometry, materialArray2);

    cube.position.set(coor[0], coor[1], (cube.position.z+cube.geometry.parameters.depth/2)+0.1);
    
    plane.add(cube);
  }
}
buildingPositionGenerator(plane,p_widht,p_length,p_topCornerVertex,road_offsetX,road_offsetY,xTiles,yTiles);





//Creating Cube
const geometry = new THREE.BoxGeometry( 15, 25, 10 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh( geometry, material );
plane.add(cube);
cube.position.set(0,35,0);
var cube = new THREE.Mesh( geometry, material );
plane.add(cube);
cube.position.set(0,25,0);
cube.position.set(-147.5,72.5,0);
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
    // cube.rotation.x += radian(i);
    // cube.rotation.y += radian(i);
    // cube.rotation.z += radian(i);
    
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

// npm run dev for local server
// ctrl + C to close local server
var scene, camera, renderer, orient, buildings;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight ,0.1 ,1000);
  camera.position.set(0,10,100);
  orient = new THREE.Vector3(0,0,0)

    
  renderer = new THREE.WebGLRenderer({
    antialias:true,
    canvas:document.querySelector(".three")
  });
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  
  let materialArray = [];
  let texture_ft = new THREE.TextureLoader().load("material/Daylight Box_Front.bmp");
  let texture_bk = new THREE.TextureLoader().load("material/Daylight Box_Back.bmp");
  let texture_up = new THREE.TextureLoader().load("material/Daylight Box_Top.bmp");
  let texture_dn = new THREE.TextureLoader().load("material/Daylight Box_Bottom.bmp");
  let texture_rt = new THREE.TextureLoader().load("material/Daylight Box_Right.bmp");
  let texture_lf = new THREE.TextureLoader().load("material/Daylight Box_Left.bmp");



  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft,
    wireframe : false  }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk,
    wireframe : false  }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up,
    wireframe : false  }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn,
    wireframe : false  }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt,
    wireframe : false  }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf,
    wireframe : false  }));



//skybox
  for (let i = 0; i < 6; i++)
     materialArray[i].side = THREE.BackSide;
  var skyboxGeo = new THREE.BoxGeometry(400, 400, 400);
  var skybox = new THREE.Mesh(skyboxGeo, materialArray);
  scene.add(skybox);   
}

init();


// plane 
const planeGeometry = new THREE.PlaneGeometry(180, 180, 2, 2);
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x808080, 
    side: THREE.DoubleSide,
    wireframe: false
} );
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

plane.rotation.set(4.66, 0, 0)
plane.position.set(0, -5, 0)


//random building generator in a 
let x = 0
let ran = 0
buildings = 8
let materialArray2 = [];
let texture = new THREE.TextureLoader().load("/vite-project/material/buildingTex/buildingtex3.bmp");


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


// quaid ka mazar 
// semi sphere
window.onkeydown = function (e){ 

  if (e.key == "a"){
    camera.position.x -= 2
  }
  else if (e.key == "d"){
    camera.position.x += 2
  }
  else if (e.key == "w"){
    camera.position.z -= 2
  }
  else if (e.key == "s"){
    camera.position.z += 2
  }
  else if (e.key == "q"){
    camera.position.y += 2
  }
  else if (e.key == "e"){
    camera.position.y -= 2
  }

  else if (e.key == "ArrowRight"){
    camera.rotation.y -= 0.1
  }
  else if (e.key == "ArrowLeft"){
    camera.rotation.y += 0.1
  }
  else if (e.key == "ArrowUp"){
    camera.rotation.x += 0.1
  }
  else if (e.key == "ArrowDown"){
    camera.rotation.x -= 0.1
  }
}

function animate() {
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}

animate();

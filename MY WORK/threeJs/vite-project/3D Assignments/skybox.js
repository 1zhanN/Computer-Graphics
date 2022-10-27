// npm run dev for local server
// ctrl + C to close local server
var scene, camera, renderer, orient;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight,45,30000);
  camera.position.set(0,0,100);
  orient = new THREE.Vector3(0,0,0)
  
  

    
  renderer = new THREE.WebGLRenderer({
    antialias:true,
    canvas:document.querySelector(".three")
  });
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  
  let materialArray = [];
  let texture_ft = new THREE.TextureLoader().load("/material/skyBoxTex/Daylight Box_Front.bmp");
  let texture_bk = new THREE.TextureLoader().load("/material/skyBoxTex/Daylight Box_Back.bmp");
  let texture_up = new THREE.TextureLoader().load("/material/skyBoxTex/Daylight Box_Top.bmp");
  let texture_dn = new THREE.TextureLoader().load("/material/skyBoxTex/Daylight Box_Bottom.bmp");
  let texture_rt = new THREE.TextureLoader().load("/material/skyBoxTex/Daylight Box_Right.bmp");
  let texture_lf = new THREE.TextureLoader().load("/material/skyBoxTex/Daylight Box_Left.bmp");



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




  for (let i = 0; i < 6; i++)
     materialArray[i].side = THREE.BackSide;
  var skyboxGeo = new THREE.BoxGeometry(400, 400, 400);
  var skybox = new THREE.Mesh(skyboxGeo, materialArray);
  scene.add(skybox);  
 
  
}

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
    orient.x += 5
    camera.lookAt(orient);    
  }
  else if (e.key == "ArrowLeft"){
    orient.x -= 5
    camera.lookAt(orient);
  }
  else if (e.key == "ArrowUp"){
    orient.y += 5
    camera.lookAt(orient);
  }
  else if (e.key == "ArrowDown"){
    orient.y -= 5
    camera.lookAt(orient);

  }
console.log(orient)


}


init();

function animate() {
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}

animate();

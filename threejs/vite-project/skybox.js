// npm run dev for local server
// ctrl + C to close local server
let scene, camera, renderer;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,45,30000);
  camera.position.set(200,150,0);
    
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


    
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

  for (let i = 0; i < 6; i++)
     materialArray[i].side = THREE.BackSide;
  var skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000);
  var skybox = new THREE.Mesh( skyboxGeo, materialArray );

  scene.add(skybox);  
 
}

init();

function animate() {
    
    camera.rotation.y += 0.001;

  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
animate();




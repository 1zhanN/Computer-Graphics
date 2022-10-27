 // gltf, fbx and obj are supported by threejs

 var scene, camera, renderer, intensity, hlight;
 scene = new THREE.Scene();
 camera = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight ,1 ,5000);
 camera.position.set(0,0,10);
 scene.background = new THREE.Color(0xf7f7f7);
 
intensity = 4

hlight = new THREE.AmbientLight(0x404040, intensity);
 scene.add(hlight)
 renderer = new THREE.WebGLRenderer({
    antialias:true,
    canvas:document.querySelector(".three")
  });
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

let loader = new THREE.GLTFLoader();
loader.load('/material/assets/wall/scene.gltf', function(gltf){
	scene.add(gltf.scene);
	const dewaar = gltf.scene.children[0];
	dewaar.scale.set(0.01, 0.01, 0.01);
	dewaar.rotation.set(90,0,0);

	renderer.render(scene,camera);
})


 function animate() {
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
  }
  
 //animate();
  
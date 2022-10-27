
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 500);
const renderer = new THREE.WebGLRenderer({
    canvas:document.querySelector(".three")
});     // links to the canvas in html  
renderer.setSize(window.innerWidth, window.innerHeight);
scene.background = new THREE.Color( 0x000000);

camera.position.set(0, 0, 50);
camera.lookAt(0, 0, 0);


// plane 
const geometry = new THREE.PlaneBufferGeometry(40, 40, 2, 2);
const plane_material = new THREE.MeshBasicMaterial({
    color: 0xB2BEB5, 
    side: THREE.DoubleSide,
    wireframe:false
} );
const plane = new THREE.Mesh(geometry, plane_material);
scene.add(plane);
plane.rotation.x = 5


// sprite
var current_tile = 0.39;
var tile_horiz = 10
var tile_vert = 9.5

// load the sprite sheet as texture 
const loader = new THREE.TextureLoader();
var sprite_texture = loader.load("/material/sprites/sprite_sheet.png");
sprite_texture.repeat.set(0.8/tile_horiz,0.8/tile_vert);

// offsets ka chakkar
var offsetX = (current_tile % tile_horiz) / tile_horiz;
var offsetY = (tile_vert - Math.floor(current_tile/tile_horiz) - 1) / tile_vert;
sprite_texture.offset.x = offsetX;
sprite_texture.offset.y = offsetY;


// sharper pixels (bilinear interpolation) 
sprite_texture.magFilter = THREE.NearestFilter;


// sprite material and assign the loaded texture to the map property
var sprite_material = new THREE.SpriteMaterial({
    map: sprite_texture
});

// create and add sprite to the scene
var sprite = new THREE.Sprite(sprite_material);
scene.add(sprite);
sprite.scale.set(5, 5, 5);
sprite.position.set(-13, 0, 15);
console.log(sprite.geometry.set)



current_tile = 0.39+10*5
function animate() {
    offsetX = (current_tile % tile_horiz) / tile_horiz;
    offsetY = (tile_vert - Math.floor(current_tile/tile_horiz) - 1) / tile_vert;
    sprite_texture.offset.x = offsetX;
    sprite_texture.offset.y = offsetY;

    current_tile += 0.7;
    sprite.position.x += 1;
    renderer.render(scene, camera);
    //window.requestAnimationFrame(animate);
    setTimeout(function () {window.requestAnimationFrame(animate) }, 150)
    if (current_tile >= (0.39+10*5)+(5*3)/4){  
        current_tile = 0.39+10*5
    }console.log(current_tile)
    
};
animate();


/*  current_tile += 0.7;   
if (current_tile >= 3){  
        current_tile = 0.39
    }//console.log(current_tile)
    1/tile_horiz */ 

/*var offsetX = (current_tile % tile_horiz) / tile_horiz;
var offsetY = (tile_vert - Math.floor(current_tile/tile_horiz) - 1) / tile_vert;
sprite_texture.offset.x = offsetX;
sprite_texture.offset.y = offsetY;*/ 
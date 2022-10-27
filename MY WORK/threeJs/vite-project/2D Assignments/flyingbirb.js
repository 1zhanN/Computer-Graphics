const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 500);
const renderer = new THREE.WebGLRenderer({
    canvas:document.querySelector(".three")
});     // links to the canvas in html

renderer.setSize(window.innerWidth, window.innerHeight);
scene.background = new THREE.Color(0xf7f7f7);
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);



// load the sprite sheet as texture 
const map = new THREE.TextureLoader().load('/material/sprites/sprite_sheet3.png')

// grid
var current_tile = 1
const tiles_hori = 3    //5 for BOOM
const tiles_vert = 3

// sharper pixels (bilinear interpolation) 
map.magFilter = THREE.NearestFilter

// offsets ka chakkar
map.repeat.set(1/tiles_hori, 1/tiles_vert)
const offsetX = (current_tile % tiles_hori) / tiles_hori
const offsetY = (tiles_vert - Math.floor(current_tile / tiles_hori) - 1) / tiles_vert
map.offset.x = offsetX
map.offset.y = offsetY

// sprite material and assign the loaded texture to the map property
const sprite_material = new THREE.SpriteMaterial({
    map: map
})

// create and add sprite to the scene
const sprite = new THREE.Sprite(sprite_material)
sprite.position.y = 0.5
scene.add(sprite)


var indx = 0
var arr1 = [[0, 1],[1, 2],[2, 3],[3, 4],[4, 5],[5, 6],[6, 7],[7, 8],[8, 0]];

var arr2 = [
    [0, 1],[1, 2],[2, 3],[3, 4],[4, 5],[5, 6],[6, 7],[7, 8],[8, 9],
    [9, 10],[10, 11],[11, 12],[12, 13],[13, 14],[14, 15],[15, 16],
    [16, 17],[17, 18],[18, 19],[19, 0]
    ];


//material 
const material = new THREE.LineBasicMaterial({ color: 0xffffff });

// circle
var c_points = [];
var c2_points = []
var r = 2;  //radius of the circle
const tmax =  8* Math.PI;
const tmin = 0;
const total_points = 500;

for(let i = 0; i < total_points + 1; i++){

    let t = ((tmax - tmin)/total_points) * i
    var x = r * Math.cos(t)
    var y = r * Math.sin(t) 
    c_points.push(new THREE.Vector3(x, y, 0))
    c2_points.push([x, y])

}

const geometry2 = new THREE.BufferGeometry().setFromPoints(c_points);
const circle = new THREE.Line(geometry2, material);
scene.add(circle);



var i = 0

function animate() {

    if(i >= c2_points.length - 1){
        i = 0
    }
    i++ 

    current_tile = arr1[indx][0]
    indx = arr1[indx][1]
    
    const offsetX = (current_tile % tiles_hori) / tiles_hori
    const offsetY = (tiles_vert - Math.floor(current_tile / tiles_hori) - 1) / tiles_vert
    map.offset.x = offsetX
    map.offset.y = offsetY
    
    sprite.position.set(c2_points[i][0], c2_points[i][1], 0)
    

    renderer.render(scene, camera);
    // update with preferred delay
    setTimeout(function () {window.requestAnimationFrame(animate) }, 75)
    
};

animate();


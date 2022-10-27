
// npm run dev for local server
// ctrl + C to close local server

//Declare three.js variables
var camera, scene, renderer, rain=[], drop;
    
//assign three.js objects to each variable
function init(){
        
    //camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 5;	 

    //scene
    scene = new THREE.Scene();
        
    //renderer
    renderer = new THREE.WebGLRenderer();

    //set the size of the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
        
    //add the renderer to the html document body
    document.body.appendChild(renderer.domElement);
}

function addLine(){

// The loop will move from z position of -1000 to z position 1000, adding a random particle at each position. 
for (var z = -1000; z < 1000; z += 20) {

    // Make a Line (exactly the same as before). 
    //material 
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });

    const l_points = [];
    l_points.push(new THREE.Vector3(0, 0, 0));
    l_points.push(new THREE.Vector3(0, 0, 6));

    const geometry = new THREE.BufferGeometry().setFromPoints(l_points);
    const line = new THREE.Line(geometry, material);
 

    // This time we give the line random x and y positions between -500 and 500
    line.position.x = Math.random() * 1000 - 500;
    line.position.y = Math.random() * 1000 - 500;

    // Then set the z position to where it is in the loop (distance of camera)
    line.position.z = z;

    // scale it up a bit
    //line.scale.x = line.scale.y = 2;

    //add the line to the scene
    scene.add(line);

    //finally push it to the stars array 
    rain.push(line); 

    }
}


function animate() { 
            
// loop through each star
for(var i = 0 ; i < rain.length; i++) {
    
    drop = rain[i]; 
        
    // and move it forward dependent on the mouseY position. 
    drop.position.z +=  10;
        
    // if the drop is too close move it to the back
    if(drop.position.z > 1000) drop.position.z -= 2000; 
    
    }
}


function render() {

    //get the frame
    requestAnimationFrame(render);

    //render the scene
    renderer.render(scene, camera);
        animate();

}

init();
addLine();
render();

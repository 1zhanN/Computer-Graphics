
// import THREE from '../jsLib/three.js';
export default textureApply = (location,name) => {
    let materialArray = [];
    const sides = ["ft", "bk", "up", "dn", "rt", "lf"];
    //skybox
  for (let i = 0; i < 6; i++) {
    let texture =  new THREE.TextureLoader().load(location+name+sides[i]+".bmp");
    materialArray.push(new THREE.MeshBasicMaterial( {map : texture, wireframe : false} ));
    materialArray[i].side = THREE.BackSide;
  }
  return materialArray;
}

//By Izhan 048, Modifed by Umar 104
export class Movement {
    constructor(window,camera,fps) {
        this.keyList = ["a","d","w","s","q","e","ArrowRight","ArrowLeft","ArrowUp","ArrowDown"];
        this.camera = camera;
        this.window = window;
        this.movingTimeout = -1;
        this.FPS = 120;
        this.myWorldYAxis = new THREE.Vector3(0, 1, 0);
        this.myWorldXAxis = new THREE.Vector3(1, 0, 0);
    }

    keyRelease = () => this.stopMoving();
    keyPress = (e) => {
        if (this.keyList.includes(e.key)) {
            this.startMoving(e.key);
          }
    }

    stopMoving = () => {
        clearTimeout(this.movingTimeout);
        this.movingTimeout = -1;
    }

    startMoving = (key) => {
        if (this.movingTimeout === -1) {      
            this.cameraMove(key);
        }
    }

    cameraMove = (key) => {
        if (key == "a") {
          this.camera.translateX(-1);
        }
        else if (key == "d") {
          this.camera.translateX(+1);
        }
        else if (key == "w") {
          this.camera.translateZ(-1);
        }
        else if (key == "s") {
          this.camera.translateZ(+1);
        }
        else if (key == "q") {
          this.camera.translateY(+1);
        }
        else if (key == "e") {
          this.camera.translateY(-1);
        }
        else if (key == "ArrowRight") {
          this.camera.rotateOnWorldAxis(this.myWorldYAxis,-0.1);
        }
        else if (key == "ArrowLeft") {
          this.camera.rotateOnWorldAxis(this.myWorldYAxis,0.1);
        }
        else if (key == "ArrowUp") {
          this.camera.rotateX(+0.1);
        }
        else if (key == "ArrowDown") {
          this.camera.rotateX(-0.1);
        }
       this.movingTimeout = setTimeout(this.cameraMove,1000/this.FPS,key);
    }

}

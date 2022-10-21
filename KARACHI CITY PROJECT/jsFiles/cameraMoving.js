export class Movement {
    constructor(window,camera) {
        this.keyList = ["a","d","w","s","q","e","ArrowRight","ArrowLeft","ArrowUp","ArrowDown"];
        this.camera = camera;
        this.window = window;
        this.movingTimeout = -1;
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
          this.camera.position.x -= 1
        }
        else if (key == "d") {
          this.camera.position.x += 1
        }
        else if (key == "w") {
          this.camera.position.z -= 1
        }
        else if (key == "s") {
          this.camera.position.z += 1
        }
        else if (key == "q") {
          this.camera.position.y += 1
        }
        else if (key == "e") {
          this.camera.position.y -= 1
        }
        else if (key == "ArrowRight") {
          this.camera.rotation.y -= 0.1
        }
        else if (key == "ArrowLeft") {
          this.camera.rotation.y += 0.1
        }
        // else if (key == "ArrowUp") {
        //   this.camera.rotation.x += 0.1
        // }
        // else if (key == "ArrowDown") {
        //   this.camera.rotation.x -= 0.1
        // }
       this.movingTimeout = setTimeout(this.cameraMove,1000/60,key);
    }

}

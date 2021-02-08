class Room {

    id;
    canvas = document.querySelector("#game");
    ctx = this.canvas.getContext('2d');
    ghost = document.querySelectorAll(".ghost");
    minotaur = document.querySelectorAll(".minotaur");
    werewolf = document.querySelectorAll(".werewolf");
    skeleton = document.querySelectorAll(".skeleton");
    wraith = document.querySelectorAll(".wraith");
    cyborg = document.querySelectorAll(".cyborg");
    angryBread = document.querySelectorAll(".angryBread");
    dragon = document.querySelectorAll(".dragon");
    upArrow = document.querySelectorAll(".up");
    leftArrow = document.querySelectorAll(".left");
    rightArrow = document.querySelectorAll(".right");
    arrowsInterval;
    portalFrames = document.querySelectorAll(".portal");
    ghostAnimation;
    doorSound = document.querySelector("#doorSound");
    deathSound = document.querySelector("#doomDeathSound");

    // room types by id
    right = ['e1', 'e2', 'a4', 'd3'];
    rightLeft = ['d5'];
    up = ['b2', 'a3', 'c4', 'b5'];
    upLeft = ['d2', 'd4'];
    upRight = ['a1', 'a2', 'b4'];
    upRightLeft = ['c2'];

    constructor(id) {

        //set room id
        this.id = id.toUpperCase();

        if (id != "a1" && id != "b5") {
            this.doorSound.play();
        }

        this.ctx.clearRect(0, 0, 1000, 600);

        this.ctx.strokeStyle = "black";
        this.ctx.font = "20px serif";

        // clear floor
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.moveTo(0, 600);
        this.ctx.lineTo(1000, 600);
        this.ctx.lineTo(620, 240);
        this.ctx.lineTo(380, 240);
        this.ctx.lineTo(0, 600);
        this.ctx.fill();

        if (id == "a1") {
            this.ctx.strokeText("YOU FOUND YOURSELF IN THIS EMPTY ROOM, TRY TO FIND A WAY OUT", 170, 580);
        }

        if (id == "d1") {
            this.ctx.strokeText("I FOUND A STRANGE PORTAL AND WONDER WHERE IT LEADS", 200, 580);
        }

        // draw parameters
        this.ctx.lineWidth = "1.5";
        this.ctx.fillStyle = "brown";
        this.ctx.font = '40px serif';

        //left wall
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(380, 120);
        this.ctx.lineTo(380, 240);
        this.ctx.lineTo(0, 600);
        this.ctx.fill();
        this.ctx.stroke();

        //right wall
        this.ctx.beginPath();
        this.ctx.moveTo(1000, 600);
        this.ctx.lineTo(620, 240);
        this.ctx.lineTo(620, 120);
        this.ctx.lineTo(1000, 0);
        this.ctx.fill();
        this.ctx.stroke();

        //back wall
        this.ctx.beginPath();
        this.ctx.moveTo(620, 120);
        this.ctx.lineTo(620, 240);
        this.ctx.lineTo(380, 240);
        this.ctx.lineTo(380, 120);
        this.ctx.lineTo(620, 120);
        this.ctx.fill();
        this.ctx.stroke();

        //change fill color
        this.ctx.fillStyle = "green";

        //room id
        this.ctx.strokeText(this.id, 50, 100);
        this.ctx.fillText(this.id, 50, 100);

        //change fill color
        this.ctx.fillStyle = "#663300";

        // draw doors
        if (this.right.includes(id)) {
            this.rightDoor();
            this.arrows(false, false, true);
        } else if (this.rightLeft.includes(id)) {
            this.leftDoor();
            this.rightDoor();
            this.arrows(true, false, true);
        } else if (this.up.includes(id)) {
            this.backDoor();
            this.arrows(false, true, false);
        } else if (this.upLeft.includes(id)) {
            this.backDoor();
            this.leftDoor();
            this.arrows(true, true, false);
        } else if (this.upRight.includes(id)) {
            this.backDoor();
            this.rightDoor();
            this.arrows(false, true, true);
        } else if (this.upRightLeft.includes(id)) {
            this.backDoor();
            this.rightDoor();
            this.leftDoor();
            this.arrows(true, true, true);
            // portal room
        } else if (id == 'd1') {
            this.portal();
        } else if (id == 'a5') {
            // win room
            this.backDoor("white");
        } else if (id == "b1") {
            this.enemy();
            setTimeout(() => {
                this.deathSound.play();
            }, 800);
        } else if (id == "b3") {
            this.enemy(this.minotaur);
            setTimeout(() => {
                this.deathSound.play();
            }, 800);
        } else if (id == "c1") {
            this.enemy(this.werewolf);
            setTimeout(() => {
                this.deathSound.play();
            }, 800);
        } else if (id == "c3") {
            this.enemy(this.skeleton);
            setTimeout(() => {
                this.deathSound.play();
            }, 800);
        } else if (id == "e3") {
            this.enemy(this.wraith);
            setTimeout(() => {
                this.deathSound.play();
            }, 800);
        } else if (id == "e4") {
            this.enemy(this.cyborg, 20);
            setTimeout(() => {
                this.deathSound.play();
            }, 800);
        } else if (id == "c5") {
            this.enemy(this.angryBread, 100);
            setTimeout(() => {
                this.deathSound.play();
            }, 800);
        } else if (id == "e5") {
            this.enemy(this.dragon, 100, 350);
            setTimeout(() => {
                this.deathSound.play();
            }, 800);
        }
    }

    leftDoor() {
        this.ctx.beginPath();
        this.ctx.moveTo(200, 411);
        this.ctx.lineTo(200, 200);
        this.ctx.lineTo(280, 185);
        this.ctx.lineTo(280, 335);
        this.ctx.fill();
        this.ctx.stroke();
    }

    rightDoor() {
        this.ctx.beginPath();
        this.ctx.moveTo(800, 410);
        this.ctx.lineTo(800, 200);
        this.ctx.lineTo(720, 190);
        this.ctx.lineTo(720, 335.5);
        this.ctx.fill();
        this.ctx.stroke();
    }

    backDoor(color = false) {
        if (color) {
            this.ctx.fillStyle = color;
        }
        this.ctx.beginPath();
        this.ctx.moveTo(490, 240);
        this.ctx.lineTo(490, 160);
        this.ctx.lineTo(540, 160);
        this.ctx.lineTo(540, 240);
        this.ctx.fill();
        this.ctx.stroke();
    }

    enemy(enemy = this.ghost, frameInterval = 150, size = 200) {
        let canvasBack = document.createElement("canvas");
        canvasBack.width = 1000;
        canvasBack.height = 600;
        canvasBack.ctx = canvasBack.getContext("2d");
        canvasBack.ctx.drawImage(this.canvas, 0, 0);
        let count = 0;
        this.ghostAnimation = setInterval(() => {
            if (count == enemy.length) {
                count = 0;
            }
            this.ctx.clearRect(0, 0, 1000, 600);
            setTimeout(() => {
                canvasBack.ctx.fillStyle = "red";
                canvasBack.ctx.font = "30px serif";
                canvasBack.ctx.fillText("YOU DIED. PRESS ENTER TO CONTINUE", 220, 580);
                canvasBack.ctx.strokeText("YOU DIED. PRESS ENTER TO CONTINUE", 220, 580);
            }, 1050);
            this.ctx.drawImage(canvasBack, 0, 0);
            this.ctx.drawImage(enemy[count], 350, 150, size, size);
            count++;
        }, frameInterval);
    }

    portal() {
        let canvasBack = document.createElement("canvas");
        canvasBack.width = 1000;
        canvasBack.height = 600;
        canvasBack.ctx = canvasBack.getContext("2d");
        canvasBack.ctx.drawImage(this.canvas, 0, 0);
        let count = 0;
        this.portalAnimation = setInterval(() => {
            if (count == this.portalFrames.length) {
                count = 0;
            }
            this.ctx.clearRect(0, 0, 1000, 600);
            this.ctx.drawImage(canvasBack, 0, 0);
            this.ctx.drawImage(this.portalFrames[count], 350, 150, 200, 200);
            count++;
        }, 50);
    }

    arrows(left=false, up=false, right=false) {
        let canvasBack = document.createElement("canvas");
        canvasBack.width = 1000;
        canvasBack.height = 600;
        canvasBack.ctx = canvasBack.getContext("2d");
        canvasBack.ctx.drawImage(this.canvas, 0, 0);
        let count = 0;
        this.arrowsInterval = setInterval((leftA = left, upA = up, rightA = right) => {
            if (count == this.leftArrow.length) {
                count = 0;
            }
            this.ctx.clearRect(0, 0, 1000, 600);
            this.ctx.drawImage(canvasBack, 0, 0);
            if(leftA) {
                this.ctx.drawImage(this.leftArrow[count], 280, 340, 50, 50);
            }
            if(rightA) {
                this.ctx.drawImage(this.rightArrow[count], 680, 340, 50, 50);
            }
            if(upA) {
                this.ctx.drawImage(this.upArrow[count], 490, 245, 50, 50);
            }
            count++;
        }, 50);

    }
}
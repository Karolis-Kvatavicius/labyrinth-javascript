class Labyrinth {
    controls;
    currentRoom = "";
    deadEnds = ['B1', 'C1', 'B3', 'C3', 'E3', 'E4', 'E5', 'C5'];
    titleScreenInterval;
    winScreenInterval;
    titleAudio = document.querySelector("#titleAudio");
    inGameAudio = document.querySelector("#inGameAudio");
    portalWarp = document.querySelector("#portalWarp");
    winAudio = document.querySelector("#winAudio");
    entergame;
    timer;
    deathCount = 0;

    constructor() {
        this.titleScreen();
    }

    gameControls() {

        this.controls = document.addEventListener('keypress', e => {

            if (this.currentRoom.id == "A1") {
                if (e.key == "d") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('b1');
                } else if (e.key == "w") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('a2');
                }
            } else if (this.currentRoom.id == "A2") {
                if (e.key == "w") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('a3');
                } else if (e.key == "d") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('b2');
                }
            } else if (this.currentRoom.id == "A3") {
                if (e.key == "w") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('a4');
                }
            } else if (this.currentRoom.id == "A4") {
                if (e.key == "d") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('b4');
                }
            } else if (this.currentRoom.id == "B4") {
                if (e.key == "d") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('b3');
                } else if (e.key == "w") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('c4');
                }
            } else if (this.currentRoom.id == "C4") {
                if (e.key == "w") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('d4');
                }
            } else if (this.currentRoom.id == "D4") {
                if (e.key == "a") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('d5');
                } else if (e.key == "w") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('e4');
                }
            } else if (this.currentRoom.id == "D5") {
                if (e.key == "a") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('c5');
                } else if (e.key == "d") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('e5');
                }
            } else if (this.currentRoom.id == "B5") {
                if (e.key == "w") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('a5');
                }
            } else if (this.currentRoom.id == "B2") {
                if (e.key == "w") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('c2');
                }
            } else if (this.currentRoom.id == "C2") {
                if (e.key == "a") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('c3');
                } else if (e.key == "d") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('c1');
                } else if (e.key == "w") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('d2');
                }
            } else if (this.currentRoom.id == "D2") {
                if (e.key == "a") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('d3');
                } else if (e.key == "w") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('e2');
                }
            } else if (this.currentRoom.id == "D3") {
                if (e.key == "d") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('e3');
                }
            } else if (this.currentRoom.id == "E2") {
                if (e.key == "d") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('e1');
                }
            } else if (this.currentRoom.id == "E1") {
                if (e.key == "d") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.currentRoom = new Room('d1');
                }
            }

            //portal room
            else if (this.currentRoom.id == "D1") {
                if (e.key == "w") {
                    this.portalWarp.play();
                    setTimeout(() => {
                        clearInterval(this.currentRoom.portalAnimation);
                        this.currentRoom = new Room('b5');
                    }, 1500);
                }
            }

            //win room
            else if (this.currentRoom.id == "A5") {
                if (e.key == "w") {
                    clearInterval(this.currentRoom.arrowsInterval);
                    this.winAnimation();
                }

            }

            // dead ends
            else if (this.deadEnds.includes(this.currentRoom.id)) {
                setTimeout(() => {
                    if (e.key == "Enter") {
                        clearInterval(this.currentRoom.ghostAnimation);
                        this.deathCount++;
                        this.currentRoom = new Room('a1');
                    }
                }, 1500);
            }
        });
    }

    titleScreen() {
        let ctx = document.querySelector("#game").getContext('2d');
        let startHeight = 650;
        this.titleAudio.play();
        this.titleScreenInterval = setInterval(() => {
            if (startHeight == 300) {
                clearInterval(this.titleScreenInterval);
                setTimeout(() => {
                    ctx.fillStyle = "white";
                    ctx.font = "30px serif";
                    ctx.fillText("Press ENTER to play", 360, startHeight + 50);
                    ctx.font = "15px serif";
                    ctx.fillText("Created by Karolis Kvatavičius, www.vtmc.lt", 710, 580);

                    this.entergame = document.addEventListener('keyup', e => {
                        if (e.key == "Enter" && this.currentRoom == "") {
                            this.titleAudio.pause();
                            this.inGameAudio.play();
                            this.currentRoom = new Room('a1');
                            this.timer = new Date();
                        }
                    });
                }, 500);
            }
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 1000, 600);
            ctx.font = "70px serif";
            ctx.fillStyle = "brown";
            ctx.fillText("LABYRINTH", 305, startHeight + 3);
            ctx.fillStyle = "white";
            ctx.fillText("LABYRINTH", 300, startHeight);
            startHeight--;
        }, 10);
    }

    winAnimation() {
        this.currentRoom = "escape";
        let ctx = document.querySelector("#game").getContext('2d');
        let startHeight = 650;
        this.inGameAudio.pause();
        this.inGameAudio.currentTime = 0;
        this.winAudio.play();
        this.winScreenInterval = setInterval(() => {
            if (startHeight == 250) {
                clearInterval(this.winScreenInterval);
                document.addEventListener('keyup', e => {
                    if (e.key == "Enter" && this.currentRoom == "escape") {
                        location.reload();
                    }
                });
            }
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, 1000, 600);
            ctx.font = "70px serif";
            ctx.fillStyle = "grey";
            ctx.fillText("YOU WIN", 355, startHeight + 3);
            ctx.fillStyle = "green";
            ctx.fillText("YOU WIN", 350, startHeight);
            if(startHeight ==  250) {
                ctx.fillStyle = "white";
                ctx.font = "30px serif";
                ctx.fillText("Press ENTER to reset", 380, startHeight + 50);
                ctx.fillText(`Play time: ${ this.msToHMS(new Date().getTime() - this.timer.getTime()) }`, 380, startHeight + 100);
                ctx.fillText(`Deaths: ${ this.deathCount}`, 380, startHeight + 140);
            }     
            startHeight--;
        }, 10);
    }

    msToHMS( ms ) {
        // 1- Convert to seconds:
        var seconds = ms / 1000;
        // 2- Extract hours:
        var hours = parseInt( seconds / 3600 ); // 3,600 seconds in 1 hour
        seconds = seconds % 3600; // seconds remaining after extracting hours
        // 3- Extract minutes:
        var minutes = parseInt( seconds / 60 ); // 60 seconds in 1 minute
        // 4- Keep only seconds not extracted to minutes:
        seconds = seconds % 60;
        return hours+"h:"+minutes+"m:"+seconds.toFixed(0)+"s";
    }

}
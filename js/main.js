// get enemies frames
function getFrames() {
    animationFrames.forEach(enemy => {
        let name = Object.keys(enemy)[0];
        enemy[name].forEach(frame => {
            document.querySelector('body').innerHTML += "<img class='" + name + "' src='" + "images/"+ name + '/' + frame + "'>";
        });
    });
}

// In game map
let map = document.querySelector(".map");

document.addEventListener('keyup', e => {
    if (e.key == "m") {
        map.classList.toggle("map");
        map.classList.toggle("map-default");
    }
});

window.onload = () => {
    
    // ACTUAL LOADING OF FRAMES
    getFrames();

    let context = document.querySelector('#game').getContext('2d');
    context.font = "20px serif";
    context.fillText('W, A, S, D - to navigate. ENTER - to reset at dead ends. Click anywhere to start', 200, 300);

    document.addEventListener('click', e => {
        // LET THE GAME START AND ENABLE CONTROLS
        context.clearRect(0, 0, 1000, 600);
        let labyrinth = new Labyrinth();
        labyrinth.gameControls();
    }, {
        once: true
    })

}
// get enemies frames
function getFrames() {
    animationFrames.forEach(enemy => {
        let name = Object.keys(enemy)[0];
        enemy[name].forEach(frame => {
            document.querySelector('body').innerHTML += "<img class='height " + name + "' src='" + "images/" + name + '/' + frame + "'>";
        });
    });
}

window.onload = () => {
    // In game map
    document.addEventListener('keyup', e => {
        if (e.key == "m") {
            document.querySelector("#gameMap").classList.toggle("map");
            document.querySelector("#gameMap").classList.toggle("map-default");
        }
    });

    // ACTUAL LOADING OF FRAMES
    getFrames();

    // controls message, also used to force user interraction with page so that audio wouldn't be muted
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
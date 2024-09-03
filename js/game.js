let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game by setting up the canvas and world objects.
 * Logs the character from the world to the console.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);     
}

/**
 * Event listener for keydown events. Updates the keyboard object based on the pressed key.
 * @param {KeyboardEvent} e - The event object representing the keydown event.
 */
window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if(e.keyCode == 38) {
        keyboard.UP = true;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(e.keyCode == 68) {
        keyboard.D = true;
    }
});

/**
 * Event listener for keyup events. Updates the keyboard object when a key is released.
 * @param {KeyboardEvent} e - The event object representing the keyup event.
 */
window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if(e.keyCode == 38) {
        keyboard.UP = false;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if(e.keyCode == 68) {
        keyboard.D = false;
    }
});

class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    D_PRESSED_ONCE = false;  

    constructor() {
        window.addEventListener('keydown', (event) => {
            if (event.code === 'ArrowLeft') this.LEFT = true;
            if (event.code === 'ArrowRight') this.RIGHT = true;
            if (event.code === 'ArrowUp') this.UP = true;
            if (event.code === 'ArrowDown') this.DOWN = true;
            if (event.code === 'Space') this.SPACE = true;
            if (event.code === 'KeyD') {
                if (!this.D_PRESSED_ONCE) {
                    this.D = true;
                    this.D_PRESSED_ONCE = true; 
                }
            }
        });

        window.addEventListener('keyup', (event) => {
            if (event.code === 'ArrowLeft') this.LEFT = false;
            if (event.code === 'ArrowRight') this.RIGHT = false;
            if (event.code === 'ArrowUp') this.UP = false;
            if (event.code === 'ArrowDown') this.DOWN = false;
            if (event.code === 'Space') this.SPACE = false;
            if (event.code === 'KeyD') {
                this.D = false;
                this.D_PRESSED_ONCE = false; 
            }
        });
    }
}

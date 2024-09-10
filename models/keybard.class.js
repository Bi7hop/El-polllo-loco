/**
 * Class representing the keyboard and touch controls for the game.
 * Manages the state of key presses and touch events to control the character.
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;
    D_PRESSED_ONCE = false;  

    /**
     * Creates a new Keyboard instance and initializes event listeners for both
     * keyboard and mobile touch controls.
     */
    constructor() {
        this.addKeyboardListeners();
        this.addMobileListeners(); 
    }

    /**
     * Adds event listeners for keyboard controls. Updates the state of the
     * keyboard properties based on keydown and keyup events.
     */
    addKeyboardListeners() {
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

    /**
     * Adds event listeners for mobile touch controls. Maps touch events to the
     * corresponding keyboard properties to enable character control on mobile devices.
     */
    addMobileListeners() {
        this.addTouchEventListener('mobileButtonBack', 'LEFT');
        this.addTouchEventListener('mobileButtonForward', 'RIGHT');
        this.addTouchEventListener('mobileButtonJump', 'SPACE');
        this.addTouchEventListenerForThrow('mobileButtonThrow');
    }

    /**
     * Adds a touch event listener for the specified button to set the specified keyboard property.
     * @param {string} buttonId - The ID of the button element.
     * @param {string} direction - The direction to control (e.g., 'LEFT', 'RIGHT', 'SPACE').
     */
    addTouchEventListener(buttonId, direction) {
        const button = document.getElementById(buttonId);
        const options = { passive: true };

        if (button) {
            button.addEventListener('touchstart', () => {
                this[direction] = true;
            }, options);

            button.addEventListener('touchend', () => {
                this[direction] = false;
            }, options);
        }
    }

    /**
     * Adds a touch event listener for the throw button (D key functionality).
     * @param {string} buttonId - The ID of the throw button element.
     */
    addTouchEventListenerForThrow(buttonId) {
        const button = document.getElementById(buttonId);
        const options = { passive: true };

        if (button) {
            button.addEventListener('touchstart', () => {
                if (!this.D_PRESSED_ONCE) {
                    this.D = true;
                    this.D_PRESSED_ONCE = true;
                }
            }, options);

            button.addEventListener('touchend', () => {
                this.D = false;
                this.D_PRESSED_ONCE = false;
            }, options);
        }
    }
}

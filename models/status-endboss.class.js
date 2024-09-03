/**
 * Class representing the status bar for the endboss in the game.
 * Extends the StatusBar class to display the endboss's health with a specific set of images.
 */
class EndbossStatusBar extends StatusBar {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];

    /**
     * Creates a new EndbossStatusBar instance.
     * Initializes the status bar at the top right of the screen.
     */
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.loadImages(this.IMAGES);
    }

    /**
     * Sets the world context for the status bar, including updating its position based on the canvas size.
     * @param {Object} world - The game world object containing the current game state.
     */
    setWorld(world) {
        this.world = world;
        this.canvasWidth = world.canvas.width;
        this.x = this.canvasWidth - 230;
    }

    /**
     * Draws the endboss's status bar on the canvas.
     * Ensures that the image is fully loaded before drawing.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context where the status bar is drawn.
     */
    draw(ctx) {
        if (this.img && this.img.complete) {  
            super.draw(ctx);
        }
    }
}

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
     * Checks if the endboss is visible based on the camera position and the canvas width.
     * @returns {boolean} True if the endboss should be visible, false otherwise.
     */
    isEndbossVisible() {
        const endboss = this.world.level.enemies.find(enemy => enemy instanceof Endboss);
        return endboss && endboss.isEndbossVisible(this.world.camera_x, this.world.canvas.width);
    }

    /**
     * Draws the endboss's status bar on the canvas if the endboss is visible.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context where the status bar is drawn.
     */
    draw(ctx) {
        if (this.isEndbossVisible()) {
            if (!this.world.endbossEncountered) {
                soundManager.play('endboss');
                this.world.endbossEncountered = true;
            }
            super.draw(ctx); 
        }
    }
}

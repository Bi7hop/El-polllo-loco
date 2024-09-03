/**
 * Class representing a background object in the game.
 * Extends the MovableObject class to provide movement functionality.
 */
class BackgroundObject extends MovableObject {

     /** @type {number} The width of the background object. */
    width = 720;

    /** @type {number} The height of the background object. */
    height = 480;

        /**
     * Creates a new BackgroundObject instance.
     * @param {string} imagePath - The path to the image file for the background object.
     * @param {number} x - The initial x-position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480- this.height;
    }

}
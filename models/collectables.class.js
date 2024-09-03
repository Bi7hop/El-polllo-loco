/**
 * Class representing a collectable object in the game.
 * Extends the MovableObject class and provides basic functionality for loading images
 * and playing animations.
 */
class Collectable extends MovableObject {
    currentImage = 0;

    /**
     * Creates a new Collectable instance.
     * @param {string[]} imageArray - Array of image paths for the collectable's animation.
     */
    constructor(imageArray) {
        super();
        this.loadImages(imageArray);
        this.playAnimation(imageArray); 
    }
}

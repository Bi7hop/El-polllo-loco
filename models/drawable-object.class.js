/**
 * Class representing a drawable object in the game.
 * This class provides basic functionality for loading images, drawing them on a canvas,
 * and managing an image cache.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 250;
    height = 150;
    width = 100;

    /**
     * Loads an image from the specified path and stores it in the image cache.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
        this.imageCache[path] = this.img;
    }

    /**
     * Draws the current image of the object on the provided canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context on which to draw the image.
     */
    draw(ctx) {
        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    /**
     * Loads multiple images from the specified array of paths and stores them in the image cache.
     * @param {string[]} arr - An array of image paths to be loaded.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}

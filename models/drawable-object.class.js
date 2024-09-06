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
 * Draws a red rectangle (ESP) around the object on the canvas for debugging or collision visualization.
 * It only draws rectangles for specific object types (Character, Chicken, Endboss, etc.).
 *
 * @param {CanvasRenderingContext2D} ctx - The canvas rendering context on which to draw the rectangle.
 */
    drawESP2(ctx) {
        const offset = this.offset || { left: 0, right: 0, top: 0, bottom: 0 };
    
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Bottle || this instanceof ThrowableObject || this instanceof Coins || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '0';
            ctx.strokeStyle = 'red';
            ctx.rect(
                this.x + offset.left,
                this.y + offset.top,
                this.width - offset.left - offset.right,
                this.height - offset.top - offset.bottom
            );
            ctx.stroke();
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

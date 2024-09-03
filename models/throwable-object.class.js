/**
 * Class representing a throwable object in the game, such as a salsa bottle.
 * Extends the MovableObject class and provides functionality for throwing and animating the object.
 */
class ThrowableObject extends MovableObject {

    /**
     * Creates a new ThrowableObject instance.
     * Initializes the object's position, size, rotation images, and sound effect.
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.imagesRotation = [
            'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
            'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
            'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
            'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
        ];
        this.currentImageIndex = 0;
        this.loadImage(this.imagesRotation[this.currentImageIndex]);
        this.animateRotation();

        this.throwSound = 'bottleThrow';
    }

    /**
     * Throws the object in a specified direction, applying gravity and horizontal movement.
     * @param {number} direction - The direction and speed of the throw (positive for right, negative for left).
     */
    throw(direction) {
        soundManager.play(this.throwSound);
        
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += direction;
        }, 25);
    }

    /**
     * Animates the rotation of the throwable object by cycling through the rotation images.
     */
    animateRotation() {
        setInterval(() => {
            this.currentImageIndex++;
            if (this.currentImageIndex >= this.imagesRotation.length) {
                this.currentImageIndex = 0;
            }
            this.loadImage(this.imagesRotation[this.currentImageIndex]);
        }, 100);
    }
}

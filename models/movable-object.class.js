/**
 * Class representing a movable object in the game.
 * Extends the DrawableObject class and provides additional functionalities for movement, collisions, and gravity.
 */
class MovableObject extends DrawableObject {
    speed = 0.175;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    /**
     * Applies gravity to the object, continuously decreasing the vertical position (y) based on speedY and acceleration.
     */
    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground level.
     * @returns {boolean} True if the object is above ground, false otherwise.
     */
    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        } else {
        return this.y < 130;
        } 
    }

    /**
     * Checks if the object is on the ground.
     * @returns {boolean} True if the object is on the ground, false otherwise.
     */
    isOnGround() {
        return this.y >= 130; 
    }

    /**
     * Checks if the object is hitting another object from above.
     * @param {MovableObject} mo - The other movable object to check collision with.
     * @returns {boolean} True if the object is hitting the other object from above, false otherwise.
     */
    hitFromAbove(mo) {
        const overlapX = this.x + this.width * 0.8 > mo.x && this.x + this.width * 0.2 < mo.x + mo.width;
        const hitY = this.y + this.height <= mo.y + mo.height * 0.5; 
        const withinFallRange = this.y + this.height >= mo.y;
        return this.speedY < 0 && overlapX && hitY && withinFallRange;
    }
    
    isColliding(mo) {
        let buffer = 10;
        if (mo instanceof SmallChicken) {
            buffer = 5;
        }
        const hitboxOffsetX = 30; 
        const hitboxOffsetY = 110; 
        const hitboxShrinkWidth = 40; 
        const hitboxShrinkHeight = 100;
        const collisionBoxX = this.x + hitboxOffsetX;
        const collisionBoxY = this.y + hitboxOffsetY;
        const collisionBoxWidth = this.width - hitboxShrinkWidth;
        const collisionBoxHeight = this.height - hitboxShrinkHeight;
        const overlapX = collisionBoxX + collisionBoxWidth - buffer > mo.x && collisionBoxX + buffer < mo.x + mo.width;
        const overlapY = collisionBoxY + collisionBoxHeight - buffer > mo.y && collisionBoxY + buffer < mo.y + mo.height;
        return overlapX && overlapY;
    }
    
    
     /**
     * Reduces the object's energy when hit and updates the last hit time.
     */
    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

     /**
     * Checks if the object is currently hurt (recently hit).
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Checks if the object is dead (energy is zero).
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Plays the animation by cycling through the provided image array.
     * @param {string[]} images - The array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

     /**
     * Moves the object to the right by increasing its x-coordinate.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Moves the object to the left by decreasing its x-coordinate.
     * If the object is a Character, sets the `otherDirection` to true.
     */
    moveLeft() {
        this.x -= this.speed;
        if (this instanceof Character) {
            this.otherDirection = true; 
        }
    }
    
    /**
     * Makes the object jump by setting the vertical speed to a positive value.
     */
    jump() {
        this.speedY = 30;  
    }
}

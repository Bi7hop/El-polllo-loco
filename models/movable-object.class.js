class MovableObject extends DrawableObject {
    speed = 0.175;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        } else {
        return this.y < 130;
        } 
    }

    isOnGround() {
        return this.y >= 130; 
    }

    hitFromAbove(mo) {
        const overlapX = this.x + this.width * 0.9 > mo.x && this.x + this.width * 0.1 < mo.x + mo.width;
        const hitY = this.y + this.height <= mo.y + mo.height / 3;
        const withinFallRange = this.y + this.height >= mo.y;

        return this.speedY < 0 && overlapX && hitY && withinFallRange;
    }

    isColliding(mo) {
        const buffer = 10;
        const overlapX = this.x + this.width - buffer > mo.x && this.x + buffer < mo.x + mo.width;
        const overlapY = this.y + this.height - buffer > mo.y && this.y + buffer < mo.y + mo.height;
        return overlapX && overlapY;
    }
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
            this.x += this.speed;
            this.otherDirection = false;
    }

    moveLeft() {
        this.x -= this.speed;
        if (this instanceof Character) {
            this.otherDirection = true; 
        }
    }
    

    jump() {
        this.speedY = 30;  
    }
}
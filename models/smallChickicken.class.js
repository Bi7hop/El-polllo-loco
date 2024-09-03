/**
 * Class representing a small chicken enemy in the game.
 * Extends the MovableObject class and provides additional functionalities specific to small chickens,
 * such as random jumping behavior and custom gravity.
 */
class SmallChicken extends MovableObject {
    static SPAWNED_POSITIONS = [];
    y = 370;
    height = 50;
    width = 50;
    canJump = Math.random() < 0.5; 
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    acceleration = 5;
    removeAfterDeath = false;

    /**
     * Creates a new SmallChicken instance, initializes its position, speed, and animations.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = this.calculateValidPosition();
        SmallChicken.SPAWNED_POSITIONS.push(this.x);

        this.speed = this.calculateSpeed();
        this.deathSound = 'chickenDeath'; 
        this.applyGravity();
        this.animate();
    }

    /**
     * Calculates a valid spawn position for the small chicken, ensuring it's not too close to other small chickens.
     * @returns {number} - The calculated x-position.
     */
    calculateValidPosition() {
        const maxAttempts = 100; 
        let attempts = 0;
        let position;

        do {
            position = this.generateRandomPosition();
            attempts++;
        } while (!this.isPositionValid(position) && attempts < maxAttempts);

        return position;
    }

    /**
     * Generates a random x-position for the small chicken.
     * @returns {number} - The generated x-position.
     */
    generateRandomPosition() {
        return 900 + Math.random() * 400;
    }

    /**
     * Checks if the given position is valid by ensuring it's not too close to other small chickens.
     * @param {number} position - The position to validate.
     * @returns {boolean} - True if the position is valid, false otherwise.
     */
    isPositionValid(position) {
        const minDistance = 80;
        const maxDistance = 250;

        for (let pos of SmallChicken.SPAWNED_POSITIONS) {
            let randomDistance = minDistance + Math.random() * (maxDistance - minDistance);
            if (Math.abs(position - pos) < randomDistance) {
                return false;
            }
        }
        return true;
    }

    /**
     * Calculates the speed of the small chicken.
     * @returns {number} - The calculated speed.
     */
    calculateSpeed() {
        return 0.2 + Math.random() * 0.3;
    }

    /**
     * Applies custom gravity to the small chicken, continuously decreasing the vertical position (y) based on speedY and acceleration.
     * Prevents the small chicken from falling below its initial position.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration * 0.5;  
            }
            if (this.y > 370) {
                this.y = 370;
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the small chicken is hit by a throwable object.
     * @param {ThrowableObject} throwableObject - The object to check for collision with.
     * @returns {boolean} True if the small chicken is hit, false otherwise.
     */
    isHitBy(throwableObject) {
        return throwableObject instanceof ThrowableObject && this.isColliding(throwableObject);
    }

    /**
     * Handles the logic for when the small chicken dies. Stops movement, changes image, and plays death sound.
     */
    die() {
        this.energy = 0;
        this.speed = 0;
        this.loadImage(this.IMAGE_DEAD);
        soundManager.play(this.deathSound);
        this.scheduleRemoval();  
    }

    /**
     * Checks if the small chicken is dead.
     * @returns {boolean} True if the small chicken is dead, false otherwise.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Checks if the small chicken is ready to be removed from the game after death.
     * @returns {boolean} True if the small chicken is removable, false otherwise.
     */
    isRemovable() {
        return this.removeAfterDeath;
    }

    /**
     * Schedules the small chicken to be removed from the game after a delay.
     */
    scheduleRemoval() {
        setTimeout(() => {
            this.removeAfterDeath = true;
        }, 3000); 
    }

    /**
     * Starts the animation loops for moving, playing walking animations, and possibly jumping.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);

        if (this.canJump) {
            setInterval(() => {
                if (!this.isDead() && Math.random() < 0.05 && !this.isAboveGround()) {
                    this.jump();
                }
            }, 1000 / 60);
        }
    }

    /**
     * Makes the small chicken jump by setting the vertical speed to a positive value.
     */
    jump() {
        if (!this.isDead()) {  
            this.speedY = 20;  
        }
    }

    /**
     * Checks if the small chicken is above the ground.
     * @returns {boolean} True if the small chicken is above ground, false otherwise.
     */
    isAboveGround() {
        return this.y < 370; 
    }
}

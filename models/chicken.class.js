class Chicken extends MovableObject {
    static SPAWNED_POSITIONS = [];
    y = 355;
    height = 70;
    width = 75;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    removeAfterDeath = false;

    /**
     * Creates a new Chicken instance, initializes its position, speed, and animations.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        
        this.x = this.calculateValidPosition();
        Chicken.SPAWNED_POSITIONS.push(this.x);
        
        this.speed = this.calculateSpeed();
        this.deathSound = 'chickenDeath';
        this.animate();
    }

    /**
     * Calculates a valid spawn position for the chicken, ensuring it's not too close to other chickens.
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
     * Generates a random x-position for the chicken.
     * @returns {number} - The generated x-position.
     */
    generateRandomPosition() {
        return 1000 + Math.random() * 500;
    }

    /**
     * Checks if the given position is valid by ensuring it's not too close to other chickens.
     * @param {number} position - The position to validate.
     * @returns {boolean} - True if the position is valid, false otherwise.
     */
    isPositionValid(position) {
        const minDistance = 100;
        const maxDistance = 300;

        for (let pos of Chicken.SPAWNED_POSITIONS) {
            let randomDistance = minDistance + Math.random() * (maxDistance - minDistance);
            if (Math.abs(position - pos) < randomDistance) {
                return false;
            }
        }
        return true;
    }

    /**
     * Calculates the speed of the chicken.
     * @returns {number} - The calculated speed.
     */
    calculateSpeed() {
        return 0.175 + Math.random() * 0.25;
    }

    /**
     * Checks if the chicken is hit by a throwable object.
     * @param {ThrowableObject} throwableObject - The object to check for collision with.
     * @returns {boolean} True if the chicken is hit, false otherwise.
     */
    isHitBy(obj) {
        return this.x + this.width > obj.x && this.x < obj.x + obj.width &&
               this.y + this.height > obj.y && this.y < obj.y + obj.height;
    }

    /**
     * Handles the logic for when the chicken dies. Stops movement, changes image, and plays death sound.
     */
    die() {
        this.energy = 0;
        this.speed = 0;
        this.loadImage(this.IMAGE_DEAD);
        soundManager.play(this.deathSound);
        this.scheduleRemoval();  
    }

    /**
     * Checks if the chicken is dead.
     * @returns {boolean} True if the chicken is dead, false otherwise.
     */
    isDead() {
        return this.energy === 0;
    }

    /**
     * Checks if the chicken is ready to be removed from the game after death.
     * @returns {boolean} True if the chicken is removable, false otherwise.
     */
    isRemovable() {
        return this.removeAfterDeath;
    }

    /**
     * Schedules the chicken to be removed from the game after a delay.
     */
    scheduleRemoval() {
        setTimeout(() => {
            this.removeAfterDeath = true;
        }, 3000);  
    }

    /**
     * Starts the animation loops for moving and playing walking animations.
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
    }
}

/**
 * Class representing a chicken enemy in the game.
 * Extends the MovableObject class and provides movement, animation, and collision handling.
 */
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
    
        const minDistance = 100;
        const maxDistance = 300;
        const maxAttempts = 100; 
        let attempts = 0;
        let validPosition = false;
    
        while (!validPosition && attempts < maxAttempts) {
            this.x = 1000 + Math.random() * 500;
            validPosition = true;
    
            for (let pos of Chicken.SPAWNED_POSITIONS) {
                let randomDistance = minDistance + Math.random() * (maxDistance - minDistance);
                if (Math.abs(this.x - pos) < randomDistance) {
                    validPosition = false;
                    break;
                }
            }
            attempts++;
        }
    
        if (!validPosition) {
            this.x = 1000 + Math.random() * 500;
        }
    
        Chicken.SPAWNED_POSITIONS.push(this.x);
        this.speed = 0.175 + Math.random() * 0.25;
        this.deathSound = 'chickenDeath';
        this.animate();
    }
    
    
    /**
     * Checks if the chicken is hit by a throwable object.
     * @param {ThrowableObject} throwableObject - The object to check for collision with.
     * @returns {boolean} True if the chicken is hit, false otherwise.
     */
    isHitBy(throwableObject) {
        return throwableObject instanceof ThrowableObject && this.isColliding(throwableObject);
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

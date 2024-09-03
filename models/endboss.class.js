/**
 * Class representing the endboss in the game.
 * Extends the MovableObject class and provides specific behaviors, animations,
 * and interactions related to the endboss.
 */
class Endboss extends MovableObject {
    height = 450;
    width = 300;
    y = -2;
    energy = 100;
    isDead = false;
    speed = 5;
    moveDistance = 400;
    initialX = 3500;
    moving = true;
    speedIncrease = 10;

    currentState = 'walking'; 
    currentAnimationInterval = null; 

    hitboxes = [
        { xOffset: 100, yOffset: 0, width: 100, height: 100 },
        { xOffset: 50, yOffset: 100, width: 200, height: 350 }
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    hitSound = 'chickenDeath';

    /**
     * Creates a new Endboss instance, initializes its animations, and sets its position.
     * @param {Object} world - The game world object.
     */
    constructor(world) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = this.initialX;
        this.world = world; 
        this.animate();
    }

    /**
     * Reduziert die Energie des Endbosses und erhöht seine Geschwindigkeit nach jedem Treffer.
     */
    hit() {
        this.energy -= 20;
        soundManager.play(this.hitSound);
        if (this.energy <= 0 && !this.isDead) {
            this.die();
        } else {
            this.currentState = 'hurt'; 
            this.playHurtAnimation(); 
            this.speed += this.speedIncrease;  
        }
    }

    /**
     * Clears the current animation interval to stop the current animation.
     */
    clearCurrentAnimation() {
        if (this.currentAnimationInterval) {
            clearInterval(this.currentAnimationInterval);
            this.currentAnimationInterval = null;
        }
    }

    /**
     * Plays the hurt animation and then transitions to the attack animation.
     */
    playHurtAnimation() {
        this.clearCurrentAnimation(); 

        let animationIndex = 0;
        this.currentAnimationInterval = setInterval(() => {
            if (animationIndex < this.IMAGES_HURT.length) {
                this.img = this.imageCache[this.IMAGES_HURT[animationIndex]];
                animationIndex++;
            } else {
                this.clearCurrentAnimation();
                this.currentState = 'attack'; 
                this.playAttackAnimation();
            }
        }, 100);
    }

    /**
     * Plays the attack animation and then transitions back to the walking animation.
     */
    playAttackAnimation() {
        this.clearCurrentAnimation(); 

        let animationIndex = 0;
        this.currentAnimationInterval = setInterval(() => {
            if (animationIndex < this.IMAGES_ATTACK.length) {
                this.img = this.imageCache[this.IMAGES_ATTACK[animationIndex]];
                animationIndex++;
            } else {
                this.clearCurrentAnimation();
                this.currentState = 'walking';
            }
        }, 100);
    }

    /**
     * Triggers the death sequence for the endboss, including playing the death animation.
     */
    die() {
        if (!this.isDead) {  
            this.isDead = true;
            this.playDeathAnimation();
        }
    }

    /**
     * Plays the death animation and then triggers the victory screen.
     */
    playDeathAnimation() {
        this.clearCurrentAnimation(); 

        let animationIndex = 0;
        this.currentAnimationInterval = setInterval(() => {
            if (animationIndex < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[animationIndex]];
                animationIndex++;
            } else {
                this.clearCurrentAnimation();
                this.moving = false; 
                this.world.showVictoryScreen(); 
            }
        }, 200);
    }

    /**
     * Checks if the endboss is hit by a throwable object, using defined hitboxes for collision detection.
     * @param {ThrowableObject} throwableObject - The object to check for collision with.
     * @returns {boolean} True if the endboss is hit, false otherwise.
     */
    isHitBy(throwableObject) {
        return this.hitboxes.some(box => {
            const hitboxX = this.x + box.xOffset;
            const hitboxY = this.y + box.yOffset;
            return (
                throwableObject.x + throwableObject.width > hitboxX &&
                throwableObject.x < hitboxX + box.width &&
                throwableObject.y + throwableObject.height > hitboxY &&
                throwableObject.y < hitboxY + box.height
            );
        });
    }

    /**
     * Makes the endboss follow the character based on their relative positions.
     */
    followCharacter() {
        const characterX = this.world.character.x;

        if (characterX < this.x) {
            this.moveLeft();
        } else if (characterX > this.x) {
            this.moveRight();
        }
    }

     /**
     * Moves the endboss to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the endboss to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Starts the animation loop for the endboss, handling different states like walking and attacking.
     */
    animate() {
        setInterval(() => {
            if (this.isDead) {
            } else if (this.world) { 
                switch (this.currentState) {
                    case 'walking':
                        this.playAnimation(this.IMAGES_WALKING);
                        this.followCharacter();
                        break;
                    case 'hurt':
                        break;
                    case 'attack':
                        break;
                }
            }
        }, 150);
    }

    /**
     * Moves the endboss left until it reaches a specific distance from its initial position.
     */
    moveLeftAtEndOfMap() {
        if (this.x > this.initialX - this.moveDistance) {
            this.moveLeft();
        }
    }

    /**
     * Checks if the endboss is currently visible within the camera's view.
     * @param {number} camera_x - The x-coordinate of the camera.
     * @param {number} canvas_width - The width of the canvas.
     * @returns {boolean} True if the endboss is visible, false otherwise.
     */
    isEndbossVisible(camera_x, canvas_width) {
        const endbossX = this.x;
        const cameraStart = -camera_x;
        const cameraEnd = -camera_x + canvas_width;
        return endbossX >= cameraStart && endbossX <= cameraEnd;
    }
}

/**
 * Class representing the main character in the game.
 * Extends the MovableObject class and provides various animations, sound management,
 * and movement handling based on keyboard input.
 */
class Character extends MovableObject {

    bottlesCollected = 0;
    otherDirection = false;
    height = 300;
    y = 30;
    speed = 10;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    STAY_IMAGES = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    world;
    walking_sound = new Audio('audio/walking.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    snoring_sound = new Audio('audio/schnarchen.mp3'); 
    idleTimeout = 10000; 
    lastActionTime = 0;
    idleSoundPlayed = false;
    idleFrameCounter = 0;  
    stayFrameCounter = 0;  
    deathAnimationPlayed = false; 
    gameOverImage = 'img/9_intro_outro_screens/game_over/you lost.png'; 
    gameOverSound = 'gameOver';
    
    /**
     * Creates a new Character instance, initializes images, applies gravity, and starts animation.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.STAY_IMAGES); 
        this.applyGravity();
        this.animate();
        this.updateLastActionTime(); 
    }

    /**
     * Starts the animation intervals for handling movement, sounds, and visual updates.
     */
    animate() {
        this.animationInterval = setInterval(() => {
            this.handleMovementAndSounds();
        }, 1000 / 60);

        this.animationInterval2 = setInterval(() => {
            this.updateAnimations();
        }, 50); 
    }

    /**
     * Handles character movement based on keyboard input, plays corresponding sounds,
     * and updates the camera position.
     */
    handleMovementAndSounds() {
        let currentTime = new Date().getTime();
        let timeSinceLastAction = currentTime - this.lastActionTime;
        let isMoving = false;
    
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.playWalkingSound();
            isMoving = true;
        } else if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.playWalkingSound();
            isMoving = true;
        } else {
            this.stopWalkingSound(); 
        }
    
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump(); 
            isMoving = true;
        }
    
        if (isMoving) {
            this.updateLastActionTime(); 
        }
    
        if (timeSinceLastAction > this.idleTimeout && !isMoving && !this.isDead()) {
            this.playIdleAnimation();
        } else if (!isMoving && timeSinceLastAction <= this.idleTimeout) {
            this.playStayAnimation(); 
        }
    
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Updates the character's animation based on its state (e.g., dead, hurt, jumping, or walking).
     */
    updateAnimations() {
        if (this.isDead()) {
            if (!this.deathAnimationPlayed) { 
                this.playAnimation(this.IMAGES_DEAD);
                this.deathAnimationPlayed = true; 
                setTimeout(() => {
                    this.world.gameOver(); 
                }, 500); 
            }
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Plays the walking sound if it is not already playing.
     */
    playWalkingSound() {
        if (soundManager.sounds.walking.paused) {
            soundManager.play('walking');
        }
    }

    /**
     * Stops the walking sound and resets its playback position.
     */
    stopWalkingSound() {
        soundManager.pause('walking');
        soundManager.sounds.walking.currentTime = 0;
    }

    /**
     * Initiates the jump action and plays the jump sound.
     */
    jump() {
        this.speedY = 30;
        soundManager.play('jump'); 
    }

    /**
     * Plays the idle animation and snoring sound if the character has been idle for too long.
     */
    playIdleAnimation() {
        if (!this.idleSoundPlayed && !this.isDead()) {
            soundManager.play('snoring'); 
            this.idleSoundPlayed = true;
        }
    
        this.idleFrameCounter++;
        if (this.idleFrameCounter % 10 === 0) {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Plays the stay animation when the character is not moving and not jumping.
     */
    playStayAnimation() {
        this.stayFrameCounter++;
        if (this.stayFrameCounter % 10 === 0) { // Slow down the stay animation similarly
            this.playAnimation(this.STAY_IMAGES);
        }
    }

    /**
     * Stops all sounds associated with the character.
     */
    stopAllSounds() {
        soundManager.stopAll(); 
    }

     /**
     * Updates the last action time to the current time and resets idle sound flags.
     */
    updateLastActionTime() {
        this.lastActionTime = new Date().getTime();
        this.idleSoundPlayed = false; 
        this.snoring_sound.pause(); 
        this.snoring_sound.currentTime = 0; 
    }
}

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
    isJumpingUp = false;  
    isAtPeak = false;     
    isFalling = false;    
    hasJumped = false;    
    offset = {
        left: 10,
        top: 110,
        right: 20,
        bottom: 8,
    };

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
    idleTimeout = 7000; 
    lastActionTime = 0;
    idleSoundPlayed = false;
    idleFrameCounter = 0;  
    stayFrameCounter = 0;  
    deathAnimationPlayed = false; 
    gameOverImage = 'img/9_intro_outro_screens/game_over/you lost.png'; 
    gameOverSound = 'gameOver';

    /**
     * Creates an instance of the Character class.
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
     * Starts the animation and movement handling of the character.
     */
    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.walking_sound.play();
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.jump_sound.play();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.handleJumpAnimation();  
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }

    /**
     * Handles the jumping animation when the character is above the ground.
     */
    handleJumpAnimation() {
        if (this.speedY >= 0 && this.currentImage > 3) {
            this.currentImage = 3;  
        } else if (this.speedY < 0 && this.speedY > -20) {
            this.currentImage = 4;  
        } else if (this.speedY < 0) {
            this.currentImage = this.IMAGES_JUMPING.length;  
        }
        this.playAnimation(this.IMAGES_JUMPING);
    }

    /**
     * Handles movement and sound effects for the character.
     */
    handleMovementAndSounds() {
        this.handleMovement();
        this.handleJumping();
        this.handleIdleAndStay();
        this.updateCameraPosition();
    }

    /**
     * Moves the character left or right depending on keyboard input and plays the walking sound.
     */
    handleMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.playWalkingSound();
        } else if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            this.playWalkingSound();
        } else {
            this.stopWalkingSound();
        }
    }

    /**
     * Handles the jumping action based on keyboard input.
     */
    handleJumping() {
        if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.hasJumped) {
            this.playUpwardJumpingAnimation();  
            this.jump();
            this.hasJumped = true;
        }
    }

     /**
     * Handles idle and stay animations when the character is not moving.
     */
     handleIdleAndStay() {
        const currentTime = new Date().getTime();
        const timeSinceLastAction = currentTime - this.lastActionTime;
        if (this.world.keyboard.D && this.idleSoundPlayed) {
            this.updateLastActionTime();  
            soundManager.stop('snoring');  
        }
        if (timeSinceLastAction > this.idleTimeout && !this.isMoving() && !this.isDead()) {
            this.playIdleAnimation();
        } else if (!this.isMoving() && timeSinceLastAction <= this.idleTimeout) {
            this.playStayAnimation();
        }
        if (this.isMoving()) {
            this.updateLastActionTime();
        }
    }

    /**
     * Updates the camera position to follow the character.
     */
    updateCameraPosition() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Checks if the character is currently moving.
     * @returns {boolean} - Returns true if the character is moving, false otherwise.
     */
    isMoving() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE;
    }

    /**
     * Plays the walking sound effect.
     */
    playWalkingSound() {
        if (soundManager.sounds.walking.paused) {
            soundManager.play('walking');
        }
    }

    /**
     * Stops the walking sound effect.
     */
    stopWalkingSound() {
        soundManager.pause('walking');
        soundManager.sounds.walking.currentTime = 0;
    }

    /**
     * Makes the character jump and plays the jump sound effect.
     */
    jump() {
        this.speedY = 30;
        soundManager.play('jump');
    }

    /**
     * Plays the idle animation if the character has been idle for long enough.
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
     * Plays the stay animation when the character is not moving but hasn't been idle for long enough.
     */
    playStayAnimation() {
        this.stayFrameCounter++;
        if (this.stayFrameCounter % 10 === 0) {
            this.playAnimation(this.STAY_IMAGES);
        }
    }

    /**
     * Plays the death animation for the character if it hasn't been played yet.
     * Once the animation starts, it marks the death animation as played, stops all sounds, 
     * and triggers the game over screen after a delay.
     * 
     * @method playDeathAnimation
     * @memberof Character
     */
    playDeathAnimation() {
        if (!this.deathAnimationPlayed) {
            this.playAnimation(this.IMAGES_DEAD);
            this.deathAnimationPlayed = true;
            this.stopAllSounds();  
            setTimeout(() => {
                this.world.gameOver();  
            }, 500);
        }
    }

    /**
     * Stops all sounds currently playing in the game.
     */
    stopAllSounds() {
        soundManager.stopAll();
    }

    /**
     * Updates the time of the last action performed by the character.
     */
    updateLastActionTime() {
        this.lastActionTime = new Date().getTime();
        this.idleSoundPlayed = false;
        soundManager.pause('snoring');
        soundManager.sounds.snoring.currentTime = 0;
    }

    /**
     * Checks if the character is dead based on the status bar's health percentage.
     * @returns {boolean} - Returns true if the character is dead, false otherwise.
     */
    isDead() {
        return this.world.statusBar.percentage <= 0;  
    }

    /**
     * Updated animations based on the character's current state.
     */
    updateAnimations() {
        if (this.isDead()) {
            this.handleDeathAnimation();
        } else if (this.isHurt()) {
            this.handleHurtAnimation();
        } else if (this.isAboveGround()) {
            this.handleJumpingAnimation();
        } else {
            this.resetJumpingFlags();
            this.handleWalkingOrIdleAnimation();
        }
    }

    /**
     * Handles the death animation when the character is dead.
     */
    handleDeathAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
    }

    /**
     * Handles the hurt animation when the character is hurt.
     */
    handleHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
    }

    /**
     * Resets the flags related to jumping.
     */
    resetJumpingFlags() {
        this.hasJumped = false;
        this.isJumpingUp = false;
        this.isAtPeak = false;
        this.isFalling = false;
    }

    /**
     * Handles walking or idle animation depending on keyboard input.
     */
    handleWalkingOrIdleAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
    * Plays the animation for jumping up (images 31-34 once).
     */
    playUpwardJumpingAnimation() {
        if (!this.isJumpingUp) {
            this.isJumpingUp = true;  
            this.isAtPeak = false;    
            this.isFalling = false;  
            this.playAnimation(this.IMAGES_JUMPING.slice(0, 4));  
        }
    }

    /**
    * Plays the animation for the highest point (image 35).
    */
    playPeakJumpingAnimation() {
        if (!this.isAtPeak) {
            this.isAtPeak = true;  
            this.isJumpingUp = false;  
            this.isFalling = false;  
            this.playAnimation([this.IMAGES_JUMPING[4]]); 
        }
    }

    /**
    * Plays the animation for falling (images 36-39 once).
    */
    playFallingJumpingAnimation() {
        if (!this.isFalling) {
            this.isFalling = true;  
            this.isJumpingUp = false;  
            this.isAtPeak = false;   
            this.playAnimation(this.IMAGES_JUMPING.slice(5));  
        }
    }
}

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
    speedIncrease = 5;

    currentState = 'walking'; 

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

    hitSound = new Audio('audio/chicken.mp3');
    deathSound = new Audio('audio/deathsound.mp3');

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = this.initialX;
        this.animate();
    }

    hit() {
        this.energy -= 20;
        this.hitSound.play(); 
        if (this.energy <= 0 && !this.isDead) {
            this.die();
        } else {
            this.currentState = 'hurt'; 
            this.playHurtAnimation(); 
        }
    }

    playHurtAnimation() {
        let animationIndex = 0;
        const hurtAnimationInterval = setInterval(() => {
            if (animationIndex < this.IMAGES_HURT.length) {
                this.img = this.imageCache[this.IMAGES_HURT[animationIndex]];
                animationIndex++;
            } else {
                clearInterval(hurtAnimationInterval);
                this.currentState = 'attack'; 
                this.playAttackAnimation();
            }
        }, 100);
    }

    playAttackAnimation() {
        let animationIndex = 0;
        const attackAnimationInterval = setInterval(() => {
            if (animationIndex < this.IMAGES_ATTACK.length) {
                this.img = this.imageCache[this.IMAGES_ATTACK[animationIndex]];
                animationIndex++;
            } else {
                clearInterval(attackAnimationInterval);
                this.currentState = 'walking';
            }
        }, 100);
    }

    die() {
        if (!this.isDead) {  
            this.isDead = true;
            this.deathSound.play(); 
            this.playDeathAnimation();
        }
    }
    
    

    playDeathAnimation() {
        let animationIndex = 0;
        const deathAnimationInterval = setInterval(() => {
            if (animationIndex < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[animationIndex]];
                animationIndex++;
            } else {
                clearInterval(deathAnimationInterval); 
                this.moving = false; 
            }
        }, 200);
    }
    
    

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

    followCharacter() {
        const characterX = this.world.character.x;

        if (characterX < this.x) {
            this.moveLeft();
        } else if (characterX > this.x) {
            this.moveRight();
        }
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

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
    
    

    moveLeftAtEndOfMap() {
        if (this.x > this.initialX - this.moveDistance) {
            this.moveLeft();
        }
    }
}

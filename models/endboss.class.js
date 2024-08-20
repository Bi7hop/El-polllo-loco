class Endboss extends MovableObject {
    height = 450;
    width = 300;
    y = -2;
    energy = 100;
    isDead = false;

    hitboxes = [
        { xOffset: 100, yOffset: 0, width: 100, height: 100 }, 
        { xOffset: 50, yOffset: 100, width: 200, height: 350 } 
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.animate();
    }

    hit() {
        this.energy -= 20; 
        if (this.energy <= 0 && !this.isDead) {
            this.die(); 
        }
    }

    die() {
        this.isDead = true;
        this.playDeathAnimation();
    }

    playDeathAnimation() {
        let animationIndex = 0;
        const deathAnimationInterval = setInterval(() => {
            if (animationIndex < this.IMAGES_DEAD.length) {
                this.img = this.imageCache[this.IMAGES_DEAD[animationIndex]];
                animationIndex++;
            } else {
                clearInterval(deathAnimationInterval);
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

    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }
}

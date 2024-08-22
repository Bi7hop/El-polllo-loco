class SplashAnimation extends MovableObject {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.height = 100;
        this.width = 100;
        this.imagesSplash = [
            'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
            'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
            'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
            'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
            'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
            'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
        ];
        this.currentImageIndex = 0;
        this.loadImage(this.imagesSplash[this.currentImageIndex]);
        this.lastAnimationTime = Date.now();
        this.isFinished = false; 
    }

    animate() {
        let now = Date.now();
        if (now - this.lastAnimationTime > 50) { 
            this.currentImageIndex++;
            if (this.currentImageIndex >= this.imagesSplash.length) {
                this.isFinished = true; 
            } else {
                this.loadImage(this.imagesSplash[this.currentImageIndex]);
                this.lastAnimationTime = now;
            }
        }
    }
}

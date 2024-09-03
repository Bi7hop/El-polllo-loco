/**
 * Class representing a splash animation in the game.
 * Extends the MovableObject class and provides functionality for animating a splash effect.
 */
class SplashAnimation extends MovableObject {

    /** 
     * Creates a new SplashAnimation instance.
     * @param {number} x - The x-coordinate where the splash animation starts.
     * @param {number} y - The y-coordinate where the splash animation starts.
     */
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

    /**
     * Animates the splash effect by cycling through the images in the animation sequence.
     * Marks the animation as finished when the last frame is reached.
     */
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

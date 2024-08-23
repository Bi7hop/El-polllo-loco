class Bottle extends Collectable {
    width = 80;
    height = 80;

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    collected = false;

    constructor() {
        super([]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = Math.random() * 2000; 
        this.y = 370;

        this.currentImage = 0;
        this.img = this.imageCache[this.IMAGES_BOTTLE[this.currentImage]]; 
        this.lastAnimationTime = Date.now(); 
    }

    animate() {
        if (!this.collected) { // Nur animieren, wenn die Flasche nicht eingesammelt wurde
            let now = Date.now();
            if (now - this.lastAnimationTime > 500) { 
                this.currentImage = (this.currentImage + 1) % this.IMAGES_BOTTLE.length;
                this.img = this.imageCache[this.IMAGES_BOTTLE[this.currentImage]];
                this.lastAnimationTime = now;
            }
        }
    }

    collect() {
        this.collected = true;
        this.x = -100; // Verstecke die Flasche außerhalb des sichtbaren Bereichs
        this.y = -100;
    }
}

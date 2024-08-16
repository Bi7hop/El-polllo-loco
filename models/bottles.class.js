class Bottle extends Collectable {

    width = 80;
    height = 80;

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ];

    constructor() {
        super([]); 
        this.loadImages(this.IMAGES_BOTTLE); 
        this.playAnimation(this.IMAGES_BOTTLE); 
        this.x = Math.random() * 2000;
        this.y = Math.random() * 400;
    }
}

class Bottle extends Collectable {

    width = 80;
    height = 80;

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super([]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.playAnimation(this.IMAGES_BOTTLE);
        this.x = Math.random() * 2000;
        this.y = 370;
    }
}

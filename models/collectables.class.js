class Collectable extends MovableObject {
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.currentImage = 0;
        this.playAnimation(this.IMAGES_COIN); 
    }
}
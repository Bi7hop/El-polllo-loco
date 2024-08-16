class Coins extends Collectable {

    width = 80;
    height = 80;


    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super([]);
        this.loadImages(this.IMAGES_COIN); 
        this.playAnimation(this.IMAGES_COIN);
        this.x = Math.random() * 2000;
        this.y = Math.random() * 400;
    }
}
 
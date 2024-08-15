class Coins extends Collectable {
    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN); // Laden der Coin-Bilder
        this.x = Math.random() * 2000; // Zufällige X-Position auf der Leinwand
        this.y = Math.random() * 400; // Zufällige Y-Position auf der Leinwand
    }
}
class Coins extends Collectable {
    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN); 
        this.x = Math.random() * 2000; 
        this.y = Math.random() * 400; 
    }
}
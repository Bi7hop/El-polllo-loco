class Collectable extends MovableObject {
    currentImage = 0;

    constructor(imageArray) {
        super();
        this.loadImages(imageArray);
        this.playAnimation(imageArray); 
    }
}

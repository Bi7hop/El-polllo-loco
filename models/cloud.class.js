/**
 * Class representing a cloud in the game.
 * Extends the MovableObject class and provides movement functionality.
 */
class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 450;
    

    /**
     * Creates a new Cloud instance, initializes its position, and starts its movement animation.
     */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500; 
        this.animate();
    }

    /**
     * Starts the cloud's movement animation, moving it to the left.
     */
    animate() {
        this.moveLeft();
    }

   

}
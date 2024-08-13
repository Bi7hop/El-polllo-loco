class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 450;
    


    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500; 
        this.animate();
    }

    animate() {
        this.moveLeft();
    }

   

}
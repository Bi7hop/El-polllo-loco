class Cloud extends MovableObject {
    velocity = { xMax: 0.15 };  
    acceleration = { x: 1 };   
    /**
     * Creates a new Cloud instance with randomized width, height, and position.
     * @param {number} width - The base width of the cloud.
     * @param {number} height - The base height of the cloud.
     * @param {number} x - The initial X position of the cloud.
     */
    constructor(width, height, x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        
        this.width = width * (Math.random() + 1);  
        this.height = height * (Math.random() + 1); 
        this.x = x;  
        
        this.y = Math.ceil(Math.random() * 3) * 25; 

        this.velocity.xMax = 0.15;  
        this.acceleration.x = 1;    

        this.animate();
    }

    /**
     * Starts the cloud's movement animation, moving it to the left.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 25); 
    }
}

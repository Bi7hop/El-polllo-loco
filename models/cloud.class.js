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
        
        this.setRandomDimensions(width, height);
        this.setInitialPosition(x);
        this.setInitialMovementProperties();

        this.animate();
    }

    /**
     * Sets random dimensions for the cloud based on the provided base width and height.
     * @param {number} baseWidth - The base width of the cloud.
     * @param {number} baseHeight - The base height of the cloud.
     */
    setRandomDimensions(baseWidth, baseHeight) {
        this.width = baseWidth * (Math.random() + 1);  
        this.height = baseHeight * (Math.random() + 1); 
    }

    /**
     * Sets the initial X and Y position for the cloud.
     * @param {number} initialX - The initial X position of the cloud.
     */
    setInitialPosition(initialX) {
        this.x = initialX;  
        this.y = Math.ceil(Math.random() * 3) * 25;  
    }

    /**
     * Sets the initial movement properties for the cloud.
     */
    setInitialMovementProperties() {
        this.velocity.xMax = 0.15;  
        this.acceleration.x = 1;    
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

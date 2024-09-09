/**
 * Creates and returns a Level 1 instance with predefined enemies, clouds, and background objects.
 * The level consists of several chickens, small chickens, an endboss, and multiple layers of background
 * images that create a parallax effect.
 * 
 * @returns {Level} A new Level object representing Level 1.
 */
function createLevel1() {
    return new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Endboss(), 
        ],
    
        [
            new Cloud(400, 250, 0),       
            new Cloud(400, 250, 800),     
            new Cloud(400, 250, 1600),   
            new Cloud(400, 250, 2400),    
            new Cloud(400, 250, 3200),    
        ],
    
        [
            new BackgroundObject('img/5_background/layers/air.png', -719*2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -719*2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719*2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719*2),
        
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
        
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
        
            new BackgroundObject('img/5_background/layers/air.png', 719*2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
        
            new BackgroundObject('img/5_background/layers/air.png', 719*3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),
        
            new BackgroundObject('img/5_background/layers/air.png', 719*4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*4),
        
            new BackgroundObject('img/5_background/layers/air.png', 719*5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*5)
        ]
    );
}

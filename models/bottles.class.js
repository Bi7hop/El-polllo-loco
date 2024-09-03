/**
 * Class representing a bottle collectable object in the game.
 * Extends the Collectable class and provides animation and collection functionality.
 */
class Bottle extends Collectable {
    width = 80;
    height = 80;

    /** @type {string[]} The array of image paths for the bottle's animation. */
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /** @type {boolean} Indicates whether the bottle has been collected. */
    collected = false;

    /**
     * Creates a new Bottle instance.
     */
    constructor() {
        super([]);
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = Math.random() * 2000; 
        this.y = 370;

        this.currentImage = 0;
        this.img = this.imageCache[this.IMAGES_BOTTLE[this.currentImage]]; 
        this.lastAnimationTime = Date.now(); 
    }

    /**
     * Animates the bottle by cycling through the images if it has not been collected.
     */
    animate() {
        if (!this.collected) { 
            let now = Date.now();
            if (now - this.lastAnimationTime > 500) { 
                this.currentImage = (this.currentImage + 1) % this.IMAGES_BOTTLE.length;
                this.img = this.imageCache[this.IMAGES_BOTTLE[this.currentImage]];
                this.lastAnimationTime = now;
            }
        }
    }

    /**
     * Marks the bottle as collected, moving it off-screen.
     */
    collect() {
        this.collected = true;
        this.x = -100; 
        this.y = -100;
    }

    /**
     * Generates a specified number of bottles, ensuring they are placed at valid positions.
     * @param {number} count - The number of bottles to generate.
     * @param {object} world - The game world object.
     * @returns {Bottle[]} An array of generated Bottle objects.
     */
    static generateBottles(count, world) {
        const bottles = [];
        for (let i = 0; i < count; i++) {
            let bottle;
            let validPosition = false;

            while (!validPosition) {
                bottle = new Bottle();
                validPosition = Bottle.isValidPosition(bottle, bottles, world);
            }

            bottles.push(bottle);
        }
        return bottles;
    }

    /**
     * Checks if the new bottle's position is valid by ensuring it is not too close to existing bottles.
     * @param {Bottle} newBottle - The new bottle to check.
     * @param {Bottle[]} existingBottles - The existing bottles.
     * @param {object} world - The game world object.
     * @returns {boolean} True if the position is valid, false otherwise.
     */
    static isValidPosition(newBottle, existingBottles, world) {
        for (let bottle of existingBottles) {
            const distance = Math.abs(newBottle.x - bottle.x);
            if (distance < 100) {
                return false;
            }
        }
        return true;
    }

    /**
     * Attempts to respawn a collected bottle at a new position with a random delay.
     * @param {Bottle} bottle - The bottle to respawn.
     */
    static respawnBottle(bottle) {
        const respawnChance = Math.random(); 

        if (respawnChance < 0.5) { 
            setTimeout(() => {
                bottle.x = Math.random() * 2000; 
                bottle.y = 370; 
                bottle.collected = false; 
            }, Math.random() * 5000 + 5000); 
        }
    }
}

/**
 * Class representing the status display for collected bottles in the game.
 * Manages the rendering of the collected bottles on the game's status bar.
 */
class StatusBottle {

    /**
     * Creates a new StatusBottle instance.
     * @param {Object} world - The game world object containing the current game state.
     */
    constructor(world) {
        this.world = world;
        this.bottleImage = new Image();
        this.bottleImage.src = 'img/6_salsa_bottle/salsa_bottle.png'; 
    }

    /**
     * Draws the collected bottles on the game's status bar.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context where the bottles are drawn.
     * @param {number} collectedBottles - The number of bottles that have been collected.
     */
    drawCollectedBottles(ctx, collectedBottles) {
        const startX = 38; 
        const startY = 80;
        const spacing = 20; 

        for (let i = 0; i < collectedBottles; i++) {
            ctx.drawImage(this.bottleImage, startX + i * spacing, startY, 30, 50);
        }
    }
}

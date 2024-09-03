/**
 * Class representing the status display for collected coins in the game.
 * Manages the rendering of the collected coins on the game's status bar.
 */
class StatusCoin {

    /**
     * Creates a new StatusCoin instance.
     * @param {Object} world - The game world object containing the current game state.
     */
    constructor(world) {
        this.world = world;
        this.coinImage = new Image();
        this.coinImage.src = 'img/8_coin/coin_1.png'; 
    }

    /**
     * Draws the collected coins on the game's status bar.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context where the coins are drawn.
     * @param {number} collectedCoins - The number of coins that have been collected.
     */
    drawCollectedCoins(ctx, collectedCoins) {
        const startX = 25; 
        const startY = 35; 
        const spacing = 20; 

        for (let i = 0; i < collectedCoins; i++) {
            ctx.drawImage(this.coinImage, startX + i * spacing, startY, 60, 60);
        }
    }
}

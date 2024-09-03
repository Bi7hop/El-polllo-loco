/**
 * Class representing a coin collectable object in the game.
 * Extends the Collectable class and provides animation functionality.
 */
class Coins extends Collectable {

    width = 130;
    height = 130;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * Creates a new Coins instance, initializes its position, and starts its animation.
     */
    constructor() {
        super([]);
        this.loadImages(this.IMAGES_COIN); 
        this.playAnimation(this.IMAGES_COIN);
        this.x = Math.random() * 2000;
        this.y = Math.random() * 200;
    }

    /**
     * Generates a specified number of coins at valid positions within the game world.
     * @param {number} count - The number of coins to generate.
     * @param {object} world - The game world object.
     * @returns {Coins[]} An array of generated Coins objects.
     */
    static generateCoins(count, world) {
        const coins = [];
        for (let i = 0; i < count; i++) {
            let coin;
            let validPosition = false;

            while (!validPosition) {
                coin = new Coins();
                validPosition = Coins.isValidPosition(coin, coins, world);
            }

            coins.push(coin);
        }
        return coins;
    }

    /**
     * Checks if the new coin's position is valid by ensuring it is not too close to existing coins.
     * @param {Coins} newCoin - The new coin to check.
     * @param {Coins[]} existingCoins - The existing coins.
     * @param {object} world - The game world object.
     * @returns {boolean} True if the position is valid, false otherwise.
     */
    static isValidPosition(newCoin, existingCoins, world) {
        for (let coin of existingCoins) {
            const distance = Math.abs(newCoin.x - coin.x);
            if (distance < 100) {
                return false;
            }
        }
        return true;
    }
}

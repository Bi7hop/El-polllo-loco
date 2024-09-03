class Coins extends Collectable {

    width = 130;
    height = 130;

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super([]);
        this.loadImages(this.IMAGES_COIN); 
        this.playAnimation(this.IMAGES_COIN);
        this.x = Math.random() * 2000;
        this.y = Math.random() * 200;
    }

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

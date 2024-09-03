class StatusCoin {
    constructor(world) {
        this.world = world;
        this.coinImage = new Image();
        this.coinImage.src = 'img/8_coin/coin_1.png'; 
    }

    drawCollectedCoins(ctx, collectedCoins) {
        const startX = 25; 
        const startY = 35; 
        const spacing = 20; 

        for (let i = 0; i < collectedCoins; i++) {
            ctx.drawImage(this.coinImage, startX + i * spacing, startY, 60, 60);
        }
    }
}

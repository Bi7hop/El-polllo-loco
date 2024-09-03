class StatusBottle {
    constructor(world) {
        this.world = world;
        this.bottleImage = new Image();
        this.bottleImage.src = 'img/6_salsa_bottle/salsa_bottle.png'; 
    }

    drawCollectedBottles(ctx, collectedBottles) {
        const startX = 38; 
        const startY = 80;
        const spacing = 20; 

        for (let i = 0; i < collectedBottles; i++) {
            ctx.drawImage(this.bottleImage, startX + i * spacing, startY, 30, 50);
        }
    }
}

class EndbossStatusBar extends StatusBar {
    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];

    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.loadImages(this.IMAGES);
    }

    setWorld(world) {
        this.world = world;
        this.canvasWidth = world.canvas.width;
        this.x = this.canvasWidth - 230;
    }

    draw(ctx) {
        if (this.img && this.img.complete) {  
            super.draw(ctx);
        }
    }
}

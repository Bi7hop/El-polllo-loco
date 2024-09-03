/**
 * Class representing a status bar in the game, typically used to display the health or progress of the character.
 * Extends the DrawableObject class to manage the visual representation of the status bar.
 */
class StatusBar extends DrawableObject {
    

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
    ];

    percentage = 100;

    /**
     * Creates a new StatusBar instance.
     * Initializes the status bar with a full percentage and sets its position and size.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of the status bar and updates the displayed image accordingly.
     * @param {number} percentage - The new percentage value to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];

    }
        
    /**
     * Resolves the correct image index based on the current percentage.
     * @returns {number} The index of the image to display.
     */
        resolveImageIndex() {
            if(this.percentage == 100) {
                return 5;
            } else if (this.percentage > 80) {
                return 4;
            } else if (this.percentage > 60) {
                return 3;
            } else if (this.percentage > 40) {
                return 2;
            } else if (this.percentage > 20) {
                return 1;
            } else {
                return 0;
            } 
        }
}



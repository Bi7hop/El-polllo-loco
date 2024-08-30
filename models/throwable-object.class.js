class ThrowableObject extends MovableObject {
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.imagesRotation = [
            'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
            'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
            'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
            'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
        ];
        this.currentImageIndex = 0;
        this.loadImage(this.imagesRotation[this.currentImageIndex]);
        this.animateRotation();

        this.throwSound = 'bottleThrow';
    }

    throw(direction) {
        soundManager.play(this.throwSound);
        
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += direction;
        }, 25);
    }

    animateRotation() {
        setInterval(() => {
            this.currentImageIndex++;
            if (this.currentImageIndex >= this.imagesRotation.length) {
                this.currentImageIndex = 0;
            }
            this.loadImage(this.imagesRotation[this.currentImageIndex]);
        }, 100);
    }
}

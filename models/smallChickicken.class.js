class SmallChicken extends MovableObject {
    y = 370;
    height = 50;
    width = 50;
    canJump = Math.random() < 0.5; // Nur 50% der Hühner können springen
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    acceleration = 5;  // Erhöhen Sie die Schwerkraft speziell für die kleinen Hühner

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = 300 + Math.random() * 400;
        this.speed = 0.2 + Math.random() * 0.3;

        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);

        if (this.canJump) {
            setInterval(() => {
                if (Math.random() < 0.05 && !this.isAboveGround()) {
                    this.jump();
                }
            }, 1000 / 60);
        }
    }

    jump() {
        this.speedY = 20;  // Kleinere Sprunghöhe speziell für die kleinen Hühner
    }

    isAboveGround() {
        return this.y < 370;  // Überschreiben, um sicherzustellen, dass die kleinen Hühner wieder landen
    }
}

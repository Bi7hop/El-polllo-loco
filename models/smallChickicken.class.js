class SmallChicken extends MovableObject {
    static SPAWNED_POSITIONS = [];
    y = 370;
    height = 50;
    width = 50;
    canJump = Math.random() < 0.5; 
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';
    acceleration = 5;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        const minDistance = 80;
        const maxDistance = 250;
        let validPosition = false;

        while (!validPosition) {
            this.x = 900 + Math.random() * 400;
            validPosition = true;

            for (let pos of SmallChicken.SPAWNED_POSITIONS) {
                let randomDistance = minDistance + Math.random() * (maxDistance - minDistance);
                if (Math.abs(this.x - pos) < randomDistance) {
                    validPosition = false;
                    break;
                }
            }
        }

        SmallChicken.SPAWNED_POSITIONS.push(this.x);
        this.speed = 0.2 + Math.random() * 0.3;
        this.deathSound = new Audio('audio/chicken.mp3');
        this.applyGravity();
        this.animate();
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (this.y > 370) {
                this.y = 370;
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    die() {
        this.energy = 0;
        this.speed = 0;
        this.loadImage(this.IMAGE_DEAD);
        this.deathSound.play();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);

        if (this.canJump) {
            setInterval(() => {
                if (!this.isDead() && Math.random() < 0.05 && !this.isAboveGround()) {
                    this.jump();
                }
            }, 1000 / 60);
        }
    }

    jump() {
        if (!this.isDead()) {  
            this.speedY = 20;  
        }
    }

    isAboveGround() {
        return this.y < 370; 
    }
}

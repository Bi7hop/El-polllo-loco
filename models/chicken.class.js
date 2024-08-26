class Chicken extends MovableObject {
    static SPAWNED_POSITIONS = [];
    y = 355;
    height = 70;
    width = 75;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';
    removeAfterDeath = false;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        const minDistance = 100;
        const maxDistance = 300;
        let validPosition = false;

        while (!validPosition) {
            this.x = 1000 + Math.random() * 500;
            validPosition = true;

            for (let pos of Chicken.SPAWNED_POSITIONS) {
                let randomDistance = minDistance + Math.random() * (maxDistance - minDistance);
                if (Math.abs(this.x - pos) < randomDistance) {
                    validPosition = false;
                    break;
                }
            }
        }

        Chicken.SPAWNED_POSITIONS.push(this.x);
        this.speed = 0.175 + Math.random() * 0.25;
        this.deathSound = new Audio('audio/chicken.mp3');
        this.animate();
    }

    isHitBy(throwableObject) {
        return throwableObject instanceof ThrowableObject && this.isColliding(throwableObject);
    }

    die() {
        this.energy = 0;
        this.speed = 0;
        this.loadImage(this.IMAGE_DEAD);
        this.deathSound.play();
        this.scheduleRemoval();  
    }

    isDead() {
        return this.energy === 0;
    }

    isRemovable() {
        return this.removeAfterDeath;
    }

    scheduleRemoval() {
        setTimeout(() => {
            this.removeAfterDeath = true;
        }, 3000);  
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
    }
}

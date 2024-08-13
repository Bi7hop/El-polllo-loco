class Chicken extends MovableObject {
    y = 355;
    height = 70;
    width = 75;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
   
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 500;
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    animate(){
        setInterval( () => {
        let i = this.currentImage % this.IMAGES_WALKING.length;
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }, 150);
    }

}

// class Chicken extends MovableObject {
//     y = 355;
//     height = 70;
//     width = 75;
//     images = [
//         'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
//         'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
//         'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
//     ];
//     currentImage = 0;
//     imageChangeCounter = 0;
//     imageChangeInterval = 10; 

//     constructor() {
//         super().loadImage(this.images[this.currentImage]);

//         this.x = 200 + Math.random() * 500;
//         this.animate();
//     }

//     animate() {
//         setInterval(() => {
//             this.x -= 0.175;

//             this.imageChangeCounter++;
//             if (this.imageChangeCounter % this.imageChangeInterval === 0) {
//                 this.currentImage = (this.currentImage + 1) % this.images.length;
//                 this.loadImage(this.images[this.currentImage]);
//             }
//         }, 1000 / 60);
//     }
// }

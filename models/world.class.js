class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusCoins = new StatusCoins();
    statusBottle = new StatusBottle();
    throwableObjects = [];
    coins = [];
    bottles = []; 
    coinCount = 7;
    bottleCount = 5; 
    gameIsOver = false; 

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.generateCoins(this.coinCount);
        this.generateBottles(this.bottleCount); 
        this.draw();
        this.run();
    }

    reset() {
        this.character = new Character();
        this.level = level1;
        this.camera_x = 0;
        this.statusBar = new StatusBar();
        this.statusCoins = new StatusCoins();
        this.statusBottle = new StatusBottle();
        this.throwableObjects = [];
        this.coins = [];
        this.bottles = [];
        this.generateCoins(this.coinCount);
        this.generateBottles(this.bottleCount);
        this.setWorld();
        this.draw();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    generateCoins(count) {
        for (let i = 0; i < count; i++) {
            let coin;
            let validPosition = false;
            
            while (!validPosition) {
                coin = new Coins();
                validPosition = this.isValidPosition(coin, this.coins);
            }

            this.coins.push(coin);
        }
    }

    generateBottles(count) {
        for (let i = 0; i < count; i++) {
            let bottle;
            let validPosition = false;
            
            while (!validPosition) {
                bottle = new Bottle();
                validPosition = this.isValidPosition(bottle, this.bottles);
            }

            this.bottles.push(bottle);
        }
    }

    isValidPosition(newItem, existingItems) {
        for (let item of existingItems) {
            const distance = Math.abs(newItem.x - item.x); 
            if (distance < 100) { 
                return false;
            }
        }
        return true;
    }

    run() {
        this.gameLoop = setInterval(() => {
            if (!this.gameIsOver) {
                this.checkCollisions();
                this.checkThrowObjects();
            }
        }, 50);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottlesCollected > 0) {
            let bottleX = this.character.x + 100;
            let bottleY = this.character.y + 100;
            let throwDirection = 10; 
    
            if (this.character.otherDirection) { 
                bottleX = this.character.x - 50; 
                throwDirection = -10; 
            }
    
            let bottle = new ThrowableObject(bottleX, bottleY);
            bottle.throw(throwDirection);
            this.throwableObjects.push(bottle);
            this.character.bottlesCollected--;
    
            let collectedPercentage = (this.character.bottlesCollected / this.bottleCount) * 100;
            this.statusBottle.setPercentage(collectedPercentage);
            
            this.keyboard.D = false; 
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.hitFromAbove(enemy) && !enemy.isDead()) {
                enemy.die();
                this.character.speedY = Math.max(this.character.speedY, 20); 
            } else if (this.character.isColliding(enemy) && !enemy.isDead()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });

        this.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.coins.splice(index, 1);
                let collectedPercentage = ((this.coinCount - this.coins.length) / this.coinCount) * 100;
                this.statusCoins.setPercentage(collectedPercentage); 
            }
        });

        this.bottles.forEach((bottle, index) => { 
            if (this.character.isColliding(bottle)) {
                this.bottles.splice(index, 1);
                this.character.bottlesCollected++; 
    
               
                let collectedPercentage = (this.character.bottlesCollected / this.bottleCount) * 100;
                this.statusBottle.setPercentage(collectedPercentage); 
            }
        });
    }

    draw() {
        if (!this.gameIsOver) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.translate(this.camera_x, 0);
            this.addObjectsToMap(this.level.backgroundObjects);

            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.statusBar);
            this.addToMap(this.statusCoins);
            this.addToMap(this.statusBottle);
            this.ctx.translate(this.camera_x, 0);

            this.addToMap(this.character);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.level.clouds);
            this.addObjectsToMap(this.throwableObjects);
            this.addObjectsToMap(this.coins);

            this.bottles.forEach(bottle => {
                bottle.animate(); 
                this.addToMap(bottle);  
            });

            this.ctx.translate(-this.camera_x, 0);

            let self = this;
            requestAnimationFrame(function () {
                self.draw();
            });
        }
    }

    gameOver() {
        this.gameIsOver = true; 
        clearInterval(this.gameLoop); 
    
        this.character.gameOverSound.play();
    
        const img = new Image();
        img.src = this.character.gameOverImage;
        img.onload = () => {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'; 
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
            const desiredWidth = 720;
            const desiredHeight = 480;
    
            const xPosition = (this.canvas.width - desiredWidth) / 2;
            const yPosition = (this.canvas.height - desiredHeight) / 2;
    
            this.ctx.drawImage(img, xPosition, yPosition, desiredWidth, desiredHeight);
        };
    }
    
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}

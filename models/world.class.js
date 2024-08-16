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
            const distance = Math.hypot(newItem.x - item.x, newItem.y - item.y);
            if (distance < 80)  { 
                return false;
            }
        }
        return true;
    }

     run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottlesCollected > 0) { 
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.bottlesCollected--; 
    
           
            let collectedPercentage = (this.character.bottlesCollected / this.bottleCount) * 100;
            this.statusBottle.setPercentage(collectedPercentage); 
        }
    }
    

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        // -------- Platz für feste Objekte -----------------
        this.addToMap(this.statusBar);
        this.addToMap(this.statusCoins);
        this.addToMap(this.statusBottle);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles); 

        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
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

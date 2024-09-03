class World {
    character = new Character();
    level = createLevel1();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    endbossStatusBar = new EndbossStatusBar();
    throwableObjects = [];
    splashAnimations = []; 
    coins = [];
    bottles = [];
    coinCount = 7;
    bottleCount = 5;
    gameIsOver = false;

    statusBottle; 
    statusCoin; 
    collectedBottles = 0; 
    collectedCoins = 0;
    endbossEncountered = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.coins = Coins.generateCoins(this.coinCount, this); 
        this.bottles = Bottle.generateBottles(this.bottleCount, this); 
        this.endbossStatusBar.setWorld(this);
        this.statusBottle = new StatusBottle(this); 
        this.statusCoin = new StatusCoin(this); 
        this.draw();
        this.run();

        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this; 
            }
        });

        soundManager.play('backgroundMusic');
    }

    reset() {
        this.character = new Character();
        this.level = createLevel1();  
        this.camera_x = 0;
        this.statusBar = new StatusBar();
        this.endbossStatusBar = new EndbossStatusBar();
        this.throwableObjects = [];
        this.splashAnimations = []; 
        this.coins = [];
        this.bottles = [];
        this.collectedBottles = 0; 
        this.collectedCoins = 0;

        this.coins = Coins.generateCoins(this.coinCount, this); 
        this.bottles = Bottle.generateBottles(this.bottleCount, this); 
        this.setWorld();
        this.endbossStatusBar.setWorld(this);
        this.draw();
        this.run();
    }

    setWorld() {
        this.character.world = this;
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
                this.removeDeadEnemies();  
            }
        }, 50);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) { 
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
            this.collectedBottles--; 

            this.keyboard.D = false; 
        }
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (typeof enemy.isDead === 'function' && enemy.isDead()) {
                return; 
            }
    
            let hitObjectIndex = null;
            this.throwableObjects.forEach((obj, index) => {
                if (enemy.isHitBy(obj)) {
                    hitObjectIndex = index;
                    enemy.hit();
    
                    if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
                        enemy.die(); 
                    } else if (enemy instanceof Endboss) {
                        this.endbossStatusBar.setPercentage(enemy.energy);
                    }
    
                    let splash = new SplashAnimation(obj.x, obj.y);
                    this.splashAnimations.push(splash);
                }
            });
    
            if (hitObjectIndex !== null) {
                this.throwableObjects.splice(hitObjectIndex, 1);
            }
    
            if (this.character.hitFromAbove(enemy)) {
                if (typeof enemy.die === 'function') {
                    enemy.die(); 
                }
                this.character.speedY = Math.max(this.character.speedY, 20);
            } else if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
    
                if (enemy instanceof Endboss) {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                    this.endbossStatusBar.setPercentage(enemy.energy);
                }
    
                if (enemy instanceof Chicken || enemy instanceof SmallChicken || enemy instanceof Endboss) {
                    soundManager.play('playerhurt');
                }
            }
        });
    
        this.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.coins.splice(index, 1);
                this.collectedCoins++; 
    
                soundManager.play('coinPickup');
            }
        });
    
        this.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && !bottle.collected) {
                bottle.collect();
                this.collectedBottles++; 
                Bottle.respawnBottle(bottle);
    
                soundManager.play('bottlePickup');
            }
        });
    }
    
    removeDeadEnemies() {
        const initialEnemyCount = this.level.enemies.length;

        this.level.enemies = this.level.enemies.filter(enemy => {
            if (typeof enemy.isDead === 'function' && enemy.isDead() && enemy.isRemovable()) {
                return false;
            }
            return true;
        });

        if (this.level.enemies.length < initialEnemyCount) {
            this.spawnNewEnemies(initialEnemyCount - this.level.enemies.length);
        }
    }

    spawnNewEnemies(count) {
        const characterX = this.character.x;
        const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        const endbossX = endboss ? endboss.x : this.character.x + 2000; 

        for (let i = 0; i < count; i++) {
            let newEnemy;
            let validPosition = false;
            let attempts = 0;
            const maxAttempts = 100;

            while (!validPosition && attempts < maxAttempts) {
                const enemyType = Math.random() < 0.5 ? Chicken : SmallChicken;
                newEnemy = new enemyType();
                newEnemy.x = characterX + 300 + Math.random() * (endbossX - characterX - 600); 
                validPosition = this.isValidSpawnPosition(newEnemy, this.level.enemies);
                attempts++;
            }

            if (validPosition) {
                this.level.enemies.push(newEnemy);
            }
        }
    }

    isValidSpawnPosition(newEnemy, existingEnemies) {
        for (let enemy of existingEnemies) {
            const distance = Math.abs(newEnemy.x - enemy.x);
            if (distance < 150) {
                return false;
            }
        }
        return true;
    }

    draw() {
        if (!this.gameIsOver) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
            this.ctx.translate(this.camera_x, 0);
            this.addObjectsToMap(this.level.backgroundObjects);
    
            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.statusBar);
    
            const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
            if (endboss && endboss.isEndbossVisible(this.camera_x, this.canvas.width)) {
                if (!this.endbossEncountered) {
                    soundManager.playEndbossSound(); 
                    this.endbossEncountered = true;
                }
                this.addToMap(this.endbossStatusBar);
            }
    
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
    
            this.splashAnimations = this.splashAnimations.filter(splash => {
                if (splash.isFinished) {
                    return false; 
                } else {
                    splash.animate();
                    this.addToMap(splash);
                    return true;
                }
            });
    
            this.ctx.translate(-this.camera_x, 0);
    
            this.statusBottle.drawCollectedBottles(this.ctx, this.collectedBottles);
            this.statusCoin.drawCollectedCoins(this.ctx, this.collectedCoins);
    
            let self = this;
            requestAnimationFrame(function () {
                self.draw();
            });
        }
    }

    showVictoryScreen() {  
        this.gameIsOver = true; 
        clearInterval(this.gameLoop);

        const img = new Image();
        img.src = 'img/9_intro_outro_screens/win/won_1.png'; 

        img.onload = () => {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            const desiredWidth = 380; 
            const desiredHeight = 220; 

            const xPosition = (this.canvas.width - desiredWidth) / 2;
            const yPosition = (this.canvas.height - desiredHeight) / 2;

            this.ctx.drawImage(img, xPosition, yPosition, desiredWidth, desiredHeight);
        };

        soundManager.playVictorySound(); 
        this.showRestartButton();  
    }

    playVictorySound() {
        soundManager.play('victory');
    }

    gameOver() {
        this.gameIsOver = true;
        clearInterval(this.gameLoop);

        soundManager.play(this.character.gameOverSound);

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

        this.showRestartButton();  
    }

    showRestartButton() {
        const restartButton = document.getElementById('restartButton');
        restartButton.style.display = 'block';
    
        restartButton.onclick = () => {
            soundManager.stopAll();  
    
            if (this.gameLoop) {
                clearInterval(this.gameLoop);
            }
    
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
            const newWorld = new World(this.canvas, this.keyboard);
            
            restartButton.style.display = 'none';
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

/**
 * Class representing the game world.
 * Manages all aspects of the game, including the character, enemies, objects, and game state.
 */
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
    coinCount = 12;
    bottleCount = 7;
    gameIsOver = false;

    statusBottle; 
    statusCoin; 
    collectedBottles = 0; 
    collectedCoins = 0;
    endbossEncountered = false;
    enemyManager;

    /**
     * Creates a new World instance.
     * Initializes the game world, including the character, level, and status bars.
     * @param {HTMLCanvasElement} canvas - The canvas element where the game will be rendered.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
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
        this.enemyManager = new EnemyManager(this); 
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                enemy.world = this;  
            }
        });
        this.character.world = this; 
        this.draw();
        this.run();

        soundManager.play('backgroundMusic');
    }

    /**
     * Resets the world to its initial state, reloading the level and resetting the character and objects.
     */
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
        this.enemyManager = new EnemyManager(this); 
        this.character.world = this; 
        this.draw();
        this.run();
    }

    /**
     * Links the character and other objects to the current world context.
     */
    setWorld() {
        this.character.world = this;
    }
/**
     * Checks if a new item is being spawned too close to existing items.
     * @param {MovableObject} newItem - The new item to check.
     * @param {MovableObject[]} existingItems - The existing items to check against.
     * @returns {boolean} True if the position is valid, false otherwise.
     */
    isValidPosition(newItem, existingItems) {
        for (let item of existingItems) {
            const distance = Math.abs(newItem.x - item.x);
            if (distance < 100) {
                return false;
            }
        }
        return true;
    }

    /**
     * Starts the game loop, which continuously checks for collisions and updates the game state.
     */
    run() {
        this.gameLoop = setInterval(() => {
            if (!this.gameIsOver) {
                this.checkCollisions();
                this.checkThrowObjects();
                this.removeDeadEnemies();  
            }
        }, 50);
    }

    /**
     * Handles the logic for throwing objects in the game.
     */
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

    /**
     * Checks for collisions between the character, enemies, and other objects in the world.
     * Updates the game state based on these collisions.
     */
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
    
    /**
     * Removes dead enemies from the game world.
     * Spawns new enemies if necessary to maintain the enemy count.
     */
    removeDeadEnemies() {
        const initialEnemyCount = this.level.enemies.length;

        this.level.enemies = this.level.enemies.filter(enemy => {
            if (typeof enemy.isDead === 'function' && enemy.isDead() && enemy.isRemovable()) {
                return false;
            }
            return true;
        });

        if (this.level.enemies.length < initialEnemyCount) {
            this.enemyManager.spawnNewEnemies(initialEnemyCount - this.level.enemies.length);
        }
    }

    /**
     * Continuously draws the game world, including background, characters, and status bars.
     * Uses `requestAnimationFrame` for smooth rendering.
     */
    draw() {
        if (!this.gameIsOver) {
            this.clearCanvas();
            this.drawBackground();
            this.drawStatusBars();
            this.drawGameObjects();
            this.drawHUD();

            let self = this;
            requestAnimationFrame(function () {
                self.draw();
            });
        }
    }

    /**
     * Clears the canvas before redrawing the game world.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

     /**
     * Draws the background of the game world.
     */
    drawBackground() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws the status bars, including the endboss's health bar if the endboss is visible.
     */
    drawStatusBars() {
        this.addToMap(this.statusBar);
        
        const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        if (endboss && endboss.isEndbossVisible(this.camera_x, this.canvas.width)) {
            if (!this.endbossEncountered) {
                soundManager.playEndbossSound(); 
                this.endbossEncountered = true;
            }
            this.addToMap(this.endbossStatusBar);
        }
    }

    /**
     * Draws the game objects, such as the character, enemies, and items.
     */
    drawGameObjects() {
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
    }

    /**
     * Draws the Heads-Up Display (HUD), including collected bottles and coins.
     */
    drawHUD() {
        this.statusBottle.drawCollectedBottles(this.ctx, this.collectedBottles);
        this.statusCoin.drawCollectedCoins(this.ctx, this.collectedCoins);
    }

      /**
     * Adds an array of objects to the map by drawing them on the canvas.
     * @param {MovableObject[]} objects - The objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Draws a movable object on the canvas, including flipping the image if needed.
     * @param {MovableObject} mo - The movable object to be drawn.
     */
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

     /**
     * Flips an image horizontally before drawing it, used for characters facing left.
     * @param {MovableObject} mo - The movable object whose image needs to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flips the image back to its original orientation after drawing it.
     * @param {MovableObject} mo - The movable object whose image was flipped.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

     /**
     * Displays the victory screen when the player wins the game.
     * Stops the game loop and plays the victory sound.
     */
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

    /**
     * Displays the game over screen when the player loses the game.
     * Stops the game loop and plays the game over sound.
     */
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

    /**
     * Shows the restart button, allowing the player to reset the game.
     * Resets the world and stops all currently playing sounds.
     */
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
}

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
        resetCharacter(this);
        resetLevel(this);
        resetStatusBars(this);
        resetCollectibles(this);
        resetWorldContext(this);
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
                this.enemyManager.removeDeadEnemies(); 
            }
        }, 50);
    }

    /**
     * Checks for collisions between the character, enemies, and other objects in the world.
     * Updates the game state based on these collisions.
     */
    checkCollisions() {
        this.enemyManager.checkEnemyCollisions(); 
        this.checkCoinCollisions();
        this.checkBottleCollisions();
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
     * Checks for collisions between the character and coins.
     * Uses the checkCoinCollisions method from the Coins class.
     */
        checkCoinCollisions() {
        Coins.checkCoinCollisions(this.character, this);
    }

    /**
     * Checks for collisions between the character and bottles.
     * Uses the checkBottleCollisions method from the Bottle class.
     */
        checkBottleCollisions() {
        Bottle.checkBottleCollisions(this.character, this);
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
        this.endbossStatusBar.draw(this.ctx);  
    }

    /**
     * Draws all relevant game objects (character, enemies, clouds, throwable objects, coins).
     */
    drawGameObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.coins);
        this.drawBottles();
        this.drawSplashAnimations(); 
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws all bottles and animates them.
     */
    drawBottles() {
        this.bottles.forEach(bottle => {
            bottle.animate();
            this.addToMap(bottle);
        });
    }

    /**
 * Draws all splash animations and removes finished ones.
 */
drawSplashAnimations() {
    this.splashAnimations = SplashAnimation.drawSplashAnimations(this.splashAnimations, this.ctx);
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
        this.dimBackground();
        this.renderImageOnCanvas('img/9_intro_outro_screens/win/won_1.png', 380, 220);
        soundManager.play('victory');  
        this.showRestartButton();  
        if (window.innerWidth <= 768) {
            this.showBackToStartButton();
            const footer = document.querySelector('footer');
            if (footer) {
                footer.style.display = 'block';  
            }
        }
    }

    /**
     * Dims the background with a semi-transparent overlay.
     */
    dimBackground() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Renders an image on the canvas at the center of the screen.
     * @param {string} src - The source URL of the image.
     * @param {number} width - The desired width of the image.
     * @param {number} height - The desired height of the image.
     */
    renderImageOnCanvas(src, width, height) {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            const xPosition = (this.canvas.width - width) / 2;
            const yPosition = (this.canvas.height - height) / 2;
            this.ctx.drawImage(img, xPosition, yPosition, width, height);
        };
    }

    /**
     * Displays the game over screen when the player loses the game.
     * Stops the game loop and plays the game over sound.
     */
    gameOver() {
        this.gameIsOver = true;
        this.stopGameLoop();
        this.playGameOverSound();
        this.renderGameOverScreen();
        this.showRestartButton();
        if (window.innerWidth <= 1024) {
            this.showBackToStartButton();
            const footer = document.querySelector('footer');
            if (footer) {
                footer.style.display = 'block';
            }
        }
    }

    /**
     * Stops the game loop.
     */
    stopGameLoop() {
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }
    }

    /**
     * Plays the game over sound effect.
     */
    playGameOverSound() {
        soundManager.play(this.character.gameOverSound);
    }

    /**
     * Renders the game over screen with a background dim and the game over image.
     */
    renderGameOverScreen() {
        const img = new Image();
        img.src = this.character.gameOverImage;
        img.onload = () => {
            this.dimBackground();
            this.renderImageOnCanvas(img.src, 720, 480);
        };
    }

    /**
     * Shows the footer if the screen width is less than or equal to 768px (mobile devices).
     */
    showFooterOnMobile() {
        if (window.innerWidth <= 768) {
            const footer = document.querySelector('footer');
            if (footer) {
                footer.style.display = 'block';
            }
        }
    }

    /**
     * Hides the footer on mobile devices (screen width less than or equal to 768px).
     * This function checks the screen width and hides the footer element
     * by setting its display property to 'none' if the screen is detected to be mobile-sized.
     */
    hideFooterOnMobile() {
        const footer = document.querySelector('footer');
        if (window.innerWidth <= 1024 || window.matchMedia('(max-width: 1024px)').matches) {
            if (footer) {
                footer.style.display = 'none';  
            }
        }
    }

    /**
     * Shows the restart button, allowing the player to reset the game.
     * Resets the world and stops all currently playing sounds.
     */
    showRestartButton() {
        this.displayRestartButton();
        this.setupRestartButtonListener();
        this.hideFooterOnMobile();
    }

    /**
     * Shows the "back to start" button on mobile devices.
     */
    showBackToStartButton() {
        const backToStartButton = document.getElementById('backToStartButton');
        backToStartButton.style.display = 'block'; 
        backToStartButton.onclick = () => {
            window.location.reload();  
        };
    }

    /**
     * Displays the restart button by setting its display style to 'block'.
     */
    displayRestartButton() {
        const restartButton = document.getElementById('restartButton');
        restartButton.style.display = 'block';
    }

    /**
     * Sets up the click event listener for the restart button to reset the game.
     */
    setupRestartButtonListener() {
        const restartButton = document.getElementById('restartButton');
        restartButton.onclick = () => {
            this.handleRestartButtonClick();
        };
    }

    /**
     * Handles the logic for resetting the game when the restart button is clicked.
     */
    handleRestartButtonClick() {
        soundManager.stopAll();  
        this.clearCanvas();      
        this.restartGame();
        this.hideFooterOnMobile();
    }

    /**
     * Restarts the game by creating a new World instance.
     */
    restartGame() {
        const restartButton = document.getElementById('restartButton');
        const backToStartButton = document.getElementById('backToStartButton');
        new World(this.canvas, this.keyboard);
        restartButton.style.display = 'none';
        backToStartButton.style.display = 'none';  
    }
}

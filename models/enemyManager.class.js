class EnemyManager {
    /**
     * Creates a new EnemyManager instance.
     * @param {Object} world - The game world object containing the level and character information.
     */
    constructor(world) {
        this.world = world;
    }

    /**
     * Spawns a specified number of new enemies in valid positions within the game world.
     * Ensures that enemies are not spawned too close to existing enemies or the endboss.
     * @param {number} count - The number of enemies to spawn.
     */
    spawnNewEnemies(count) {
        const characterX = this.world.character.x;
        const endbossX = this.getEndbossX(characterX);

        for (let i = 0; i < count; i++) {
            const newEnemy = this.createValidEnemy(characterX, endbossX);
            if (newEnemy) {
                this.world.level.enemies.push(newEnemy);
            }
        }
    }

    /**
     * Gets the X position of the endboss or a default value if no endboss is found.
     * @param {number} characterX - The X position of the character.
     * @returns {number} The X position of the endboss or a default value.
     */
    getEndbossX(characterX) {
        const endboss = this.world.level.enemies.find(enemy => enemy instanceof Endboss);
        return endboss ? endboss.x : characterX + 2000;
    }

    /**
     * Creates a new enemy and ensures it's spawned in a valid position.
     * @param {number} characterX - The X position of the character.
     * @param {number} endbossX - The X position of the endboss.
     * @returns {MovableObject|null} A new valid enemy object or null if no valid position is found.
     */
    createValidEnemy(characterX, endbossX) {
        let newEnemy = null;
        let validPosition = false;
        let attempts = 0;
        const maxAttempts = 100;

        while (!validPosition && attempts < maxAttempts) {
            newEnemy = this.generateRandomEnemy();
            newEnemy.x = this.calculateEnemyPosition(characterX, endbossX);
            validPosition = this.isValidSpawnPosition(newEnemy, this.world.level.enemies);
            attempts++;
        }

        return validPosition ? newEnemy : null;
    }

    /**
     * Generates a random enemy (either Chicken or SmallChicken).
     * @returns {MovableObject} A new instance of either Chicken or SmallChicken.
     */
    generateRandomEnemy() {
        const enemyType = Math.random() < 0.5 ? Chicken : SmallChicken;
        return new enemyType();
    }

    /**
     * Calculates a random valid X position for a new enemy.
     * @param {number} characterX - The X position of the character.
     * @param {number} endbossX - The X position of the endboss.
     * @returns {number} A random X position for the enemy.
     */
    calculateEnemyPosition(characterX, endbossX) {
        return characterX + 300 + Math.random() * (endbossX - characterX - 600);
    }

    /**
     * Checks if the position for spawning a new enemy is valid by ensuring it's not too close to existing enemies.
     * @param {MovableObject} newEnemy - The new enemy object to check the spawn position for.
     * @param {MovableObject[]} existingEnemies - The array of existing enemies in the level.
     * @returns {boolean} True if the spawn position is valid, false otherwise.
     */
    isValidSpawnPosition(newEnemy, existingEnemies) {
        for (let enemy of existingEnemies) {
            const distance = Math.abs(newEnemy.x - enemy.x);
            if (distance < 150) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks for collisions between the character and enemies.
     */
    checkEnemyCollisions() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.isDeadEnemy(enemy)) return;

            this.checkThrowableObjectCollisions(enemy);
            this.checkCharacterEnemyCollision(enemy);
        });
    }

    /**
     * Checks if an enemy is dead.
     * @param {MovableObject} enemy - The enemy to check.
     * @returns {boolean} True if the enemy is dead, false otherwise.
     */
    isDeadEnemy(enemy) {
        return typeof enemy.isDead === 'function' && enemy.isDead();
    }

    /**
     * Checks for collisions between throwable objects and enemies.
     * Updates enemy status and removes throwable objects if necessary.
     * @param {MovableObject} enemy - The enemy to check against throwable objects.
     */
    checkThrowableObjectCollisions(enemy) {
        let hitObjectIndex = null;
        this.world.throwableObjects.forEach((obj, index) => {
            if (enemy.isHitBy(obj)) {
                hitObjectIndex = index;
                enemy.hit(); 
                this.handleEnemyHit(enemy, obj); 
            }
        });

        if (hitObjectIndex !== null) {
            this.world.throwableObjects.splice(hitObjectIndex, 1); 
        }
    }

    /**
     * Handles the logic for when an enemy is hit by a throwable object.
     * Updates the enemy status and plays the appropriate sound and animations.
     * @param {MovableObject} enemy - The enemy that was hit.
     * @param {ThrowableObject} obj - The throwable object that hit the enemy.
     */
    handleEnemyHit(enemy, obj) {
        if (enemy instanceof Chicken || enemy instanceof SmallChicken) {
            enemy.die(); 
        } else if (enemy instanceof Endboss) {
            this.world.endbossStatusBar.setPercentage(enemy.energy);
        }

        let splash = new SplashAnimation(obj.x, obj.y);
        this.world.splashAnimations.push(splash); 
    }

    /**
     * Checks for collisions between the character and enemies.
     * Updates character status and handles enemy-specific collision behavior.
     * @param {MovableObject} enemy - The enemy to check for collisions with the character.
     */
    checkCharacterEnemyCollision(enemy) {
        if (this.world.character.hitFromAbove(enemy)) {
            this.handleEnemyStomp(enemy);
        } else if (this.world.character.isColliding(enemy)) {
            this.handleCharacterHitByEnemy(enemy);
        }
    }

    /**
     * Handles the logic for when the character hits an enemy from above.
     * @param {MovableObject} enemy - The enemy that was stomped.
     */
    handleEnemyStomp(enemy) {
        if (typeof enemy.die === 'function') {
            enemy.die(); 
        }
        this.world.character.speedY = Math.max(this.world.character.speedY, 20);
    }

    /**
     * Handles the logic for when the character collides with an enemy.
     * Updates character energy and plays appropriate sound effects.
     * @param {MovableObject} enemy - The enemy that hit the character.
     */
    handleCharacterHitByEnemy(enemy) {
        this.world.character.hit(2);  
        this.world.statusBar.setPercentage(this.world.character.energy);  
        if (enemy instanceof Endboss) {
            this.world.endbossStatusBar.setPercentage(enemy.energy);
        }
        if (enemy instanceof Chicken || enemy instanceof SmallChicken || enemy instanceof Endboss) {
            soundManager.play('playerhurt');
        }
        if (this.world.character.isDead()) {
            this.world.character.playDeathAnimation();  
        }
    }

    /**
     * Removes dead enemies from the game world.
     * Spawns new enemies if necessary to maintain the enemy count.
     */
    removeDeadEnemies() {
        const initialEnemyCount = this.world.level.enemies.length;

        this.world.level.enemies = this.world.level.enemies.filter(enemy => {
            if (typeof enemy.isDead === 'function' && enemy.isDead() && enemy.isRemovable()) {
                return false;
            }
            return true;
        });

        if (this.world.level.enemies.length < initialEnemyCount) {
            this.spawnNewEnemies(initialEnemyCount - this.world.level.enemies.length);
        }
    }
}

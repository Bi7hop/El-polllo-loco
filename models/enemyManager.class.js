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
}

/**
 * Class responsible for managing the spawning and positioning of enemies in the game.
 */
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
        const endboss = this.world.level.enemies.find(enemy => enemy instanceof Endboss);
        const endbossX = endboss ? endboss.x : this.world.character.x + 2000;

        for (let i = 0; i < count; i++) {
            let newEnemy;
            let validPosition = false;
            let attempts = 0;
            const maxAttempts = 100;

            while (!validPosition && attempts < maxAttempts) {
                const enemyType = Math.random() < 0.5 ? Chicken : SmallChicken;
                newEnemy = new enemyType();
                newEnemy.x = characterX + 300 + Math.random() * (endbossX - characterX - 600);
                validPosition = this.isValidSpawnPosition(newEnemy, this.world.level.enemies);
                attempts++;
            }

            if (validPosition) {
                this.world.level.enemies.push(newEnemy);
            }
        }
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

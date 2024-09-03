class EnemyManager {
    constructor(world) {
        this.world = world;
    }

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

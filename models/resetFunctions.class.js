function resetCharacter(world) {
    world.character = new Character();
    world.camera_x = 0;
    world.character.world = world;
}

function resetLevel(world) {
    world.level = createLevel1();
    world.enemyManager = new EnemyManager(world); 
}

function resetStatusBars(world) {
    world.statusBar = new StatusBar();
    world.endbossStatusBar = new EndbossStatusBar();
    world.endbossStatusBar.setWorld(world);
}

function resetCollectibles(world) {
    world.coins = Coins.generateCoins(world.coinCount, world); 
    world.bottles = Bottle.generateBottles(world.bottleCount, world);
    world.collectedBottles = 0; 
    world.collectedCoins = 0;
    world.throwableObjects = [];
    world.splashAnimations = [];
}

function resetWorldContext(world) {
    world.setWorld();
    world.level.enemies.forEach(enemy => {
        if (enemy instanceof Endboss) {
            enemy.world = world;
        }
    });
}
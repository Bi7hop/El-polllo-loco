/**
 * Class representing a level in the game.
 * Contains enemies, clouds, background objects, and other level-specific details.
 */
class Level {
   enemies;
   clouds;
   backgroundObjects;
   level_end_x = 3200;

   /**
     * Creates a new Level instance.
     * @param {MovableObject[]} enemies - The array of enemies in the level.
     * @param {MovableObject[]} clouds - The array of clouds in the level.
     * @param {MovableObject[]} backgroundObjects - The array of background objects in the level.
     */
   constructor(enemies, clouds, backgroundObjects){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
   }
}
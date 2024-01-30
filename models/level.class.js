class Level {
  enemies;
  clouds;
  collectableCoins;
  collectableBottles;
  backgroundObjects;
  level_end_x = 6500;

  /**
   * Constructor for creating/initializing a level with various game elements.
   * @param {Array} enemies - Array containing enemy entities.
   * @param {Array} clouds - Array containing cloud entities.
   * @param {Array} collectableCoins - Array containing coins.
   * @param {Array} collectableBottles - Array containing bottles.
   * @param {Array} backgroundObjects - Array containing background objects.
   */
  constructor(
    enemies,
    clouds,
    collectableCoins,
    collectableBottles,
    backgroundObjects
  ) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.collectableCoins = collectableCoins;
    this.collectableBottles = collectableBottles;
    this.backgroundObjects = backgroundObjects;
  }
}

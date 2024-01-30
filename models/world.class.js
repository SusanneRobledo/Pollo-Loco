class World {
  character = new Character();
  statusbarHealth = new StatusbarHealth();
  statusbarBottle = new StatusbarBottle();
  statusbarCoin = new StatusbarCoin();
  endboss = new Endboss();
  statusbarEndboss = new StatusbarEndboss();
  bottle = new ThrowableObject();

  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  coinCount = 0;
  bottleCount = 0;
  throwableObjects = [];
  bottleHitsEnemy = false;
  showStatusbarEndboss = false;
  characterAlreadyJumped = false;

  coin_sound = new Audio("audio/coin.mp3");
  bottle_sound = new Audio("audio/collectableBottle.mp3");
  chicken_sound = new Audio("audio/chicken.mp3");
  breakingBottle_sound = new Audio("audio/breakingBottle.mp3");

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Connects the world to the character class. The Character can access properties and methods of the world.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Initiates the recurring intervals of the game logic.
   */
  run() {
    setStoppableInterval(() => {
      this.checkBottleCollection();
      this.checkCoinCollection();
      this.checkThrowObjects();
    }, 200);

    setStoppableInterval(() => {
      this.checkCollisions();
    }, 20);
  }

  /**
   * Checks for collisions between the character, enemies, and throwable objects.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      this.characterCollidesWithEnemy(enemy);
      this.bottleCollidesWithEnemy(enemy);
    });
  }

  /**
   * Checks the collision scenarios between Character and Enemies.
   * @param {Object} enemy
   */
  characterCollidesWithEnemy(enemy) {
    if (this.character.isColliding(enemy)) {
      this.characterJumpsOnChicken(enemy);
      this.enemyHitsCharacter(enemy);
    }
  }

  /**
   * Defines what happens when the Character lands on a Chicken enemy.
   * Character bounces off the first time the character collides with the enemy.
   * variable characterAlreadyJumped prefents Character from jumping again.
   * Character y position is set back to ground level = 98.5 after landing on Chicken.
   * Chicken gets eliminated from Canvas.
   * @param {Object} enemy
   */
  characterJumpsOnChicken(enemy) {
    if (this.characterCanJumpOnChicken(enemy)) {
      if (!this.characterAlreadyJumped) this.character.jump();
      this.characterAlreadyJumped = true;
      this.character.y = this.characterGroundLevel();
      this.eliminateChicken(enemy);
      setTimeout(() => (this.characterAlreadyJumped = false), 1000);
    }
  }

  characterGroundLevel() {
    return 98.5;
  }

  /**
   * Returns the conditions for the Character Landing on top of the chicken enemy:
   * character is in the air / enemy is a chicken / character is not jumping up but coming down
   * Chicken cant get killed when jumping up, only if character lands on top of them
   * @returns {boolean} true if the character is in the air and lands on top of a chicken enemy
   */
  characterCanJumpOnChicken(enemy) {
    return (
      this.character.isAboveGround() &&
      enemy instanceof Chicken &&
      this.character.speedY < 0
    );
  }

  /**
   * Handles the situation where an enemy hits the character. Character gets hit and the health status bar gets updated.
   * @param {Object} enemy - The enemy object
   */
  enemyHitsCharacter(enemy) {
    if (enemy.speedX > 0 && !gamePaused && !this.character.isHurt()) {
      this.character.hit(5);
      if (isSoundPlaying) this.character.damage_sound.play();
      this.statusbarHealth.setPercentage(this.character.energy);
    }
  }

  /**
   * Handles collision scenarios between bottles and enemies.
   * If Chicken gets hit by the bottle, eliminates the chicken.
   * Sets "bottleHitsEnemy" variable to true in order to activate bottle Splash Animation.
   * @param {Object} enemy The enemy object colliding with bottles
   * @param {Object} bottle The throwable object (bottle)
   */
  bottleCollidesWithEnemy(enemy) {
    this.throwableObjects.forEach((bottle) => {
      if (bottle.isColliding(enemy)) {
        if (isSoundPlaying) this.breakingBottle_sound.play();
        if (enemy instanceof Chicken) this.eliminateChicken(enemy);
        if (enemy instanceof Endboss && !enemy.isHurt()) {
          enemy.hit(20);
          this.statusbarEndboss.setPercentage(enemy.energy);
        }
      }
      this.bottleHitsEnemy = true;
      this.removeThrowObject(bottle);
    });
  }

  /**
   * Eliminates the Chicken by setting the horizontal movement to 0 and marking it as dead.
   * @param {*} enemy The chicken object
   */
  eliminateChicken(enemy) {
    enemy.speedX = 0;
    if (isSoundPlaying) this.chicken_sound.play();
    enemy.kill();
  }

  /**
   * Removes the bottle from the array of throwable Objects after a delay.
   * @param {*} bottle - The throwable object (bottle)
   */
  removeThrowObject(bottle) {
    setTimeout(() => this.throwableObjects.splice(bottle, 1), 1200);
  }

  /**
   * Checks for character-coin collisions and collects coins if a collision occurs.
   * Plays a coin collection sound upon collecting a coin.
   */
  checkCoinCollection() {
    this.level.collectableCoins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.collectCoin(index);
        if (isSoundPlaying) this.coin_sound.play();
      }
    });
  }

  /**
   * Collects a coin by increasing the coin count
   * removes the collected coin from the array, and updates coin status bar.
   * @param {*} index - The index of the coin to be collected within the collectableCoins array.
   */
  collectCoin(index) {
    this.coinCount++;
    this.level.collectableCoins.splice(index, 1);
    this.statusbarCoin.setPercentage(this.coinCount);
  }

  /**
   * Checks for character-bottle collisions and collects bottles if a collision occurs, limited to a maximum of 10 bottles.
   * Plays a bottle collection sound.
   */
  checkBottleCollection() {
    this.level.collectableBottles.forEach((bottle, index) => {
      if (this.canCollectBottle(bottle)) {
        this.collectBottle(index);
        if (isSoundPlaying) this.bottle_sound.play();
      }
    });
  }

  canCollectBottle(bottle) {
    return this.character.isColliding(bottle) && this.bottleCount < 10;
  }

  /**
   * Collects a bottle by increasing the bottle count, removes the collected bottle from the array, and updates the bottle status bar.
   * @param {*} index - The index of the bottle to be collected within the collectableBottles array.
   */
  collectBottle(index) {
    this.bottleCount++;
    this.level.collectableBottles.splice(index, 1);
    this.statusbarBottle.setPercentage(this.bottleCount);
  }

  /**
   * Checks if the 'D' key is pressed, triggers the character to throw objects. At least one bottle has to be available.
   * Sleeptimer gets set back. If Character displays sleep animation, the character now displays the regular waiting animation after throw.
   * Bottle count is reduced.
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.bottleCount > 0) {
      this.generateBottle();
      this.character.resetSleepTimer();
      this.reduceBottleCount();
    }
  }

  /**
   * Generates a new bottle and adds it to the throwable objects array.
   * The bottle is positioned based on the current x-coordinate, character's y-coordinate, and throw direction.
   */
  generateBottle() {
    let bottle = new ThrowableObject(
      this.positionX(),
      this.character.y + 120,
      this.throwDirection()
    );
    this.throwableObjects.push(bottle);
  }

  /**
   * Positions the bottle based on character direction.
   *    - If facing left, positions bottle to the left of the character by 10 units.
   *    - If facing right, positions bottle to the right of the character by 110 units.
   * @returns {number} - The x-coordinate value for the positioning of the throwable object.
   */
  positionX() {
    if (this.character.otherDirection) return this.character.x - 10;
    else return this.character.x + 110;
  }

  /**
   * Sets the direction for throwing the bottle based on character direction.
   * @returns Factor for the throw direction (-1 for left, 1 for right)
   */
  throwDirection() {
    return this.character.otherDirection ? -1 : 1;
  }

  /**
   * Reduces the count of available bottles by one and updates the bottle status bar.
   */
  reduceBottleCount() {
    this.bottleCount--;
    this.statusbarBottle.setPercentage(this.bottleCount);
  }

  /**
   * Renders and draws various game elements onto the canvas.
   * Uses requestAnimationFrame to continuously call the draw function.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds); // Position hinter der Statusbar
    this.addObjectsToMap(this.level.collectableCoins);
    this.addObjectsToMap(this.level.collectableBottles);

    this.drawFixedObjects();

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Renders and draws the fixed elements onto the canvas.
   * Renders camera position to the left to compensate for the movement and then back to the right, so the elements are always in the same position.
   */
  drawFixedObjects() {
    this.ctx.translate(-this.camera_x, 0); // back
    this.addToMap(this.statusbarHealth);
    this.addToMap(this.statusbarBottle);
    this.addToMap(this.statusbarCoin);
    if (this.showStatusbarEndboss) this.addToMap(this.statusbarEndboss);
    this.ctx.translate(this.camera_x, 0); // forward
  }

  /**
   * Calls addToMap function to add objects to the game.
   * @param {*} objects - Array of objects containing to be added to the canvas.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  /**
   * Renders movable object onto the canvas.
   * @param {object} mo - movable object
   */
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    //mo.drawFrame(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
   * Horizontally flips the image (used when character walks left and right).
   * @param {object} mo - movable object
   */
  flipImage(mo) {
    if (!gamePaused) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
  }

  /**
   * Restores canvas to flip the image back (used when character walks left and right).
   * @param {object} mo - movable object
   */
  flipImageBack(mo) {
    if (!gamePaused) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }
}

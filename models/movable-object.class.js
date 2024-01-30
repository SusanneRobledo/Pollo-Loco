class MovableObject extends DrawableObject {
  speedX = 0.15;
  speedY = 0;
  acceleration = 2.5;
  otherDirection = false;
  energy = 100;
  lastHit = 0;

  /**
   * Applies gravity to an objects vertical movement.
   * If the object is above ground or has a positive vertical speed (falling),
   * decreases the vertical position and adjusts its vertical speed.
   */
  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if objects are in the air. Ensures that objects fall until reaching ground level.
   * @returns {boolean} True if object is above ground level, otherwise false.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return this.y < 345; // thowable Object falls until it reaches groundlevel y=345
    } else {
      return this.y < 89;
    }
  }

  /**
   * Causes damage to a game entity. Reduces the entitys energy based on the received damage.
   * @param {number} damage - the amount of damage
   */
  hit(damage) {
    this.energy -= damage;
    if (this.energy < 0) this.energy = 0;
    else this.lastHit = new Date().getTime();
  }

  /**
   * Checks if the entity was recently hurt based on the time elapsed since the last hit.
   * @returns {boolean} True if the entity was hurt within the last seconds, otherwise false.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 0.8;
  }

  /**
   * Checks if the object is "dead" based on its energy level.
   * @returns {boolean} True if the entity's energy is zero, otherwise false.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Eliminates an object by setting its energy level to zero.
   */
  kill() {
    this.energy = 0;
  }

  /**
   * Plays an animation by cycling through a sequence of images. Uses modulo (%) to calculate the image index to iterate through the array of images.
   *  modulo (%) = der mathem. Rest -> let i = 0 % 5; => 1, Rest 1
   *  Example: i = 0, 1, 2, 3, 4, 5, 0, 0, 1, 2, 3, 4, 5, 0, 0, 1, 2, 3, 4, 5, 0 ...
   * @param {Array} images - Array containing the sequence of images for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Checks if the current frame of the splash animation has completed one full playthrough.
   * @returns {boolean} True if the current frame marks the end of one full animation cycle, otherwise false.
   */
  animationPlayedOnce(array) {
    return this.currentImage % [array].length === [array].length - 1;
  }

  /**
   * Moves the object to the right by updating its x position and adding its horizontal speed.
   */
  moveRight() {
    if (!gamePaused) {
      this.x += this.speedX;
    }
  }

  /**
   * Moves the object to the left by updating its x position and adding its horizontal speed.
   */
  moveLeft() {
    if (!gamePaused) {
      this.x -= this.speedX;
    }
  }

  /**
   * Moves the object downwards by adding a fixed value or sets the position to a fixed bottom limit.
   */
  moveDown() {
    if (!gamePaused) {
      this.y += 30;
      if (this.y >= 600) this.y = 600;
    }
  }

  /**
   * Initiates a jump action for the object by adding vertical speed.
   */
  jump() {
    if (!gamePaused) this.speedY = 30;
  }
}

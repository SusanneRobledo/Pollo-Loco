class ThrowableObject extends MovableObject {
  constructor(x, y, direction) {
    super().loadImage(this.IMAGES_THROW[0]);
    this.loadImages(this.IMAGES_THROW);
    this.loadImages(this.IMAGES_SPLASH);
    this.height = 70;
    this.width = 65;
    this.throw(x, y, direction);
    this.animate();
  }

  IMAGES_THROW = [
    "./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "./img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "./img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  world;

  /**
   * Initiates a throw with specified coordinates and direction.
   * @param {number} x - The x-coordinate for the throw.
   * @param {number} y - The y-coordinate for the throw.
   * @param {number} direction - The direction in which the object is thrown (factor -1 for left, 1 for right).
   * Note: Initializes the entity's position, speed, and applies a throwing motion with gravity.
   */
  throw(x, y, direction) {
    this.x = x;
    this.y = y;
    this.speedX = 8 * direction;
    this.speedY = 25;
    this.applyGravity();
    setStoppableInterval(() => {
      this.x += this.speedX;
    }, 25);
  }

  /**
   * Sets the horizontal speed to 0, initiates the bottle splash animation and stops the interval after the animation is played once.
   */
  bottleSplashAnimation() {
    this.speedX = 0;
    this.playAnimation(this.IMAGES_SPLASH);
    if (this.animationPlayedOnce(`IMAGES_SPLASH`))
      clearInterval(this.bottleInterval);
  }

  /**
   * Initiates an animation loop for the bottle entity.
   * Note: Sets up an interval to continuously switch between throw and splash animations based on the entity's position.
   */
  animate() {
    this.bottleInterval = setStoppableInterval(() => {
      if (!this.isAboveGround() || this.bottleHitsEnemy)
        this.bottleSplashAnimation();
      else this.playAnimation(this.IMAGES_THROW);
    }, 75);
  }
}

class Chicken extends MovableObject {
  height = 70;
  width = 80;
  y = 358;
  chickenCount = 0;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  offset = {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  };

  /**
   * Constructor for the Chicken enemy class.
   * Loads initial images, including walking and dead animations, and initiates the animation loop.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  /**
   * Initiates the walking and dead animations for the Chicken enemy.
   */
  animate() {
    setStoppableInterval(() => this.moveLeft(), 1000 / 60);

    setStoppableInterval(() => {
      if (this.isDead()) this.playDeadChickenAnimation();
      else this.playAnimation(this.IMAGES_WALKING);
    }, 150);
  }

  /**
   * Plays the dead animation for the Chicken enemy and initiates a downward movement after a delay.
   */
  playDeadChickenAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => this.moveDown(), 900);
  }
}

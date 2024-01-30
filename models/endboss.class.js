class Endboss extends MovableObject {
  height = 400;
  width = 260;
  y = 55;
  speedX = 6;
  endbossAngry = false;
  reachedBoss = false;

  sizzle_sound = new Audio("audio/sizzle.mp3");

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ANGRYWALKING = [
    "img/4_enemie_boss_chicken/6_angrywalk/G1.png",
    "img/4_enemie_boss_chicken/6_angrywalk/G2.png",
    "img/4_enemie_boss_chicken/6_angrywalk/G3.png",
    "img/4_enemie_boss_chicken/6_angrywalk/G4.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  offset = {
    top: 75,
    right: 20,
    bottom: 25,
    left: 30,
  };

  /**
   * Creates an instance of the Endboss class.
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ANGRYWALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 4600;
    this.animate();
  }

  /**
   * Animates the behavior of the endboss.
   */
  animate() {
    this.endbossInterval = setStoppableInterval(() => {
      if (this.bossCanWalkRelaxed()) this.bossWalks();
      if (this.bossGetsAlerted()) this.bossIsAlert();
      if (this.bossGetsAngry()) this.bossWalksAngry();
      if (this.bossFarAway()) this.endbossAngry = false;
      if (this.tooCloseToBoss()) this.bossAttacks();
      if (this.isHurt()) {
        this.bossHurtAnimation();
        if (this.isDead()) {
          this.bossDeadAnimation();
        }
      }
    }, 200);
  }

  bossCanWalkRelaxed() {
    return (
      (this.bossReached() && !this.bossSeesCharacter()) ||
      (this.reachedBoss && this.bossFarAway())
    );
  }

  bossGetsAlerted() {
    return this.bossSeesCharacter() && !this.endbossAngry;
  }

  bossGetsAngry() {
    return this.bossSeesCharacter() && this.endbossAngry;
  }

  /**
   * Initiates the hurt animation for the endboss and stops it temporarily from moving forward.
   */
  bossHurtAnimation() {
    this.bossStopsMoving();
    if (world.isSoundPlaying) this.sizzle_sound.play();
    this.playAnimation(this.IMAGES_HURT);
    setTimeout(() => this.bossKeepsMoving(), 400);
  }

  /**
   * Initiates the dead animation for the endboss. Sets a timeout to move the boss down after a certain duration. Sets a timeout to show the endscreen after a certain duration.
   */
  bossDeadAnimation() {
    this.playDeadAnimation();
    setTimeout(() => {
      showEndscreen("game over");
      this.moveDown();
    }, 400);
    setTimeout(() => clearAllIntervals(), 500);
  }

  /**
   * Initiates the boss walking animation and moves it to the left.
   */
  bossWalks() {
    this.moveLeft();
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Initiates the boss alert animation and shows the endboss status bar.
   */
  bossIsAlert() {
    world.showStatusbarEndboss = true;
    this.bossStopsMoving();
    this.playAnimation(this.IMAGES_ALERT);
    setTimeout(() => {
      this.endbossAngry = true;
      this.bossKeepsMoving();
    }, 2000);
  }

  /**
   * Moves the boss to the left and plays the angry walking animation.
   */
  bossWalksAngry() {
    this.moveLeft();
    this.playAnimation(this.IMAGES_ANGRYWALKING);
  }

  /**
   * Initiates the boss attack. Sets a higher horizontal speed for the attack, Plays the attack animation, restores the original horizontal speed.
   */
  bossAttacks() {
    this.speedX = 25;
    this.moveLeft();
    this.jump();
    this.playAnimation(this.IMAGES_ATTACK);
    this.speedX = 6;
  }

  /**
   * Checks if the character is positioned behind the end boss.
   * @returns {boolean} True if the character x-position is greater than the end boss x-position, otherwise false.
   */
  characterIsBehind() {
    return world.endboss.x < world.character.x;
  }

  /**
   * Checks if the character has reached the end boss.
   * @returns {boolean} True if character passed the 3800px mark, otherwise false.
   */
  bossReached() {
    if (world.character.x > 3800) this.reachedBoss = true;
    return world.character.x > 3800;
  }

  /**
   * Checks if the end boss sees the character.
   * @returns {boolean} True if the distance is under 450px, otherwise false.
   */
  bossSeesCharacter() {
    return world.endboss.x - world.character.x < 450;
  }

  /**
   * Checks if the end boss is far away from the character.
   * @returns {boolean} True if the distance is greater than 450px, otherwise false.
   */
  bossFarAway() {
    return world.endboss.x - world.character.x > 450;
  }

  /**
   * Checks if the end boss is far away from the character.
   * @returns {boolean} True if distance is smaller than 230px, otherwise false.
   */
  tooCloseToBoss() {
    return world.endboss.x - world.character.x < 230; // Boss attacks when distance to Pepe under 270px
  }

  /**
   * Plays the dead animation for the end boss once and stops the interval.
   */
  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => clearInterval(this.endbossInterval), 250);
  }

  /**
   * Stops the movement of the end boss by setting speed to 0.
   */
  bossStopsMoving() {
    this.speedX = 0;
  }

  /**
   * Reinitiates the movement of the end boss by setting speed to 5.
   */
  bossKeepsMoving() {
    this.speedX = 5;
  }
}

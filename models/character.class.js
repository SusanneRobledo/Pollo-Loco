class Character extends MovableObject {
  height = 340;
  width = 170;
  y = -14;
  speedX = 8;
  lastActivity = new Date().getTime();
  currentTime;

  IMAGES_WAITING = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  world;
  walking_sound = new Audio("audio/walking.mp3");
  damage_sound = new Audio("audio/gruntDamage2.mp3");
  jump_sound = new Audio("audio/jump.mp3");

  offset = {
    top: 145,
    right: 50,
    bottom: 15,
    left: 25,
  };

  /**
   * Loads images for various character states, applies gravity, and initiates animation.
   */
  constructor() {
    super().loadImage(this.IMAGES_WAITING[0]);
    this.loadImages(this.IMAGES_WAITING);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
  }

  /**
   * Initiates animation loops for character movement and general animation.
   */
  animate() {
    setStoppableInterval(() => this.moveCharacter(), 1000 / 60); // jump auslagern und kürzeres intervall
    setStoppableInterval(() => this.animateCharacter(), 130);
  }

  /**
   * Moves the character based on user input and game logic.
   * Checks conditions for moving right, moving left, and jumping.
   * Also adjusts the world's camera position to follow the character horizontally.
   */
  moveCharacter() {
    this.currentTime = new Date().getTime();
    this.walking_sound.pause();
    if (this.canMoveRight()) this.moveRight();
    if (this.canMoveLeft()) this.moveLeft();
    if (this.canJump()) this.jump();
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Checks if the character can move to the right.
   * @returns {boolean} - True if the right arrow key is pressed and the character's x-coordinate is less than the level's end x-coordinate.
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
   * Moves the character to the right.
   * Calls the superclass 'moveRight', sets 'otherDirection' to false, plays the walking sound, and updates the last activity time.
   */
  moveRight() {
    super.moveRight();
    this.otherDirection = false;
    if (this.world.isSoundPlaying) this.walking_sound.play();
    this.lastActivity = this.currentTime;
  }

  /**
   * Checks if the character can move to the left.
   * @returns {boolean} - True if the left arrow key is pressed and the character's x-coordinate is greater than 0.
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  /**
   * Moves the character to the left.
   * Calls the superclass 'moveLeft', sets 'otherDirection' to true, plays the walking sound, and updates the last activity time.
   */
  moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
    if (this.world.isSoundPlaying) this.walking_sound.play();
    this.lastActivity = this.currentTime;
  }

  /**
   * Checks if the character can jump.
   * @returns {boolean} - True if the spacebar is pressed and the character is not already above the ground.
   */
  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  /**
   * Initiates a jump for the character.
   * Calls the superclass 'jump', plays the jump sound, and updates the last activity time.
   */
  jump() {
    super.jump();
    if (this.world.isSoundPlaying) this.jump_sound.play();
    this.lastActivity = this.currentTime;
  }

  /**
   * Manages character animation based on different states.
   * Plays corresponding animations for hurt, dead, jumping, walking, idle, and sleeping states.
   */
  animateCharacter() {
    if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
    else if (this.isDead()) this.deadAnimation();
    else if (this.isAboveGround()) this.playAnimation(this.IMAGES_JUMPING);
    else if (this.isWalking()) this.playAnimation(this.IMAGES_WALKING);
    else if (this.characterAsleep()) this.playAnimation(this.IMAGES_LONG_IDLE);
    else this.playAnimation(this.IMAGES_WAITING);
  }

  /**
   * Checks if the character is currently walking.
   * @returns {boolean} - True if either the right or left arrow key is pressed.
   */
  isWalking() {
    return this.world.keyboard.RIGHT || this.world.keyboard.LEFT;
  }

  /**
   * Initiates the dead animation for the character.
   * Plays the dead animation, moves the character down after a delay, and shows the "you lost" endscreen after additional delays.
   */
  deadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
    setTimeout(() => this.moveDown(), 1050);
    setTimeout(() => {
      showEndscreen("you lost");
      clearAllIntervals();
    }, 500);
  }

  /**
   * Checks if the character is currently in a sleeping state.
   * @returns {boolean} - True if the character has been inactive for at least 8000 milliseconds and is not hurt, dead, or above the ground.
   */
  characterAsleep() {
    this.currentTime = new Date().getTime();
    return (
      this.currentTime - this.lastActivity >= 8000 &&
      !this.isHurt() &&
      !this.isDead() &&
      !this.isAboveGround()
    );
  }

  /**
   * Resets the sleep timer by updating the last activity time to the current time.
   */
  resetSleepTimer() {
    this.lastActivity = new Date().getTime();
  }
}

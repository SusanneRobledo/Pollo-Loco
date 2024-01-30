class CollectableCoin extends MovableObject {
  IMAGES_COIN = [
    "img/8_coin/coin_1.png",
    "img/8_coin/coin_2.png",
    "img/8_coin/coin_3.png",
    "img/8_coin/coin_4.png",
    "img/8_coin/coin_5.png",
    "img/8_coin/coin_6.png",
    "img/8_coin/coin_7.png",
    "img/8_coin/coin_8.png",
    "img/8_coin/coin_9.png",
    "img/8_coin/coin_10.png",
  ];

  constructor(x, y) {
    super().loadImage("img/8_coin/coin_1.png");
    this.loadImages(this.IMAGES_COIN);
    this.x = x;
    this.y = y;
    this.height = 125;
    this.width = 125;
    this.animate();
  }

  /**
   * Initiates the animation loop for the Coins.
   */
  animate() {
    setStoppableInterval(() => this.playAnimation(this.IMAGES_COIN), 220);
  }
}

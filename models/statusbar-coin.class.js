class StatusbarCoin extends Statusbar {
  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.y = 80;
    this.setPercentage(0);
  }

  /**
   * Resolves the index of the image based on the percentage value.
   * @returns {number} - The index of the image.
   */
  resolveImageIndex() {
    if (this.percentage == 10) {
      return 5;
    } else if (this.percentage > 7) {
      return 4;
    } else if (this.percentage > 5) {
      return 3;
    } else if (this.percentage > 3) {
      return 2;
    } else if (this.percentage > 1) {
      return 1;
    } else {
      return 0;
    }
  }
}

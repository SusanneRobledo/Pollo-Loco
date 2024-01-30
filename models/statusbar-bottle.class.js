/**
 * Represents a status bar bottle for displaying a percentage.
 */
class StatusbarBottle extends Statusbar {
  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  /**
   * Initializes the status bar of the bottle.
   */
  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.y = 40;
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
    } else if (this.percentage > 4) {
      return 3;
    } else if (this.percentage > 2) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}

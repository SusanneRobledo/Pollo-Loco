class Statusbar extends DrawableObject {
  /**
   * Initializes the statusbar.
   */
  constructor() {
    super();
    this.x = 20;
    this.width = 155;
    this.height = 48;
  }

  /**
   * Sets the percentage of the statusbars.
   * @param {number} percentage - The percentage value (0 to 100) e.g. setPercentage(50)
   */
  setPercentage(percentage) {
    this.percentage = percentage; // => 0 ... 5
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the index of the image based on the percentage value.
   * @returns {number} - The index of the image.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 70) {
      return 4;
    } else if (this.percentage > 50) {
      return 3;
    } else if (this.percentage > 30) {
      return 2;
    } else if (this.percentage > 9) {
      return 1;
    } else {
      return 0;
    }
  }
}

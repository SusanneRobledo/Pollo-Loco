class Cloud extends MovableObject {
  height = 300;

  /**
   * Constructor for the Cloud class.
   * Initializes a cloud with the specified coordinates and image path.
   * @param {number} x - The x-coordinate of the cloud.
   * @param {number} y - The y-coordinate of the cloud.
   * @param {string} imagePath - The file path to the image of the cloud.
   */
  constructor(x, y, imagePath) {
    super().loadImage(imagePath);
    this.y = y;
    this.x = x + Math.random() * 500;
    this.width = 500;
    this.animate();
  }

  /**
   * Initiates the animation loop for the clouds.
   */
  animate() {
    setStoppableInterval(() => this.moveLeft(), 1000 / 60);
  }
}

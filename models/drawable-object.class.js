/**
 * Base class for drawable objects.
 * Provides properties for position, dimensions, image, and methods to load images.
 */
class DrawableObject {
  x = 120;
  y = 400;
  height = 150;
  width = 100;
  img;
  imageCache = {};
  currentImage = 0;

  offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  /**
   * Loads an image from the specified path and sets it as the object's image.
   * @param {string} path - The file path to the image.
   */
  loadImage(path) {
    this.img = new Image(); // new Image() ist gleich wie: this.img = document.getElementById('image') <img id="image" src>
    this.img.src = path;
  }

  /**
   * Draws the drawable object on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a frame around the drawable object on the canvas.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   */
  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";

      // Subtract offset values from position and dimensions
      const adjustedX = this.x + this.offset.left;
      const adjustedY = this.y + this.offset.top;
      const adjustedWidth = this.width - this.offset.left - this.offset.right;
      const adjustedHeight = this.height - this.offset.top - this.offset.bottom;

      ctx.rect(adjustedX, adjustedY, adjustedWidth, adjustedHeight);
      ctx.stroke();
    }
  }

  /**
   * Loads an array of images and stores them in the image cache.
   * @param {Array} arr - An array of image file paths e.g. ['img/image1.png', 'img/image2.png', ...]
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Checks if the current object is colliding with another object.
   * @param {*} mo - The other object to check for collision.
   * @returns {boolean} - True if there is a collision, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }
}

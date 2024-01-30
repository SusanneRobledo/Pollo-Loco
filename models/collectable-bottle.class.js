class CollectableBottle extends DrawableObject {
  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = y;
    this.height = 70;
    this.width = 65;
  }
}

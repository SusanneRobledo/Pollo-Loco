class StatusbarEndboss extends Statusbar {
  IMAGES = [
    "img/7_statusbars/2_statusbar_endboss/0.png",
    "img/7_statusbars/2_statusbar_endboss/20.png",
    "img/7_statusbars/2_statusbar_endboss/40.png",
    "img/7_statusbars/2_statusbar_endboss/60.png",
    "img/7_statusbars/2_statusbar_endboss/80.png",
    "img/7_statusbars/2_statusbar_endboss/100.png",
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 543;
    this.y = 0;
    this.setPercentage(100);
  }
}

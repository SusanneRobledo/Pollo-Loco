/**
 * Represents the keyboard input for controlling the game.
 */
class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  D = false;

  /**
   * Initializes the keyboard and sets up event listeners for key press and release.
   */
  constructor() {
    this.handleKeyPressEvents();
  }

  /**
   * Handles key press and release events.
   */
  handleKeyPressEvents() {
    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 39) {
        keyboard.RIGHT = true;
      }
      if (e.keyCode == 37) {
        keyboard.LEFT = true;
      }
      if (e.keyCode == 38) {
        keyboard.UP = true;
      }
      if (e.keyCode == 40) {
        keyboard.DOWN = true;
      }
      if (e.keyCode == 32) {
        keyboard.SPACE = true;
      }
      if (e.keyCode == 68) {
        keyboard.D = true;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.keyCode == 39) {
        keyboard.RIGHT = false;
      }
      if (e.keyCode == 37) {
        keyboard.LEFT = false;
      }
      if (e.keyCode == 38) {
        keyboard.UP = false;
      }
      if (e.keyCode == 40) {
        keyboard.DOWN = false;
      }
      if (e.keyCode == 32) {
        keyboard.SPACE = false;
      }
      if (e.keyCode == 68) {
        keyboard.D = false;
      }
    });
  }

  /**
   * Handles touch events for on-screen buttons.
   */
  handleBtnPressEvents() {
    this.handleRightBtnPress();
    this.handleLeftBtnPress();
    this.handleJumpBtnPress();
    this.handleThrowBtnPress();
  }

  /**
   * Handles Right Btn Press touch event.
   */
  handleRightBtnPress() {
    document.getElementById("btnRight").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.RIGHT = true;
    });

    document.getElementById("btnRight").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.RIGHT = false;
    });
  }

  /**
   * Handles Left Btn Press touch event.
   */
  handleLeftBtnPress() {
    document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.LEFT = true;
    });

    document.getElementById("btnLeft").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.LEFT = false;
    });
  }

  /**
   * Handles Jump Btn Press touch event.
   */
  handleJumpBtnPress() {
    document.getElementById("btnJump").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.SPACE = true;
    });

    document.getElementById("btnJump").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.SPACE = false;
    });
  }

  /**
   * Handles Throw Btn Press touch event.
   */
  handleThrowBtnPress() {
    document.getElementById("btnThrow").addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.D = true;
    });

    document.getElementById("btnThrow").addEventListener("touchend", (e) => {
      e.preventDefault();
      this.D = false;
    });
  }
}

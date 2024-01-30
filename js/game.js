let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let startScreen, playButton, pauseIcon, infoIcon, controlsIcon, touchControls;

gamePaused = false;
touchScreen = false;

game_music = new Audio("audio/game-music.mp3");
isSoundPlaying = false;

/**
 * Listens to if the music audio ends and resets the time to play the audio again.
 */
game_music.addEventListener(
  "ended",
  function () {
    this.currentTime = 0;
    this.play();
  },
  false
);

/**
 * Enables and closes the fullscreen mode.
 */
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

/**
 * Event listener for changing the Fullscreen Icon by checking if the Element is in Fullscreenmode.
 * The fullscreenElement returns true if its in Fullscreen.
 */
document.addEventListener("fullscreenchange", function () {
  let fullscreenIcon = document.getElementById("fullscreenIcon");
  let fullscreenActive = document.fullscreenElement;
  if (fullscreenActive) {
    fullscreenIcon.src = "./img/12_icons/CloseFullscreen.png";
  } else {
    fullscreenIcon.src = "./img/12_icons/OpenFullscreen.png";
  }
});

/**
 * Initializes the game by setting up the level, handling screen rotation,
 * obtaining references to necessary HTML elements, and starting the game music.
 */
function init() {
  initLevel();
  handleRotateScreen();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  this.game_music.play();

  this.startScreen = document.getElementById("startScreen");
  this.playButton = document.getElementById("playBtn");
  this.pauseIcon = document.getElementById("pauseIcon");
  this.infoIcon = document.getElementById("infoIcon");
  this.controlsIcon = document.getElementById("controlsIcon");
  this.touchControls = document.getElementById("touchControls");
}

/**
 * Handles the rotation of the screen by obtaining the style of the 'rotateScreen' element
 * and passing it to the 'pauseGameForRotateScreen' function.
 */
function handleRotateScreen() {
  let rotateScreen = document.getElementById("rotateScreen");
  let style = window.getComputedStyle(rotateScreen);
  pauseGameForRotateScreen(style);
}

/**
 * Pauses or resumes the game based on the display property of the provided style object.
 * @param {*} style
 */
function pauseGameForRotateScreen(style) {
  if (style.getPropertyValue("display").includes("flex")) gamePaused = true;
  else gamePaused = false;
}

/**
 * Listens for the screen to be resized calls the 'handleRotateScreen' function.
 */
window.addEventListener("resize", function () {
  handleRotateScreen();
});

/**
 * Handles the Restart and remove endscreen Function.
 */
function restartGame() {
  startGame();
  removeEndscreen();
}

/**
 * Sets up the main menu by updating various HTML elements and resetting game-related states.
 */
function mainMenu() {
  gamePaused = false;
  this.startScreen.style.backgroundImage = `url('img/9_intro_outro_screens/start/startscreen_1.png')`;
  this.playButton.style.display = "flex";
  this.pauseIcon.style.display = "none";
  this.infoIcon.style.display = "flex";
  this.controlsIcon.style.display = "flex";
  this.touchControls.style.display = "none";
  removeEndscreen();
  clearAllIntervals();
}

/**
 * Displays the end screen with the background image, depending on wether the player lost or won.
 * @param {string} IMAGE - The filename of the background image.
 */
function showEndscreen(IMAGE) {
  let endScreen = document.getElementById("endScreen");
  endScreen.style.visibility = "visible";
  endScreen.style.backgroundImage = `url('img/9_intro_outro_screens/game_over/${IMAGE}.png')`;
}

/**
 * Hides the end screen by setting its visibility to 'hidden'.
 */
function removeEndscreen() {
  let endScreen = document.getElementById("endScreen");
  endScreen.style.visibility = "hidden";
}

/**
 * Sets up a stoppable interval that repeatedly calls a function at specified intervals.
 * @param {Function} fn - The function to be executed at each interval.
 * @param {number} time - The time, in milliseconds, between each interval.
 * @returns {number} - The ID of the interval, which can be used to clear or stop the interval later.
 */
function setStoppableInterval(fn, time) {
  let Id = setInterval(fn, time);
  intervalIds.push(Id); //intervalIDs.push(interval);
  return Id;
}

/**
 * Clears all intervals by looping through all stored interval IDs in the 'intervalIds' array and clears each interval.
 * Resets the 'intervalIds' array to empty.
 */
function clearAllIntervals() {
  for (const Id of intervalIds) clearInterval(Id);
  intervalIds = [];
}

/**
 * Clears all intervals by looping through all stored interval IDs in the 'intervalIds' array and clears each interval.
 * without resetting the 'intervalIds' array.
 */
function stopAllIntervals() {
  for (const Id of intervalIds) clearInterval(Id);
}

/**
 * Starts the game by calling the 'init' function, updating UI elements, and handling touch controls.
 */
function startGame() {
  this.init();
  gamePaused = false;
  this.startScreen.style.backgroundImage = "none";
  this.playButton.style.display = "none";
  this.pauseIcon.style.display = "flex";
  this.infoIcon.style.display = "none";
  this.controlsIcon.style.display = "none";
  if (touchScreen) {
    this.touchControls.style.display = "flex";
    keyboard.handleBtnPressEvents();
  }
}

/**
 * Toggles the game between paused and unpaused.
 * It shows or hides the pause screen and switches the 'gamePaused' flag accordingly.
 */
function toggleGamePause() {
  let pauseScreen = document.getElementById("pauseScreen");
  pauseScreen.style.visibility = "visible";
  if (!gamePaused) gamePaused = true;
  else gamePaused = false;
}

/**
 * Opens the controls menu by displaying the controls container, setting its HTML content, and initiating a slide-in animation.
 * @param {string} html - The HTML content for the controls menu.
 */
function openControls(html) {
  let controls = document.getElementById("controlsContainer");
  controls.style.display = "flex";
  controls.innerHTML = html;
  slideInMenu();
}

/**
 * Creates slide Out Animation when closing the PopUp
 */
function closeControls() {
  slideOutMenu();
  if (gamePaused) {
    let controls = document.getElementById("controlsContainer");
    controls.innerHTML = generatePauseHTML();
  } else {
    setTimeout(() => {
      document.getElementById("controlsContainer").style.display = "none";
    }, 200);
  }
}

/**
 * Creates a slide In Animation when opening the PopUp
 */
function slideInMenu() {
  let popUp = document.getElementById("popUp");
  popUp.style.transform = "translateY(100%)";
  popUp.style.cssText =
    "animation:slide-in .25s ease; animation-fill-mode: forwards;";
}

/**
 * Creates a slide Out Animation when closing the PopUp
 */
function slideOutMenu() {
  let popUp = document.querySelector(".popUp");
  popUp.style.cssText =
    "animation:slide-out .20s ease; animation-fill-mode: forwards;";
}

/**
 * Toggles the game sound on and off.
 * If sound is playing, pauses it; otherwise, it resumes playing the music.
 */
function toggleSound() {
  isSoundPlaying ? this.game_music.pause() : this.game_music.play();
}

/**
 * Event handler for the 'onplaying' event of the game music.
 * Updates the sound icon and the 'isSoundPlaying' flag when the game music starts playing.
 */
this.game_music.onplaying = function () {
  let soundIcon = document.getElementById("soundIcon");
  isSoundPlaying = true;
  soundIcon.src = "./img/12_icons/SoundOff.png";
};

/**
 * Event handler for the 'onpause' event of the game music.
 * Updates the sound icon and the 'isSoundPlaying' flag when the game music is paused.
 */
this.game_music.onpause = function () {
  let soundIcon = document.getElementById("soundIcon");
  isSoundPlaying = false;
  soundIcon.src = "./img/12_icons/SoundOn.png";
};

/**
 * Sets the 'touchScreen' flag to true when the first touch is detected on the screen.
 */
window.addEventListener(
  "touchstart",
  function onFirstTouch() {
    touchScreen = true;
    window.removeEventListener("touchstart", onFirstTouch, false);
  },
  false
);

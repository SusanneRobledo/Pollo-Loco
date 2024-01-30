function generatePauseHTML() {
  return `
  <div id="popUp" class="popUp">
    <div id="pauseScreen" class="popUpMenu pauseBackgroundImg popUpBackground">
      <div class="pauseContent">

        <div class="roundIconWrapper">
          <img
            onclick="openControls(generateInfoHTML())"
            class="pauseMenuIcons"
            src="./img/12_icons/InfoIcon.png"
          />
          <img
            onclick="openControls(generateControlsHTML())"
            class="pauseMenuIcons"
            src="./img/12_icons/controlsIcon.png"
          />
        </div>

        <div class="bigIconWrapper">

          <img
            src="./img/12_icons/restartButton.png"
            id="restartBtn"
            class="pauseButtons hover-effect"
            onclick="startGame(); closeControls()"
          />

          <img
            src="./img/12_icons/resumeButton.png"
            id="resumeBtn"
            class="pauseButtons hover-effect"
            onclick="toggleGamePause(); closeControls()"
          />
        </div>

        <img
          src="./img/12_icons/menuButton.png"
          id="menuBtn"
          class="pauseButtons hover-effect"
          onclick="mainMenu(); closeControls()"
        />
        
      </div>
    </div>
    <div class="cactusBackground"></div>
    <div class="background"></div>   
  </div>
  `;
}

function generateInfoHTML() {
  return `
   <div id="popUp" class="popUp">
      <div id="infos" class="popUpMenu storyBackgroundImg popUpBackground">
        <img class="closeIcon hover-effect" onclick="closeControls()" src="img/12_icons/closeIcon.png"/>
        <div class="storyContent"><span>Help Pepe Peligroso free the Mexican Village from Señora Gallina. She has been terrorizing the Villagers.<br><br>But be careful!<br>It's a spicy mission!</span></div>
      </div>
      <div class="clickableOverlay" onclick="closeControls()"></div>
      <div class="cactusBackground"></div>
      <div class="background"></div>   
   </div>
   `;
}

function generateControlsHTML() {
  return `
    <div id="popUp" class="popUp">
        <div id="controls" class="popUpMenu controlsBackgroundImg popUpBackground">
            <img class="closeIcon hover-effect" onclick="closeControls()" src="img/12_icons/closeIcon.png"/>
            <div class="controlsContent">
              <div class="controlColumn">
                <div class="d-flex align-center"><img src="img/12_icons/LeftIcon.png" class="controlBtn margin-right-20"><span>walk left</span></div>
                <div class="d-flex align-center"><img src="img/12_icons/RightIcon.png" class="controlBtn margin-right-20"><span>walk right</span></div>
                <div class="d-flex align-center"><img src="img/12_icons/SpaceIcon.png" class="controlBtn margin-right-5"><p>/</p><img src="img/12_icons/JumpIcon.png" class="controlBtn margin-right-20"><span>jump</span></div>
                <div class="d-flex align-center"><img src="img/12_icons/ThrowIcon.png" class="controlBtn margin-right-5"><p>/</p><img src="img/12_icons/ThrowBottle.png" class="controlBtn margin-right-20"><span>throw</span></div>
              </div>
            </div>
        </div>
        <div class="clickableOverlay" onclick="closeControls()"></div>
        <div class="cactusBackground"></div>
        <div class="background"></div>
    </div>
    `;
}

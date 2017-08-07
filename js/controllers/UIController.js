UIController = function(parameters)
{
  this.parameters = parameters;
  this.preloader = document.getElementById("preloader");
  this.startButton = document.getElementById("startButton");
  this.warning = document.getElementById("warning");

  this.info = document.getElementById("info");
  this.control = document.getElementById("control");
  this.canvascontainer = document.getElementById("canvascontainer");
  this.fullscreenButton = document.getElementById("fullscreenButton");
}

UIController.prototype.showOpeningInfo = function()
{
  document.getElementById("info").style.display = 'inline';
  document.getElementById("control").style.display = 'none';
}

UIController.prototype.showController = function ()
{
  this.info.style.display = 'none';
  this.control.style.display = 'inline';
};

UIController.prototype.showLoadingState = function (itemsLoaded, itemsTotal)
{
  this.preloader.innerHTML = Math.floor(itemsLoaded/itemsTotal*100) + "%";
  document.body.style.cursor = "wait"
};

UIController.prototype.showLoadCompleteState = function ()
{
  this.preloader.style.display = "none";
  document.body.style.cursor = "auto";

  this.startButton.style.display = 'inline';
};

UIController.prototype.showPlayerReadyState = function ()
{
  this.startButton.innerHTML = "Start";
};

UIController.prototype.showPlayerBufferingState = function ()
{
  this.warning.innerHTML = "Buffering...";
  this.warning.display = "inline";
};

UIController.prototype.showPlayerErrorState = function ()
{
  this.warning.innerHTML = "YouTube Error. Try again later.";
  this.warning.display = "inline";
};

UIController.prototype.hideWarning = function ()
{
  this.warning.innerHTML = "";
  this.warning.display = "inline";
};

UIController.prototype.showDebugMode = function()
{
  this.stats = new Stats();
  this.stats.showPanel( 0 );

  this.gui = new dat.GUI(this.parameters);

  this.gui.add( this.parameters, 'smallGlowValue', 0,1000).listen();
  this.gui.add( this.parameters, 'bigGlowValue', 0,2000).listen();
  this.gui.add( this.parameters, 'innerGlowValue', 0,1000).listen();

  this.gui.add( this.parameters, 'flowIndex', 0,1000).listen();
  this.gui.add( this.parameters, 'flowWaveSpeed', 0,1000).listen();

  this.gui.add( this.parameters, 'unShadedPlanetValue', 0,1000).listen();
  this.gui.add( this.parameters, 'whiteOverlayPlanetValue', 0,1000).listen();
  this.gui.add( this.parameters, 'planetHue', 0,1000).onChange(this.parameters.planetHueChange).listen();

  this.gui.add( this.parameters, 'backgroundAlphaValue', 0,1000).listen();
  this.gui.add( this.parameters, 'backgroundHue', 0,1000).onChange(this.parameters.backgroundHueChange).listen();

  this.gui.add( this.parameters, 'backMeteorsAlphaValue', 0,1000).listen();
  this.gui.add( this.parameters, 'backMeteorsHue', 0,1000).onChange(this.parameters.backMeteorsHueChange).listen();

  this.gui.add( this.parameters, "sceneStateStable");
  this.gui.add( this.parameters, "sceneStateFirstExplosion");
  this.gui.add( this.parameters, "sceneStateOtherExplosions");
  this.gui.add( this.parameters, "sceneStateInitial");
}

UIController.prototype.triggerFullScreen = function()
{
  var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null);

  var docElm = document.documentElement;
  if (!isInFullScreen) {
      if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
      } else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
      }
  } else {
      if (document.exitFullscreen) {
          document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
      }
  }
}

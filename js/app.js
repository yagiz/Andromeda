window.onload = function(e)
{
  var playerController = new PlayerController();
  var animationController = new AnimationController({
    onMovingMeteorStart: function()
    {
      andromeda.startMovingMeteorAnimation();
    }
  });

  var andromeda = new Andromeda(animationController.parameters);
  var uiController = new UIController(animationController.parameters);

  if(window.location.href.indexOf("debug") != -1)
  {
    uiController.showDebugMode();
    document.body.appendChild( uiController.stats.dom );
  }

  this.canvascontainer.appendChild( andromeda.renderer.domElement );

  function checkPlayerTime()
  {
    console.log();
    if( playerController.isPlayerReady == true &&
        playerController.player.getPlayerState() == 1)
    {

      var time = Math.floor(playerController.player.getCurrentTime());

      console.log(time);

      if(time == 15 && !animationController.isSceneStateFirstExplosionStarted )
      {
        console.log("time == 15 && !animationController.isSceneStateFirstExplosionStarted");
        animationController.startSceneStateFirstExplosion();
      }

      if(time == 23 && !animationController.isChangeHueStarted )
      {
        animationController.startChangeHue();
      }

      if(time == 58 && !animationController.isSceneStateOtherFirstExplosionsStarted )
      {
        animationController.startSceneStateOtherFirstExplosion();
      }

      if(time == 132 && !animationController.isSceneStateOtherSecondExplosionStarted )
      {
        animationController.startSceneStateOtherSecondExplosion();
      }

      var state = playerController.player.getPlayerState();
      checkPlayerState(state);
    }
  }

  function render()
  {
    if(uiController.stats != undefined)
    {
      uiController.stats.begin();
    }

    checkPlayerTime();

    andromeda.render();

    if(uiController.stats != undefined)
    {
      uiController.stats.end();
    }

    requestAnimationFrame( render );
  }


  THREE.DefaultLoadingManager.onLoad = function ( )
  {
    playerController.loadPlayer();
    render();
  };

  THREE.DefaultLoadingManager.onProgress = function ( url, itemsLoaded, itemsTotal )
  {
    uiController.showLoadingState(itemsLoaded,itemsTotal);
  };



  uiController.startButton.onclick = function()
  {
    uiController.showController();
    playerController.player.playVideo();
  }



  playerController.onPlayerReady = function()
  {
    uiController.showLoadCompleteState();
    uiController.showPlayerReadyState();
  }

  checkPlayerState = function(state)
  {
    if ( state == 3 )
    {
      uiController.showPlayerBufferingState();

    }else if ( state == 0)
    {
      animationController.reset();
      uiController.showOpeningInfo();

    }else
    {
      uiController.hideWarning();
    }
  }

  playerController.onPlayerStateChange = function()
  {
    var state = playerController.player.getPlayerState();
    checkPlayerState(state);
  }

  playerController.onPlayerError = function()
  {
    uiController.showPlayerErrorState();
  }


  window.addEventListener( 'resize', onWindowResize, false );

  function onWindowResize()
  {
    andromeda.updateSizeAndAspect();
  }
}

AnimationController = function(config)
{

  var weakThis = this;
  this.config = config;

  this.isSceneStateFirstExplosionStarted = false;
  this.isSceneStateOtherFirstExplosionStarted = false;
  this.isSceneStateOtherSecondExplosionStarted = false;
  this.isChangeHueStarted = false;

  this.parameters = new function()
  {
    this.smallGlowValue = 0;
    this.bigGlowValue = 100;
    this.innerGlowValue = 100;

    this.unShadedPlanetValue = 30;

    this.whiteOverlayPlanetValue = 0;
    this.planetHue = 500;

    this.backgroundAlphaValue = 200;
    this.backgroundHue = 500;

    this.backMeteorsAlphaValue = 200;
    this.backMeteorsHue = 500;

    this.flowIndex = 500;
    this.flowWaveSpeed = 140;

    this.planetHueChange = function()
    {
      // if(huePlanet)
      // {
      //   //huePlanet.uniforms.hue.value = parameters.planetHue / 1000 - 0.5;
      // }
    }


    this.backgroundHueChange = function()
    {
      // if(hueBackground)
      // {
      //   //hueBackground.uniforms.hue.value = parameters.backgroundHue / 1000 - 0.5;
      // }
    }

    this.backMeteorsHueChange = function()
    {
      // if(hueBackMeteors)
      // {
      //   //hueBackMeteors.uniforms.hue.value = parameters.backMeteorsHue / 1000 - 0.5;
      // }
    }

    this.sceneStateFirstExplosion = function()
    {
      weakThis.sceneStateFirstExplosion();
    }

    this.sceneStateOtherExplosions = function()
    {
      weakThis.sceneStateOtherExplosion();
    }

    this.sceneStateStable = function()
    {
      weakThis.sceneStateStable();
    }

    this.sceneStateInitial = function()
    {
      weakThis.sceneStateInitial();
    }
  }
}

AnimationController.prototype.reset = function()
{
  this.isSceneStateFirstExplosionStarted = false;
  this.isSceneStateOtherFirstExplosionStarted = false;
  this.isSceneStateOtherSecondExplosionStarted = false;
  this.isChangeHueStarted = false;
  
  TWEEN.removeAll();
  this.sceneStateInitial();
}

AnimationController.prototype.sceneStateInitial = function ()
{
  var duration = 4000;

  var phase0 =
  {
    smallGlowValue: 0,
    bigGlowValue: 100,
    innerGlowValue: 100,
    unShadedPlanetValue: 30,
    whiteOverlayPlanetValue: 0,
    planetHue: 500,

    backgroundAlphaValue: 200,
    backMeteorsAlphaValue: 200,

    backgroundHue: 500
  }

  var tween = new TWEEN.Tween(this.parameters).easing( TWEEN.Easing.Sinusoidal.Out ).to(phase0, duration).start().onComplete(function() {

  });
};


AnimationController.prototype.sceneStateStable = function (isSlow)
{
  var duration = isSlow ? 12000 : 7000;

  var phase0 =
  {
    smallGlowValue: 300
  }

  var phase1 =
  {
    smallGlowValue: 180,
    bigGlowValue: 869,
    unShadedPlanetValue: 1000,
    innerGlowValue: 900,
    whiteOverlayPlanetValue: 0,
    backgroundAlphaValue: 800,
    backMeteorsAlphaValue: 1000,
  }

  new TWEEN.Tween(this.parameters).easing( TWEEN.Easing.Sinusoidal.Out ).to(phase0, duration*0.7).start();
  new TWEEN.Tween(this.parameters).easing( TWEEN.Easing.Sinusoidal.Out ).to(phase1, duration).start();
}


AnimationController.prototype.sceneStateOtherExplosion = function (isSlow)
{
  var phase0 =
  {
    smallGlowValue: 300,
    backgroundAlphaValue: 1000,
    backMeteorsAlphaValue: 1000,
  }

  var phase1 =
  {
    smallGlowValue: 500,
    bigGlowValue: 1000,
    whiteOverlayPlanetValue: 500
  }

  var that = this;
  setTimeout(function()
  {
    that.config.onMovingMeteorStart();
  }, 3 * 1000);

  new TWEEN.Tween(this.parameters).easing( TWEEN.Easing.Linear.None ).to(phase0, 4000).start();

  setTimeout(function()
  {
    new TWEEN.Tween(that.parameters).easing( TWEEN.Easing.Quadratic.Out ).to(phase1, 2200).start().onComplete(function() {

      setTimeout(function()
      {
        that.sceneStateStable(true);

      }, 1.0 * 1000);

    });

  }, 4.05 * 1000);
}


AnimationController.prototype.sceneStateFirstExplosion = function (isSlow)
{
  var phase0 =
  {
    smallGlowValue: 120,
    bigGlowValue: 700,
    backgroundAlphaValue: 400,
    backMeteorsAlphaValue: 400,
    innerGlowValue: 280,
  }

  var phase1 =
  {
    smallGlowValue: 600,
    bigGlowValue: 2000,
    unShadedPlanetValue: 1000,
    whiteOverlayPlanetValue: 1000,
    backgroundAlphaValue: 1000,
    backMeteorsAlphaValue: 1000,
    innerGlowValue: 1000,
  }

  var that = this;
  setTimeout(function()
  {
    that.config.onMovingMeteorStart();

  }, 2 * 1000);

  new TWEEN.Tween(this.parameters).easing( TWEEN.Easing.Linear.None ).to(phase0, 5000).start();

  setTimeout(function()
  {
    var tween = new TWEEN.Tween(that.parameters).easing( TWEEN.Easing.Quadratic.Out ).to(phase1, 2200).start().onComplete(function() {

      that.sceneStateStable(false);

    });

  }, 2.6 * 1000);
}

AnimationController.prototype.changeHue = function ()
{
  var duration = 20 * 1000;

  var finalParameters =
  {
    backgroundHue: 180 + Math.random()*(500-180),
  }

  var finalParameters2 =
  {
    planetHue: Math.random()*1000,
  }

  var that = this;

  new TWEEN.Tween(this.parameters).easing( TWEEN.Easing.Linear.None ).to(finalParameters, 10 * 1000).start();

  new TWEEN.Tween(this.parameters).easing( TWEEN.Easing.Linear.None ).to(finalParameters2, 20 * 1000).start().onComplete(function() {

    that.changeHue();

  });
}

AnimationController.prototype.startChangeHue = function ()
{
  this.changeHue();
  this.isChangeHueStarted = true;
}

AnimationController.prototype.startSceneStateFirstExplosion = function ()
{
  this.sceneStateFirstExplosion();
  this.isSceneStateFirstExplosionStarted = true;
}

AnimationController.prototype.startSceneStateOtherFirstExplosion = function ()
{
  this.sceneStateOtherExplosion();
  this.isSceneStateOtherFirstExplosionsStarted = true;
}

AnimationController.prototype.startSceneStateOtherSecondExplosion = function ()
{
  this.sceneStateOtherExplosion();
  this.isSceneStateOtherSecondExplosionStarted = true;
}

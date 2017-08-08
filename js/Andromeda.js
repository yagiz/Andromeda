Andromeda = function(parameters)
{
  this.parameters = parameters;

  this.backgroundScene = new BackgroundScene();
  this.backMeteorsScene = new BackMeteorsScene();
  this.planetScene = new PlanetScene();
  this.frontMeteorsScene = new FrontMeteorsScene();
  this.vignetteScene = new VignetteScene();

  this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000000 );

  this.renderer = new THREE.WebGLRenderer({ alpha: false, antialias:true });
  this.renderer.setClearColor (0x000000, 0);
  //this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
  this.renderer.setPixelRatio(1);
  this.renderer.setSize( window.innerWidth, window.innerHeight );
  this.renderer.sortObjects = true;
  this.renderer.autoClear = false;

  this.camera.position.z = 1450;
  this.camera.position.y = 100;
  this.camera.lookAt(new THREE.Vector3(0,0,0));


  this.backgroundRenderPass = new THREE.RenderPass( this.backgroundScene.scene, this.camera );
  this.backgroundRenderPass.clear = true
  this.backgroundRenderPass.clearDepth = true

  this.backMeteorsRenderPass = new THREE.RenderPass( this.backMeteorsScene.scene, this.camera );
  this.backMeteorsRenderPass.clear = false
  this.backMeteorsRenderPass.clearDepth = true

  this.planetRenderPass = new THREE.RenderPass( this.planetScene.scene, this.camera );
  this.planetRenderPass.clear = false
  this.planetRenderPass.clearDepth = true

  this.vignetteRenderPass = new THREE.RenderPass( this.vignetteScene.scene, this.camera );
  this.vignetteRenderPass.clear = false
  this.vignetteRenderPass.clearDepth = true

  this.frontMeteorsRenderPass = new THREE.RenderPass( this.frontMeteorsScene.scene, this.camera );
  this.frontMeteorsRenderPass.clear = false
  this.frontMeteorsRenderPass.clearDepth = true



  this.copyPass = new THREE.ShaderPass( THREE.CopyShader );
  this.copyPass.renderToScreen = true;

  this.hueBackground = new THREE.ShaderPass(THREE.HueSaturationShader);
  this.hueBackground.uniforms.hue.value = 0;

  this.hueBackMeteors = new THREE.ShaderPass(THREE.HueSaturationShader);
  this.hueBackMeteors.uniforms.hue.value = 0;

  this.huePlanet = new THREE.ShaderPass(THREE.HueSaturationShader);
  this.huePlanet.uniforms.hue.value = 0;



  this.composer = new THREE.EffectComposer( this.renderer );

  this.composer.addPass( this.backgroundRenderPass );
  this.composer.addPass( this.hueBackground );

  this.composer.addPass( this.backMeteorsRenderPass );
  this.composer.addPass( this.hueBackMeteors );

  this.composer.addPass( this.vignetteRenderPass );

  this.composer.addPass( this.planetRenderPass );
  this.composer.addPass( this.huePlanet );

  this.composer.addPass( this.frontMeteorsRenderPass );

  this.composer.addPass( this.copyPass );



  this.meteorLight = new THREE.SpotLight( 0xFFFFFF,2,2000);
  this.meteorLight.position.set( 0, 100, 500 );

  this.frontMeteorsScene.scene.add( this.meteorLight.target );
  this.meteorLight.target.position.set(0,0,2000);
  this.frontMeteorsScene.scene.add( this.meteorLight );

  return this;
}

Andromeda.prototype.updateSizeAndAspect = function ()
{
  this.camera.aspect = window.innerWidth / window.innerHeight;
  this.camera.updateProjectionMatrix();

  this.renderer.setSize( window.innerWidth, window.innerHeight );
  this.composer.setSize( window.innerWidth, window.innerHeight );
}

Andromeda.prototype.startMovingMeteorAnimation = function ()
{
  this.planetScene.movingMeteor.start();
};

Andromeda.prototype.render = function (time)
{
  this.planetScene.planet.setShadowOpacity(this.parameters.unShadedPlanetValue / 1000 );
  this.planetScene.planet.smallGlow.setScale(this.parameters.smallGlowValue / 1000 * 3 );
  this.planetScene.planet.bigGlow.setScale(this.parameters.bigGlowValue / 1000 * 0.8 );

  this.planetScene.planet.setBrightness(this.parameters.whiteOverlayPlanetValue / 1000);
  this.planetScene.planet.setInnerGlowOpacity(this.parameters.innerGlowValue / 1000);

  this.planetScene.planet.setFlowWaveRadius(this.parameters.flowWaveSpeed / 1000);
  this.planetScene.planet.render();


  this.backgroundScene.backgroundBack.setOpacity(this.parameters.backgroundAlphaValue / 1000);
  this.backgroundScene.backgroundFront.setOpacity(this.parameters.backgroundAlphaValue / 1000);

  this.backgroundScene.backgroundBack.move();
  this.backgroundScene.backgroundFront.move();

  this.backMeteorsScene.backMeteors.setOpacity(this.parameters.backMeteorsAlphaValue / 1000);
  this.backMeteorsScene.backMeteors.move();

  this.frontMeteorsScene.meteorField.move();

  this.huePlanet.uniforms.hue.value = (this.parameters.planetHue / 1000 - 0.5) * 2.0;
  this.hueBackMeteors.uniforms.hue.value = (this.parameters.backMeteorsHue / 1000 - 0.5) * 2.0 - this.huePlanet.uniforms.hue.value;
  this.hueBackground.uniforms.hue.value = (this.parameters.backgroundHue / 1000 - 0.5) * 2.0 - this.huePlanet.uniforms.hue.value - this.hueBackMeteors.uniforms.hue.value;

  TWEEN.update(time);
  this.composer.render();
};

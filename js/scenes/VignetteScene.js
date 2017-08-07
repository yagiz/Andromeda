VignetteScene = function()
{
  this.scene = new THREE.Scene();

  var scale = 7000;

  this.vignette = new Vignette({style: "back", width: scale, height: scale * 2 });

  this.vignette.container.position.y = -20;
  this.vignette.container.rotation.x = -0.06;

  this.scene.add(this.vignette.container);
}

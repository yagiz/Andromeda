BackgroundScene = function()
{
  this.scene = new THREE.Scene();

  var scale = 3200;

  this.backgroundBack = new Background({style:"back",width:scale*4, height:scale, detail:0, speed: 0.3});
  this.backgroundBack.container.position.z = -520;
  this.backgroundBack.container.rotation.x = Math.PI;

  this.backgroundFront = new Background({style:"front", width:scale*4, height:scale, detail:0, speed: 0.8});
  this.backgroundFront.container.position.z = -510;

  this.scene.add(this.backgroundBack.container);
  this.scene.add(this.backgroundFront.container);

  return this;
}

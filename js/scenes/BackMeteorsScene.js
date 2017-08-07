BackMeteorsScene = function()
{
  this.scene = new THREE.Scene();

  var scale = 300;

  this.backMeteors = new BackMeteorField({
    style: "back",
    width: scale * 30,
    height: scale,
    speed: 1
  });

  this.backMeteors.container.position.z = -500;
  
  this.scene.add(this.backMeteors.container);

  return this;
}

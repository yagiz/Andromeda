FrontMeteorsScene = function()
{
  this.scene = new THREE.Scene();

  this.meteorField = new MeteorField({
    count:500,
    modelCacheCount: 50,
    sizeMin: 0.1,
    sizeMax: 6,
    detail: 1,
    randomize: 2
  });

  this.scene.add(this.meteorField.container);
}

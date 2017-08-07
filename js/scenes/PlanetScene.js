PlanetScene = function()
{
  this.scene = new THREE.Scene();

  var size = 500;

  this.planet = new Planet({
    size: 500,
    smallGlow:{
      textureURL: "assets/glowSmall.png",
      size: size * 2.5,
      opacity: 0.5
    },
    bigGlow:{
      textureURL: "assets/glowBig.png",
      size: size * 2.0,
      opacity: 1.0
    },
  });

  this.scene.add(this.planet.container);


  var distanceScale = 4;

  this.movingMeteorStartPosition = new THREE.Vector3( -900 * distanceScale, 400 * distanceScale , -700 * distanceScale);

  this.movingMeteor = new MovingMeteor({
    size: 30,
    detail: 1,
    randomize: 1,
    startPosition: this.movingMeteorStartPosition,
  });

  this.scene.add(this.movingMeteor.container);
}

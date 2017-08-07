var MovingMeteor = function(config)
{
	this.config = config;

	this.container = new THREE.Group();
	this.meteor;

	var geometry = new THREE.OctahedronGeometry( config.size , config.detail );
	var material = new THREE.MeshBasicMaterial( {shading: THREE.SmoothShading, color: 0xFFFFFF,transparent: true} );

	this.meteor = new THREE.Mesh( geometry, material );
	material.shininess = 1;
	material.opacity = 0;

	this.container.add( this.meteor );

	var createSmallGlow = function()
	{
		var loader = new THREE.TextureLoader();
		var texture = loader.load("assets/glowSmall.png");

		var geometry = new THREE.PlaneGeometry( config.size*5, config.size*5, config.detail );
		var material = new THREE.MeshBasicMaterial( {map: texture, color: 0xFFFFFF, shininess: 0,transparent: true} );

		material.blending = THREE.AdditiveBlending;
		material.opacity = 0;

		smallGlow = new THREE.Mesh( geometry, material );
		smallGlow.position.z = -5;

		return smallGlow;
	}

	var createBigGlow = function()
	{
		var loader = new THREE.TextureLoader();
		var texture = loader.load("assets/meteorGlow.png");

		var geometry = new THREE.PlaneGeometry( config.size * 12, config.size * 8, config.detail );
		var material = new THREE.MeshBasicMaterial( {map: texture, color: 0xFFFFFF, shininess: 0,transparent: true} );

		material.blending = THREE.AdditiveBlending;
		material.opacity = 0;

		geometry.translate( -90, 0, 0 );

		bigGlow = new THREE.Mesh( geometry, material );

		bigGlow.rotation.z = -0.4;

		return bigGlow;
	}

	this.smallGlow = createSmallGlow();
	this.bigGlow = createBigGlow();

	this.container.add( this.smallGlow );
	this.container.add( this.bigGlow );

	this.smallGlow.position.z = -5;
	this.smallGlow.position.y = -20;

	this.bigGlow.position.y = -32.5;

	return this;
}

MovingMeteor.prototype.start = function()
{
	this.container.position.set( this.config.startPosition.x, this.config.startPosition.y , this.config.startPosition.z );

	var startPosition = {x: this.config.startPosition.x , y: this.config.startPosition.y , z: this.config.startPosition.z }
	var finalPosition = {x: -200 , y: 140 , z: -10 }

	this.smallGlow.scale.set(1,1,1);
	this.bigGlow.scale.set(1,1,1);

	this.meteor.material.opacity = 0;
	this.smallGlow.material.opacity = 0;
	this.bigGlow.material.opacity = 0;

	var weakThis = this;

	new TWEEN.Tween(this.container.position).easing( TWEEN.Easing.Quadratic.In ).to(finalPosition, 1300).start().onComplete(function() {

		weakThis.meteor.material.opacity = 0;
		weakThis.smallGlow.material.opacity = 0;
		weakThis.bigGlow.material.opacity = 0;

	});

	new TWEEN.Tween(this.smallGlow.scale).easing( TWEEN.Easing.Quadratic.In ).to({x:1.5,y:1.5,z:1.5}, 1300).start().onComplete(function() {});
	new TWEEN.Tween(this.bigGlow.scale).easing( TWEEN.Easing.Quadratic.In ).to({x:1.2,y:1.2,z:1.2}, 1300).start().onComplete(function() {});

	new TWEEN.Tween(this.meteor.material).easing( TWEEN.Easing.Quadratic.In ).to({opacity: 1}, 300).start().onComplete(function() {});
	new TWEEN.Tween(this.smallGlow.material).easing( TWEEN.Easing.Quadratic.In ).to({opacity: 0.4}, 300).start().onComplete(function() {});
	new TWEEN.Tween(this.bigGlow.material).easing( TWEEN.Easing.Quadratic.In ).to({opacity: 1}, 300).start().onComplete(function() {});
};

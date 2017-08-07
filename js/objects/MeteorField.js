var MeteorField = function(config)
{
	this.config = config;

	this.container = new THREE.Group();
	this.meteors = [];

	var horizontalTravel = 600;

	var loader = new THREE.TextureLoader();
	
	var material = new THREE.MeshPhongMaterial( {shading: THREE.SmoothShading, color: 0x161616} );
	material.shininess = 0.2;

	var geometries = [];

	for(var i=0; i<40; i++)
	{
		var size = config.sizeMin + Math.random() * (config.sizeMax - config.sizeMin);

	
		var geometry = new THREE.OctahedronGeometry( size, config.detail);

		for(var b=0; b<geometry.vertices.length; b++)
		{
			var vertice = geometry.vertices[b];

			vertice.x = (Math.random()-0.5) * config.randomize + vertice.x;
			vertice.y = (Math.random()-0.5) * config.randomize + vertice.y;
			vertice.z = (Math.random()-0.5) * config.randomize + vertice.z;		
		}

		geometries.push(geometry);
	}

	for(var i=0; i<config.count; i++)
	{

		var meteor = new SingleMeteor(config, material,geometries[Math.floor(Math.random()*geometries.length)]);
		this.meteors.push(meteor);

		meteor.speed = Math.random()*0.5 + 0.4;

		var rotationSpeedFactor = 0.005;
		var baseYPosition = 0;

		meteor.rotationXSpeed = Math.random()*rotationSpeedFactor + rotationSpeedFactor
		meteor.rotationYSpeed = Math.random()*rotationSpeedFactor + rotationSpeedFactor;
		meteor.rotationZSpeed = Math.random()*rotationSpeedFactor + rotationSpeedFactor;
			
		meteor.horizontalTravel = (1 - meteor.speed) * 800 + 400;

		meteor.container.position.x = (Math.random() - 0.5) * meteor.horizontalTravel * 2;
		meteor.container.position.z = meteor.speed * 900 + 500;

		if(meteor.speed < 0.6)
		{
			meteor.container.position.y = ( Math.random() - 0.5 ) * 100 - 60;
		}else
		{
			meteor.container.position.y = ( Math.random() - 0.5 ) * 20 - 20;
		}

		this.container.add(meteor.container);
	}

	return this;
}

MeteorField.prototype.move = function() 
{
	for(var i=0; i<this.meteors.length; i++)
	{
		var meteor = this.meteors[i];

		meteor.container.position.x -= meteor.speed;

		meteor.container.rotation.x -= meteor.rotationXSpeed;
		meteor.container.rotation.y -= meteor.rotationYSpeed;
		meteor.container.rotation.z -= meteor.rotationZSpeed;

		if(meteor.container.position.x<-meteor.horizontalTravel)
		{
			meteor.container.position.x = meteor.horizontalTravel;
		}
	}
};
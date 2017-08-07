var Background = function(config)
{
	this.config = config;

	this.container = new THREE.Group();

	this.planeLeft;
	this.planeRight;

	var loader = new THREE.TextureLoader();
	var texture;

	if(config.style == "front")
	{
		texture = loader.load("assets/background.png");

	}else if(config.style == "back")
	{
		texture = loader.load("assets/background.png");
	}

	texture.magFilter = THREE.NearestMipMapNearestFilter;
	texture.minFilter = THREE.NearestMipMapNearestFilter;

	var geometry = new THREE.PlaneGeometry( config.width, config.height, config.detail );
	var material = new THREE.MeshBasicMaterial( {map: texture, color: 0xffffff, transparent: true, side: THREE.DoubleSide} );

	material.depthTest = false;
	material.depthWrite = false;

	this.planeLeft = new THREE.Mesh( geometry, material );
	this.container.add( this.planeLeft );

	this.planeRight = new THREE.Mesh( geometry, material );
	this.container.add( this.planeRight );

	if(config.style == "front")
	{
		material.blending = THREE.AdditiveBlending;
		material.opacity = 1;


	}else
	{
		material.opacity = 1;
	}

	var randomOffset = Math.random() * config.width * 0.6;

	this.planeLeft.position.x = -config.width*0.5 + randomOffset;
	this.planeRight.position.x = config.width*0.5 + randomOffset;

	return this;
}

Background.prototype.setOpacity = function(opacity)
{
	var color = 0.1 + opacity * 0.9;

	this.planeLeft.material.color = new THREE.Color(color,color,color);	
	this.planeRight.material.color = new THREE.Color(color,color,color);	
}

Background.prototype.move = function()
{
	this.planeLeft.position.x += this.config.speed;
	this.planeRight.position.x += this.config.speed;

	if(this.planeRight.position.x < 0)
	{
		this.planeLeft.position.x += this.config.width;
		this.planeRight.position.x += this.config.width;

	}else if(this.planeLeft.position.x > 0)
	{
		this.planeLeft.position.x -= this.config.width;
		this.planeRight.position.x -= this.config.width;
	}	
}

var BackMeteorField = function(config)
{
	this.config = config;
	this.container = new THREE.Group();

	this.planeLeft;
	this.planeRight;

	var texture = new THREE.TextureLoader().load("assets/backMeteors.png");

	texture.magFilter = THREE.NearestMipMapNearestFilter;
	texture.minFilter = THREE.NearestMipMapNearestFilter;

	var geometry = new THREE.PlaneGeometry( config.width, config.height, config.detail );
	var material = new THREE.MeshBasicMaterial( {map: texture, color: 0xffffff, transparent: true} );

	material.depthTest = false;
	material.depthWrite = false;
	material.blending = THREE.AdditiveBlending;

	this.planeLeft = new THREE.Mesh( geometry, material );
	this.container.add( this.planeLeft );

	this.planeRight = new THREE.Mesh( geometry, material );
	this.container.add( this.planeRight );


	var randomOffset = Math.random() * this.config.width * 0.6;
	this.planeLeft.position.x = -this.config.width*0.5 + randomOffset;
	this.planeRight.position.x = this.config.width*0.5 + randomOffset;

	return this;
}

BackMeteorField.prototype.setOpacity = function(opacity) 
{
	var color = 0.1 + opacity * 0.9;
	
	this.planeLeft.material.color = new THREE.Color(color,color,color);	
	this.planeRight.material.color = new THREE.Color(color,color,color);	
};

BackMeteorField.prototype.move = function()
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

var PlaneGlow = function(config)
{
	this.config = config;

	this.plane;

	var loader = new THREE.TextureLoader();
	var texture = loader.load(config.textureURL);

	var geometry = new THREE.PlaneGeometry( config.size, config.size, config.detail );
	var material = new THREE.MeshBasicMaterial( {map: texture, color: 0xFFFFFF, shininess: 0,transparent: true} );

	material.blending = THREE.AdditiveBlending;
	material.opacity = config.opacity;

	this.plane = new THREE.Mesh( geometry, material );

	return this;
}

PlaneGlow.prototype.setScale = function(scale)
{
	this.plane.scale.set( 1 + scale , 1 + scale , 1 + scale );
};

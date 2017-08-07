var Vignette = function(config)
{
	this.container = new THREE.Group();
	this.plane;

	var texture = new THREE.TextureLoader().load("assets/overlayVignette.png");

	texture.magFilter = THREE.NearestMipMapNearestFilter;
	texture.minFilter = THREE.NearestMipMapNearestFilter;

	var geometry = new THREE.PlaneGeometry( config.width, config.height, config.detail );
	var material = new THREE.MeshBasicMaterial( {map: texture, transparent: true} );

	material.depthTest = false;
	material.depthWrite = false;
	material.blending = THREE.MultiplyBlending;
	material.opacity = 0;

	this.plane = new THREE.Mesh( geometry, material );
	this.container.add( this.plane );

	return this;
}

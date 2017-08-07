var SingleMeteor = function(config,material,geometry)
{
	this.container = new THREE.Group();

	this.meteor = new THREE.Mesh( geometry, material );

	this.meteor.rotation.x = Math.random() * (Math.PI * 2);
	this.meteor.rotation.y = Math.random() * (Math.PI * 2);
	this.meteor.rotation.z = Math.random() * (Math.PI * 2);

	this.container.add( this.meteor );

	return this;
}
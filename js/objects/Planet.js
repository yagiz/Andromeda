var Planet = function(config)
{
	this.config = config;

	this.container = new THREE.Group();
	this.planet;

	this.smallGlow = new PlaneGlow(config.smallGlow);
	this.bigGlow = new PlaneGlow(config.bigGlow);

	this.container.add( this.bigGlow.plane );
	this.container.add( this.smallGlow.plane );

	this.bigGlow.plane.position.z = -15;
	this.bigGlow.plane.position.y = -32.5;

	this.smallGlow.plane.position.z = -10;
	this.smallGlow.plane.position.y = -20;




	var loader = new THREE.TextureLoader();


	var planetTexture = loader.load("assets/planet.png");
	planetTexture.magFilter = THREE.LinearFilter;
	planetTexture.minFilter = THREE.LinearFilter;

	var planetInnerGlowTexture = loader.load("assets/planetInnerGlow.png");
	planetInnerGlowTexture.magFilter = THREE.LinearFilter;
	planetInnerGlowTexture.minFilter = THREE.LinearFilter;

	var planetExplosionGlowTexture = loader.load("assets/planetExplosionGlow.png");
	planetExplosionGlowTexture.magFilter = THREE.LinearFilter;
	planetExplosionGlowTexture.minFilter = THREE.LinearFilter;

	var planetShadowTexture = loader.load("assets/planetShadow.png");
	planetShadowTexture.magFilter = THREE.LinearFilter;
	planetShadowTexture.minFilter = THREE.LinearFilter;


	var geometry = new THREE.SphereBufferGeometry( config.size, 64,64);

	var vertShader = document.getElementById('vertexShader').textContent;
	var fragShader = document.getElementById('fragmentShader').textContent;

	this.shaderUniforms =
	{
		planetTexture: { type: 't', value: planetTexture },
		innerGlowTexture: { type: 't', value: planetInnerGlowTexture },
		meteorGlowTexture: { type: 't', value: planetExplosionGlowTexture },
		shadowTexture: { type: 't', value: planetShadowTexture },

		time: { type: 'f', value: 0},

		innerGlowAlpha: { type: 'f', value: 0.1},
		meteorGlowAlpha: { type: 'f', value: 0.1},
		explosionGlowAlpha: { type: 'f', value: 0.1},
		shadowAlpha: { type: 'f', value: 0},

		flowWaveRadius: { type: 'f', value: 0.1},
		flowIndex: { type: 'f', value: 0}
	};

	var material = new THREE.ShaderMaterial({
		uniforms: this.shaderUniforms,
		vertexShader: vertShader,
		fragmentShader: fragShader
	});

	this.planet = new THREE.Mesh( geometry, material );
	this.planet.position.z = 0;
	this.planet.renderOrder = 500;

	this.container.add( this.planet );

	return this;
}

Planet.prototype.setFlowWaveRadius = function(radius)
{
	this.shaderUniforms.flowWaveRadius.value = radius;
}

Planet.prototype.setShadowOpacity = function(opacity)
{
	this.shaderUniforms.shadowAlpha.value = opacity;
};

Planet.prototype.setInnerGlowOpacity = function(opacity)
{
	this.shaderUniforms.innerGlowAlpha.value = opacity;
};

Planet.prototype.setBrightness = function(brightness)
{
	this.shaderUniforms.meteorGlowAlpha.value = brightness / 0.5;
	this.shaderUniforms.explosionGlowAlpha.value = brightness;
};

Planet.prototype.render = function()
{
	this.shaderUniforms.time.value += 0.002;
	this.shaderUniforms.flowIndex.value = 0.5 + Math.sin(this.shaderUniforms.time.value * 0.2) * 0.5;
};

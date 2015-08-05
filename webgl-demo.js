var canvas;
var gl;

function initWebGL() {
	gl = null;

	try {
		gl = canvas.getContext("experimental-webgl");
	}
	catch(e) {
	}

	if (!gl) {
		alert("Unable to initialize WebGL. Your browser may not support it.");
	}
}

function resize_canvas(){
	canvas = document.getElementById("glcanvas");
	canvas.style.width = window.innerWidth;
	canvas.style.height = window.innerHeight;
}

window.addEventListener('resize', resize_canvas);

function start() {

	init_mouse_controls();	
	resize_canvas();

	initWebGL(canvas);

	if (gl) {
		gl.clearColor(0.0, 0.02, 0.04, 1.0);  // Clear to black, fully opaque
		gl.clearDepth(1.0);                 // Clear everything
		gl.enable(gl.DEPTH_TEST);           // Enable depth testing
		gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
			
		basic_shader = new Shader("shader-vs", "shader-fs");
		
		skybox = new Sphere(500, 20, 20);
		skybox.set_texture("./assets/textures/celestial_sphere.png");
		skybox.set_shader(basic_shader);
		
		planet = new Planet("Earth");
		
		clouds = new Sphere(5.45, 50, 50);
		clouds.set_texture("./assets/textures/clouds.png");
		clouds.set_shader(basic_shader);

		setInterval(drawScene, 15);
	}
}

function drawScene() {

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	perspectiveMatrix = makePerspective(45, window.innerWidth/window.innerHeight, 0.1, 5000.0);

	loadIdentity();

	if(TERRAIN.user.free_mode){
		mvRotate(TERRAIN.user.rotation.x, [1,0,0]);
		mvRotate(TERRAIN.user.rotation.y, [0,1,0]);
		mvTranslate([TERRAIN.user.position.x,0-TERRAIN.user.position.y,TERRAIN.user.position.z]);
	}
	else{
		mvTranslate([TERRAIN.user.position.x,0-TERRAIN.user.position.y,TERRAIN.user.position.z]);
		mvRotate(TERRAIN.user.rotation.x, [1,0,0]);
		mvRotate(TERRAIN.user.rotation.y, [0,1,0]);
	}

	skybox.draw();
	
	planet.draw();
	
	if(planet.name.toLowerCase() == "earth"){
		gl.enable(gl.BLEND);
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.FRONT);
		clouds.draw();
		gl.disable(gl.CULL_FACE);
	}
  
}
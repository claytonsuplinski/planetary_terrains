document.addEventListener('keydown', function(event) {
	if(TERRAIN.keys_pressed.indexOf(event.keyCode) == -1){
		TERRAIN.keys_pressed.push(event.keyCode);
	}
});

document.addEventListener('keyup', function(event) {
	TERRAIN.keys_pressed.splice(TERRAIN.keys_pressed.indexOf(event.keyCode), 1);
});

setInterval(function(){
	if(TERRAIN.keys_pressed.indexOf(87) != -1) { // W
		// Go forwards
		if(TERRAIN.user.free_mode){
			var tmp_angle = -TERRAIN.user.rotation.y*TERRAIN.constants.to_radians;
			TERRAIN.user.position.x += Math.sin(tmp_angle);
			TERRAIN.user.position.z += Math.cos(tmp_angle);
		}
    }
	if(TERRAIN.keys_pressed.indexOf(83) != -1) { // S
        // Go backwards
		if(TERRAIN.user.free_mode){
			var tmp_angle = -TERRAIN.user.rotation.y*TERRAIN.constants.to_radians;
			TERRAIN.user.position.x -= Math.sin(tmp_angle);
			TERRAIN.user.position.z -= Math.cos(tmp_angle);
		}
    }
	if(TERRAIN.keys_pressed.indexOf(68) != -1) { // D
        // Rotate right
		if(TERRAIN.user.free_mode){
			TERRAIN.user.rotation.y++;
			while(TERRAIN.user.rotation.y < 0){
				TERRAIN.user.rotation.y += 360;
			}
			TERRAIN.user.rotation.y %= 360;
		}
    }
	if(TERRAIN.keys_pressed.indexOf(65) != -1) { // A
        // Rotate left
		if(TERRAIN.user.free_mode){
			TERRAIN.user.rotation.y--;
			while(TERRAIN.user.rotation.y < 0){
				TERRAIN.user.rotation.y += 360;
			}
			TERRAIN.user.rotation.y %= 360;
		}
    }
	if(TERRAIN.keys_pressed.indexOf(81) != -1) { // Q
        // Go up
		if(TERRAIN.user.free_mode){
			TERRAIN.user.position.y++;
		}
    }
	if(TERRAIN.keys_pressed.indexOf(90) != -1) { // Z
        // Go down
		if(TERRAIN.user.free_mode){
			TERRAIN.user.position.y--;
		}
    }
	if(TERRAIN.keys_pressed.indexOf(38) != -1) { // Up Arrow
        // Go down
		if(TERRAIN.user.free_mode){
			TERRAIN.user.rotation.x--;
		}
    }
	if(TERRAIN.keys_pressed.indexOf(40) != -1) { // Down Arrow
        // Go down
		if(TERRAIN.user.free_mode){
			TERRAIN.user.rotation.x++;
		}
		alert(TERRAIN.user.position.z);
    }
}, 60);

function init_mouse_controls(){
	$("#glcanvas")
		.bind('touchstart', function(event){
			var touch = event.originalEvent.touches[0];
			TERRAIN.mouse.x = touch.pageX;
			TERRAIN.mouse.y = touch.pageY;
			TERRAIN.mouse.left_down = true;
		})
		.bind('touchmove', function(event){
			event.preventDefault();
			var touch = event.originalEvent.touches[0];
			if(TERRAIN.mouse.left_down){
				TERRAIN.user.rotation.y += (parseFloat(touch.pageX) - TERRAIN.mouse.x);
				TERRAIN.user.rotation.x += (parseFloat(touch.pageY) - TERRAIN.mouse.y)/2;
				while(TERRAIN.user.rotation.y < 0){
					TERRAIN.user.rotation.y += 360;
				}
				while(TERRAIN.user.rotation.y > 360){
					TERRAIN.user.rotation.y -= 360;
				}
				if(TERRAIN.user.rotation.x > 90){
					TERRAIN.user.rotation.x = 90;
				}
				if(TERRAIN.user.rotation.x < -90){
					TERRAIN.user.rotation.x = -90;
				}
			}
			TERRAIN.mouse.x = touch.pageX;
			TERRAIN.mouse.y = touch.pageY;
		})
		.bind('touchend', function(event){
			var touch = event.originalEvent.touches[0];
			TERRAIN.mouse.left_down = false;
		})
		.bind('gesturechange', function(event){
			event.preventDefault();
			
			var zoom_factor = parseInt(event.originalEvent.scale);
			if(zoom_factor > 1){
				TERRAIN.user.position.z += (zoom_factor - 1);
			}
			else{
				TERRAIN.user.position.z -= (1 - zoom_factor);
			}
			if(TERRAIN.user.position.z > 0){
				TERRAIN.user.position.z = 0;
			}
			if(TERRAIN.user.position.z < -360){
				TERRAIN.user.position.z = -360;
			}
		})
		.mousedown(function (event){
			TERRAIN.mouse.x = event.pageX;
			TERRAIN.mouse.y = event.pageY;
			if(event.which == 1){ // Left mouse
				TERRAIN.mouse.left_down = true;
			}
			if(event.which == 3){ // Right mouse
				TERRAIN.mouse.right_down = true;
			}
		})	
		.mousemove(function(event) {
			if(TERRAIN.mouse.left_down){
				TERRAIN.user.rotation.y += (event.pageX - TERRAIN.mouse.x);
				TERRAIN.user.rotation.x += (event.pageY - TERRAIN.mouse.y)/2;
				while(TERRAIN.user.rotation.y < 0){
					TERRAIN.user.rotation.y += 360;
				}
				while(TERRAIN.user.rotation.y > 360){
					TERRAIN.user.rotation.y -= 360;
				}
				if(TERRAIN.user.rotation.x > 90){
					TERRAIN.user.rotation.x = 90;
				}
				if(TERRAIN.user.rotation.x < -90){
					TERRAIN.user.rotation.x = -90;
				}
			}
			if(TERRAIN.mouse.right_down){
				TERRAIN.user.position.z -= (event.pageY - TERRAIN.mouse.y);
				if(TERRAIN.user.position.z > 0){
					TERRAIN.user.position.z = 0;
				}
				if(TERRAIN.user.position.z < -360){
					TERRAIN.user.position.z = -360;
				}
			}
			TERRAIN.mouse.x = event.pageX;
			TERRAIN.mouse.y = event.pageY;
		})
		.bind('mousewheel DOMMouseScroll', function (event){
			var tmp_delta = parseInt(parseInt(event.originalEvent.wheelDelta)/4 || -parseInt(event.originalEvent.detail)*8);
			TERRAIN.user.position.z += tmp_delta/4;
			if(TERRAIN.user.position.z > 0){
				TERRAIN.user.position.z = 0;
			}
			if(TERRAIN.user.position.z < -360){
				TERRAIN.user.position.z = -360;
			}
		});
		
	$("body")
		.mouseup(function (event){
			if(event.which == 1){ // Left mouse
				TERRAIN.mouse.left_down = false;
			}
			if(event.which == 3){ // Right mouse
				TERRAIN.mouse.right_down = false;
			}
		});
}
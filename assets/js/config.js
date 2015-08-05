TERRAIN = {};

TERRAIN.constants = {};
TERRAIN.constants.to_radians = Math.PI/180;

TERRAIN.keys_pressed = [];

TERRAIN.user = {};
TERRAIN.user.free_mode = false;
TERRAIN.user.position = {};
TERRAIN.user.position.x = 0;
TERRAIN.user.position.y = 0;
TERRAIN.user.position.z = -20;
TERRAIN.user.rotation = {};
TERRAIN.user.rotation.x = 0;
TERRAIN.user.rotation.y = 0;

TERRAIN.mouse = {};
TERRAIN.mouse.left_down = false;
TERRAIN.mouse.right_down = false;
TERRAIN.mouse.x = "";
TERRAIN.mouse.y = "";

TERRAIN.models = {};

TERRAIN.data = {};
TERRAIN.data["earth"] = {
	"temp": 58.3,
	"highest": 8850,
	"lowest": -413,
	"radius": 6371,
	"sun": 92.96
};
TERRAIN.data["venus"] = {
	"temp": 864,
	"highest": 11000,
	"lowest": -2900,
	"radius": 6051,
	"sun": 67.24
};
TERRAIN.data["mars"] = {
	"temp": -67,
	"highest": 21229,
	"lowest": -8200,
	"radius": 3389,
	"sun": 141.6
};
TERRAIN.data["mercury"] = {
	"temp": 800,
	"highest": 2200,
	"lowest": -7650,
	"radius": 2439,
	"sun": 35.98
};
TERRAIN.data["moon"] = {
	"temp": -9.4,
	"highest": 10786,
	"lowest": -9094,
	"radius": 1737,
	"sun": 150
};
TERRAIN.data["phobos"] = {
	"temp": 25,
	"highest": "?",
	"lowest": "?",
	"radius": 11,
	"sun": 148.6
};
TERRAIN.data["deimos"] = {
	"temp": -40.2,
	"highest": "?",
	"lowest": "?",
	"radius": 6.2,
	"sun": 156.6
};
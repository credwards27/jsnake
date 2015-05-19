/* settings.js
	
	Settings object for the game.
*/

(function(sys) {

"use strict";

// Define settings
var settings = {};

// Game manager settings.
settings.gm = {
	// Frames per second.
	fps: 60
};

// Game board settings.
settings.board = {
	columns: 32,
	rows: 24
};

// Snake settings.
settings.snake = {
	// Snake slot movements per second.
	speed: 8,
	startLength: 15,
	startCol: 15,
	startRow: 16,
	startDirection: "right",
	width: 16,
	color: "#000000"
};

sys.g.settings = settings;

})(jsnake);

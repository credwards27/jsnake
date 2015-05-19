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
	fps: 60,
	
	// Snake slot movements per second.
	speed: 3
};

// Game board settings.
settings.board = {
	columns: 32,
	rows: 24
};

// Snake settings.
settings.snake = {
	startLength: 5,
	startCol: 8,
	startRow: 16,
	startDirection: "right",
	width: 16,
	color: "#000000"
};

sys.g.settings = settings;

})(jsnake);

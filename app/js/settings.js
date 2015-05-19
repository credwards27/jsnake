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
	width: 16,
	startLength: 5,
	startCol: 12,
	startRow: 18,
	startDirection: "right"
};

sys.g.settings = settings;

})(jsnake);

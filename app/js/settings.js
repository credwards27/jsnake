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
	slotsX: 32,
	slotsY: 24
};

sys.g.settings = settings;

})(jsnake);

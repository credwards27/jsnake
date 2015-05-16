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
	width: 32,
	height: 24
};

sys.g.settings = settings;

})(jsnake);

/* main.js
	
	Main app entry script for jSnake game.
	
	Version 0.0.1
*/

// Global object definition.
var jsnake;

(function() {

"use strict";

// Create namespace
jsnake = jsnake || {
	// Collection of global objects and variables for the system.
	g: {
		// Game settings object.
		settings: null,
		
		// Reference to 2D canvas context.
		context: null,
		
		// Game manager instance.
		gameManager: null,
		
		// Input manager instance.
		inputManager: null,
	},
	
	// Collection of object classes for the system.
	c: {},
	
	// Collection of global utility functions.
	u: {},
	
	/* Main program initializer.
		id - ID string for the game canvas. Canvas width is determined by width
			and height attributes, so canvas should not have its own padding
			if also using box-sizing: border-box.
	*/
	init: function(id) {
		this.g.gameManager = new this.c.GameManager(id, this.g.settings.gm);
	}
};

})();

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
		// Game manager instance.
		gameManager: null
	},
	
	// Collection of object classes for the system.
	c: {},
	
	// Collection of global utility functions.
	u: {},
	
	/* Main program initializer.
	*/
	init: function() {
		this.g.gameManager = new this.c.GameManager(this.g.settings);
	}
};

})();

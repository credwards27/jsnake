/* main.js
	
	Main app entry script for jSnake game.
	
	Version 0.0.1
*/

// Global object definition.
var jsnake;

(function() {

"use strict";

/* Global system controller.
*/
jsnake = jsnake || (function() {
	// Create system instance
	var sys = function(args) { return new sys.fn.init(args); };
	
	// Create system controller prototype (and set alias)
	sys.fn = sys.prototype = {};
	
	/*
	 * GLOBAL SYSTEM OBJECTS AND VARIABLES
	*/
	
	// Collection of global objects and variables for the system
	sys.fn.g = {};
	
	/*
	 * STATIC PROTOTYPE FUNCTIONS
	*/
	
	/* Default initializer function
		args - Arguments
	*/
	sys.fn.init = function(args) {
		return this;
	};
	
	/*
	 * SYSTEM CLASSES
	*/
	
	// Collection of object classes for the system
	sys.fn.c = {};
	
	/*
	 * SYSTEM INITIALIZERS
	*/
	
	// Set system object prototype
	sys.fn.init.prototype = sys.fn;
	
	// Return the system instance
	return sys;
})();

})();

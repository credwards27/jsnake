/* GameManager.js
	
	Game manager class.
*/

(function(sys) {

"use strict";

/* Constructor for game manager object.
	settings - Settings object for the game.
*/
function GameManager(settings) {
	// Default parameters
	settings = typeof settings === "object" ? settings : {};
	
	/*
	 * PRIVATE VARIABLES
	*/
	
	// Reference to self
	var mSelf = this;
	
	/*
	 * PUBLIC VARIABLES
	*/
	
	/*
	 * PRIVILEGED FUNCTIONS
	*/
	
	/*
	 * PRIVATE FUNCTIONS
	*/
	
	// Initializer
	(function() {
	})();
};

/*
 * STATIC FUNCTIONS
*/

/*
 * STATIC INITIALIZERS
*/

sys.c.GameManager = GameManager;

})(jsnake);

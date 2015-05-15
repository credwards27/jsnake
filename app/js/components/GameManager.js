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
	
	// Reference to self.
	var mSelf = this,
	
	// Frames per second.
	FPS = typeof settings.gm.fps === "number" ? settings.gm.fps : 60,
	
	// Milliseconds per frame.
	MSPF = 1000 / FPS,
	
	// Game loop interval ID.
	mLoopId = -1;
	
	/*
	 * PUBLIC VARIABLES
	*/
	
	/*
	 * PRIVILEGED FUNCTIONS
	*/
	
	/* Starts the update loop.
	*/
	this.startLoop = function() {
		if (mLoopId === -1) {
			mLoopId = setInterval(function() {
				update();
			}, MSPF);
		}
	};
	
	/* Stops the update loop.
	*/
	this.stopLoop = function() {
		if (mLoopId !== -1) {
			window.clearInterval(mLoopId);
			mLoopId = -1;
		}
	};
	
	/*
	 * PRIVATE FUNCTIONS
	*/
	
	function update() {
		console.log("running");
	}
	
	// Initializer
	(function() {
		mSelf.startLoop();
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

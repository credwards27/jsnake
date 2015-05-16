/* GameManager.js
	
	Game manager class.
*/

(function(sys) {

"use strict";

/* Constructor for game manager object.
	id - ID string for the game canvas.
	settings - Settings object for the game.
*/
function GameManager(id, settings) {
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
	
	// Input manager for the game.
	mInputManager = null,
	
	// Game loop interval ID.
	mLoopId = -1,
	
	// Canvas DOM element.
	mCanvas = null,
	
	// Canvas context.
	mContext = null;
	
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
		mCanvas = document.getElementById(id);
		
		// Error check
		if (sys.u.isCanvas(mCanvas) === false) {
			throw new GameError(
				"Parameter 'id' must be the ID string for a canvas element.");
		}
		
		// Instantiate subsystems
		mInputManager = new sys.c.InputManager(mCanvas);
	})();
};

/* Custom game error class.
	msg - Message to be displayed with error.
*/
function GameError(msg) {
	this.name = "GameError";
	this.message = msg;
	this.stack = (new Error()).stack;
}
GameError.prototype = Object.create(Error.prototype);
GameError.prototype.constructor = GameError;

/*
 * STATIC FUNCTIONS
*/

/*
 * STATIC INITIALIZERS
*/

sys.c.GameManager = GameManager;
sys.c.GameError = GameError;

})(jsnake);

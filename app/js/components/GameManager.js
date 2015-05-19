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
	FPS = 60,
	
	// Milliseconds per frame.
	MSPF = -1,
	
	// Current time in milliseconds.
	mCurrTime = null,
	
	// Time passed since last loop update.
	mDeltaTime = 0,
	
	// Elapsed time since the game loop last started.
	mElapsedTime = 0,
	
	// Input manager instance container.
	mInputManager = null,
	
	// Game loop interval ID.
	mLoopId = -1,
	
	// Canvas DOM element.
	mCanvas = null,
	
	// Canvas context.
	mContext = null,
	
	// Game board instance container.
	mBoard = null,
	
	// Snake player instance container.
	mSnake = null;
	
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
			mElapsedTime = (new Date()).getTime();
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
		// Calculate delta time
		mCurrTime = (new Date()).getTime();
		mDeltaTime = mCurrTime - mElapsedTime;
		
		// Clear the canvas
		mContext.clearRect(0, 0, mCanvas.width, mCanvas.height);
		
		// Run object update functions
		mSnake.update(mDeltaTime);
		
		// Update elapsed time
		mElapsedTime += mDeltaTime;
	}
	
	// Initializer
	(function() {
		// Update frames per second to value in settings if available
		if (typeof settings.fps === "number" && settings.fps > 0) {
			FPS = settings.fps;
		}
		
		// Set milliseconds per frame cache
		MSPF = 1000 / FPS;
		
		// Find game canvas
		mCanvas = document.getElementById(id);
		
		// Error check
		if (sys.u.isCanvas(mCanvas) === false) {
			throw new GameError(
				"Parameter 'id' must be the ID string for a canvas element.");
		}
		
		// Get canvas context and store as system global
		mContext = mCanvas.getContext("2d");
		sys.g.context = mContext;
		
		// Instantiate subsystems
		mInputManager = new sys.c.InputManager(mCanvas);
		sys.g.inputManager = mInputManager;
		mBoard = new sys.c.Board(mCanvas, mContext, sys.g.settings.board);
		mSnake = new sys.c.Snake(mContext, mBoard, sys.g.settings.snake);
		
		// Initialize snake object
		mSnake.init();
		
		// Start the game loop
		mSelf.startLoop();
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

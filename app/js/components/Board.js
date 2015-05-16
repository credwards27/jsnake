/* Board.js
	
	Class representing the game board.
*/

(function(sys) {

"use strict";

/* Constructor for Board object.
	canvas - Canvas DOM element.
	context - Canvas 2D context object.
	settings - Settings object for the board.
*/
function Board(canvas, context, settings) {
	// Default parameters
	if (sys.u.isCanvas(canvas) === false) {
		throw new sys.c.GameError(
			"Parameter 'canvas' is not a canvas DOM element.");
	}
	else if (sys.u.isContext(context) === false) {
		throw new sys.c.GameError(
			"Parameter 'context' is not a 2D canvas context.");
	}
	
	/*
	 * PRIVATE VARIABLES
	*/
	
	// Reference to self.
	var mSelf = this,
	
	// Game canvas DOM element.
	mCanvas = canvas,
	
	// Game canvas 2D context object.
	mContext = context,
	
	// Number of grid slots along the x axis.
	mWidth = typeof settings.width === "number" ? settings.width : 32,
	
	// Number of grid slots along the y axis.
	mHeight = typeof settings.height === "number" ? settings.height : 24,
	
	// Single grid slot width.
	mSlotWidth = null,
	
	// Single grid slot height.
	mSlotHeight = null,
	
	// Cached slot half width.
	mSlotHalfWidth = null,
	
	// Cached slot half height.
	mSlotHalfHeight = null,
	
	// Grid array.
	mGrid = null;
	
	/*
	 * PUBLIC VARIABLES
	*/
	
	/*
	 * PRIVILEGED FUNCTIONS
	*/
	
	/*
	 * PRIVATE FUNCTIONS
	*/
	
	/* Builds the grid array.
	*/
	function buildGrid() {
	}
	
	// Initializer
	(function() {
		buildGrid();
	})();
}

/*
 * STATIC FUNCTIONS
*/

/*
 * STATIC INITIALIZERS
*/

sys.c.Board = Board;

})(jsnake);

/* Board.js
	
	Class representing the game board.
*/

(function(sys) {

"use strict";

/* Constructor for Board object.
	canvas - Canvas DOM element.
	context - Canvas 2D context object.
*/
function Board(canvas, context) {
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
	mContext = context;
	
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
}

/*
 * STATIC FUNCTIONS
*/

/*
 * STATIC INITIALIZERS
*/

sys.c.Board = Board;

})(jsnake);

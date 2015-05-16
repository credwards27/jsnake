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
	mColumns = typeof settings.columns === "number" ? settings.columns : 32,
	
	// Number of grid slots along the y axis.
	mRows = typeof settings.rows === "number" ? settings.rows : 24,
	
	// Single grid slot width.
	mSlotWidth = mCanvas.width / mColumns,
	
	// Single grid slot height.
	mSlotHeight = mCanvas.height / mRows,
	
	// Cached slot half width.
	mSlotHalfWidth = mSlotWidth * 0.5,
	
	// Cached slot half height.
	mSlotHalfHeight = mSlotHeight * 0.5,
	
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
		if (mGrid !== null) {
			return;
		}
		
		var row = [],
			col, i, j;
		
		for (i=0; i<mWidth; i++) {
			col = [];
			
			for (j=0; j<mHeight; j++) {
				// Add slot
			}
			
			row.push(col);
		}
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

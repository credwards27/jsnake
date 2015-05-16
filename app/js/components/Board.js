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
	
	/* Returns the number of slot columns in the grid.
	*/
	this.getColumns = function() {
		return mColumns;
	};
	
	/* Returns the number of slot rows in the grid.
	*/
	this.getRows = function() {
		return mRows;
	};
	
	/* Returns the slot for a specified column and row index.
		col - Column index.
		row - Row index.
		
		Throws an error if out of range of the grid matrix.
	*/
	this.getSlot = function(col, row) {
		// Verify numbers
		if (typeof col !== "number" || typeof row !== "number") {
			throw new sys.c.GameError(
				"Parameters 'col' and 'row' must be numbers.");
		}
		
		// Truncate decimals
		col = parseInt(col, 10);
		row - parseInt(row, 10);
		
		// Check if in range
		if (col >= mColumns || row >= mRows || col < 0 || row < 0) {
			throw new sys.c.GameError(
				"Slot " + col + ":" + row + " is out of range.");
		}
		
		return mGrid[col][row];
	};
	
	/*
	 * PRIVATE FUNCTIONS
	*/
	
	/* Builds the grid array.
	*/
	function buildGrid() {
		if (mGrid !== null) {
			return;
		}
		
		var i, j;
		
		mGrid = mGrid || [];
		
		for (i=0; i<mColumns; i++) {
			mGrid[i] = [];
			
			for (j=0; j<mRows; j++) {
				// Add slot
				mGrid[i][j] = new sys.c.Slot(mSelf, i, j);
			}
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

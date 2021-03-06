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
		suppress - True to suppress out of range errors and return null instead,
			omit otherwise.
		
		Throws an error if out of range of the grid matrix.
	*/
	this.getSlot = function(col, row, suppress) {
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
			if (suppress === true) {
				return null;
			}
			
			throw new sys.c.GameError(
				"Slot " + col + ":" + row + " is out of range.");
		}
		
		return mGrid[col][row];
	};
	
	/* Returns the slot width and height for the board.
		{ width: Number, height: Number }
	*/
	this.getSlotSize = function() {
		return { width: mSlotWidth, height: mSlotHeight };
	};
	
	/* Checks whether or not a column is in range.
		Returns true if column is in range, false otherwise.
	*/
	this.isColumnInRange = function(col) {
		return col >= 0 && col < mColumns;
	};
	
	/* Checks whether or not a row is in range.
		Returns true if row is in range, false otherwise.
	*/
	this.isRowInRange = function(row) {
		return row >= 0 && row < mRows;
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
		
		var slot, col, row;
		
		mGrid = mGrid || [];
		
		for (col=0; col<mColumns; col++) {
			mGrid[col] = [];
			
			for (row=0; row<mRows; row++) {
				// Add slot
				slot = new sys.c.Slot(mSelf, col, row);
				slot.setCoords({
					x: (mSlotWidth * col) + mSlotHalfWidth,
					y: (mSlotWidth * row) + mSlotHalfHeight
				});
				mGrid[col][row] = slot;
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

/* Slot.js
	
	Grid slot class.
*/

(function(sys) {

"use strict";

/* Constructor for Slot object.
	board - Reference to the master board object.
	col - Column index.
	row - Row index.
*/
function Slot(board, col, row) {
	// Default parameters
	if ((board instanceof sys.c.Board) === false) {
		throw new sys.c.GameError(
			"Parameter 'board' must be a Board instance.");
	}
	else if (typeof col !== "number" || typeof row !== "number") {
		throw new sys.c.GameError(
			"Parameters 'col' and 'row' must be numbers.");
	}
	
	/*
	 * PRIVATE VARIABLES
	*/
	
	// Reference to self.
	var mSelf = this,
	
	// Reference to master board object.
	mBoard = board,
	
	// Column index.
	mCol = parseInt(col, 10),
	
	// Row index.
	mRow = parseInt(row, 10),
	
	/* Neighbor slot indices. If a neighbor is null, the slot is on a board
		edge.
		{ col: Number, row: Number }
	*/
	mNeighbors = {
		left: null,
		right: null,
		top: null,
		bottom: null
	},
	
	// X and y coordinates for the center of the slot.
	mCoords = {
		x: 0,
		y: 0
	};
	
	/*
	 * PUBLIC VARIABLES
	*/
	
	/*
	 * PRIVILEGED FUNCTIONS
	*/
	
	/* Gets the column and row indices for the slot.
		Returns an index position object.
		{ col: Number, row: Number }
	*/
	this.getLocation = function() {
		return { col: mCol, row: mRow };
	}
	
	/* Returns the x and y coordinates for the slot.
	*/
	this.getCoords = function() {
		return sys.u.deepCopy(mCoords);
	};
	
	/* Sets the x and y coordinates for the center of the slot.
		coords - X and y coordinates for the slot.
			{ x: Number, y: Number }
	*/
	this.setCoords = function(coords) {
		mCoords.x = typeof coords.x === "number" ?
			parseInt(coords.x, 10) : mCoords.x;
		mCoords.y = typeof coords.y === "number" ?
			parseInt(coords.y, 10) : mCoords.y;
	};
	
	/* Gets the indices for a specified neighbor slot.
		edge - Edge shared by the target neighbor ("left", "right", "top",
			"bottom").
		
		Returns deep copy of neighbor indices, or null if slot has no neighbor
			along the specified edge.
			{ col: Number, row: Number }
	*/
	this.getNeighbor = function(edge) {
		return sys.u.deepCopy(mNeighbors[Slot.prototype.sanitizeEdge(edge)]);
	};
	
	/* Returns deep copy of the full neighbor indices object.
		{
			left: {
				col: Number,
				row: Number
			},
			right: {...},
			top: {...},
			bottom: {...}
		}
	*/
	this.getNeighbors = function() {
		return sys.u.deepCopy(mNeighbors);
	}
	
	/*
	 * PRIVATE FUNCTIONS
	*/
	
	/* Sets the neighbor indices for each edge.
	*/
	function setNeighbors() {
		// Detect left edge
		if (mCol !== 0) {
			mNeighbors.left = { col: mCol - 1, row: mRow };
		}
		
		// Detect right edge
		if (mCol !== mBoard.getColumns() - 1) {
			mNeighbors.right = { col: mCol + 1, row: mRow };
		}
		
		// Detect top edge
		if (mRow !== 0) {
			mNeighbors.top = { col: mCol, row: mRow - 1};
		}
		
		// Detect bottom edge
		if (mRow !== mBoard.getRows() - 1) {
			mNeighbors.bottom = { col: mCol, row: mRow + 1};
		}
	}
	
	// Initializer
	(function() {
		setNeighbors();
	})();
}

/*
 * STATIC FUNCTIONS
*/

Slot.prototype = {
	/* Sanitizes a neighbor edge string.
		edge - Edge string ("left", "right", "top", "bottom").
		
		Returns the sanitized edge string, or throws an error if invalid.
	*/
	sanitizeEdge: function(edge) {
		if (typeof edge === "string") {
			edge = edge.toLowerCase();
			switch (edge) {
				case "left":
				case "right":
				case "top":
				case "bottom":
				return edge;
			}
		}
		
		throw new sys.c.GameError(
			"Invalid edge string ('left', 'right', 'top', 'bottom' expected).");
	}
};

/*
 * STATIC INITIALIZERS
*/

sys.c.Slot = Slot;

})(jsnake);

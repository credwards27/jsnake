/* Snake.js
	
	Snake (player) class.
*/

(function(sys) {

"use strict";

/* Constructor for Snake object.
	context - 2D canvas context.
	board - Game board object.
	settings - Settings for snake object.
*/
function Snake(context, board, settings) {
	// Default parameters
	if ((context instanceof CanvasRenderingContext2D) === false) {
		throw new sys.c.GameError(
			"Parameter 'context' must be a valid 2D canvas context.");
	}
	else if ((board instanceof sys.c.Board) === false) {
		throw new sys.c.GameError(
			"Parameter 'board' must be a valid game board instance.");
	}
	
	/*
	 * PRIVATE VARIABLES
	*/
	
	// Reference to self.
	var mSelf = this,
	
	// 2D canvas context.
	mContext = context,
	
	// Reference to game board object.
	mBoard = board,
	
	// Snake joint array (chain of slots).
	mJoints = [],
	
	// Head joint.
	mHead = null,
	
	// Tail joint.
	mTail = null,
	
	// Snake width.
	mWidth = mWidth = typeof settings.width === "number" ?
		settings.width : mBoard.getSlotSize().width,
	
	// Starting length (number of joints).
	mStartLength = -1,
	
	// Starting column for the head.
	mStartCol = -1,
	
	// Starting row for the head.
	mStartRow = -1,
	
	// Starting direction for the snake.
	mStartDirection = {
		axis: "x",
		incr: 1
	}
	
	/*
	 * PUBLIC VARIABLES
	*/
	
	/*
	 * PRIVILEGED FUNCTIONS
	*/
	
	/* Initialize the snake.
	*/
	this.init = function() {
		var col = mStartCol,
			row = mStartRow,
			lastJoint = null,
			currJoint, i;
		
		// Reset joints array
		clearJoints();
		
		// Create and connect joints from head to tail
		for (i=0; i<mStartLength; i++) {
			// Create and connect the joint
			currJoint = new sys.c.Joint(lastJoint);
			currJoint.setSlot(mBoard.getSlot(col, row));
			mJoints.push(currJoint);
			
			// Store current joint as 'previous' in last joint created
			if (lastJoint !== null) {
				lastJoint.setPrev(currJoint);
			}
			
			// Store current joint for next iteration
			lastJoint = currJoint;
			
			// Move to the next slot location
			if (mStartDirection.axis === "x") {
				col += mStartDirection.incr;
			}
			else {
				row += mStartDirection.incr;
			}
		}
		
		// Store head and tail
		mHead = mJoints[0];
		mTail = lastJoint;
	};
	
	/*
	 * PRIVATE FUNCTIONS
	*/
	
	function clearJoints() {
		for (var i=0, l=mJoints.length; i<l; i++) {
			mJoints.pop();
		}
		mJoints = [];
	}
	
	/* Initializes the start direction object.
	*/
	function initDirection() {
		if (typeof direction === "string") {
			direction = direction.toLowerCase();
			
			switch (direction) {
				case "left":
				case "right":
				case "up":
				case "down":
				return direction;
			}
		}
		
		throw new sys.c.GameError(
			"Invalid direction string (expected 'left', 'right', 'up', or " +
			"'down')");
	}
	
	// Initializer
	(function() {
		var startLength = settings.startLength,
			startCol = settings.startCol,
			startRow = settings.startRow;
		
		// Store start length
		if (typeof startLength === "number") {
			mStartLength = startLength > 0 ?
				parseInt(startLength, 10) : 5;
		}
		
		// Store start column
		if (typeof startCol === "number") {
			mStartCol = (startCol > -1 && startCol < mBoard.getColumns()) ?
				parseInt(startCol, 10) : 12;
		}
		
		// Store start row
		if (typeof startRow === "number") {
			mStartRow = (startRow > -1 && startRow < mBoard.getRows()) ?
				parseInt(startRow, 10) : 18;
		}
		
		// Start direction
		mStartDirection = Snake.prototype.initDirection(
			settings.startDirection || "right");
	})();
}

/*
 * STATIC FUNCTIONS
*/

Snake.prototype = {
	/* Converts a travel direction string to a travel direction data object.
		direction - Travel direction string ("left", "right", "up", or "down").
		
		Returns the converted travel direction data object, or throws an error.
	*/
	initDirection: function(direction) {
		var obj = null;
		
		if (typeof direction === "string") {
			direction = direction.toLowerCase();
			
			switch (direction) {
				case "left":
				obj = { axis: "x", incr: 1 };
				break;
				
				case "right":
				obj = { axis: "x", incr: -1 };
				break;
				
				case "up":
				obj = { axis: "y", incr: 1 };
				break;
				
				case "down":
				obj = { axis: "y", incr: -1 };
				break;
				
			}
		}
		
		if (obj === null) {
			throw new sys.c.GameError(
				"Invalid direction string (expected 'left', 'right', 'up', or " +
				"'down')");
		}
		
		return obj;
	}
};

/*
 * STATIC INITIALIZERS
*/

sys.c.Snake = Snake;

})(jsnake);

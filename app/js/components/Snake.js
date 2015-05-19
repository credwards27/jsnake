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
	
	// Number of joints in the snake.
	mLength = 0,
	
	// Head joint.
	mHead = null,
	
	// Tail joint.
	mTail = null,
	
	// Snake line width.
	mWidth = typeof settings.width === "number" ?
		settings.width : mBoard.getSlotSize().width,
	
	// Snake line color.
	mLineColor = typeof settings.color === "string" ?
		settings.color : "#000000;",
	
	// Snake line cap shape.
	mLineCap = "round",
	
	// Snake line join shape.
	mLineJoin = "round",
	
	// Starting length (number of joints).
	mStartLength = -1,
	
	// Starting column for the head.
	mStartCol = -1,
	
	// Starting row for the head.
	mStartRow = -1,
	
	/* Starting direction for the snake.
		{
			axis: "x" or "y", // Axis of travel.
			incr: 1 or -1 // 1 for right or down, -1 for left or up.
		}
	*/
	mStartDirection = {
		axis: "x",
		incr: 1
	},
	
	// Current direction for the snake head. Same structure as mStartDirection.
	mHeadDirection = null,
	
	// Current direction for the snake tail. Same structure as mStartDirection.
	mTailDirection = null;
	
	/*
	 * PUBLIC VARIABLES
	*/
	
	/*
	 * PRIVILEGED FUNCTIONS
	*/
	
	/* Initialize the snake.
	*/
	this.init = function() {
		// Reset joints array
		clearJoints();
		
		// Create and connect joints from head to tail
		for (var i=0; i<mStartLength; i++) {
			mSelf.addJoint();
		}
		
		console.log(mSelf);
	};
	
	/* Returns the head joint travel direction data for the next game step.
	*/
	this.getDirection = function() {
		return sys.u.deepCopy(mHeadDirection);
	};
	
	/* Sets the head joint travel direction data for the next game step.
		direction - Travel direction string ("left", "right", "up", or "down").
	*/
	this.setDirection = function(direction) {
		mHeadDirection = Snake.prototype.parseDirection(direction);
	};
	
	/* Adds a joint to the tail.
		Returns the new joint.
	*/
	this.addJoint = function() {
		var newJoint = new sys.c.Joint(),
			tailLoc, col, row;
		mLength++;
		
		if (mLength === 1) {
			// Set new joint as head
			newJoint
			mHead = newJoint;
			mHead.setSlot(mBoard.getSlot(mStartCol, mStartRow));
			mHead.setDirection(mStartDirection);
		}
		else {
			// Attach new joint to tail
			mTail.setPrev(newJoint);
			newJoint.setNext(mTail);
			
			tailLoc = mTail.getSlot().getLocation();
			col = tailLoc.col;
			row = tailLoc.row;
			
			if (mTailDirection.axis === "x") {
				col -= mTailDirection.incr;
			}
			else {
				row -= mTailDirection.incr;
			}
			
			newJoint.setSlot(mBoard.getSlot(col, row));
			newJoint.setDirection(mTail.getDirection());
		}
		
		// Set new joint as the tail
		mTail = newJoint;
		return mTail;
	};
	
	/* Moves the snake.
	*/
	this.move = function() {
	};
	
	/*
	 * PRIVATE FUNCTIONS
	*/
	
	/* Clears all joints.
	*/
	function clearJoints() {
		eachJoint(function(joint) {
			joint.destroyJoint();
		});
	}
	
	/* Iterates over all joints from head to tail and performs a specified
		action on each iteration.
		
		action - Function to run on each iteration.
			joint - Current joint that the iterator is pointing to.
		reverse - True to iterate over joints from tail to head, omit otherwise.
	*/
	function eachJoint(action, reverse) {
		var curr = mHead,
			next = "getPrev",
			i;
		
		if (reverse === true) {
			curr = mTail;
			next = "getNext";
		}
		
		for (i=0; i<mLength; i++) {
			if (typeof action === "function") {
				action(curr);
			}
			
			curr = curr[next]();
		}
	}
	
	/* Paint all joints.
	*/
	function paint() {
		var ctx = sys.g.context;
		ctx.save();
		ctx.beginPath();
		
		ctx.strokeStyle = mLineColor;
		ctx.lineWidth = mWidth;
		ctx.lineCap = mLineCap;
		ctx.lineJoin = mLineJoin;
		
		mHead.paint(true);
		eachJoint(paintJoint);
		
		ctx.stroke();
		ctx.restore();
	};
	
	/* Signals a joint to paint itself.
		joint - Joint object to be painted.
	*/
	function paintJoint(joint) {
		joint.paint();
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
		
		// Set start, current head, and current tail directions
		mStartDirection = Snake.prototype.parseDirection(
			settings.startDirection || "right");
		mHeadDirection = sys.u.deepCopy(mStartDirection);
		mTailDirection = sys.u.deepCopy(mStartDirection);
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
	parseDirection: function(direction) {
		var obj = null;
		
		if (typeof direction === "string") {
			// Convert string
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
		else if (typeof direction === "object" &&
			direction.axis !== undefined && direction.incr !== undefined) {
			// Copy data object
			obj = sys.u.deepCopy(direction);
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

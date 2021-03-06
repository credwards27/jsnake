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
	
	// Reference to key code constants.
	mKeys = sys.u.keys,
	
	// Array of joints (for deletion).
	mJoints = [],
	
	// Number of joints in the snake.
	mLength = 0,
	
	// Head joint.
	mHead = null,
	
	// Tail joint.
	mTail = null,
	
	// Head joint slot.
	mHeadSlot = null,
	
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
	
	// Game step duration in milliseconds.
	mStepDuration = null,
	
	// Elapsed time in the current game step.
	mCurrStep = 0,
	
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
	
	// Travel direction on the last game step.
	mLastDirection = null;
	
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
		
		paint();
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
		direction = Snake.prototype.parseDirection(direction);
		mHeadDirection.axis = direction.axis;
		mHeadDirection.incr = direction.incr;
		mHead.setDirection(direction, true);
	};
	
	/* Adds a joint to the tail.
		Returns the new joint.
	*/
	this.addJoint = function() {
		var newJoint = new sys.c.Joint();
		
		// Add new joint and adjust length
		mJoints.push(newJoint);
		mLength++;
		
		if (mLength === 1) {
			// Set new joint as head
			mHead = newJoint;
			mHead.setSlot(mBoard.getSlot(mStartCol, mStartRow));
			mHead.setDirection(mStartDirection);
			mHeadSlot = mHead.getSlot();
		}
		else {
			// Attach new joint to tail
			mTail.setPrev(newJoint);
			newJoint.setNext(mTail);
			
			// Set slot and direction (direction matches old tail)
			newJoint.setSlot(getNextSlot(mTail, true));
			newJoint.setDirection(mTail.getDirection());
		}
		
		// Set new joint as the tail
		mTail = newJoint;
		return mTail;
	};
	
	/* Moves the snake.
	*/
	this.move = function() {
		var newTail = mTail.getNext(),
			newSlot = getNextSlot(mHead);
		
		// Current tail becomes new head
		mHead.setNext(mTail);
		mTail.setPrev(mHead);
		mTail.setNext(null);
		newTail.setPrev(null);
		
		// Update links
		mHead = mTail;
		mTail = newTail;
		
		// Set slot for new head
		mHead.setSlot(newSlot);
		mHead.setDirection(mHeadDirection);
		mHeadSlot = mHead.getSlot();
	};
	
	/* Update loop actions.
		dt - Delta time since last update.
	*/
	this.update = function(dt) {
		mCurrStep += dt;
		
		// Move if step duration has been reached
		if (mCurrStep >= mStepDuration) {
			checkCollisions();
			mSelf.move();
			mLastDirection = sys.u.deepCopy(mHeadDirection);
			mCurrStep -= mStepDuration;
		}
		
		paint();
	};
	
	/*
	 * PRIVATE FUNCTIONS
	*/
	
	/* Clears all joints.
	*/
	function clearJoints() {
		for (var i=mJoints.length-1; i>=0; i--) {
			mJoints[i].destroyJoint();
			mJoints.pop();
		}
		
		mLength = 0;
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
	
	/* Gets the column and row for an adjacent slot based on a given joint's
		direction.
		
		joint - Joint object for which to retrieve an adjacent slot.
		invert - True to get slot behind joint, omit for slot in front of joint.
		suppress - True to suppress out of range error and return null instead,
			omit otherwise.
		
		Returns a slot object in front of or behind specified joint (depending
			on invert flag).
	*/
	function getNextSlot(joint, invert, suppress) {
		if ((joint instanceof sys.c.Joint) === false) {
			throw new sys.c.GameError(
				"Parameter 'joint' must be a Joint object.");
		}
		
		// Get slot location for new joint
		var nextLoc = joint.getSlot().getLocation(),
			jointDir = joint.getDirection(),
			col = nextLoc.col,
			row = nextLoc.row;
		
		// Change invert to multiplier
		invert = invert === true ? -1 : 1;
		
		if (jointDir.axis === "x") {
			col += (jointDir.incr * invert);
		}
		else {
			row += (jointDir.incr);
		}
		
		return mBoard.getSlot(col, row, suppress);
	}
	
	/* Checks for wall collisions.
	*/
	function checkCollisions() {
		var neighbors, validDirections;
		
		if (getNextSlot(mHead, false, true) === null) {
			// Wall collision, turn random perpendicular direction
			neighbors = mHeadSlot.getNeighbors();
			validDirections = [];
			
			if (mHeadDirection.axis === "x") {
				if (neighbors.top !== null) {
					validDirections.push("up");
				}
				
				if (neighbors.bottom !== null) {
					validDirections.push("down");
				}
			}
			else {
				if (neighbors.left !== null) {
					validDirections.push("left");
				}
				
				if (neighbors.right !== null) {
					validDirections.push("right");
				}
			}
			
			mSelf.setDirection(validDirections[
				Math.floor(Math.random() * validDirections.length)
			]);
		}
	}
	
	/* Paint all joints.
	*/
	function paint() {
		mContext.save();
		mContext.beginPath();
		
		mContext.strokeStyle = mLineColor;
		mContext.lineWidth = mWidth;
		mContext.lineCap = mLineCap;
		mContext.lineJoin = mLineJoin;
		
		mHead.paint(true);
		eachJoint(paintJoint);
		
		mContext.stroke();
		mContext.restore();
	}
	
	/* Signals a joint to paint itself.
		joint - Joint object to be painted.
	*/
	function paintJoint(joint) {
		joint.paint();
	}
	
	/* Input handler for direction changing.
		key - Key code pressed.
	*/
	function changeDirection(key) {
		switch (key) {
			// Left
			case mKeys.A:
			case mKeys.ARROW_LEFT:
			if (mLastDirection.axis === "y") {
				mSelf.setDirection("left");
			}
			break;
			
			// Right
			case mKeys.D:
			case mKeys.ARROW_RIGHT:
			if (mLastDirection.axis === "y") {
				mSelf.setDirection("right");
			}
			break;
			
			// Up
			case mKeys.W:
			case mKeys.ARROW_UP:
			if (mLastDirection.axis === "x") {
				mSelf.setDirection("up");
			}
			break;
			
			// Down
			case mKeys.S:
			case mKeys.ARROW_DOWN:
			if (mLastDirection.axis === "x") {
				mSelf.setDirection("down");
			}
			break;
		}
	}
	
	// Initializer
	(function() {
		var startLength = settings.startLength,
			startCol = settings.startCol,
			startRow = settings.startRow,
			input = sys.g.inputManager,
			keys = sys.u.keys;
		
		// Set snake speed
		mStepDuration = 1000 / (typeof settings.speed === "number" ?
			settings.speed : 3);
		
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
		mLastDirection = sys.u.deepCopy(mStartDirection);
		
		// Attach input actions
		input.onInput(mKeys.A, "on", changeDirection, mKeys.A);
		input.onInput(mKeys.D, "on", changeDirection, mKeys.D);
		input.onInput(mKeys.W, "on", changeDirection, mKeys.W);
		input.onInput(mKeys.S, "on", changeDirection, mKeys.S);
		input.onInput(mKeys.ARROW_LEFT, "on", changeDirection,
			mKeys.ARROW_LEFT);
		input.onInput(mKeys.ARROW_RIGHT, "on", changeDirection,
			mKeys.ARROW_RIGHT);
		input.onInput(mKeys.ARROW_UP, "on", changeDirection, mKeys.ARROW_UP);
		input.onInput(mKeys.ARROW_DOWN, "on", changeDirection,
			mKeys.ARROW_DOWN);
	})();
}

/*
 * STATIC FUNCTIONS
*/

Snake.prototype = {
	/* Converts a travel direction string to a travel direction data object.
		direction - Travel direction string ("left", "right", "up", or "down").
		reference - If direction is a data object, setting reference to true
			will pass direction by reference instead of deep copying it.
		
		Returns the converted travel direction data object, or throws an error.
	*/
	parseDirection: function(direction, reference) {
		var obj = null;
		
		if (typeof direction === "string") {
			// Convert string
			direction = direction.toLowerCase();
			
			switch (direction) {
				case "left":
				obj = { axis: "x", incr: -1 };
				break;
				
				case "right":
				obj = { axis: "x", incr: 1 };
				break;
				
				case "up":
				obj = { axis: "y", incr: -1 };
				break;
				
				case "down":
				obj = { axis: "y", incr: 1 };
				break;
				
			}
		}
		else if (typeof direction === "object" &&
			direction.axis !== undefined && direction.incr !== undefined) {
			if (reference !== true) {
				// Copy data object
				obj = sys.u.deepCopy(direction);
			}
			else {
				// Return reference
				obj = direction;
			}
		}
		
		if (obj === null) {
			throw new sys.c.GameError(
				"Invalid direction string (expected 'left', 'right', 'up' " +
				"or 'down')");
		}
		
		return obj;
	}
};

/*
 * STATIC INITIALIZERS
*/

sys.c.Snake = Snake;

})(jsnake);

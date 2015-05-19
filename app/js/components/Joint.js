/* Joint.js
	
	Snake body joint class.
*/

(function(sys) {

"use strict";

/* Constructor for Joint object.
	next - Reference to next joint object (towards head).
	prev - Reference to previous joint object (from tail).
*/
function Joint(next, prev) {
	// Default parameters
	next = next === undefined ? null : next;
	prev = prev === undefined ? null : prev;
	
	/*
	 * PRIVATE VARIABLES
	*/
	
	// Reference to self.
	var mSelf = this,
	
	// Reference to the slot object that the joint occupies.
	mSlot = null,
	
	// Cached slot location indicies.
	mSlotLocation = null,
	
	// Cached slot coordinates data.
	mSlotCoords = null,
	
	// Cached slot neighbor location indices.
	mSlotNeighbors = null,
	
	// Reference to next joint (towards head).
	mNextJoint = null,
	
	// Reference to previous joint (from tail).
	mPrevJoint = null,
	
	// Direction data object (see Snake.prototype.parseDirection).
	mDirection = null;
	
	/*
	 * PUBLIC VARIABLES
	*/
	
	/*
	 * PRIVILEGED FUNCTIONS
	*/
	
	/* Destructor for joint object.
	*/
	this.destroyJoint = function() {
		mSlot = null;
		mNextJoint = null;
		mPrevJoint = null;
		mSelf = null;
	};
	
	/* Returns the slot that the joing occupies, or null if no slot is set.
	*/
	this.getSlot = function() {
		return mSlot;
	};
	
	/* Sets a slot for the joint. Also sets self as contents of the slot.
		slot - Slot object that the joint occupies.
	*/
	this.setSlot = function(slot) {
		if (slot instanceof sys.c.Slot) {
			mSlot = slot;
			mSlot.setContents(mSelf);
			mSlotLocation = mSlot.getLocation();
			mSlotCoords = mSlot.getCoords();
			mSlotNeighbors = mSlot.getNeighbors();
		}
		else {
			throw new sys.c.GameError(
				"Parameter 'slot' is not a Slot object.");
		}
	};
	
	/* Gets the next joint (towards head).
		Returns reference to the next joint object.
	*/
	this.getNext = function() {
		return mNextJoint;
	};
	
	/* Sets next joint object (towards head).
		joint - Reference to joint object. Must be Joint instance or null.
		
		Returns the new next joint if set successfully.
	*/
	this.setNext = function(joint) {
		if (joint === null || joint instanceof sys.c.Joint) {
			mNextJoint = joint;
			return mNextJoint;
		}
		
		throw new sys.c.GameError(
			"Next joint must be a valid Joint object or null.");
	};
	
	/* Gets the previous joint (from tail).
		Returns reference to the previous joint object.
	*/
	this.getPrev = function() {
		return mPrevJoint;
	};
	
	/* Sets previous joint object (from tail).
		joint - Reference to joint object. Must be Joint instance or null.
		
		Returns the new previous joint if set successfully.
	*/
	this.setPrev = function(joint) {
		if (joint === null || joint instanceof sys.c.Joint) {
			mPrevJoint = joint;
			return mPrevJoint;
		}
		
		throw new sys.c.GameError(
			"Previous joint must be a valid Joint object or null.");
	};
	
	/* Returns the direction data object.
	*/
	this.getDirection = function() {
		return sys.u.deepCopy(mDirection);
	};
	
	/* Sets the direction of the joint for the next game step.
		direction - Travel direction string ("left", "right", "up", or "down").
	*/
	this.setDirection = function(direction) {
		mDirection = Joint.prototype.parseDirection(direction);
	};
	
	/* Paints the joint onto the canvas context.
	*/
	this.paint = function() {
	};
	
	/*
	 * PRIVATE FUNCTIONS
	*/
	
	// Initializer
	(function() {
		mSelf.setNext(next);
		mSelf.setPrev(prev);
		
		// Create prototype alias to Snake.prototype.parseDirection
		if (Joint.prototype.parseDirection === undefined) {
			Joint.prototype.parseDirection =
				sys.c.Snake.prototype.parseDirection;
		}
	})();
}

/*
 * STATIC FUNCTIONS
*/

Joint.prototype = {};

/*
 * STATIC INITIALIZERS
*/

sys.c.Joint = Joint;

})(jsnake);

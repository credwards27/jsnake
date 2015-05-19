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
	
	// Reference to next joint (towards head).
	mNextJoint = null,
	
	// Reference to previous joint (from tail).
	mPrevJoint = null;
	
	/*
	 * PUBLIC VARIABLES
	*/
	
	/*
	 * PRIVILEGED FUNCTIONS
	*/
	
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
	
	/*
	 * PRIVATE FUNCTIONS
	*/
	
	// Initializer
	(function() {
		mSelf.setNext(next);
		mSelf.setPrev(prev);
	})();
}

/*
 * STATIC FUNCTIONS
*/

/*
 * STATIC INITIALIZERS
*/

sys.c.Joint = Joint;

})(jsnake);

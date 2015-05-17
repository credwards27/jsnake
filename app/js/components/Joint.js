/* Joint.js
	
	Snake body joint class.
*/

(function(sys) {

"use strict";

/* Constructor for Joint object.
*/
function Joint() {
	// Default parameters
	
	/*
	 * PRIVATE VARIABLES
	*/
	
	// Reference to self.
	var mSelf = this,
	
	// Reference to the slot object that the joint occupies.
	mSlot = null;
	
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

sys.c.Joint = Joint;

})(jsnake);

/* main.js
	
	Main app entry script for jSnake game.
	
	Version 0.0.1
*/

// Global object definition.
var jsnake;

(function() {

"use strict";

/* Global system controller.
*/
jsnake = jsnake || (function() {
	// Create system instance
	var sys = function(args) { return new sys.fn.init(args); };
	
	// Create system controller prototype (and set alias)
	sys.fn = sys.prototype = {};
	
	/*
	 * GLOBAL SYSTEM OBJECTS AND VARIABLES
	*/
	
	// Collection of global objects and variables for the system
	sys.fn.g = {};
	
	/*
	 * STATIC PROTOTYPE FUNCTIONS
	*/
	
	/* Default initializer function
		args - Arguments
	*/
	sys.fn.init = function(args) {
		return this;
	};
	
	/* Extends the system (sys.fn) or a specified target object. Reference or
		deep copy.
		key - Key string for the object being attached. This will be the
			identifier to reference the attached object on the extended object.
		src - Source object or array to attach to sys.fn or target.
		deepCopy - True to deep copy the source object, false or omit to attach
			by reference.
		target - Alternate object to extend. If omitted, or not plain object or
			array, src will extend sys.fn.
		
		Returns the object being attached.
	*/
	sys.extend = sys.fn.extend = function(key, src, deepCopy, target) {
		// Exit if key is not a string or number
		if (typeof key !== "string" && typeof key !== "number") {
			return;
		}
		
		// Validate arguments
		deepCopy = deepCopy ? true : false;
		target = typeof target === "object" ? target : sys.fn;
		
		// Attach and return src if not an object literal or array
		if (typeof src !== "object" && (src instanceof Array) === false) {
			target[key] = src;
			return src;
		}
		
		var subObj, i, l, k;
		
		if (deepCopy === true) {
			// Traverse object or array
			if (src instanceof Array) {
				// Array
				for (i=0, l=src.length; i<l; i++) {
					target[key] = target[key] || [];
					sys.extend(i, src[i], deepCopy, target[key]);
				}
			}
			else {
				// Object literal
				for (k in src) {
					if (src.hasOwnProperty(k) === true) {
						target[key] = target[key] || {};
						sys.extend(k, src[k], deepCopy, target[key]);
					}
				}
			}
		}
		else {
			// Attach reference
			target[key] = src;
			return;
		}
	}
	
	/*
	 * SYSTEM CLASSES
	*/
	
	// Collection of object classes for the system
	sys.fn.c = {};
	
	/*
	 * SYSTEM INITIALIZERS
	*/
	
	// Set system object prototype
	sys.fn.init.prototype = sys.fn;
	
	// Return the system instance
	return sys;
})();

})();

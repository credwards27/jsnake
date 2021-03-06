/* utils.js
	
	Global utility functions.
*/

(function(sys) {

"use strict";

sys.u = {
	// Degrees to radians conversion constant.
	RAD_CONVERT: Math.PI / 180,
	
	// Keyboard codes.
	keys: {
		// A key.
		A: 65,
		
		// D key.
		D: 68,
		
		// S key.
		S: 83,
		
		// W key.
		W: 87,
		
		// Left arrow key.
		ARROW_LEFT: 37,
		
		// Right arrow key.
		ARROW_RIGHT: 39,
		
		// Up arrow key.
		ARROW_UP: 38,
		
		// Down arrow key.
		ARROW_DOWN: 40,
		
		// Space bar.
		SPACE: 32,
		
		// Mouse button.
		MOUSE: "mouse"
	},
	
	/* Deep copies an object or array.
		src - The source object or array to deep copy.
		
		Returns a copy of the source object.
	*/
	deepCopy: function(src) {
		var newObj, i, l, k;
		
		if (src instanceof Array) {
			// Copy array
			newObj = [];
			for (i=0, l=src.length; i<l; i++) {
				newObj.push(sys.u.deepCopy(src[i]));
			}
		}
		else if (src !== null && typeof src === "object") {
			// Copy object literal
			newObj = {};
			for (k in src) {
				if (src.hasOwnProperty(k) === true) {
					newObj[k] = sys.u.deepCopy(src[k]);
				}
			}
		}
		else {
			// Non-iterable type
			return src;
		}
		
		return newObj;
	},
	
	/* Checks whether or not a specified element is a canvas element.
		elem - DOM element to be checked.
		
		Returns true if elem is a canvas element, false otherwise.
	*/
	isCanvas: function(elem) {
		return (elem !== null && elem.tagName.toLowerCase() === "canvas");
	},
	
	/* Checks whether or not a specified object is a valid canvas context.
		ctx - Canvas 2D ontext object.
		
		Returns true if ctx is an instance of CanvasRenderingContext2D.
	*/
	isContext: function(ctx) {
		return ctx instanceof CanvasRenderingContext2D;
	}
};

/*
 * CROSS-BROWSER POLYFILLS
 */
 
String.prototype.trim = String.prototype.trim || function(str) {
	return str.replace(/^\s+|\s+$/g, "");
}

})(jsnake);

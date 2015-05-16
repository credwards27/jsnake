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
		A: 65,
		D: 68,
		S: 83,
		W: 87,
		SPACE: 32,
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
				newObj.push(sys.fn.deepCopy(src[i]));
			}
		}
		else if (typeof src === "object") {
			// Copy object literal
			newObj = {};
			for (k in src) {
				if (src.hasOwnProperty(k) === true) {
					newObj[k] = sys.fn.deepCopy(src[k]);
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

})(jsnake);

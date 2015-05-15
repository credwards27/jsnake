/* utils.js
	
	Global utility functions.
*/

(function(sys) {

"use strict";

sys.u = {
	// Degrees to radians conversion constant.
	RAD_CONVERT: Math.PI / 180,
	
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
	}
};

})(jsnake);

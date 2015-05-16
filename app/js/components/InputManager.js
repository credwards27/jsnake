/* InputManager.js
	
	Attaches and assigns user inputs for the game. Also contains private class
	Input, which represents a triggerable input object (keyboard or mouse).
*/

(function(sys) {

"use strict";

/* Constructor for InputManager object.
	canvas - Canvas DOM element to which to attach input handlers.
*/
function InputManager(canvas) {
	// Default parameters
	if (sys.u.isCanvas(canvas) === false) {
		throw new sys.c.GameError(
			"Parameter 'canvas' must be a canvas DOM element.");
	}
	
	/*
	 * PRIVATE VARIABLES
	*/
	
	// Reference to self.
	var mSelf = this,
	
	// Browser-safe key code property.
	WHICH = null,
	
	// Canvas DOM element.
	mCanvas = canvas,
	
	// True when canvas was the last element clicked, false otherwise.
	mCanvasFocus = false,
	
	// Input objects, keyed by key codes or unique identifiers.
	mKeys = {
		// A key.
		65: new Input(65),
		
		// D key.
		68: new Input(68),
		
		// S key.
		83: new Input(83),
		
		// W key.
		87: new Input(87),
		
		// Space key.
		32: new Input(32),
		
		// Mouse button.
		mouse: new Input()
	};
	
	/*
	 * PUBLIC VARIABLES
	*/
	
	/*
	 * PRIVILEGED FUNCTIONS
	*/
	
	/* Attaches a handler to an input.
		code - Key code to which to attach handler (from jsnake.u.keys).
		direction - Input action direction ("on" or "off");
		handler - Handler function.
		args - Arguments to be passed into handler when called.
	*/
	this.onInput = function(code, direction, handler, args) {
		if (mKeys[code] !== undefined) {
			mKeys[code].addHandler(direction, handler, args);
		}
	};
	
	/*
	 * PRIVATE FUNCTIONS
	*/
	
	/* Key down handler.
		e - KeyboardEvent object.
	*/
	function onKeyDown(e) {
		var input = mKeys[e[WHICH]];
		if (input !== undefined && input.getState() === false) {
			input.setState(true);
			input.fireHandlers("on");
		}
	}
	
	/* Key up handler.
		e - KeyboardEvent object.
	*/
	function onKeyUp(e) {
		var input = mKeys[e[WHICH]];
		if (input !== undefined) {
			input.setState(false);
			input.fireHandlers("off");
		}
	}
	
	/* Mouse down handler.
		e - MouseEvent object.
	*/
	function onMouseDown(e) {
		mCanvasFocus = true;
	}
	
	/* Mouse up handler.
		e - MouseEvent object.
	*/
	function onMouseUp(e) {
		if (e.target !== mCanvas) {
			mCanvasFocus = false;
		}
	}
	
	/* Browser-safe event attachment.
		elem - Element to which to attach the event handler.
		type - Event type string.
		handler - Event handler function
	*/
	function addEvent(elem, type, handler) {
		if (elem.addEventListener) {
			elem.addEventListener(type, handler, true);
		}
		else if (elem.attachEvent) {
			elem.attachEvent(type, handler);
		}
	}
	
	// Initializer
	(function() {
		// Set key code property string
		var tempEvt = new KeyboardEvent(null);
		if (tempEvt.hasOwnProperty("which") === true) {
			WHICH = "which";
		}
		else if (tempEvt.hasOwnProperty("keyCode") === true) {
			WHICH = "keyCode";
		}
		
		// Attach event handlers
		addEvent(mCanvas, "mousedown", onMouseDown);
		addEvent(document, "mouseup", onMouseUp);
		addEvent(document, "keydown", onKeyDown);
		addEvent(document, "keyup", onKeyUp);
	})();
}

/* Constructor for Input class object.
	code - Numerical code for the input, omit for codeless input (i.e. mouse).
*/
function Input(code) {
	// Default parameters
	
	/*
	 * PRIVATE VARIABLES
	*/
	
	// Reference to self.
	var mSelf = this,
	
	// Key code for the input, or false for codeless input.
	CODE = null,
	
	// Active or inactive state flag.
	mState = false,
	
	/*Array of input handlers.
		{
			handler: Function,
			args: Handler arguments.
		}
	*/
	mHandlers = {
		on: [],
		off: []
	};
	
	/*
	 * PUBLIC VARIABLES
	*/
	
	/*
	 * PRIVILEGED FUNCTIONS
	*/
	
	/* Gets the input state.
		
		Returns true if input is active, false otherwise.
	*/
	this.getState = function() {
		return mState;
	};
	
	/* Sets the input state.
		state - Truthy to make input active, falsey to make input inactive.
		
		Returns the new state.
	*/
	this.setState = function(state) {
		mState = state ? true : false;
		return mState;
	};
	
	/* Attaches a handler to the input. Handlers must be fired manually.
		handler - Function to be attached to the input.
		args - Arguments to be passed to the handler function.
	*/
	this.addHandler = function(direction, handler, args) {
		var hSet = mHandlers[sanitizeDirection(direction)];
		if (typeof handler === "function") {
			hSet.push({ handler: handler, args: args });
		}
	};
	
	/* Fires the handlers attached to the input.
		direction - Input action direction ("on" or "off", defaults to "on").
	*/
	this.fireHandlers = function(direction) {
		var hSet = mHandlers[sanitizeDirection(direction)],
			h, i, l;
		
		for (i=0, l=hSet.length; i<l; i++) {
			hSet[i].handler(hSet[i].args);
		}
	};
	
	/*
	 * PRIVATE FUNCTIONS
	*/
	
	/* Sanitizes an input direction string.
		direction - Input action direction string ("on" or "off").
		
		Returns the sanitized input direction string, defaults to "on".
	*/
	function sanitizeDirection(direction) {
		if (typeof direction === "string") {
			return direction.toLowerCase() === "off" ? "off" : "on";
		}
		
		return "on";
	}
	
	// Initializer
	(function() {
		CODE = typeof code === "number" ? code : false;
	})();
}

/*
 * STATIC FUNCTIONS
*/

/*
 * STATIC INITIALIZERS
*/


/*
 * STATIC FUNCTIONS
*/

/*
 * STATIC INITIALIZERS
*/

sys.c.InputManager = InputManager;

})(jsnake);

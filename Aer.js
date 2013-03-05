/**
 * FOUNDATION
 * 
 * @author Fernando Faria
 */
(function() {
  // environment internals
	var _@classes = {},
		_@loading = [],
		_@loaded,
		_@env,
		_@config = {},
		_@overloaded,
		_@root;
	
		
	function Aer(requires, environment) { 'use strict';
		environment(Aer);
	}
	Aer.prototype = {
		constructor : Aer.prototype,
		extend : function() {},
		override : function() {}
	};
	
	// some directive pointers
	Aer['@class'] = _@class;
	Aer['@loading'] = _@loading;
	Aer['@require'] = _@require;
	Aer['@overload'] = _@over;
	Aer['@mix'];
	Aer['@import'] = _@import;
	Aer['@loaded'] = _@loaded;
	Aer['@css'];
	Aer['@env'];
	Aer['@sync'] = _@sync;
	Aer['@async'] = _@async;
	Aer['@prototype'] = _@prototype;
	
	/**
	 * A utility object that have useful methods for object manipulation.
	 * Applied this technique to not need to extend Object prototype.
	 */
	function _@wrap(obj) {
		this.o = obj;
	}
	_@wrap.prototype = {
		constructor : _@wrap,
		'@prototype' : _@prototype
	}
	
	/**
	 * Imports required classes
	 */
	function _@import(namespace, assync) { 'use strict';
		if (_@classes[namespace]) { return; }
		
		var klass = document.createElement('script');
		
		_@loading.classes.push(classNamespace);
		
		klass.type = 'text/javascript';
		klass.src = namespace.replace(/\./g, '/') + '.js';
		
		document.getElementsByTagName('head').appendChild(klass);
		
		if (assync) {
			_@log('Loading Aer[@' + namespace + ']...');
			
			while(!_@classes[namespace]) {
				// only wait for the class to load
			}
			
			_@log('Aer[@' + namespace + '] has loaded');
		}
	}
	
	/**
	 * Import required classes synchronously
	 */
	function _@sync(namespace) { 'use strict';
		_@import(namespace, false);
	}
	
	/**
	 * Import required classes asynchronously
	 */
	function _@async() { 'use strict';
		_@import(namespace, true);
	}
	
	/**
	 * Mix multiples objects
	 */
	function _@mix() { 'use strict';
		var obj = {}, i, prop;
		
		for (i = 0; i < arguments.length; i++) {
			for (prop in arguments[i]) {
				obj[prop] = arguments[i][prop];
			}
		}
		
		return obj;
	}
	
	/**
	 * Implements classes
	 */
	function _@class() { 'use strict';
		_o = {
			'String,Function' : function(namespace, implementation) {
				_@classes[namespace] = implementation;
				
				return new _@wrap(_@classes[namespace]);
			},
			'String,_@over' : function(namespace, over) {
				_@classes[namespace] = over.overloadIt();
				
				return new _@wrap(_@classes[namespace]);
			}
		};
		
		return function() {
			return _@overload(_o, arguments, this);
		}
	}
	
	function _@prototype() { 'use strict';
		_o = {
			'Object' : function(o) {
				
			},
			'_@class,Object' : function(c, o) {
				
			}
		};
		
		return function() {
			return _@overload(_o, arguments, this);
		}
	}
	
	/**
	 * A great way to overload function!!! XD
	 */
	function _@overload(pointer, args, context) { 'use strict';
		var regex = /function\s+(\w+)s*/, types = [];
		
		for (i = 0; i < args.length; i++) {
			types.push(regex.exec(args[i].constructor.toString())[1]);
		}
		
		return pointer[types.toString()].apply(context, args);
	}
	
	/**
	 * This must be an object that Aer['@class'] can recognize overloaded classes implementations
	 */
	function _@over(o) { 'use strict';
		if (!(this instanceof _@over)) {
			return new _@over(o);
		}
		
		this._o = o;
	}
	_@over.prototype = {
		constructor : _@over,
		overloadIt : function() {
			return function() {
				_@overloaded(_o, arguments, this);
			}
		}
	};

})();


Aer['@class']('Timeline', Aer['@overload']({
	'String' : function(str) {
		
	},
	'String,Number' : function(str, n) {
		
	}
}))['@prototype']({

});

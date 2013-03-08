/**
 * FOUNDATION
 * 
 * @author Fernando Faria
 */
(function($global) {
	// normalize the aer$classname prototype attribute to the core javascript
	Object.prototype.aer$classname = 'Object';Number.prototype.aer$classname = 'Number';Array.prototype.aer$classname = 'Array';String.prototype.aer$classname = 'String';Boolean.prototype.aer$classname = 'Boolean';RegExp.prototype.aer$classname = 'RegExp';Error.prototype.aer$classname = 'Error';Function.prototype.aer$classname = 'Function';Date.prototype.aer$classname = 'Date';
	
	// normalize the aer$classname prototype attribute
	for (i in window) {//console.log(i);
		if (window[i] != null) {
			if (window[i].prototype != null) {
				if (window[i].prototype.constructor != null) {
					window[i].prototype.aer$classname = /function\s+(\w+)s*/.exec(window[i].prototype.constructor.toString()) != null ? /function\s+(\w+)s*/.exec(window[i].prototype.constructor.toString())[1] : '';
				}
			}
		}
	}

	// environment internals
	var _$aerclass = {},
		_$classes = [],
		_$namespaces = {},
		_$loading = [],
		_$loaded,
		_$env,
		_$config = {},
		_$overloaded,
		_$root;
	
		
	function Aer(requires, environment) { 'use strict';
		environment(Aer);
	}
	Aer.prototype = {
		constructor : Aer,
		aer$classname : 'Aer',
		extend : function() {},
		override : function() {}
	};
	
	// some directive
	Aer['@getclass'] = _$getclass;
	Aer['@new'] = _$new;
	Aer['@class'] = _$class;
	Aer['@overload'] = _$over;
	Aer['@config'];
	Aer['@loading'] = _$loading;
	//Aer['@require'] = _$require;
	Aer['@namespace'];
	Aer['@mix'];
	Aer['@import'] = _$import;
	Aer['@loaded'] = _$loaded;
	Aer['@css'];
	Aer['@env'];
	Aer['@sync'] = _$sync;
	Aer['@async'] = _$async;
	Aer['@prototype'] = _$prototype;
	
	/**
	 * This object is the core of the chained directives.
	 * First instance directives must return this wrapper.
	 */
	function _$wrap(obj) {
		this.o = obj;
	}
	_$wrap.prototype = {
		constructor : _$wrap,
		aer$classname : '_$wrap',
		'@prototype' : _$prototype,
		'@return' : function() {
			return this.o;
		},
		'@global' : function() {
			
		}
		
	}
	
	/**
	 * 
	 */
	function _$new(namespace) {
		return _$getclass(namespace);
	}
	
	/**
	 * 
	 */
	function _$getclass(namespace) {
		var n = namespace.split('.'), i, l, scope = _$classes;
		
		for (i = 0, l = n.length; i < l; i++) {
			scope = _$classes[i]
		}
		
		return scope;
	}
	
	/**
	 * Imports required classes
	 */
	function _$import(namespace, async) { 'use strict';
		if (_$classes[namespace]) { return; }
		
		var klass = document.createElement('script');
		
		_$loading.classes.push(classNamespace);
		
		klass.type = 'text/javascript';
		klass.src = namespace.replace(/\./g, '/') + '.js';
		
		document.getElementsByTagName('head').appendChild(klass);
		
		if (async) {
			_$log('Loading Aer[@' + namespace + ']...');
			
			while(!_$classes[namespace]) {
				// only wait for the class to load
			}
			
			_$log('Aer[@' + namespace + '] has loaded');
		}
	}
	
	/**
	 * Import required classes synchronously
	 */
	function _$sync(namespace) { 'use strict';
		_$import(namespace, false);
	}
	
	/**
	 * Import required classes asynchronously
	 */
	function _$async() { 'use strict';
		_$import(namespace, true);
	}
	
	/**
	 * 
	 */
	function _$register() { 'use strict';
		
	}
	
	/**
	 * 
	 */
	function _$namespace(str) { 'use strict';
		var n = str.split['.'], i, l;
		
		for (i = 0, l = n.length; i < l; i++) {
			
		}
	}
	
	/**
	 * Mix multiples objects
	 */
	function _$mix() { 'use strict';
		var obj = {}, i, prop;
		
		for (i = 0; i < arguments.length; i++) {
			for (prop in arguments[i]) {
				obj[prop] = arguments[i][prop];
			}
		}
		
		return obj;
	}
	
	/**
	 * Create the namespace in the classes
	 */
	function _$chain(str) { 'use strict';
		var n = str.split('.'), i, l, scope = _$aerclass;

		for (i = 0, l = n.length; i < l; i++) {
			if (!scope[i]) {
				scope[i] = {};
			}
			scope = scope[i];
		}
		
		return scope;
	}
	
	/**
	 * Implements classes
	 */
	function _$class() { 'use strict';
		var _o = {
			'String,Function' : function(namespace, implementation) {
				if (_$classes.indexOf(namespace) != -1) {
					throw new Error();
				}
				
				var o = _$chain(namespace);
				
				o = implementation;
				o.prototype.aer$classname = namespace;
				
				_$classes.push(namespace);
				
				return new _$wrap(o);
			},
			'String,_$over' : function(namespace, over) {
				if (_$classes.indexOf(namespace) != -1) {
					throw new Error();
				}
				
				var o = _$chain(namespace);
				
				o = over.overloadIt();
				o.prototype.aer$classname = namespace;
				
				_$classes.push(namespace);
				
				return new _$wrap(o);
			}
		};
		
		return _$$overload(_o, arguments, this);
	}
	
	/**
	 * 
	 */
	function _$prototype() { 'use strict';
		var _o = {
			'Object' : function(o) {
				return this;
			},
			'_$class,Object' : function(c, o) {
				return this;
			}
		};
		
		return function() {
			return _$$overload(_o, arguments, this);
		}
	}
	
	/**
	 * A great way to overload functions!!! XD
	 * 
	 * The modified overload that works with the classname prototype attribute
	 */
	function _$$overload(pointer, args, context) {
		var types = [], i;
		
		for (i = 0; i < args.length; i++) {
			types.push(args[i].aer$classname);
		}
		
		return pointer[types.toString()].apply(context, args);
	}
	
	/**
	 * This must be an object that Aer['@class'] can recognize overloaded classes implementations
	 */
	function _$over(o) { 'use strict';
		if (!(this instanceof _$over)) {
			return new _$over(o);
		}
		
		// must be privileged
		this.overloadIt = function() {
			return function() {
				return _$$overload(o, arguments, this);
			}
		}
	}
	_$over.prototype = {
		constructor : _$over,
		aer$classname : '_$over'
	};
	
	$global.Aer = Aer;
})(this);

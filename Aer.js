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
		_$all = false,
		_$protos = 0,
		_$classes = [],
		_$dependencies = [],
		_$namespaces = {},
		_$loading = [],
		_$loaded = 0,
		_$new = {},
		_$config = {},
		_$overloaded,
		_$root = '',
		_$mainprog;
	
		
	function Aer(fn) { 'use strict';
		if (this === undefined) {
			return new Aer(fn);
		}
		
		_$main = fn;
	}
	Aer.prototype = {
		constructor : Aer,
		aer$classname : 'Aer',
		extend : function() {},
		override : function() {}
	};
	
	// some directive
	Aer['@'] = _$new;
	Aer['@class'] = _$class;
	Aer['@overload'] = _$over;
	Aer['@config'];
	Aer['@loading'] = _$loading;
	Aer['@namespace'];
	Aer['@define'];
	Aer['@mix'];
	Aer['@import'] = _$import;
	Aer['@require'] = _$require;
	Aer['@project'] = _$project;
	Aer['@main'] = _$main;
	
	
	/**
	 * Define the main program
	 */
	function _$main(fn) { 'use strict';
		_$mainprog = fn;
		var check = setInterval(function() {
			_$check(check);
		}, 100);
	}
	
	/**
	 * Check the dependencies, than run the main program
	 */
	function _$check(timevar) { 'use strict';
		var i, l;
		
		for (i=0, l=_$dependencies.length; i<l; i++) {
			if (!_$new[_$dependencies[i]]) {
				return;
			}
		}
		
		if (_$protos > 0) {
			alert('ahahahah')
			return;
		}
		
		clearInterval(timevar);
		
		_$mainprog();
	}
	
	/**
	 *
	 */
	function _$project(cfg) {
		var i, l;
		
		_$root = cfg['@root'] || '';
		
		for (i=0, l=cfg['@dependencies'].length; i<l; i++) {
			Aer['@sync'](cfg['@dependencies'][i]);
		}
		
		if (cfg['@main']) {
			Aer['@sync'](cfg['@main']);
		}
	}
	
	/**
	 *
	 */
	function _$class(namespace) { 'use strict';
		var transitory = new _$transitory();
		
		transitory.namespace = namespace;
		
		return transitory;
	}
	
	/**
	 * Transitory object
	 */
	function _$transitory() { 'use strict';
		this.namespace;
		this.extended;
		this.o;
	}
	_$transitory.prototype = {
		aer$classname : '_$transitory',
		'@extend' : function() { 'use strict';
			this.extended = arguments;
			return this;
		},
		'@' : function() { 'use strict';
			var _o = {
				'_$over' : function(over) {
					var o = _$chain(this.namespace, over.overload());

					_$classes.push(this.namespace);
					_$new[this.namespace] = o;
					
					this.o = o;
					
					if (this.extended !== undefined) {
						_$protos += 1;
						_$proto(this.o, this.extended, this.namespace);
					}
					
					return this;
				},
				'Function' : function(implementation) {
					var o = _$chain(this.namespace, implementation);
					
					_$classes.push(this.namespace);
					_$new[this.namespace] = o;
					
					this.o = o;
					
					if (this.extended !== undefined) {
						_$protos += 1;
						_$proto(this.o, this.extended, this.namespace);
					}
					
					return this;
				}
			};
			
			return _$$overload(_o, arguments, this);
		},
		'@prototype' : function() { 'use strict';
			var _o = {
				'Object' : function(obj) {
					var _class = this.o.prototype.aer$classname;
					
					this.o.prototype = obj;
					this.o.prototype.aer$classname = _class;
					
					return this;
				}
			}
			
			return _$$overload(_o, arguments, this);
		}
	}
	
	/**
	 * 
	 */
	function _$proto(o, x, n) { 'use strict';
		var ok = setInterval(function() {
			_$async(o, x, n, ok);
		}, 100);
	}
	
	/**
	 * 
	 */
	function _$async(o, x, n, timevar) { 'use strict';
		var i, l;
		
		for (i=0, l=_$dependencies.length; i<l; i++) {
			if (!_$new[_$dependencies[i]]) {
				return;
			}
		}
		
		o.prototype = _$mix(x);
		o.prototype.aer$classname = n;
		
		clearInterval(timevar);
		
		_$protos -= 1;
	}
	
	/**
	 * Imports required classes
	 */
	function _$import(namespace, async) { 'use strict';
		if (_$classes[namespace]) { return; }
		
		_$dependencies.push(namespace);
		
		var klass = document.createElement('script');
		var _n = namespace.split('.');
		
		klass.type = 'text/javascript';
		klass.src = _$root + namespace.replace(/\./g, '/') + '\\' + _n[_n.length - 1] + '.js';
		
		document.getElementsByTagName('head')[0].appendChild(klass);
	}
	
	/**
	 * Import required classes synchronously
	 */
	function _$require(namespace) { 'use strict';
		_$import(namespace, false);
	}

	/**
	 * 
	 */
	function _$register() { 'use strict';
		
	}
	
	/**
	 * 
	 */
	function _$define(directive, fn) { 'use strict';
		Aer[directive] = fn;
	}
	
	/**
	 * Mix multiples objects
	 */
	function _$mix(array) { 'use strict';
		var obj = {}, i, prop;
		
		for (i = 0; i < array.length; i++) {
			for (prop in _$new[array[i]].prototype) {
				if (prop != 'aer$classname') {
					obj[prop] = _$new[array[i]].prototype[prop];
				}
			}
		}
		
		return obj;
	}
	
	/**
	 * Create the namespace in the classes
	 */
	function _$chain(namespace, fn) { 'use strict';
		var n = namespace.split('.'), i, l, prop, clone = {}, scope = _$aerclass;
		
		fn.prototype.aer$classname = namespace;
		
		for (i = 0, l = n.length; i < l; i++) {
			if (!scope[n[i]]) {
				scope[n[i]] = {};
			}
			
			if (i === (l-1)) {
				for (prop in scope[n[i]]) {
					if (prop !== 'aer$classname') {
						clone[prop] = scope[n[i]][prop];
					}
				}
				
				scope[n[i]] = fn;
				
				for (prop in clone) {
					scope[n[i]][prop] = clone[prop];
				}
			} else {
				scope = scope[n[i]];
			}
		}
		
		return scope[n[i-1]];
	}
	
	/**
	 * A great way to overload functions!!! XD
	 * The modified overload that works with the aer$classname prototype attribute
	 */
	function _$$overload(pointer, args, context) { 'use strict';
		var types = [], i;
		
		for (i = 0; i < args.length; i++) {
			types.push(args[i].aer$classname);
		}
		
		return pointer[types.toString()].apply(context, args);
	}
	
	/**
	 * This must be an object that Aer['@class'] can recognize overloaded classes implementations
	 */
	function _$over() { 'use strict';
		if (this.aer$classname === 'Function') {
			if (arguments[0] && arguments[1]) {
				return new _$over(arguments[0], arguments[1]);
			}
			
			return new _$over(arguments[0]);
		}
		
		return _$$overload(_$over, arguments, this);
	}
	_$over.prototype.aer$classname = '_$over';
	
	/**
	 * 
	 */
	_$over['Object'] = function(o) { 'use strict';
		return function() {
			return _$$overload(o, arguments, this);
		}
	}
	
	/**
	 * 
	 */
	_$over['String,Object'] = function(s, o) { 'use strict';
		this.overload = function() {
			return function() {
				return _$$overload(o, arguments, this);
			}
		}
	}
	
	$global.Aer = Aer;
})(this);

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
		_$classes = [],
		_$dependencies = [],
		_$namespaces = {},
		_$loading = [],
		_$loaded = 0,
		_$new = {},
		_$env,
		_$config = {},
		_$overloaded,
		_$root = '',
		_$mainprog,
		_$process = [];
	
		
	function Aer(fn) { 'use strict';
		if (this == undefined) {
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
	Aer['@getclass'] = _$getclass;
	Aer['@'] = _$new;
	Aer['@class'] = _$class;
	Aer['@overload'] = _$over;
	Aer['@config'];
	Aer['@loading'] = _$loading;
	//Aer['@require'] = _$require;
	Aer['@extend'] = _$extend;
	Aer['@namespace'];
	Aer['@define'];
	Aer['@mix'];
	Aer['@import'] = _$import;
	Aer['@loaded'] = _$loaded;
	Aer['@css'];
	Aer['@env'];
	Aer['@sync'] = _$sync;
	Aer['@async'] = _$async;
	Aer['@block'] = new Array();
	Aer['@project'] = _$project;
	Aer['@main'] = _$main;
	//Aer['@prototype'] = _$prototype;
	
	/**
	 * This object is the core of the chained directives.
	 * First instance directives must return this wrapper.
	 */
	function _$wrap(obj) {
		this.o = obj;
	}
	_$wrap.prototype = {
		constructor : _$wrap,
		aer$classname : '_$wrap'
	}
	
	_$wrap.prototype['@prototype'] = (function() {
		var _o = {
			'Object' : function(obj) {
				var _class = this.o.prototype.aer$classname;
				
				this.o.prototype = obj;
				this.o.prototype.aer$classname = _class;
				
				return this;
			}
		}
		
		return function() {
			return _$$overload(_o, arguments, this);
		}
	})();
	
	_$wrap.prototype['@return'] = function() {
		
	}
	
	_$wrap.prototype['@global'] = function() {
		
	}
	
	/**
	 * 
	 */
	function _$getclass(namespace) {
		var n = namespace.split('.'), i, l, scope = _$aerclass;
		
		for (i = 0, l = n.length; i < l; i++) {
			scope = scope[n[i]];
		}
		
		return scope;
	}
	
	/**
	 * 
	 */
	function _$run() {
		
	}
	
	/**
	 * 
	 */
	function _$main(fn) {
		_$mainprog = fn;
		
		var check = setInternval(function() {
			_$check(check);
		}, 300);
	}
	
	/**
	 * 
	 */
	function _$check(timevar) {
		var i, l;
		
		for (i=0, l=_$dependencies.length; i<l; i++) {
			if (!_$new[_$dependencies[i]]) {
				return;
			}
		}
		
		clearInterval(timevar);
		
		_$mainprog();
	}
	
	/**
	 * {
	 * 		'@main' : 
	 * }
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
	
	Aer['@project']({
		'@root' : '../app/folder',
		'@main' : 'Aer.MainApp',
		'@dependencies' : [
		     'Aer.MainApp.Class1',
		     'Aer.MainApp.Class2'
		 ]
	});
	
	/**
	 * Imports required classes
	 */
	function _$import(namespace, async) { 'use strict';
		if (_$classes[namespace]) { return; }
		
		_$dependencies.push(namespace);
		
		var klass = document.createElement('script');
		var _n = namespace.split('.');
		
		klass.type = 'text/javascript';
		klass.src = _$root + namespace.replace(/\./g, '/') + '\\' + namespace + '.js';
		
		document.getElementsByTagName('head')[0].appendChild(klass);
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
	function _$define(directive, fn) { 'use strict';
		Aer[directive] = fn;
	}
	
	/**
	 * 
	 */
	function _$extend(context, classes) { 'use strict';
		var i, l;
		
		for (i=0, l=classes.length; i<l; i++) {
			_$new(classes[i]).apply(context, []);
		}
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
	function _$chain(namespace, fn) { 'use strict';
		var n = namespace.split('.'), i, l, scope = _$aerclass;
		
		fn.prototype.aer$classname = namespace;
		
		for (i = 0, l = n.length; i < l; i++) {
			if (!scope[n[i]]) {
				scope[n[i]] = {};
			}
			
			if (i === (l-1)) {
				scope[n[i]] = fn;
			} else {
				scope = scope[n[i]];
			}
		}
		
		return scope[n[i-1]];
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
				
				var o = _$chain(namespace, implementation);

				_$classes.push(namespace);
				_$new[namespace] = o;
				
				return new _$wrap(o);
			},
			'String,_$over' : function(namespace, over) {
				if (_$classes.indexOf(namespace) != -1) {
					throw new Error();
				}
				
				var o = _$chain(namespace, over.overload());

				_$classes.push(namespace);
				_$new[namespace] = o;
				
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
	 * The modified overload that works with the aer$classname prototype attribute
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

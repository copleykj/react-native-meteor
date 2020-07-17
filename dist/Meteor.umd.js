(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var performanceNow = createCommonjsModule(function (module) {
  // Generated by CoffeeScript 1.7.1
  (function() {
    var getNanoSeconds, hrtime, loadTime;

    if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
      module.exports = function() {
        return performance.now();
      };
    } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
      module.exports = function() {
        return (getNanoSeconds() - loadTime) / 1e6;
      };
      hrtime = process.hrtime;
      getNanoSeconds = function() {
        var hr;
        hr = hrtime();
        return hr[0] * 1e9 + hr[1];
      };
      loadTime = getNanoSeconds();
    } else if (Date.now) {
      module.exports = function() {
        return Date.now() - loadTime;
      };
      loadTime = Date.now();
    } else {
      module.exports = function() {
        return new Date().getTime() - loadTime;
      };
      loadTime = new Date().getTime();
    }

  }).call(commonjsGlobal);
  });

  var global$1 = typeof window === 'undefined' ? {} : window
    , vendors = ['moz', 'webkit']
    , suffix = 'AnimationFrame'
    , raf = global$1['request' + suffix]
    , caf = global$1['cancel' + suffix] || global$1['cancelRequest' + suffix];

  for(var i = 0; i < vendors.length && !raf; i++) {
    raf = global$1[vendors[i] + 'Request' + suffix];
    caf = global$1[vendors[i] + 'Cancel' + suffix]
        || global$1[vendors[i] + 'CancelRequest' + suffix];
  }

  // Some versions of FF have rAF but not cAF
  if(!raf || !caf) {
    var last = 0
      , id = 0
      , queue = []
      , frameDuration = 1000 / 60;

    raf = function(callback) {
      if(queue.length === 0) {
        var _now = performanceNow()
          , next = Math.max(0, frameDuration - (_now - last));
        last = next + _now;
        setTimeout(function() {
          var cp = queue.slice(0);
          // Clear queue here to prevent
          // callbacks from appending listeners
          // to the current frame's queue
          queue.length = 0;
          for(var i = 0; i < cp.length; i++) {
            if(!cp[i].cancelled) {
              try{
                cp[i].callback(last);
              } catch(e) {
                setTimeout(function() { throw e }, 0);
              }
            }
          }
        }, Math.round(next));
      }
      queue.push({
        handle: ++id,
        callback: callback,
        cancelled: false
      });
      return id
    };

    caf = function(handle) {
      for(var i = 0; i < queue.length; i++) {
        if(queue[i].handle === handle) {
          queue[i].cancelled = true;
        }
      }
    };
  }

  var raf_1 = function(fn) {
    // Wrap in a new function to prevent
    // `cancel` potentially being assigned
    // to the native rAF function
    return raf.call(global$1, fn)
  };
  var cancel = function() {
    caf.apply(global$1, arguments);
  };
  raf_1.cancel = cancel;

  /////////////////////////////////////////////////////
  // Package docs at http://docs.meteor.com/#tracker //
  // Last merge: https://github.com/meteor/meteor/blob/696876b1848e4d6a920143422c2c50c4501c85a3/packages/tracker/tracker.js //
  /////////////////////////////////////////////////////

  //
  var trackr = (function() {

  // check for global and use that one instead of loading a new one
  if (typeof commonjsGlobal.Trackr !== "undefined") {
  	return commonjsGlobal.Trackr;
  }

  /**
   * @namespace Trackr
   * @summary The namespace for Trackr-related methods.
   */
  var Trackr = commonjsGlobal.Trackr = {};

  // http://docs.meteor.com/#tracker_active

  /**
   * @summary True if there is a current computation, meaning that dependencies on reactive data sources will be tracked and potentially cause the current computation to be rerun.
   * @locus Client
   * @type {Boolean}
   */
  Trackr.active = false;

  // http://docs.meteor.com/#tracker_currentcomputation

  /**
   * @summary The current computation, or `null` if there isn't one.	The current computation is the [`Trackr.Computation`](#tracker_computation) object created by the innermost active call to `Trackr.autorun`, and it's the computation that gains dependencies when reactive data sources are accessed.
   * @locus Client
   * @type {Trackr.Computation}
   */
  Trackr.currentComputation = null;

  // References to all computations created within the Trackr by id.
  // Keeping these references on an underscore property gives more control to
  // tooling and packages extending Trackr without increasing the API surface.
  // These can used to monkey-patch computations, their functions, use
  // computation ids for tracking, etc.
  Trackr._computations = {};

  var setCurrentComputation = function (c) {
  	Trackr.currentComputation = c;
  	Trackr.active = !! c;
  };

  var _debugFunc = function () {
  	return (typeof console !== "undefined") && console.error ?
  			 function () { console.error.apply(console, arguments); } :
  			 function () {};
  };

  var _throwOrLog = function (from, e) {
  	if (throwFirstError) {
  		throw e;
  	} else {
  		var printArgs = ["Exception from Trackr " + from + " function:"];
  		if (e.stack && e.message && e.name) {
  			var idx = e.stack.indexOf(e.message);
  			if (idx < 0 || idx > e.name.length + 2) { // check for "Error: "
  				// message is not part of the stack
  				var message = e.name + ": " + e.message;
  				printArgs.push(message);
  			}
  		}
  		printArgs.push(e.stack);

  		for (var i = 0; i < printArgs.length; i++) {
  			_debugFunc()(printArgs[i]);
  		}
  	}
  };

  // Takes a function `f`, and wraps it in a `Meteor._noYieldsAllowed`
  // block if we are running on the server. On the client, returns the
  // original function (since `Meteor._noYieldsAllowed` is a
  // no-op). This has the benefit of not adding an unnecessary stack
  // frame on the client.
  var withNoYieldsAllowed = function (f) {
  	return f;
  };

  var nextId = 1;
  // computations whose callbacks we should call at flush time
  var pendingComputations = [];
  // `true` if a Trackr.flush is scheduled, or if we are in Trackr.flush now
  var willFlush = false;
  // `true` if we are in Trackr.flush now
  var inFlush = false;
  // `true` if we are computing a computation now, either first time
  // or recompute.	This matches Trackr.active unless we are inside
  // Trackr.nonreactive, which nullfies currentComputation even though
  // an enclosing computation may still be running.
  var inCompute = false;
  // `true` if the `_throwFirstError` option was passed in to the call
  // to Trackr.flush that we are in. When set, throw rather than log the
  // first error encountered while flushing. Before throwing the error,
  // finish flushing (from a finally block), logging any subsequent
  // errors.
  var throwFirstError = false;

  var afterFlushCallbacks = [];

  var requestAnimationFrame = raf_1;

  var requireFlush = function () {
  	if (! willFlush) {
  		requestAnimationFrame(Trackr._runFlush);
  		willFlush = true;
  	}
  };

  // Trackr.Computation constructor is visible but private
  // (throws an error if you try to call it)
  var constructingComputation = false;

  //
  // http://docs.meteor.com/#tracker_computation

  /**
   * @summary A Computation object represents code that is repeatedly rerun
   * in response to
   * reactive data changes. Computations don't have return values; they just
   * perform actions, such as rerendering a template on the screen. Computations
   * are created using Trackr.autorun. Use stop to prevent further rerunning of a
   * computation.
   * @instancename computation
   */
  Trackr.Computation = function (f, parent, options) {
  	if (! constructingComputation)
  		throw new Error(
  			"Trackr.Computation constructor is private; use Trackr.autorun");
  	constructingComputation = false;

  	var self = this;
  	options = options || {};

  	// http://docs.meteor.com/#computation_stopped

  	/**
  	 * @summary True if this computation has been stopped.
  	 * @locus Client
  	 * @memberOf Trackr.Computation
  	 * @instance
  	 * @name	stopped
  	 */
  	self.stopped = false;

  	// http://docs.meteor.com/#computation_invalidated

  	/**
  	 * @summary True if this computation has been invalidated (and not yet rerun), or if it has been stopped.
  	 * @locus Client
  	 * @memberOf Trackr.Computation
  	 * @instance
  	 * @name	invalidated
  	 * @type {Boolean}
  	 */
  	self.invalidated = false;

  	// http://docs.meteor.com/#computation_firstrun

  	/**
  	 * @summary True during the initial run of the computation at the time `Trackr.autorun` is called, and false on subsequent reruns and at other times.
  	 * @locus Client
  	 * @memberOf Trackr.Computation
  	 * @instance
  	 * @name	firstRun
  	 * @type {Boolean}
  	 */
  	self.firstRun = true;

  	self._id = nextId++;
  	self._onInvalidateCallbacks = [];
  	self._onStopCallbacks = [];
  	// the plan is at some point to use the parent relation
  	// to constrain the order that computations are processed
  	self._parent = parent;
  	self._func = f;
  	self._onError = options.onError;
  	self._recomputing = false;
  	self._context = options.context || null;

  	// Register the computation within the global Trackr.
  	Trackr._computations[self._id] = self;

  	var errored = true;
  	try {
  		self._compute();
  		errored = false;
  	} finally {
  		self.firstRun = false;
  		if (errored)
  			self.stop();
  	}
  };

  // http://docs.meteor.com/#computation_oninvalidate

  /**
   * @summary Registers `callback` to run when this computation is next invalidated, or runs it immediately if the computation is already invalidated.	The callback is run exactly once and not upon future invalidations unless `onInvalidate` is called again after the computation becomes valid again.
   * @locus Client
   * @param {Function} callback Function to be called on invalidation. Receives one argument, the computation that was invalidated.
   */
  Trackr.Computation.prototype.onInvalidate = function (f, ctx) {
  	var self = this;

  	if (typeof f !== 'function')
  		throw new Error("onInvalidate requires a function");

  	if (self.invalidated) {
  		Trackr.nonreactive(function () {
  			withNoYieldsAllowed(f).call(ctx || self._context, self);
  		});
  	} else {
  		self._onInvalidateCallbacks.push({ fn: f, ctx: ctx });
  	}
  };

  /**
   * @summary Registers `callback` to run when this computation is stopped, or runs it immediately if the computation is already stopped.	The callback is run after any `onInvalidate` callbacks.
   * @locus Client
   * @param {Function} callback Function to be called on stop. Receives one argument, the computation that was stopped.
   */
  Trackr.Computation.prototype.onStop = function (f, ctx) {
  	var self = this;

  	if (typeof f !== 'function')
  		throw new Error("onStop requires a function");

  	if (self.stopped) {
  		Trackr.nonreactive(function () {
  			withNoYieldsAllowed(f).call(ctx || self._context, self);
  		});
  	} else {
  		self._onStopCallbacks.push({ fn: f, ctx: ctx });
  	}
  };

  // http://docs.meteor.com/#computation_invalidate

  /**
   * @summary Invalidates this computation so that it will be rerun.
   * @locus Client
   */
  Trackr.Computation.prototype.invalidate = function () {
  	var self = this;
  	if (! self.invalidated) {
  		// if we're currently in _recompute(), don't enqueue
  		// ourselves, since we'll rerun immediately anyway.
  		if (! self._recomputing && ! self.stopped) {
  			requireFlush();
  			pendingComputations.push(this);
  		}

  		self.invalidated = true;

  		// callbacks can't add callbacks, because
  		// self.invalidated === true.
  		for(var i = 0, f; f = self._onInvalidateCallbacks[i]; i++) {
  			Trackr.nonreactive(function () {
  				withNoYieldsAllowed(f.fn).call(f.ctx || self._context, self);
  			});
  		}
  		self._onInvalidateCallbacks = [];
  	}
  };

  // http://docs.meteor.com/#computation_stop

  /**
   * @summary Prevents this computation from rerunning.
   * @locus Client
   */
  Trackr.Computation.prototype.stop = function () {
  	var self = this;

  	if (! self.stopped) {
  		self.stopped = true;
  		self.invalidate();
  		// Unregister from global Trackr.
  		delete Trackr._computations[self._id];
  		for(var i = 0, f; f = self._onStopCallbacks[i]; i++) {
  			Trackr.nonreactive(function () {
  				withNoYieldsAllowed(f.fn).call(f.ctx || self._context, self);
  			});
  		}
  		self._onStopCallbacks = [];
  	}
  };

  Trackr.Computation.prototype._compute = function () {
  	var self = this;
  	self.invalidated = false;

  	var previous = Trackr.currentComputation;
  	setCurrentComputation(self);
  	var previousInCompute = inCompute;
  	inCompute = true;
  	try {
  		withNoYieldsAllowed(self._func).call(self._context, self);
  	} finally {
  		setCurrentComputation(previous);
  		inCompute = previousInCompute;
  	}
  };

  Trackr.Computation.prototype._needsRecompute = function () {
  	var self = this;
  	return self.invalidated && ! self.stopped;
  };

  Trackr.Computation.prototype._recompute = function () {
  	var self = this;

  	self._recomputing = true;
  	try {
  		if (self._needsRecompute()) {
  			try {
  				self._compute();
  			} catch (e) {
  				if (self._onError) {
  					self._onError(e);
  				} else {
  					_throwOrLog("recompute", e);
  				}
  			}
  		}
  	} finally {
  		self._recomputing = false;
  	}
  };

  //
  // http://docs.meteor.com/#tracker_dependency

  /**
   * @summary A Dependency represents an atomic unit of reactive data that a
   * computation might depend on. Reactive data sources such as Session or
   * Minimongo internally create different Dependency objects for different
   * pieces of data, each of which may be depended on by multiple computations.
   * When the data changes, the computations are invalidated.
   * @class
   * @instanceName dependency
   */
  Trackr.Dependency = function () {
  	this._dependentsById = {};
  };

  // http://docs.meteor.com/#dependency_depend
  //
  // Adds `computation` to this set if it is not already
  // present.	Returns true if `computation` is a new member of the set.
  // If no argument, defaults to currentComputation, or does nothing
  // if there is no currentComputation.

  /**
   * @summary Declares that the current computation (or `fromComputation` if given) depends on `dependency`.	The computation will be invalidated the next time `dependency` changes.

  If there is no current computation and `depend()` is called with no arguments, it does nothing and returns false.

  Returns true if the computation is a new dependent of `dependency` rather than an existing one.
   * @locus Client
   * @param {Trackr.Computation} [fromComputation] An optional computation declared to depend on `dependency` instead of the current computation.
   * @returns {Boolean}
   */
  Trackr.Dependency.prototype.depend = function (computation) {
  	if (! computation) {
  		if (! Trackr.active)
  			return false;

  		computation = Trackr.currentComputation;
  	}
  	var self = this;
  	var id = computation._id;
  	if (! (id in self._dependentsById)) {
  		self._dependentsById[id] = computation;
  		computation.onInvalidate(function () {
  			delete self._dependentsById[id];
  		});
  		return true;
  	}
  	return false;
  };

  // http://docs.meteor.com/#dependency_changed

  /**
   * @summary Invalidate all dependent computations immediately and remove them as dependents.
   * @locus Client
   */
  Trackr.Dependency.prototype.changed = function () {
  	var self = this;
  	for (var id in self._dependentsById)
  		self._dependentsById[id].invalidate();
  };

  // http://docs.meteor.com/#dependency_hasdependents

  /**
   * @summary True if this Dependency has one or more dependent Computations, which would be invalidated if this Dependency were to change.
   * @locus Client
   * @returns {Boolean}
   */
  Trackr.Dependency.prototype.hasDependents = function () {
  	var self = this;
  	for(var id in self._dependentsById)
  		return true;
  	return false;
  };

  // http://docs.meteor.com/#tracker_flush

  /**
   * @summary Process all reactive updates immediately and ensure that all invalidated computations are rerun.
   * @locus Client
   */
  Trackr.flush = function (options) {
  	Trackr._runFlush({ finishSynchronously: true,
  											throwFirstError: options && options._throwFirstError });
  };

  // Run all pending computations and afterFlush callbacks.	If we were not called
  // directly via Trackr.flush, this may return before they're all done to allow
  // the event loop to run a little before continuing.
  Trackr._runFlush = function (options) {
  	// XXX What part of the comment below is still true? (We no longer
  	// have Spark)
  	//
  	// Nested flush could plausibly happen if, say, a flush causes
  	// DOM mutation, which causes a "blur" event, which runs an
  	// app event handler that calls Trackr.flush.	At the moment
  	// Spark blocks event handlers during DOM mutation anyway,
  	// because the LiveRange tree isn't valid.	And we don't have
  	// any useful notion of a nested flush.
  	//
  	// https://app.asana.com/0/159908330244/385138233856
  	if (inFlush)
  		throw new Error("Can't call Trackr.flush while flushing");

  	if (inCompute)
  		throw new Error("Can't flush inside Trackr.autorun");

  	options = options || {};

  	inFlush = true;
  	willFlush = true;
  	throwFirstError = !! options.throwFirstError;

  	var recomputedCount = 0;
  	var finishedTry = false;
  	try {
  		while (pendingComputations.length ||
  					 afterFlushCallbacks.length) {

  			// recompute all pending computations
  			while (pendingComputations.length) {
  				var comp = pendingComputations.shift();
  				comp._recompute();
  				if (comp._needsRecompute()) {
  					pendingComputations.unshift(comp);
  				}

  				if (! options.finishSynchronously && ++recomputedCount > 1000) {
  					finishedTry = true;
  					return;
  				}
  			}

  			if (afterFlushCallbacks.length) {
  				// call one afterFlush callback, which may
  				// invalidate more computations
  				var cb = afterFlushCallbacks.shift();
  				try {
  					cb.fn.call(cb.ctx);
  				} catch (e) {
  					_throwOrLog("afterFlush", e);
  				}
  			}
  		}
  		finishedTry = true;
  	} finally {
  		if (! finishedTry) {
  			// we're erroring due to throwFirstError being true.
  			inFlush = false; // needed before calling `Trackr.flush()` again
  			// finish flushing
  			Trackr._runFlush({
  				finishSynchronously: options.finishSynchronously,
  				throwFirstError: false
  			});
  		}
  		willFlush = false;
  		inFlush = false;
  		if (pendingComputations.length || afterFlushCallbacks.length) {
  			// We're yielding because we ran a bunch of computations and we aren't
  			// required to finish synchronously, so we'd like to give the event loop a
  			// chance. We should flush again soon.
  			if (options.finishSynchronously) {
  				throw new Error("still have more to do?");	// shouldn't happen
  			}
  			setTimeout(requireFlush, 10);
  		}
  	}
  };

  // http://docs.meteor.com/#tracker_autorun
  //
  // Run f(). Record its dependencies. Rerun it whenever the
  // dependencies change.
  //
  // Returns a new Computation, which is also passed to f.
  //
  // Links the computation to the current computation
  // so that it is stopped if the current computation is invalidated.

  /**
   * @callback Trackr.ComputationFunction
   * @param {Trackr.Computation}
   */
  /**
   * @summary Run a function now and rerun it later whenever its dependencies
   * change. Returns a Computation object that can be used to stop or observe the
   * rerunning.
   * @locus Client
   * @param {Trackr.ComputationFunction} runFunc The function to run. It receives
   * one argument: the Computation object that will be returned.
   * @param {Object} [options]
   * @param {Function} options.onError Optional. The function to run when an error
   * happens in the Computation. The only argument it recieves is the Error
   * thrown. Defaults to the error being logged to the console.
   * @returns {Trackr.Computation}
   */
  Trackr.autorun = function (f, options, ctx) {
  	if (typeof f !== 'function')
  		throw new Error('Trackr.autorun requires a function argument');

  	options = options || {};
  	if (ctx) options.context = ctx;

  	constructingComputation = true;
  	var c = new Trackr.Computation(
  		f, Trackr.currentComputation, options);

  	if (Trackr.active)
  		Trackr.onInvalidate(function () {
  			c.stop();
  		});

  	return c;
  };

  // http://docs.meteor.com/#tracker_nonreactive
  //
  // Run `f` with no current computation, returning the return value
  // of `f`.	Used to turn off reactivity for the duration of `f`,
  // so that reactive data sources accessed by `f` will not result in any
  // computations being invalidated.

  /**
   * @summary Run a function without tracking dependencies.
   * @locus Client
   * @param {Function} func A function to call immediately.
   */
  Trackr.nonReactive =
  Trackr.nonreactive = function (f, ctx) {
  	var previous = Trackr.currentComputation;
  	setCurrentComputation(null);
  	try {
  		return f.call(ctx);
  	} finally {
  		setCurrentComputation(previous);
  	}
  };

  // like nonreactive but makes a function instead
  Trackr.nonReactable =
  Trackr.nonreactable = function (f, ctx) {
  	return function() {
  		var args = arguments;
  		var self = this;
  		return Trackr.nonreactive(function() {
  			return f.apply(ctx || self, args);
  		});
  	};
  };

  // http://docs.meteor.com/#tracker_oninvalidate

  /**
   * @summary Registers a new [`onInvalidate`](#computation_oninvalidate) callback on the current computation (which must exist), to be called immediately when the current computation is invalidated or stopped.
   * @locus Client
   * @param {Function} callback A callback function that will be invoked as `func(c)`, where `c` is the computation on which the callback is registered.
   */
  Trackr.onInvalidate = function (f, ctx) {
  	if (! Trackr.active)
  		throw new Error("Trackr.onInvalidate requires a currentComputation");

  	Trackr.currentComputation.onInvalidate(f, ctx);
  };

  // http://docs.meteor.com/#tracker_afterflush

  /**
   * @summary Schedules a function to be called during the next flush, or later in the current flush if one is in progress, after all invalidated computations have been rerun.	The function will be run once and not on subsequent flushes unless `afterFlush` is called again.
   * @locus Client
   * @param {Function} callback A function to call at flush time.
   */
  Trackr.afterFlush = function (f, ctx) {
  	afterFlushCallbacks.push({ fn: f, ctx: ctx });
  	requireFlush();
  };

  // export it
  return Trackr;

  })();

  var ejson = createCommonjsModule(function (module) {
  module.exports =
  /******/ (function(modules) { // webpackBootstrap
  /******/ 	// The module cache
  /******/ 	var installedModules = {};
  /******/
  /******/ 	// The require function
  /******/ 	function __webpack_require__(moduleId) {
  /******/
  /******/ 		// Check if module is in cache
  /******/ 		if(installedModules[moduleId]) {
  /******/ 			return installedModules[moduleId].exports;
  /******/ 		}
  /******/ 		// Create a new module (and put it into the cache)
  /******/ 		var module = installedModules[moduleId] = {
  /******/ 			i: moduleId,
  /******/ 			l: false,
  /******/ 			exports: {}
  /******/ 		};
  /******/
  /******/ 		// Execute the module function
  /******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
  /******/
  /******/ 		// Flag the module as loaded
  /******/ 		module.l = true;
  /******/
  /******/ 		// Return the exports of the module
  /******/ 		return module.exports;
  /******/ 	}
  /******/
  /******/
  /******/ 	// expose the modules object (__webpack_modules__)
  /******/ 	__webpack_require__.m = modules;
  /******/
  /******/ 	// expose the module cache
  /******/ 	__webpack_require__.c = installedModules;
  /******/
  /******/ 	// define getter function for harmony exports
  /******/ 	__webpack_require__.d = function(exports, name, getter) {
  /******/ 		if(!__webpack_require__.o(exports, name)) {
  /******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
  /******/ 		}
  /******/ 	};
  /******/
  /******/ 	// define __esModule on exports
  /******/ 	__webpack_require__.r = function(exports) {
  /******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
  /******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  /******/ 		}
  /******/ 		Object.defineProperty(exports, '__esModule', { value: true });
  /******/ 	};
  /******/
  /******/ 	// create a fake namespace object
  /******/ 	// mode & 1: value is a module id, require it
  /******/ 	// mode & 2: merge all properties of value into the ns
  /******/ 	// mode & 4: return value when already ns object
  /******/ 	// mode & 8|1: behave like require
  /******/ 	__webpack_require__.t = function(value, mode) {
  /******/ 		if(mode & 1) value = __webpack_require__(value);
  /******/ 		if(mode & 8) return value;
  /******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
  /******/ 		var ns = Object.create(null);
  /******/ 		__webpack_require__.r(ns);
  /******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
  /******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
  /******/ 		return ns;
  /******/ 	};
  /******/
  /******/ 	// getDefaultExport function for compatibility with non-harmony modules
  /******/ 	__webpack_require__.n = function(module) {
  /******/ 		var getter = module && module.__esModule ?
  /******/ 			function getDefault() { return module['default']; } :
  /******/ 			function getModuleExports() { return module; };
  /******/ 		__webpack_require__.d(getter, 'a', getter);
  /******/ 		return getter;
  /******/ 	};
  /******/
  /******/ 	// Object.prototype.hasOwnProperty.call
  /******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
  /******/
  /******/ 	// __webpack_public_path__
  /******/ 	__webpack_require__.p = "";
  /******/
  /******/
  /******/ 	// Load entry module and return exports
  /******/ 	return __webpack_require__(__webpack_require__.s = 0);
  /******/ })
  /************************************************************************/
  /******/ ([
  /* 0 */
  /***/ (function(module, exports, __webpack_require__) {
  /* WEBPACK VAR INJECTION */(function(Base64, Meteor) {

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.EJSON = void 0;

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  /**
   * @namespace
   * @summary Namespace for EJSON functions
   */
  var EJSON = {}; // Custom type interface definition

  /**
   * @class CustomType
   * @instanceName customType
   * @memberOf EJSON
   * @summary The interface that a class must satisfy to be able to become an
   * EJSON custom type via EJSON.addType.
   */

  /**
   * @function typeName
   * @memberOf EJSON.CustomType
   * @summary Return the tag used to identify this type.  This must match the
   *          tag used to register this type with
   *          [`EJSON.addType`](#ejson_add_type).
   * @locus Anywhere
   * @instance
   */

  /**
   * @function toJSONValue
   * @memberOf EJSON.CustomType
   * @summary Serialize this instance into a JSON-compatible value.
   * @locus Anywhere
   * @instance
   */

  /**
   * @function clone
   * @memberOf EJSON.CustomType
   * @summary Return a value `r` such that `this.equals(r)` is true, and
   *          modifications to `r` do not affect `this` and vice versa.
   * @locus Anywhere
   * @instance
   */

  /**
   * @function equals
   * @memberOf EJSON.CustomType
   * @summary Return `true` if `other` has a value equal to `this`; `false`
   *          otherwise.
   * @locus Anywhere
   * @param {Object} other Another object to compare this to.
   * @instance
   */

  exports.EJSON = EJSON;
  var customTypes = {};

  var hasOwn = function hasOwn(obj, prop) {
    return {}.hasOwnProperty.call(obj, prop);
  };

  var isArguments = function isArguments(obj) {
    return obj != null && hasOwn(obj, 'callee');
  };

  var isInfOrNan = function isInfOrNan(obj) {
    return Number.isNaN(obj) || obj === Infinity || obj === -Infinity;
  }; // Add a custom type, using a method of your choice to get to and
  // from a basic JSON-able representation.  The factory argument
  // is a function of JSON-able --> your object
  // The type you add must have:
  // - A toJSONValue() method, so that Meteor can serialize it
  // - a typeName() method, to show how to look it up in our type table.
  // It is okay if these methods are monkey-patched on.
  // EJSON.clone will use toJSONValue and the given factory to produce
  // a clone, but you may specify a method clone() that will be
  // used instead.
  // Similarly, EJSON.equals will use toJSONValue to make comparisons,
  // but you may provide a method equals() instead.

  /**
   * @summary Add a custom datatype to EJSON.
   * @locus Anywhere
   * @param {String} name A tag for your custom type; must be unique among
   *                      custom data types defined in your project, and must
   *                      match the result of your type's `typeName` method.
   * @param {Function} factory A function that deserializes a JSON-compatible
   *                           value into an instance of your type.  This should
   *                           match the serialization performed by your
   *                           type's `toJSONValue` method.
   */


  EJSON.addType = function (name, factory) {
    if (hasOwn(customTypes, name)) {
      throw new Error("Type ".concat(name, " already present"));
    }

    customTypes[name] = factory;
  };

  var builtinConverters = [{
    // Date
    matchJSONValue: function matchJSONValue(obj) {
      return hasOwn(obj, '$date') && Object.keys(obj).length === 1;
    },
    matchObject: function matchObject(obj) {
      return obj instanceof Date;
    },
    toJSONValue: function toJSONValue(obj) {
      return {
        $date: obj.getTime()
      };
    },
    fromJSONValue: function fromJSONValue(obj) {
      return new Date(obj.$date);
    }
  }, {
    // RegExp
    matchJSONValue: function matchJSONValue(obj) {
      return hasOwn(obj, '$regexp') && hasOwn(obj, '$flags') && Object.keys(obj).length === 2;
    },
    matchObject: function matchObject(obj) {
      return obj instanceof RegExp;
    },
    toJSONValue: function toJSONValue(regexp) {
      return {
        $regexp: regexp.source,
        $flags: regexp.flags
      };
    },
    fromJSONValue: function fromJSONValue(obj) {
      // Replaces duplicate / invalid flags.
      return new RegExp(obj.$regexp, obj.$flags // Cut off flags at 50 chars to avoid abusing RegExp for DOS.
      .slice(0, 50).replace(/[^gimuy]/g, '').replace(/(.)(?=.*\1)/g, ''));
    }
  }, {
    // NaN, Inf, -Inf. (These are the only objects with typeof !== 'object'
    // which we match.)
    matchJSONValue: function matchJSONValue(obj) {
      return hasOwn(obj, '$InfNaN') && Object.keys(obj).length === 1;
    },
    matchObject: isInfOrNan,
    toJSONValue: function toJSONValue(obj) {
      var sign;

      if (Number.isNaN(obj)) {
        sign = 0;
      } else if (obj === Infinity) {
        sign = 1;
      } else {
        sign = -1;
      }

      return {
        $InfNaN: sign
      };
    },
    fromJSONValue: function fromJSONValue(obj) {
      return obj.$InfNaN / 0;
    }
  }, {
    // Binary
    matchJSONValue: function matchJSONValue(obj) {
      return hasOwn(obj, '$binary') && Object.keys(obj).length === 1;
    },
    matchObject: function matchObject(obj) {
      return typeof Uint8Array !== 'undefined' && obj instanceof Uint8Array || obj && hasOwn(obj, '$Uint8ArrayPolyfill');
    },
    toJSONValue: function toJSONValue(obj) {
      return {
        $binary: Base64.encode(obj)
      };
    },
    fromJSONValue: function fromJSONValue(obj) {
      return Base64.decode(obj.$binary);
    }
  }, {
    // Escaping one level
    matchJSONValue: function matchJSONValue(obj) {
      return hasOwn(obj, '$escape') && Object.keys(obj).length === 1;
    },
    matchObject: function matchObject(obj) {
      var match = false;

      if (obj) {
        var keyCount = Object.keys(obj).length;

        if (keyCount === 1 || keyCount === 2) {
          match = builtinConverters.some(function (converter) {
            return converter.matchJSONValue(obj);
          });
        }
      }

      return match;
    },
    toJSONValue: function toJSONValue(obj) {
      var newObj = {};
      Object.keys(obj).forEach(function (key) {
        newObj[key] = EJSON.toJSONValue(obj[key]);
      });
      return {
        $escape: newObj
      };
    },
    fromJSONValue: function fromJSONValue(obj) {
      var newObj = {};
      Object.keys(obj.$escape).forEach(function (key) {
        newObj[key] = EJSON.fromJSONValue(obj.$escape[key]);
      });
      return newObj;
    }
  }, {
    // Custom
    matchJSONValue: function matchJSONValue(obj) {
      return hasOwn(obj, '$type') && hasOwn(obj, '$value') && Object.keys(obj).length === 2;
    },
    matchObject: function matchObject(obj) {
      return EJSON._isCustomType(obj);
    },
    toJSONValue: function toJSONValue(obj) {
      var jsonValue = Meteor._noYieldsAllowed(function () {
        return obj.toJSONValue();
      });

      return {
        $type: obj.typeName(),
        $value: jsonValue
      };
    },
    fromJSONValue: function fromJSONValue(obj) {
      var typeName = obj.$type;

      if (!hasOwn(customTypes, typeName)) {
        throw new Error("Custom EJSON type ".concat(typeName, " is not defined"));
      }

      var converter = customTypes[typeName];
      return Meteor._noYieldsAllowed(function () {
        return converter(obj.$value);
      });
    }
  }];

  EJSON._isCustomType = function (obj) {
    return obj && typeof obj.toJSONValue === 'function' && typeof obj.typeName === 'function' && hasOwn(customTypes, obj.typeName());
  };

  EJSON._getTypes = function () {
    return customTypes;
  };

  EJSON._getConverters = function () {
    return builtinConverters;
  }; // Either return the JSON-compatible version of the argument, or undefined (if
  // the item isn't itself replaceable, but maybe some fields in it are)


  var toJSONValueHelper = function toJSONValueHelper(item) {
    for (var i = 0; i < builtinConverters.length; i++) {
      var converter = builtinConverters[i];

      if (converter.matchObject(item)) {
        return converter.toJSONValue(item);
      }
    }

    return undefined;
  }; // for both arrays and objects, in-place modification.


  var adjustTypesToJSONValue = function adjustTypesToJSONValue(obj) {
    // Is it an atom that we need to adjust?
    if (obj === null) {
      return null;
    }

    var maybeChanged = toJSONValueHelper(obj);

    if (maybeChanged !== undefined) {
      return maybeChanged;
    } // Other atoms are unchanged.


    if (_typeof(obj) !== 'object') {
      return obj;
    } // Iterate over array or object structure.


    Object.keys(obj).forEach(function (key) {
      var value = obj[key];

      if (_typeof(value) !== 'object' && value !== undefined && !isInfOrNan(value)) {
        return; // continue
      }

      var changed = toJSONValueHelper(value);

      if (changed) {
        obj[key] = changed;
        return; // on to the next key
      } // if we get here, value is an object but not adjustable
      // at this level.  recurse.


      adjustTypesToJSONValue(value);
    });
    return obj;
  };

  EJSON._adjustTypesToJSONValue = adjustTypesToJSONValue;
  /**
   * @summary Serialize an EJSON-compatible value into its plain JSON
   *          representation.
   * @locus Anywhere
   * @param {EJSON} val A value to serialize to plain JSON.
   */

  EJSON.toJSONValue = function (item) {
    var changed = toJSONValueHelper(item);

    if (changed !== undefined) {
      return changed;
    }

    var newItem = item;

    if (_typeof(item) === 'object') {
      newItem = EJSON.clone(item);
      adjustTypesToJSONValue(newItem);
    }

    return newItem;
  }; // Either return the argument changed to have the non-json
  // rep of itself (the Object version) or the argument itself.
  // DOES NOT RECURSE.  For actually getting the fully-changed value, use
  // EJSON.fromJSONValue


  var fromJSONValueHelper = function fromJSONValueHelper(value) {
    if (_typeof(value) === 'object' && value !== null) {
      var keys = Object.keys(value);

      if (keys.length <= 2 && keys.every(function (k) {
        return typeof k === 'string' && k.substr(0, 1) === '$';
      })) {
        for (var i = 0; i < builtinConverters.length; i++) {
          var converter = builtinConverters[i];

          if (converter.matchJSONValue(value)) {
            return converter.fromJSONValue(value);
          }
        }
      }
    }

    return value;
  }; // for both arrays and objects. Tries its best to just
  // use the object you hand it, but may return something
  // different if the object you hand it itself needs changing.


  var adjustTypesFromJSONValue = function adjustTypesFromJSONValue(obj) {
    if (obj === null) {
      return null;
    }

    var maybeChanged = fromJSONValueHelper(obj);

    if (maybeChanged !== obj) {
      return maybeChanged;
    } // Other atoms are unchanged.


    if (_typeof(obj) !== 'object') {
      return obj;
    }

    Object.keys(obj).forEach(function (key) {
      var value = obj[key];

      if (_typeof(value) === 'object') {
        var changed = fromJSONValueHelper(value);

        if (value !== changed) {
          obj[key] = changed;
          return;
        } // if we get here, value is an object but not adjustable
        // at this level.  recurse.


        adjustTypesFromJSONValue(value);
      }
    });
    return obj;
  };

  EJSON._adjustTypesFromJSONValue = adjustTypesFromJSONValue;
  /**
   * @summary Deserialize an EJSON value from its plain JSON representation.
   * @locus Anywhere
   * @param {JSONCompatible} val A value to deserialize into EJSON.
   */

  EJSON.fromJSONValue = function (item) {
    var changed = fromJSONValueHelper(item);

    if (changed === item && _typeof(item) === 'object') {
      changed = EJSON.clone(item);
      adjustTypesFromJSONValue(changed);
    }

    return changed;
  };
  /**
   * @summary Serialize a value to a string. For EJSON values, the serialization
   *          fully represents the value. For non-EJSON values, serializes the
   *          same way as `JSON.stringify`.
   * @locus Anywhere
   * @param {EJSON} val A value to stringify.
   * @param {Object} [options]
   * @param {Boolean | Integer | String} options.indent Indents objects and
   * arrays for easy readability.  When `true`, indents by 2 spaces; when an
   * integer, indents by that number of spaces; and when a string, uses the
   * string as the indentation pattern.
   * @param {Boolean} options.canonical When `true`, stringifies keys in an
   *                                    object in sorted order.
   */


  EJSON.stringify = function (item, options) {
    var serialized;
    var json = EJSON.toJSONValue(item);

    if (options && (options.canonical || options.indent)) {
      var canonicalStringify = __webpack_require__(3);

      serialized = canonicalStringify(json, options);
    } else {
      serialized = JSON.stringify(json);
    }

    return serialized;
  };
  /**
   * @summary Parse a string into an EJSON value. Throws an error if the string
   *          is not valid EJSON.
   * @locus Anywhere
   * @param {String} str A string to parse into an EJSON value.
   */


  EJSON.parse = function (item) {
    if (typeof item !== 'string') {
      throw new Error('EJSON.parse argument should be a string');
    }

    return EJSON.fromJSONValue(JSON.parse(item));
  };
  /**
   * @summary Returns true if `x` is a buffer of binary data, as returned from
   *          [`EJSON.newBinary`](#ejson_new_binary).
   * @param {Object} x The variable to check.
   * @locus Anywhere
   */


  EJSON.isBinary = function (obj) {
    return !!(typeof Uint8Array !== 'undefined' && obj instanceof Uint8Array || obj && obj.$Uint8ArrayPolyfill);
  };
  /**
   * @summary Return true if `a` and `b` are equal to each other.  Return false
   *          otherwise.  Uses the `equals` method on `a` if present, otherwise
   *          performs a deep comparison.
   * @locus Anywhere
   * @param {EJSON} a
   * @param {EJSON} b
   * @param {Object} [options]
   * @param {Boolean} options.keyOrderSensitive Compare in key sensitive order,
   * if supported by the JavaScript implementation.  For example, `{a: 1, b: 2}`
   * is equal to `{b: 2, a: 1}` only when `keyOrderSensitive` is `false`.  The
   * default is `false`.
   */


  EJSON.equals = function (a, b, options) {
    var i;
    var keyOrderSensitive = !!(options && options.keyOrderSensitive);

    if (a === b) {
      return true;
    } // This differs from the IEEE spec for NaN equality, b/c we don't want
    // anything ever with a NaN to be poisoned from becoming equal to anything.


    if (Number.isNaN(a) && Number.isNaN(b)) {
      return true;
    } // if either one is falsy, they'd have to be === to be equal


    if (!a || !b) {
      return false;
    }

    if (!(_typeof(a) === 'object' && _typeof(b) === 'object')) {
      return false;
    }

    if (a instanceof Date && b instanceof Date) {
      return a.valueOf() === b.valueOf();
    }

    if (EJSON.isBinary(a) && EJSON.isBinary(b)) {
      if (a.length !== b.length) {
        return false;
      }

      for (i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
          return false;
        }
      }

      return true;
    }

    if (typeof a.equals === 'function') {
      return a.equals(b, options);
    }

    if (typeof b.equals === 'function') {
      return b.equals(a, options);
    }

    if (a instanceof Array) {
      if (!(b instanceof Array)) {
        return false;
      }

      if (a.length !== b.length) {
        return false;
      }

      for (i = 0; i < a.length; i++) {
        if (!EJSON.equals(a[i], b[i], options)) {
          return false;
        }
      }

      return true;
    } // fallback for custom types that don't implement their own equals


    switch (EJSON._isCustomType(a) + EJSON._isCustomType(b)) {
      case 1:
        return false;

      case 2:
        return EJSON.equals(EJSON.toJSONValue(a), EJSON.toJSONValue(b));

    } // fall back to structural equality of objects


    var ret;
    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);

    if (keyOrderSensitive) {
      i = 0;
      ret = aKeys.every(function (key) {
        if (i >= bKeys.length) {
          return false;
        }

        if (key !== bKeys[i]) {
          return false;
        }

        if (!EJSON.equals(a[key], b[bKeys[i]], options)) {
          return false;
        }

        i++;
        return true;
      });
    } else {
      i = 0;
      ret = aKeys.every(function (key) {
        if (!hasOwn(b, key)) {
          return false;
        }

        if (!EJSON.equals(a[key], b[key], options)) {
          return false;
        }

        i++;
        return true;
      });
    }

    return ret && i === bKeys.length;
  };
  /**
   * @summary Return a deep copy of `val`.
   * @locus Anywhere
   * @param {EJSON} val A value to copy.
   */


  EJSON.clone = function (v) {
    var ret;

    if (_typeof(v) !== 'object') {
      return v;
    }

    if (v === null) {
      return null; // null has typeof "object"
    }

    if (v instanceof Date) {
      return new Date(v.getTime());
    } // RegExps are not really EJSON elements (eg we don't define a serialization
    // for them), but they're immutable anyway, so we can support them in clone.


    if (v instanceof RegExp) {
      return v;
    }

    if (EJSON.isBinary(v)) {
      ret = EJSON.newBinary(v.length);

      for (var i = 0; i < v.length; i++) {
        ret[i] = v[i];
      }

      return ret;
    }

    if (Array.isArray(v)) {
      return v.map(function (value) {
        return EJSON.clone(value);
      });
    }

    if (isArguments(v)) {
      return Array.from(v).map(function (value) {
        return EJSON.clone(value);
      });
    } // handle general user-defined typed Objects if they have a clone method


    if (typeof v.clone === 'function') {
      return v.clone();
    } // handle other custom types


    if (EJSON._isCustomType(v)) {
      return EJSON.fromJSONValue(EJSON.clone(EJSON.toJSONValue(v)), true);
    } // handle other objects


    ret = {};
    Object.keys(v).forEach(function (key) {
      ret[key] = EJSON.clone(v[key]);
    });
    return ret;
  };
  /**
   * @summary Allocate a new buffer of binary data that EJSON can serialize.
   * @locus Anywhere
   * @param {Number} size The number of bytes of binary data to allocate.
   */
  // EJSON.newBinary is the public documented API for this functionality,
  // but the implementation is in the 'base64' package to avoid
  // introducing a circular dependency. (If the implementation were here,
  // then 'base64' would have to use EJSON.newBinary, and 'ejson' would
  // also have to use 'base64'.)


  EJSON.newBinary = Base64.newBinary;
  /* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(1)["Base64"], __webpack_require__(2)));

  /***/ }),
  /* 1 */
  /***/ (function(module, exports, __webpack_require__) {


  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Base64 = void 0;
  // Base 64 encoding
  var BASE_64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var BASE_64_VALS = Object.create(null);

  var getChar = function getChar(val) {
    return BASE_64_CHARS.charAt(val);
  };

  var getVal = function getVal(ch) {
    return ch === '=' ? -1 : BASE_64_VALS[ch];
  };

  for (var i = 0; i < BASE_64_CHARS.length; i++) {
    BASE_64_VALS[getChar(i)] = i;
  }

  var encode = function encode(array) {
    if (typeof array === "string") {
      var str = array;
      array = newBinary(str.length);

      for (var _i = 0; _i < str.length; _i++) {
        var ch = str.charCodeAt(_i);

        if (ch > 0xFF) {
          throw new Error("Not ascii. Base64.encode can only take ascii strings.");
        }

        array[_i] = ch;
      }
    }

    var answer = [];
    var a = null;
    var b = null;
    var c = null;
    var d = null;
    array.forEach(function (elm, i) {
      switch (i % 3) {
        case 0:
          a = elm >> 2 & 0x3F;
          b = (elm & 0x03) << 4;
          break;

        case 1:
          b = b | elm >> 4 & 0xF;
          c = (elm & 0xF) << 2;
          break;

        case 2:
          c = c | elm >> 6 & 0x03;
          d = elm & 0x3F;
          answer.push(getChar(a));
          answer.push(getChar(b));
          answer.push(getChar(c));
          answer.push(getChar(d));
          a = null;
          b = null;
          c = null;
          d = null;
          break;
      }
    });

    if (a != null) {
      answer.push(getChar(a));
      answer.push(getChar(b));

      if (c == null) {
        answer.push('=');
      } else {
        answer.push(getChar(c));
      }

      if (d == null) {
        answer.push('=');
      }
    }

    return answer.join("");
  }; // XXX This is a weird place for this to live, but it's used both by
  // this package and 'ejson', and we can't put it in 'ejson' without
  // introducing a circular dependency. It should probably be in its own
  // package or as a helper in a package that both 'base64' and 'ejson'
  // use.


  var newBinary = function newBinary(len) {
    if (typeof Uint8Array === 'undefined' || typeof ArrayBuffer === 'undefined') {
      var ret = [];

      for (var _i2 = 0; _i2 < len; _i2++) {
        ret.push(0);
      }

      ret.$Uint8ArrayPolyfill = true;
      return ret;
    }

    return new Uint8Array(new ArrayBuffer(len));
  };

  var decode = function decode(str) {
    var len = Math.floor(str.length * 3 / 4);

    if (str.charAt(str.length - 1) == '=') {
      len--;

      if (str.charAt(str.length - 2) == '=') {
        len--;
      }
    }

    var arr = newBinary(len);
    var one = null;
    var two = null;
    var three = null;
    var j = 0;

    for (var _i3 = 0; _i3 < str.length; _i3++) {
      var c = str.charAt(_i3);
      var v = getVal(c);

      switch (_i3 % 4) {
        case 0:
          if (v < 0) {
            throw new Error('invalid base64 string');
          }

          one = v << 2;
          break;

        case 1:
          if (v < 0) {
            throw new Error('invalid base64 string');
          }

          one = one | v >> 4;
          arr[j++] = one;
          two = (v & 0x0F) << 4;
          break;

        case 2:
          if (v >= 0) {
            two = two | v >> 2;
            arr[j++] = two;
            three = (v & 0x03) << 6;
          }

          break;

        case 3:
          if (v >= 0) {
            arr[j++] = three | v;
          }

          break;
      }
    }

    return arr;
  };

  var Base64 = {
    encode: encode,
    decode: decode,
    newBinary: newBinary
  };
  exports.Base64 = Base64;

  /***/ }),
  /* 2 */
  /***/ (function(module, exports, __webpack_require__) {


  module.exports = {
    //
    // When fibers are not supported on you system Meteor automatically sets this
    // function to a nope function. We're going to do the same here as there are
    // small parts of the code that call this function.
    //
    _noYieldsAllowed: function _noYieldsAllowed(f) {
      return f();
    }
  };

  /***/ }),
  /* 3 */
  /***/ (function(module, exports, __webpack_require__) {


  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = void 0;

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  // Based on json2.js from https://github.com/douglascrockford/JSON-js
  //
  //    json2.js
  //    2012-10-08
  //
  //    Public Domain.
  //
  //    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
  function quote(string) {
    return JSON.stringify(string);
  }

  var str = function str(key, holder, singleIndent, outerIndent, canonical) {
    var value = holder[key]; // What happens next depends on the value's type.

    switch (_typeof(value)) {
      case 'string':
        return quote(value);

      case 'number':
        // JSON numbers must be finite. Encode non-finite numbers as null.
        return isFinite(value) ? String(value) : 'null';

      case 'boolean':
        return String(value);
      // If the type is 'object', we might be dealing with an object or an array or
      // null.

      case 'object':
        {
          // Due to a specification blunder in ECMAScript, typeof null is 'object',
          // so watch out for that case.
          if (!value) {
            return 'null';
          } // Make an array to hold the partial results of stringifying this object
          // value.


          var innerIndent = outerIndent + singleIndent;
          var partial = [];
          var v; // Is the value an array?

          if (Array.isArray(value) || {}.hasOwnProperty.call(value, 'callee')) {
            // The value is an array. Stringify every element. Use null as a
            // placeholder for non-JSON values.
            var length = value.length;

            for (var i = 0; i < length; i += 1) {
              partial[i] = str(i, value, singleIndent, innerIndent, canonical) || 'null';
            } // Join all of the elements together, separated with commas, and wrap
            // them in brackets.


            if (partial.length === 0) {
              v = '[]';
            } else if (innerIndent) {
              v = '[\n' + innerIndent + partial.join(',\n' + innerIndent) + '\n' + outerIndent + ']';
            } else {
              v = '[' + partial.join(',') + ']';
            }

            return v;
          } // Iterate through all of the keys in the object.


          var keys = Object.keys(value);

          if (canonical) {
            keys = keys.sort();
          }

          keys.forEach(function (k) {
            v = str(k, value, singleIndent, innerIndent, canonical);

            if (v) {
              partial.push(quote(k) + (innerIndent ? ': ' : ':') + v);
            }
          }); // Join all of the member texts together, separated with commas,
          // and wrap them in braces.

          if (partial.length === 0) {
            v = '{}';
          } else if (innerIndent) {
            v = '{\n' + innerIndent + partial.join(',\n' + innerIndent) + '\n' + outerIndent + '}';
          } else {
            v = '{' + partial.join(',') + '}';
          }

          return v;
        }

    }
  }; // If the JSON object does not yet have a stringify method, give it one.


  var canonicalStringify = function canonicalStringify(value, options) {
    // Make a fake root object containing our value under the key of ''.
    // Return the result of stringifying the value.
    var allOptions = Object.assign({
      indent: '',
      canonical: false
    }, options);

    if (allOptions.indent === true) {
      allOptions.indent = '  ';
    } else if (typeof allOptions.indent === 'number') {
      var newIndent = '';

      for (var i = 0; i < allOptions.indent; i++) {
        newIndent += ' ';
      }

      allOptions.indent = newIndent;
    }

    return str('', {
      '': value
    }, allOptions.indent, '', allOptions.canonical);
  };

  var _default = canonicalStringify;
  exports["default"] = _default;
  module.exports = exports.default;

  /***/ })
  /******/ ])["EJSON"];
  });

  var EJSON = unwrapExports(ejson);

  var EventEmitter = createCommonjsModule(function (module) {
  (function (exports) {

      /**
       * Class for managing events.
       * Can be extended to provide event functionality in other classes.
       *
       * @class EventEmitter Manages event registering and emitting.
       */
      function EventEmitter() {}

      // Shortcuts to improve speed and size
      var proto = EventEmitter.prototype;
      var originalGlobalValue = exports.EventEmitter;

      /**
       * Finds the index of the listener for the event in its storage array.
       *
       * @param {Function[]} listeners Array of listeners to search through.
       * @param {Function} listener Method to look for.
       * @return {Number} Index of the specified listener, -1 if not found
       * @api private
       */
      function indexOfListener(listeners, listener) {
          var i = listeners.length;
          while (i--) {
              if (listeners[i].listener === listener) {
                  return i;
              }
          }

          return -1;
      }

      /**
       * Alias a method while keeping the context correct, to allow for overwriting of target method.
       *
       * @param {String} name The name of the target method.
       * @return {Function} The aliased method
       * @api private
       */
      function alias(name) {
          return function aliasClosure() {
              return this[name].apply(this, arguments);
          };
      }

      /**
       * Returns the listener array for the specified event.
       * Will initialise the event object and listener arrays if required.
       * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
       * Each property in the object response is an array of listener functions.
       *
       * @param {String|RegExp} evt Name of the event to return the listeners from.
       * @return {Function[]|Object} All listener functions for the event.
       */
      proto.getListeners = function getListeners(evt) {
          var events = this._getEvents();
          var response;
          var key;

          // Return a concatenated array of all matching events if
          // the selector is a regular expression.
          if (evt instanceof RegExp) {
              response = {};
              for (key in events) {
                  if (events.hasOwnProperty(key) && evt.test(key)) {
                      response[key] = events[key];
                  }
              }
          }
          else {
              response = events[evt] || (events[evt] = []);
          }

          return response;
      };

      /**
       * Takes a list of listener objects and flattens it into a list of listener functions.
       *
       * @param {Object[]} listeners Raw listener objects.
       * @return {Function[]} Just the listener functions.
       */
      proto.flattenListeners = function flattenListeners(listeners) {
          var flatListeners = [];
          var i;

          for (i = 0; i < listeners.length; i += 1) {
              flatListeners.push(listeners[i].listener);
          }

          return flatListeners;
      };

      /**
       * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
       *
       * @param {String|RegExp} evt Name of the event to return the listeners from.
       * @return {Object} All listener functions for an event in an object.
       */
      proto.getListenersAsObject = function getListenersAsObject(evt) {
          var listeners = this.getListeners(evt);
          var response;

          if (listeners instanceof Array) {
              response = {};
              response[evt] = listeners;
          }

          return response || listeners;
      };

      function isValidListener (listener) {
          if (typeof listener === 'function' || listener instanceof RegExp) {
              return true
          } else if (listener && typeof listener === 'object') {
              return isValidListener(listener.listener)
          } else {
              return false
          }
      }

      /**
       * Adds a listener function to the specified event.
       * The listener will not be added if it is a duplicate.
       * If the listener returns true then it will be removed after it is called.
       * If you pass a regular expression as the event name then the listener will be added to all events that match it.
       *
       * @param {String|RegExp} evt Name of the event to attach the listener to.
       * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.addListener = function addListener(evt, listener) {
          if (!isValidListener(listener)) {
              throw new TypeError('listener must be a function');
          }

          var listeners = this.getListenersAsObject(evt);
          var listenerIsWrapped = typeof listener === 'object';
          var key;

          for (key in listeners) {
              if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                  listeners[key].push(listenerIsWrapped ? listener : {
                      listener: listener,
                      once: false
                  });
              }
          }

          return this;
      };

      /**
       * Alias of addListener
       */
      proto.on = alias('addListener');

      /**
       * Semi-alias of addListener. It will add a listener that will be
       * automatically removed after its first execution.
       *
       * @param {String|RegExp} evt Name of the event to attach the listener to.
       * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.addOnceListener = function addOnceListener(evt, listener) {
          return this.addListener(evt, {
              listener: listener,
              once: true
          });
      };

      /**
       * Alias of addOnceListener.
       */
      proto.once = alias('addOnceListener');

      /**
       * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
       * You need to tell it what event names should be matched by a regex.
       *
       * @param {String} evt Name of the event to create.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.defineEvent = function defineEvent(evt) {
          this.getListeners(evt);
          return this;
      };

      /**
       * Uses defineEvent to define multiple events.
       *
       * @param {String[]} evts An array of event names to define.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.defineEvents = function defineEvents(evts) {
          for (var i = 0; i < evts.length; i += 1) {
              this.defineEvent(evts[i]);
          }
          return this;
      };

      /**
       * Removes a listener function from the specified event.
       * When passed a regular expression as the event name, it will remove the listener from all events that match it.
       *
       * @param {String|RegExp} evt Name of the event to remove the listener from.
       * @param {Function} listener Method to remove from the event.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.removeListener = function removeListener(evt, listener) {
          var listeners = this.getListenersAsObject(evt);
          var index;
          var key;

          for (key in listeners) {
              if (listeners.hasOwnProperty(key)) {
                  index = indexOfListener(listeners[key], listener);

                  if (index !== -1) {
                      listeners[key].splice(index, 1);
                  }
              }
          }

          return this;
      };

      /**
       * Alias of removeListener
       */
      proto.off = alias('removeListener');

      /**
       * Adds listeners in bulk using the manipulateListeners method.
       * If you pass an object as the first argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
       * You can also pass it a regular expression to add the array of listeners to all events that match it.
       * Yeah, this function does quite a bit. That's probably a bad thing.
       *
       * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
       * @param {Function[]} [listeners] An optional array of listener functions to add.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.addListeners = function addListeners(evt, listeners) {
          // Pass through to manipulateListeners
          return this.manipulateListeners(false, evt, listeners);
      };

      /**
       * Removes listeners in bulk using the manipulateListeners method.
       * If you pass an object as the first argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
       * You can also pass it an event name and an array of listeners to be removed.
       * You can also pass it a regular expression to remove the listeners from all events that match it.
       *
       * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
       * @param {Function[]} [listeners] An optional array of listener functions to remove.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.removeListeners = function removeListeners(evt, listeners) {
          // Pass through to manipulateListeners
          return this.manipulateListeners(true, evt, listeners);
      };

      /**
       * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
       * The first argument will determine if the listeners are removed (true) or added (false).
       * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
       * You can also pass it an event name and an array of listeners to be added/removed.
       * You can also pass it a regular expression to manipulate the listeners of all events that match it.
       *
       * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
       * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
       * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
          var i;
          var value;
          var single = remove ? this.removeListener : this.addListener;
          var multiple = remove ? this.removeListeners : this.addListeners;

          // If evt is an object then pass each of its properties to this method
          if (typeof evt === 'object' && !(evt instanceof RegExp)) {
              for (i in evt) {
                  if (evt.hasOwnProperty(i) && (value = evt[i])) {
                      // Pass the single listener straight through to the singular method
                      if (typeof value === 'function') {
                          single.call(this, i, value);
                      }
                      else {
                          // Otherwise pass back to the multiple function
                          multiple.call(this, i, value);
                      }
                  }
              }
          }
          else {
              // So evt must be a string
              // And listeners must be an array of listeners
              // Loop over it and pass each one to the multiple method
              i = listeners.length;
              while (i--) {
                  single.call(this, evt, listeners[i]);
              }
          }

          return this;
      };

      /**
       * Removes all listeners from a specified event.
       * If you do not specify an event then all listeners will be removed.
       * That means every event will be emptied.
       * You can also pass a regex to remove all events that match it.
       *
       * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.removeEvent = function removeEvent(evt) {
          var type = typeof evt;
          var events = this._getEvents();
          var key;

          // Remove different things depending on the state of evt
          if (type === 'string') {
              // Remove all listeners for the specified event
              delete events[evt];
          }
          else if (evt instanceof RegExp) {
              // Remove all events matching the regex.
              for (key in events) {
                  if (events.hasOwnProperty(key) && evt.test(key)) {
                      delete events[key];
                  }
              }
          }
          else {
              // Remove all listeners in all events
              delete this._events;
          }

          return this;
      };

      /**
       * Alias of removeEvent.
       *
       * Added to mirror the node API.
       */
      proto.removeAllListeners = alias('removeEvent');

      /**
       * Emits an event of your choice.
       * When emitted, every listener attached to that event will be executed.
       * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
       * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
       * So they will not arrive within the array on the other side, they will be separate.
       * You can also pass a regular expression to emit to all events that match it.
       *
       * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
       * @param {Array} [args] Optional array of arguments to be passed to each listener.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.emitEvent = function emitEvent(evt, args) {
          var listenersMap = this.getListenersAsObject(evt);
          var listeners;
          var listener;
          var i;
          var key;
          var response;

          for (key in listenersMap) {
              if (listenersMap.hasOwnProperty(key)) {
                  listeners = listenersMap[key].slice(0);

                  for (i = 0; i < listeners.length; i++) {
                      // If the listener returns true then it shall be removed from the event
                      // The function is executed either with a basic call or an apply if there is an args array
                      listener = listeners[i];

                      if (listener.once === true) {
                          this.removeListener(evt, listener.listener);
                      }

                      response = listener.listener.apply(this, args || []);

                      if (response === this._getOnceReturnValue()) {
                          this.removeListener(evt, listener.listener);
                      }
                  }
              }
          }

          return this;
      };

      /**
       * Alias of emitEvent
       */
      proto.trigger = alias('emitEvent');

      /**
       * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
       * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
       *
       * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
       * @param {...*} Optional additional arguments to be passed to each listener.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.emit = function emit(evt) {
          var args = Array.prototype.slice.call(arguments, 1);
          return this.emitEvent(evt, args);
      };

      /**
       * Sets the current value to check against when executing listeners. If a
       * listeners return value matches the one set here then it will be removed
       * after execution. This value defaults to true.
       *
       * @param {*} value The new value to check for when executing listeners.
       * @return {Object} Current instance of EventEmitter for chaining.
       */
      proto.setOnceReturnValue = function setOnceReturnValue(value) {
          this._onceReturnValue = value;
          return this;
      };

      /**
       * Fetches the current value to check against when executing listeners. If
       * the listeners return value matches this one then it should be removed
       * automatically. It will return true by default.
       *
       * @return {*|Boolean} The current value to check for or the default, true.
       * @api private
       */
      proto._getOnceReturnValue = function _getOnceReturnValue() {
          if (this.hasOwnProperty('_onceReturnValue')) {
              return this._onceReturnValue;
          }
          else {
              return true;
          }
      };

      /**
       * Fetches the events object and creates one if required.
       *
       * @return {Object} The events storage object.
       * @api private
       */
      proto._getEvents = function _getEvents() {
          return this._events || (this._events = {});
      };

      /**
       * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
       *
       * @return {Function} Non conflicting EventEmitter class.
       */
      EventEmitter.noConflict = function noConflict() {
          exports.EventEmitter = originalGlobalValue;
          return EventEmitter;
      };

      // Expose the class either via AMD, CommonJS or the global object
      if ( module.exports){
          module.exports = EventEmitter;
      }
      else {
          exports.EventEmitter = EventEmitter;
      }
  }(typeof window !== 'undefined' ? window : commonjsGlobal || {}));
  });

  var Queue = /*#__PURE__*/function () {
    /*
    *   As the name implies, `consumer` is the (sole) consumer of the queue.
    *   It gets called with each element of the queue and its return value
    *   serves as a ack, determining whether the element is removed or not from
    *   the queue, allowing then subsequent elements to be processed.
    */
    function Queue(consumer) {
      _classCallCheck(this, Queue);

      this.consumer = consumer;
      this.queue = [];
    }

    _createClass(Queue, [{
      key: "push",
      value: function push(element) {
        this.queue.push(element);
        this.process();
      }
    }, {
      key: "process",
      value: function process() {
        if (this.queue.length !== 0) {
          var ack = this.consumer(this.queue[0]);

          if (ack) {
            this.queue.shift();
            this.process();
          }
        }
      }
    }, {
      key: "empty",
      value: function empty() {
        this.queue = [];
      }
    }]);

    return Queue;
  }();

  var UNMISTAKABLE_CHARS = '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz';
  var Random = {
    id: function id() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 17;
      var res = '';

      for (var i = 0; i < count; i++) {
        res += UNMISTAKABLE_CHARS[Math.floor(Math.random() * UNMISTAKABLE_CHARS.length)];
      }

      return res;
    }
  };

  var MongoID = {};

  MongoID._looksLikeObjectID = function (str) {
    return str.length === 24 && str.match(/^[0-9a-f]*$/);
  };

  MongoID.ObjectID = function (hexString) {
    // random-based impl of Mongo ObjectID
    var self = this;

    if (hexString) {
      hexString = hexString.toLowerCase();

      if (!MongoID._looksLikeObjectID(hexString)) {
        throw new Error('Invalid hexadecimal string for creating an ObjectID');
      } // meant to work with _.isEqual(), which relies on structural equality


      self._str = hexString;
    } else {
      self._str = Random.hexString(24);
    }
  };

  MongoID.ObjectID.prototype.toString = function () {
    var self = this;
    return 'ObjectID("' + self._str + '")';
  };

  MongoID.ObjectID.prototype.equals = function (other) {
    var self = this;
    return other instanceof MongoID.ObjectID && self.valueOf() === other.valueOf();
  };

  MongoID.ObjectID.prototype.clone = function () {
    var self = this;
    return new MongoID.ObjectID(self._str);
  };

  MongoID.ObjectID.prototype.typeName = function () {
    return 'oid';
  };

  MongoID.ObjectID.prototype.getTimestamp = function () {
    var self = this;
    return parseInt(self._str.substr(0, 8), 16);
  };

  MongoID.ObjectID.prototype.valueOf = MongoID.ObjectID.prototype.toJSONValue = MongoID.ObjectID.prototype.toHexString = function () {
    return this._str;
  };

  EJSON.addType('oid', function (str) {
    return new MongoID.ObjectID(str);
  });

  MongoID.idStringify = function (id) {
    if (id instanceof MongoID.ObjectID) {
      return id.valueOf();
    } else if (typeof id === 'string') {
      if (id === '') {
        return id;
      } else if (id.substr(0, 1) === '-' || // escape previously dashed strings
      id.substr(0, 1) === '~' || // escape escaped numbers, true, false
      MongoID._looksLikeObjectID(id) || // escape object-id-form strings
      id.substr(0, 1) === '{') {
        // escape object-form strings, for maybe implementing later
        return '-' + id;
      } else {
        return id; // other strings go through unchanged.
      }
    } else if (id === undefined) {
      return '-';
    } else if (_typeof(id) === 'object' && id !== null) {
      throw new Error('Meteor does not currently support objects other than ObjectID as ids');
    } else {
      // Numbers, true, false, null
      return '~' + JSON.stringify(id);
    }
  };

  MongoID.idParse = function (id) {
    if (id === '') {
      return id;
    } else if (id === '-') {
      return undefined;
    } else if (id.substr(0, 1) === '-') {
      return id.substr(1);
    } else if (id.substr(0, 1) === '~') {
      return JSON.parse(id.substr(1));
    } else if (MongoID._looksLikeObjectID(id)) {
      return new MongoID.ObjectID(id);
    } else {
      return id;
    }
  };

  var Socket = /*#__PURE__*/function (_EventEmitter) {
    _inherits(Socket, _EventEmitter);

    var _super = _createSuper(Socket);

    function Socket(SocketConstructor, endpoint) {
      var _this;

      _classCallCheck(this, Socket);

      _this = _super.call(this);
      _this.SocketConstructor = SocketConstructor;
      _this.endpoint = endpoint;
      _this.rawSocket = null;
      return _this;
    }

    _createClass(Socket, [{
      key: "send",
      value: function send(object) {
        if (!this.closing) {
          var message = EJSON.stringify(object);
          this.rawSocket.send(message); // Emit a copy of the object, as the listener might mutate it.

          this.emit('message:out', EJSON.parse(message));
        }
      }
    }, {
      key: "open",
      value: function open() {
        var _this2 = this;

        /*
        *   Makes `open` a no-op if there's already a `rawSocket`. This avoids
        *   memory / socket leaks if `open` is called twice (e.g. by a user
        *   calling `ddp.connect` twice) without properly disposing of the
        *   socket connection. `rawSocket` gets automatically set to `null` only
        *   when it goes into a closed or error state. This way `rawSocket` is
        *   disposed of correctly: the socket connection is closed, and the
        *   object can be garbage collected.
        */
        if (this.rawSocket) {
          return;
        }

        this.closing = false;
        this.rawSocket = new this.SocketConstructor(this.endpoint);
        /*
        *   Calls to `onopen` and `onclose` directly trigger the `open` and
        *   `close` events on the `Socket` instance.
        */

        this.rawSocket.onopen = function () {
          return _this2.emit('open');
        };

        this.rawSocket.onclose = function () {
          _this2.rawSocket = null;

          _this2.emit('close');

          _this2.closing = false;
        };
        /*
        *   Calls to `onmessage` trigger a `message:in` event on the `Socket`
        *   instance only once the message (first parameter to `onmessage`) has
        *   been successfully parsed into a javascript object.
        */


        this.rawSocket.onmessage = function (message) {
          var object;

          try {
            object = EJSON.parse(message.data);
          } catch (ignore) {
            // Simply ignore the malformed message and return
            return;
          } // Outside the try-catch block as it must only catch JSON parsing
          // errors, not errors that may occur inside a "message:in" event
          // handler


          _this2.emit('message:in', object);
        };
      }
    }, {
      key: "close",
      value: function close() {
        /*
        *   Avoid throwing an error if `rawSocket === null`
        */
        if (this.rawSocket) {
          this.closing = true;
          this.rawSocket.close();
        }
      }
    }]);

    return Socket;
  }(EventEmitter);

  // import { createHash } from 'crypto';
  var i$1 = 0;
  function uniqueId() {
    return (i$1++).toString();
  }
  function contains(array, element) {
    return array.indexOf(element) !== -1;
  }
  function hashPassword(password) {
    return {
      digest: createHash('sha256').update(password).digest('hex'),
      algorithm: 'sha-256'
    };
  }
  function isPlainObject(obj) {
    return !!obj && !(typeof obj === 'number') && !(typeof obj === 'string') && !(typeof obj === 'boolean') && !Array.isArray(obj) && !(obj === null) && !(obj instanceof RegExp) && !(typeof obj === 'function') && !(obj instanceof Date) && !EJSON.isBinary(obj) && !(obj instanceof MongoID.ObjectID);
  }

  var DDP_VERSION = '1';
  var PUBLIC_EVENTS = [// Subscription messages
  'ready', 'nosub', 'added', 'changed', 'removed', // Method messages
  'result', 'updated', // Error messages
  'error'];
  var DEFAULT_RECONNECT_INTERVAL = 10000;

  var DDP = /*#__PURE__*/function (_EventEmitter) {
    _inherits(DDP, _EventEmitter);

    var _super = _createSuper(DDP);

    _createClass(DDP, [{
      key: "emit",
      value: function emit() {
        var _get2;

        setTimeout((_get2 = _get(_getPrototypeOf(DDP.prototype), "emit", this)).bind.apply(_get2, [this].concat(Array.prototype.slice.call(arguments))), 0);
      }
    }]);

    function DDP(options) {
      var _this;

      _classCallCheck(this, DDP);

      _this = _super.call(this);
      _this.status = 'disconnected'; // Default `autoConnect` and `autoReconnect` to true

      _this.autoConnect = options.autoConnect !== false;
      _this.autoReconnect = options.autoReconnect !== false;
      _this.reconnectInterval = options.reconnectInterval || DEFAULT_RECONNECT_INTERVAL;
      _this.messageQueue = new Queue(function (message) {
        if (_this.status === 'connected') {
          _this.socket.send(message);

          return true;
        } else {
          return false;
        }
      });
      _this.socket = new Socket(options.SocketConstructor, options.endpoint);

      _this.socket.on('open', function () {
        // When the socket opens, send the `connect` message
        // to establish the DDP connection
        _this.socket.send({
          msg: 'connect',
          version: DDP_VERSION,
          support: [DDP_VERSION]
        });
      });

      _this.socket.on('close', function () {
        _this.status = 'disconnected';

        _this.messageQueue.empty();

        _this.emit('disconnected');

        if (_this.autoReconnect) {
          // Schedule a reconnection
          setTimeout(_this.socket.open.bind(_this.socket), _this.reconnectInterval);
        }
      });

      _this.socket.on('message:in', function (message) {
        if (message.msg === 'connected') {
          _this.status = 'connected';

          _this.messageQueue.process();

          _this.emit('connected');
        } else if (message.msg === 'ping') {
          // Reply with a `pong` message to prevent the server from
          // closing the connection
          _this.socket.send({
            msg: 'pong',
            id: message.id
          });
        } else if (contains(PUBLIC_EVENTS, message.msg)) {
          _this.emit(message.msg, message);
        }
      });

      if (_this.autoConnect) {
        _this.connect();
      }

      return _this;
    }

    _createClass(DDP, [{
      key: "connect",
      value: function connect() {
        this.socket.open();
      }
    }, {
      key: "disconnect",
      value: function disconnect() {
        /*
        *   If `disconnect` is called, the caller likely doesn't want the
        *   the instance to try to auto-reconnect. Therefore we set the
        *   `autoReconnect` flag to false.
        */
        this.autoReconnect = false;
        this.socket.close();
      }
    }, {
      key: "method",
      value: function method(name, params) {
        var id = uniqueId();
        this.messageQueue.push({
          msg: 'method',
          id: id,
          method: name,
          params: params
        });
        return id;
      }
    }, {
      key: "sub",
      value: function sub(name, params) {
        var id = uniqueId();
        this.messageQueue.push({
          msg: 'sub',
          id: id,
          name: name,
          params: params
        });
        return id;
      }
    }, {
      key: "unsub",
      value: function unsub(id) {
        this.messageQueue.push({
          msg: 'unsub',
          id: id
        });
        return id;
      }
    }]);

    return DDP;
  }(EventEmitter);

  var MeteorError = /*#__PURE__*/function (_Error) {
    _inherits(MeteorError, _Error);

    var _super = _createSuper(MeteorError);

    function MeteorError(error, reason, details) {
      var _this;

      _classCallCheck(this, MeteorError);

      _this = _super.call(this);
      _this.message = reason ? "".concat(reason, " [").concat(error, "]") : "[".concat(error, "]"); // String code uniquely identifying this kind of error.

      _this.error = error; // Optional: A short human-readable summary of the error. Not
      // intended to be shown to end users, just developers. ("Not Found",
      // "Internal Server Error")

      _this.reason = reason; // Optional: Additional information about the error, say for
      // debugging. It might be a (textual) stack trace if the server is
      // willing to provide one. The corresponding thing in HTTP would be
      // the body of a 404 or 500 response. (The difference is that we
      // never expect this to be shown to end users, only developers, so
      // it doesn't need to be pretty.)

      _this.details = details;
      return _this;
    }

    return MeteorError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  _defineProperty(MeteorError, "errorType", 'Meteor.Error');

  /* eslint-disable global-require, import/no-unresolved, no-empty, import/prefer-default-export */
  var rn;

  try {
    require('react-native');

    rn = true;
  } catch (e) {}

  var isReactNative = rn;

  var NullTransaction,
    __slice = [].slice;

  NullTransaction = (function() {
    function NullTransaction() {}

    NullTransaction.prototype.get = function() {
      var args, result;
      result = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      return result;
    };

    NullTransaction.prototype.find = function() {
      var args, result;
      result = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      return result;
    };

    NullTransaction.prototype.findOne = function() {
      var args, result;
      result = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      return result;
    };

    NullTransaction.prototype.upsert = function() {
      var args;
      args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      throw new Error('Cannot write outside of a WriteTransaction');
    };

    NullTransaction.prototype.del = function() {
      var args;
      args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
      throw new Error('Cannot write outside of a WriteTransaction');
    };

    NullTransaction.prototype.canPushTransaction = function(transaction) {
      return true;
    };

    return NullTransaction;

  })();

  var NullTransaction_1 = NullTransaction;

  var lodash = createCommonjsModule(function (module, exports) {
  (function() {

    /** Used as a safe reference for `undefined` in pre ES5 environments */
    var undefined$1;

    /** Used to pool arrays and objects used internally */
    var arrayPool = [],
        objectPool = [];

    /** Used to generate unique IDs */
    var idCounter = 0;

    /** Used to prefix keys to avoid issues with `__proto__` and properties on `Object.prototype` */
    var keyPrefix = +new Date + '';

    /** Used as the size when optimizations are enabled for large arrays */
    var largeArraySize = 75;

    /** Used as the max size of the `arrayPool` and `objectPool` */
    var maxPoolSize = 40;

    /** Used to detect and test whitespace */
    var whitespace = (
      // whitespace
      ' \t\x0B\f\xA0\ufeff' +

      // line terminators
      '\n\r\u2028\u2029' +

      // unicode category "Zs" space separators
      '\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000'
    );

    /** Used to match empty string literals in compiled template source */
    var reEmptyStringLeading = /\b__p \+= '';/g,
        reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
        reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

    /**
     * Used to match ES6 template delimiters
     * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-literals-string-literals
     */
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

    /** Used to match regexp flags from their coerced string values */
    var reFlags = /\w*$/;

    /** Used to detected named functions */
    var reFuncName = /^\s*function[ \n\r\t]+\w/;

    /** Used to match "interpolate" template delimiters */
    var reInterpolate = /<%=([\s\S]+?)%>/g;

    /** Used to match leading whitespace and zeros to be removed */
    var reLeadingSpacesAndZeros = RegExp('^[' + whitespace + ']*0+(?=.$)');

    /** Used to ensure capturing order of template delimiters */
    var reNoMatch = /($^)/;

    /** Used to detect functions containing a `this` reference */
    var reThis = /\bthis\b/;

    /** Used to match unescaped characters in compiled string literals */
    var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;

    /** Used to assign default `context` object properties */
    var contextProps = [
      'Array', 'Boolean', 'Date', 'Function', 'Math', 'Number', 'Object',
      'RegExp', 'String', '_', 'attachEvent', 'clearTimeout', 'isFinite', 'isNaN',
      'parseInt', 'setTimeout'
    ];

    /** Used to make template sourceURLs easier to identify */
    var templateCounter = 0;

    /** `Object#toString` result shortcuts */
    var argsClass = '[object Arguments]',
        arrayClass = '[object Array]',
        boolClass = '[object Boolean]',
        dateClass = '[object Date]',
        funcClass = '[object Function]',
        numberClass = '[object Number]',
        objectClass = '[object Object]',
        regexpClass = '[object RegExp]',
        stringClass = '[object String]';

    /** Used to identify object classifications that `_.clone` supports */
    var cloneableClasses = {};
    cloneableClasses[funcClass] = false;
    cloneableClasses[argsClass] = cloneableClasses[arrayClass] =
    cloneableClasses[boolClass] = cloneableClasses[dateClass] =
    cloneableClasses[numberClass] = cloneableClasses[objectClass] =
    cloneableClasses[regexpClass] = cloneableClasses[stringClass] = true;

    /** Used as an internal `_.debounce` options object */
    var debounceOptions = {
      'leading': false,
      'maxWait': 0,
      'trailing': false
    };

    /** Used as the property descriptor for `__bindData__` */
    var descriptor = {
      'configurable': false,
      'enumerable': false,
      'value': null,
      'writable': false
    };

    /** Used to determine if values are of the language type Object */
    var objectTypes = {
      'boolean': false,
      'function': true,
      'object': true,
      'number': false,
      'string': false,
      'undefined': false
    };

    /** Used to escape characters for inclusion in compiled string literals */
    var stringEscapes = {
      '\\': '\\',
      "'": "'",
      '\n': 'n',
      '\r': 'r',
      '\t': 't',
      '\u2028': 'u2028',
      '\u2029': 'u2029'
    };

    /** Used as a reference to the global object */
    var root = (objectTypes[typeof window] && window) || this;

    /** Detect free variable `exports` */
    var freeExports = objectTypes['object'] && exports && !exports.nodeType && exports;

    /** Detect free variable `module` */
    var freeModule = objectTypes['object'] && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports` */
    var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

    /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
    var freeGlobal = objectTypes[typeof commonjsGlobal] && commonjsGlobal;
    if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
      root = freeGlobal;
    }

    /*--------------------------------------------------------------------------*/

    /**
     * The base implementation of `_.indexOf` without support for binary searches
     * or `fromIndex` constraints.
     *
     * @private
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the matched value or `-1`.
     */
    function baseIndexOf(array, value, fromIndex) {
      var index = (fromIndex || 0) - 1,
          length = array ? array.length : 0;

      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }

    /**
     * An implementation of `_.contains` for cache objects that mimics the return
     * signature of `_.indexOf` by returning `0` if the value is found, else `-1`.
     *
     * @private
     * @param {Object} cache The cache object to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns `0` if `value` is found, else `-1`.
     */
    function cacheIndexOf(cache, value) {
      var type = typeof value;
      cache = cache.cache;

      if (type == 'boolean' || value == null) {
        return cache[value] ? 0 : -1;
      }
      if (type != 'number' && type != 'string') {
        type = 'object';
      }
      var key = type == 'number' ? value : keyPrefix + value;
      cache = (cache = cache[type]) && cache[key];

      return type == 'object'
        ? (cache && baseIndexOf(cache, value) > -1 ? 0 : -1)
        : (cache ? 0 : -1);
    }

    /**
     * Adds a given value to the corresponding cache object.
     *
     * @private
     * @param {*} value The value to add to the cache.
     */
    function cachePush(value) {
      var cache = this.cache,
          type = typeof value;

      if (type == 'boolean' || value == null) {
        cache[value] = true;
      } else {
        if (type != 'number' && type != 'string') {
          type = 'object';
        }
        var key = type == 'number' ? value : keyPrefix + value,
            typeCache = cache[type] || (cache[type] = {});

        if (type == 'object') {
          (typeCache[key] || (typeCache[key] = [])).push(value);
        } else {
          typeCache[key] = true;
        }
      }
    }

    /**
     * Used by `_.max` and `_.min` as the default callback when a given
     * collection is a string value.
     *
     * @private
     * @param {string} value The character to inspect.
     * @returns {number} Returns the code unit of given character.
     */
    function charAtCallback(value) {
      return value.charCodeAt(0);
    }

    /**
     * Used by `sortBy` to compare transformed `collection` elements, stable sorting
     * them in ascending order.
     *
     * @private
     * @param {Object} a The object to compare to `b`.
     * @param {Object} b The object to compare to `a`.
     * @returns {number} Returns the sort order indicator of `1` or `-1`.
     */
    function compareAscending(a, b) {
      var ac = a.criteria,
          bc = b.criteria,
          index = -1,
          length = ac.length;

      while (++index < length) {
        var value = ac[index],
            other = bc[index];

        if (value !== other) {
          if (value > other || typeof value == 'undefined') {
            return 1;
          }
          if (value < other || typeof other == 'undefined') {
            return -1;
          }
        }
      }
      // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
      // that causes it, under certain circumstances, to return the same value for
      // `a` and `b`. See https://github.com/jashkenas/underscore/pull/1247
      //
      // This also ensures a stable sort in V8 and other engines.
      // See http://code.google.com/p/v8/issues/detail?id=90
      return a.index - b.index;
    }

    /**
     * Creates a cache object to optimize linear searches of large arrays.
     *
     * @private
     * @param {Array} [array=[]] The array to search.
     * @returns {null|Object} Returns the cache object or `null` if caching should not be used.
     */
    function createCache(array) {
      var index = -1,
          length = array.length,
          first = array[0],
          mid = array[(length / 2) | 0],
          last = array[length - 1];

      if (first && typeof first == 'object' &&
          mid && typeof mid == 'object' && last && typeof last == 'object') {
        return false;
      }
      var cache = getObject();
      cache['false'] = cache['null'] = cache['true'] = cache['undefined'] = false;

      var result = getObject();
      result.array = array;
      result.cache = cache;
      result.push = cachePush;

      while (++index < length) {
        result.push(array[index]);
      }
      return result;
    }

    /**
     * Used by `template` to escape characters for inclusion in compiled
     * string literals.
     *
     * @private
     * @param {string} match The matched character to escape.
     * @returns {string} Returns the escaped character.
     */
    function escapeStringChar(match) {
      return '\\' + stringEscapes[match];
    }

    /**
     * Gets an array from the array pool or creates a new one if the pool is empty.
     *
     * @private
     * @returns {Array} The array from the pool.
     */
    function getArray() {
      return arrayPool.pop() || [];
    }

    /**
     * Gets an object from the object pool or creates a new one if the pool is empty.
     *
     * @private
     * @returns {Object} The object from the pool.
     */
    function getObject() {
      return objectPool.pop() || {
        'array': null,
        'cache': null,
        'criteria': null,
        'false': false,
        'index': 0,
        'null': false,
        'number': null,
        'object': null,
        'push': null,
        'string': null,
        'true': false,
        'undefined': false,
        'value': null
      };
    }

    /**
     * Releases the given array back to the array pool.
     *
     * @private
     * @param {Array} [array] The array to release.
     */
    function releaseArray(array) {
      array.length = 0;
      if (arrayPool.length < maxPoolSize) {
        arrayPool.push(array);
      }
    }

    /**
     * Releases the given object back to the object pool.
     *
     * @private
     * @param {Object} [object] The object to release.
     */
    function releaseObject(object) {
      var cache = object.cache;
      if (cache) {
        releaseObject(cache);
      }
      object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null;
      if (objectPool.length < maxPoolSize) {
        objectPool.push(object);
      }
    }

    /**
     * Slices the `collection` from the `start` index up to, but not including,
     * the `end` index.
     *
     * Note: This function is used instead of `Array#slice` to support node lists
     * in IE < 9 and to ensure dense arrays are returned.
     *
     * @private
     * @param {Array|Object|string} collection The collection to slice.
     * @param {number} start The start index.
     * @param {number} end The end index.
     * @returns {Array} Returns the new array.
     */
    function slice(array, start, end) {
      start || (start = 0);
      if (typeof end == 'undefined') {
        end = array ? array.length : 0;
      }
      var index = -1,
          length = end - start || 0,
          result = Array(length < 0 ? 0 : length);

      while (++index < length) {
        result[index] = array[start + index];
      }
      return result;
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Create a new `lodash` function using the given context object.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {Object} [context=root] The context object.
     * @returns {Function} Returns the `lodash` function.
     */
    function runInContext(context) {
      // Avoid issues with some ES3 environments that attempt to use values, named
      // after built-in constructors like `Object`, for the creation of literals.
      // ES5 clears this up by stating that literals must use built-in constructors.
      // See http://es5.github.io/#x11.1.5.
      context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;

      /** Native constructor references */
      var Array = context.Array,
          Boolean = context.Boolean,
          Date = context.Date,
          Function = context.Function,
          Math = context.Math,
          Number = context.Number,
          Object = context.Object,
          RegExp = context.RegExp,
          String = context.String,
          TypeError = context.TypeError;

      /**
       * Used for `Array` method references.
       *
       * Normally `Array.prototype` would suffice, however, using an array literal
       * avoids issues in Narwhal.
       */
      var arrayRef = [];

      /** Used for native method references */
      var objectProto = Object.prototype;

      /** Used to restore the original `_` reference in `noConflict` */
      var oldDash = context._;

      /** Used to resolve the internal [[Class]] of values */
      var toString = objectProto.toString;

      /** Used to detect if a method is native */
      var reNative = RegExp('^' +
        String(toString)
          .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          .replace(/toString| for [^\]]+/g, '.*?') + '$'
      );

      /** Native method shortcuts */
      var ceil = Math.ceil,
          clearTimeout = context.clearTimeout,
          floor = Math.floor,
          fnToString = Function.prototype.toString,
          getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,
          hasOwnProperty = objectProto.hasOwnProperty,
          push = arrayRef.push,
          setTimeout = context.setTimeout,
          splice = arrayRef.splice,
          unshift = arrayRef.unshift;

      /** Used to set meta data on functions */
      var defineProperty = (function() {
        // IE 8 only accepts DOM elements
        try {
          var o = {},
              func = isNative(func = Object.defineProperty) && func,
              result = func(o, o, o) && func;
        } catch(e) { }
        return result;
      }());

      /* Native method shortcuts for methods with the same name as other `lodash` methods */
      var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate,
          nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray,
          nativeIsFinite = context.isFinite,
          nativeIsNaN = context.isNaN,
          nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys,
          nativeMax = Math.max,
          nativeMin = Math.min,
          nativeParseInt = context.parseInt,
          nativeRandom = Math.random;

      /** Used to lookup a built-in constructor by [[Class]] */
      var ctorByClass = {};
      ctorByClass[arrayClass] = Array;
      ctorByClass[boolClass] = Boolean;
      ctorByClass[dateClass] = Date;
      ctorByClass[funcClass] = Function;
      ctorByClass[objectClass] = Object;
      ctorByClass[numberClass] = Number;
      ctorByClass[regexpClass] = RegExp;
      ctorByClass[stringClass] = String;

      /*--------------------------------------------------------------------------*/

      /**
       * Creates a `lodash` object which wraps the given value to enable intuitive
       * method chaining.
       *
       * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
       * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
       * and `unshift`
       *
       * Chaining is supported in custom builds as long as the `value` method is
       * implicitly or explicitly included in the build.
       *
       * The chainable wrapper functions are:
       * `after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`,
       * `compose`, `concat`, `countBy`, `create`, `createCallback`, `curry`,
       * `debounce`, `defaults`, `defer`, `delay`, `difference`, `filter`, `flatten`,
       * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
       * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
       * `invoke`, `keys`, `map`, `max`, `memoize`, `merge`, `min`, `object`, `omit`,
       * `once`, `pairs`, `partial`, `partialRight`, `pick`, `pluck`, `pull`, `push`,
       * `range`, `reject`, `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`,
       * `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`, `transform`,
       * `union`, `uniq`, `unshift`, `unzip`, `values`, `where`, `without`, `wrap`,
       * and `zip`
       *
       * The non-chainable wrapper functions are:
       * `clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `findIndex`,
       * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `has`, `identity`,
       * `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
       * `isEmpty`, `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`,
       * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`,
       * `lastIndexOf`, `mixin`, `noConflict`, `parseInt`, `pop`, `random`, `reduce`,
       * `reduceRight`, `result`, `shift`, `size`, `some`, `sortedIndex`, `runInContext`,
       * `template`, `unescape`, `uniqueId`, and `value`
       *
       * The wrapper functions `first` and `last` return wrapped values when `n` is
       * provided, otherwise they return unwrapped values.
       *
       * Explicit chaining can be enabled by using the `_.chain` method.
       *
       * @name _
       * @constructor
       * @category Chaining
       * @param {*} value The value to wrap in a `lodash` instance.
       * @returns {Object} Returns a `lodash` instance.
       * @example
       *
       * var wrapped = _([1, 2, 3]);
       *
       * // returns an unwrapped value
       * wrapped.reduce(function(sum, num) {
       *   return sum + num;
       * });
       * // => 6
       *
       * // returns a wrapped value
       * var squares = wrapped.map(function(num) {
       *   return num * num;
       * });
       *
       * _.isArray(squares);
       * // => false
       *
       * _.isArray(squares.value());
       * // => true
       */
      function lodash(value) {
        // don't wrap if already wrapped, even if wrapped by a different `lodash` constructor
        return (value && typeof value == 'object' && !isArray(value) && hasOwnProperty.call(value, '__wrapped__'))
         ? value
         : new lodashWrapper(value);
      }

      /**
       * A fast path for creating `lodash` wrapper objects.
       *
       * @private
       * @param {*} value The value to wrap in a `lodash` instance.
       * @param {boolean} chainAll A flag to enable chaining for all methods
       * @returns {Object} Returns a `lodash` instance.
       */
      function lodashWrapper(value, chainAll) {
        this.__chain__ = !!chainAll;
        this.__wrapped__ = value;
      }
      // ensure `new lodashWrapper` is an instance of `lodash`
      lodashWrapper.prototype = lodash.prototype;

      /**
       * An object used to flag environments features.
       *
       * @static
       * @memberOf _
       * @type Object
       */
      var support = lodash.support = {};

      /**
       * Detect if functions can be decompiled by `Function#toString`
       * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
       *
       * @memberOf _.support
       * @type boolean
       */
      support.funcDecomp = !isNative(context.WinRTError) && reThis.test(runInContext);

      /**
       * Detect if `Function#name` is supported (all but IE).
       *
       * @memberOf _.support
       * @type boolean
       */
      support.funcNames = typeof Function.name == 'string';

      /**
       * By default, the template delimiters used by Lo-Dash are similar to those in
       * embedded Ruby (ERB). Change the following template settings to use alternative
       * delimiters.
       *
       * @static
       * @memberOf _
       * @type Object
       */
      lodash.templateSettings = {

        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type RegExp
         */
        'escape': /<%-([\s\S]+?)%>/g,

        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type RegExp
         */
        'evaluate': /<%([\s\S]+?)%>/g,

        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type RegExp
         */
        'interpolate': reInterpolate,

        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type string
         */
        'variable': '',

        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type Object
         */
        'imports': {

          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type Function
           */
          '_': lodash
        }
      };

      /*--------------------------------------------------------------------------*/

      /**
       * The base implementation of `_.bind` that creates the bound function and
       * sets its meta data.
       *
       * @private
       * @param {Array} bindData The bind data array.
       * @returns {Function} Returns the new bound function.
       */
      function baseBind(bindData) {
        var func = bindData[0],
            partialArgs = bindData[2],
            thisArg = bindData[4];

        function bound() {
          // `Function#bind` spec
          // http://es5.github.io/#x15.3.4.5
          if (partialArgs) {
            // avoid `arguments` object deoptimizations by using `slice` instead
            // of `Array.prototype.slice.call` and not assigning `arguments` to a
            // variable as a ternary expression
            var args = slice(partialArgs);
            push.apply(args, arguments);
          }
          // mimic the constructor's `return` behavior
          // http://es5.github.io/#x13.2.2
          if (this instanceof bound) {
            // ensure `new bound` is an instance of `func`
            var thisBinding = baseCreate(func.prototype),
                result = func.apply(thisBinding, args || arguments);
            return isObject(result) ? result : thisBinding;
          }
          return func.apply(thisArg, args || arguments);
        }
        setBindData(bound, bindData);
        return bound;
      }

      /**
       * The base implementation of `_.clone` without argument juggling or support
       * for `thisArg` binding.
       *
       * @private
       * @param {*} value The value to clone.
       * @param {boolean} [isDeep=false] Specify a deep clone.
       * @param {Function} [callback] The function to customize cloning values.
       * @param {Array} [stackA=[]] Tracks traversed source objects.
       * @param {Array} [stackB=[]] Associates clones with source counterparts.
       * @returns {*} Returns the cloned value.
       */
      function baseClone(value, isDeep, callback, stackA, stackB) {
        if (callback) {
          var result = callback(value);
          if (typeof result != 'undefined') {
            return result;
          }
        }
        // inspect [[Class]]
        var isObj = isObject(value);
        if (isObj) {
          var className = toString.call(value);
          if (!cloneableClasses[className]) {
            return value;
          }
          var ctor = ctorByClass[className];
          switch (className) {
            case boolClass:
            case dateClass:
              return new ctor(+value);

            case numberClass:
            case stringClass:
              return new ctor(value);

            case regexpClass:
              result = ctor(value.source, reFlags.exec(value));
              result.lastIndex = value.lastIndex;
              return result;
          }
        } else {
          return value;
        }
        var isArr = isArray(value);
        if (isDeep) {
          // check for circular references and return corresponding clone
          var initedStack = !stackA;
          stackA || (stackA = getArray());
          stackB || (stackB = getArray());

          var length = stackA.length;
          while (length--) {
            if (stackA[length] == value) {
              return stackB[length];
            }
          }
          result = isArr ? ctor(value.length) : {};
        }
        else {
          result = isArr ? slice(value) : assign({}, value);
        }
        // add array properties assigned by `RegExp#exec`
        if (isArr) {
          if (hasOwnProperty.call(value, 'index')) {
            result.index = value.index;
          }
          if (hasOwnProperty.call(value, 'input')) {
            result.input = value.input;
          }
        }
        // exit for shallow clone
        if (!isDeep) {
          return result;
        }
        // add the source value to the stack of traversed objects
        // and associate it with its clone
        stackA.push(value);
        stackB.push(result);

        // recursively populate clone (susceptible to call stack limits)
        (isArr ? forEach : forOwn)(value, function(objValue, key) {
          result[key] = baseClone(objValue, isDeep, callback, stackA, stackB);
        });

        if (initedStack) {
          releaseArray(stackA);
          releaseArray(stackB);
        }
        return result;
      }

      /**
       * The base implementation of `_.create` without support for assigning
       * properties to the created object.
       *
       * @private
       * @param {Object} prototype The object to inherit from.
       * @returns {Object} Returns the new object.
       */
      function baseCreate(prototype, properties) {
        return isObject(prototype) ? nativeCreate(prototype) : {};
      }
      // fallback for browsers without `Object.create`
      if (!nativeCreate) {
        baseCreate = (function() {
          function Object() {}
          return function(prototype) {
            if (isObject(prototype)) {
              Object.prototype = prototype;
              var result = new Object;
              Object.prototype = null;
            }
            return result || context.Object();
          };
        }());
      }

      /**
       * The base implementation of `_.createCallback` without support for creating
       * "_.pluck" or "_.where" style callbacks.
       *
       * @private
       * @param {*} [func=identity] The value to convert to a callback.
       * @param {*} [thisArg] The `this` binding of the created callback.
       * @param {number} [argCount] The number of arguments the callback accepts.
       * @returns {Function} Returns a callback function.
       */
      function baseCreateCallback(func, thisArg, argCount) {
        if (typeof func != 'function') {
          return identity;
        }
        // exit early for no `thisArg` or already bound by `Function#bind`
        if (typeof thisArg == 'undefined' || !('prototype' in func)) {
          return func;
        }
        var bindData = func.__bindData__;
        if (typeof bindData == 'undefined') {
          if (support.funcNames) {
            bindData = !func.name;
          }
          bindData = bindData || !support.funcDecomp;
          if (!bindData) {
            var source = fnToString.call(func);
            if (!support.funcNames) {
              bindData = !reFuncName.test(source);
            }
            if (!bindData) {
              // checks if `func` references the `this` keyword and stores the result
              bindData = reThis.test(source);
              setBindData(func, bindData);
            }
          }
        }
        // exit early if there are no `this` references or `func` is bound
        if (bindData === false || (bindData !== true && bindData[1] & 1)) {
          return func;
        }
        switch (argCount) {
          case 1: return function(value) {
            return func.call(thisArg, value);
          };
          case 2: return function(a, b) {
            return func.call(thisArg, a, b);
          };
          case 3: return function(value, index, collection) {
            return func.call(thisArg, value, index, collection);
          };
          case 4: return function(accumulator, value, index, collection) {
            return func.call(thisArg, accumulator, value, index, collection);
          };
        }
        return bind(func, thisArg);
      }

      /**
       * The base implementation of `createWrapper` that creates the wrapper and
       * sets its meta data.
       *
       * @private
       * @param {Array} bindData The bind data array.
       * @returns {Function} Returns the new function.
       */
      function baseCreateWrapper(bindData) {
        var func = bindData[0],
            bitmask = bindData[1],
            partialArgs = bindData[2],
            partialRightArgs = bindData[3],
            thisArg = bindData[4],
            arity = bindData[5];

        var isBind = bitmask & 1,
            isBindKey = bitmask & 2,
            isCurry = bitmask & 4,
            isCurryBound = bitmask & 8,
            key = func;

        function bound() {
          var thisBinding = isBind ? thisArg : this;
          if (partialArgs) {
            var args = slice(partialArgs);
            push.apply(args, arguments);
          }
          if (partialRightArgs || isCurry) {
            args || (args = slice(arguments));
            if (partialRightArgs) {
              push.apply(args, partialRightArgs);
            }
            if (isCurry && args.length < arity) {
              bitmask |= 16 & ~32;
              return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);
            }
          }
          args || (args = arguments);
          if (isBindKey) {
            func = thisBinding[key];
          }
          if (this instanceof bound) {
            thisBinding = baseCreate(func.prototype);
            var result = func.apply(thisBinding, args);
            return isObject(result) ? result : thisBinding;
          }
          return func.apply(thisBinding, args);
        }
        setBindData(bound, bindData);
        return bound;
      }

      /**
       * The base implementation of `_.difference` that accepts a single array
       * of values to exclude.
       *
       * @private
       * @param {Array} array The array to process.
       * @param {Array} [values] The array of values to exclude.
       * @returns {Array} Returns a new array of filtered values.
       */
      function baseDifference(array, values) {
        var index = -1,
            indexOf = getIndexOf(),
            length = array ? array.length : 0,
            isLarge = length >= largeArraySize && indexOf === baseIndexOf,
            result = [];

        if (isLarge) {
          var cache = createCache(values);
          if (cache) {
            indexOf = cacheIndexOf;
            values = cache;
          } else {
            isLarge = false;
          }
        }
        while (++index < length) {
          var value = array[index];
          if (indexOf(values, value) < 0) {
            result.push(value);
          }
        }
        if (isLarge) {
          releaseObject(values);
        }
        return result;
      }

      /**
       * The base implementation of `_.flatten` without support for callback
       * shorthands or `thisArg` binding.
       *
       * @private
       * @param {Array} array The array to flatten.
       * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
       * @param {boolean} [isStrict=false] A flag to restrict flattening to arrays and `arguments` objects.
       * @param {number} [fromIndex=0] The index to start from.
       * @returns {Array} Returns a new flattened array.
       */
      function baseFlatten(array, isShallow, isStrict, fromIndex) {
        var index = (fromIndex || 0) - 1,
            length = array ? array.length : 0,
            result = [];

        while (++index < length) {
          var value = array[index];

          if (value && typeof value == 'object' && typeof value.length == 'number'
              && (isArray(value) || isArguments(value))) {
            // recursively flatten arrays (susceptible to call stack limits)
            if (!isShallow) {
              value = baseFlatten(value, isShallow, isStrict);
            }
            var valIndex = -1,
                valLength = value.length,
                resIndex = result.length;

            result.length += valLength;
            while (++valIndex < valLength) {
              result[resIndex++] = value[valIndex];
            }
          } else if (!isStrict) {
            result.push(value);
          }
        }
        return result;
      }

      /**
       * The base implementation of `_.isEqual`, without support for `thisArg` binding,
       * that allows partial "_.where" style comparisons.
       *
       * @private
       * @param {*} a The value to compare.
       * @param {*} b The other value to compare.
       * @param {Function} [callback] The function to customize comparing values.
       * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.
       * @param {Array} [stackA=[]] Tracks traversed `a` objects.
       * @param {Array} [stackB=[]] Tracks traversed `b` objects.
       * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
       */
      function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {
        // used to indicate that when comparing objects, `a` has at least the properties of `b`
        if (callback) {
          var result = callback(a, b);
          if (typeof result != 'undefined') {
            return !!result;
          }
        }
        // exit early for identical values
        if (a === b) {
          // treat `+0` vs. `-0` as not equal
          return a !== 0 || (1 / a == 1 / b);
        }
        var type = typeof a,
            otherType = typeof b;

        // exit early for unlike primitive values
        if (a === a &&
            !(a && objectTypes[type]) &&
            !(b && objectTypes[otherType])) {
          return false;
        }
        // exit early for `null` and `undefined` avoiding ES3's Function#call behavior
        // http://es5.github.io/#x15.3.4.4
        if (a == null || b == null) {
          return a === b;
        }
        // compare [[Class]] names
        var className = toString.call(a),
            otherClass = toString.call(b);

        if (className == argsClass) {
          className = objectClass;
        }
        if (otherClass == argsClass) {
          otherClass = objectClass;
        }
        if (className != otherClass) {
          return false;
        }
        switch (className) {
          case boolClass:
          case dateClass:
            // coerce dates and booleans to numbers, dates to milliseconds and booleans
            // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
            return +a == +b;

          case numberClass:
            // treat `NaN` vs. `NaN` as equal
            return (a != +a)
              ? b != +b
              // but treat `+0` vs. `-0` as not equal
              : (a == 0 ? (1 / a == 1 / b) : a == +b);

          case regexpClass:
          case stringClass:
            // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
            // treat string primitives and their corresponding object instances as equal
            return a == String(b);
        }
        var isArr = className == arrayClass;
        if (!isArr) {
          // unwrap any `lodash` wrapped values
          var aWrapped = hasOwnProperty.call(a, '__wrapped__'),
              bWrapped = hasOwnProperty.call(b, '__wrapped__');

          if (aWrapped || bWrapped) {
            return baseIsEqual(aWrapped ? a.__wrapped__ : a, bWrapped ? b.__wrapped__ : b, callback, isWhere, stackA, stackB);
          }
          // exit for functions and DOM nodes
          if (className != objectClass) {
            return false;
          }
          // in older versions of Opera, `arguments` objects have `Array` constructors
          var ctorA = a.constructor,
              ctorB = b.constructor;

          // non `Object` object instances with different constructors are not equal
          if (ctorA != ctorB &&
                !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
                ('constructor' in a && 'constructor' in b)
              ) {
            return false;
          }
        }
        // assume cyclic structures are equal
        // the algorithm for detecting cyclic structures is adapted from ES 5.1
        // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
        var initedStack = !stackA;
        stackA || (stackA = getArray());
        stackB || (stackB = getArray());

        var length = stackA.length;
        while (length--) {
          if (stackA[length] == a) {
            return stackB[length] == b;
          }
        }
        var size = 0;
        result = true;

        // add `a` and `b` to the stack of traversed objects
        stackA.push(a);
        stackB.push(b);

        // recursively compare objects and arrays (susceptible to call stack limits)
        if (isArr) {
          // compare lengths to determine if a deep comparison is necessary
          length = a.length;
          size = b.length;
          result = size == length;

          if (result || isWhere) {
            // deep compare the contents, ignoring non-numeric properties
            while (size--) {
              var index = length,
                  value = b[size];

              if (isWhere) {
                while (index--) {
                  if ((result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB))) {
                    break;
                  }
                }
              } else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) {
                break;
              }
            }
          }
        }
        else {
          // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
          // which, in this case, is more costly
          forIn(b, function(value, key, b) {
            if (hasOwnProperty.call(b, key)) {
              // count the number of properties.
              size++;
              // deep compare each property value.
              return (result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB));
            }
          });

          if (result && !isWhere) {
            // ensure both objects have the same number of properties
            forIn(a, function(value, key, a) {
              if (hasOwnProperty.call(a, key)) {
                // `size` will be `-1` if `a` has more properties than `b`
                return (result = --size > -1);
              }
            });
          }
        }
        stackA.pop();
        stackB.pop();

        if (initedStack) {
          releaseArray(stackA);
          releaseArray(stackB);
        }
        return result;
      }

      /**
       * The base implementation of `_.merge` without argument juggling or support
       * for `thisArg` binding.
       *
       * @private
       * @param {Object} object The destination object.
       * @param {Object} source The source object.
       * @param {Function} [callback] The function to customize merging properties.
       * @param {Array} [stackA=[]] Tracks traversed source objects.
       * @param {Array} [stackB=[]] Associates values with source counterparts.
       */
      function baseMerge(object, source, callback, stackA, stackB) {
        (isArray(source) ? forEach : forOwn)(source, function(source, key) {
          var found,
              isArr,
              result = source,
              value = object[key];

          if (source && ((isArr = isArray(source)) || isPlainObject(source))) {
            // avoid merging previously merged cyclic sources
            var stackLength = stackA.length;
            while (stackLength--) {
              if ((found = stackA[stackLength] == source)) {
                value = stackB[stackLength];
                break;
              }
            }
            if (!found) {
              var isShallow;
              if (callback) {
                result = callback(value, source);
                if ((isShallow = typeof result != 'undefined')) {
                  value = result;
                }
              }
              if (!isShallow) {
                value = isArr
                  ? (isArray(value) ? value : [])
                  : (isPlainObject(value) ? value : {});
              }
              // add `source` and associated `value` to the stack of traversed objects
              stackA.push(source);
              stackB.push(value);

              // recursively merge objects and arrays (susceptible to call stack limits)
              if (!isShallow) {
                baseMerge(value, source, callback, stackA, stackB);
              }
            }
          }
          else {
            if (callback) {
              result = callback(value, source);
              if (typeof result == 'undefined') {
                result = source;
              }
            }
            if (typeof result != 'undefined') {
              value = result;
            }
          }
          object[key] = value;
        });
      }

      /**
       * The base implementation of `_.random` without argument juggling or support
       * for returning floating-point numbers.
       *
       * @private
       * @param {number} min The minimum possible value.
       * @param {number} max The maximum possible value.
       * @returns {number} Returns a random number.
       */
      function baseRandom(min, max) {
        return min + floor(nativeRandom() * (max - min + 1));
      }

      /**
       * The base implementation of `_.uniq` without support for callback shorthands
       * or `thisArg` binding.
       *
       * @private
       * @param {Array} array The array to process.
       * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
       * @param {Function} [callback] The function called per iteration.
       * @returns {Array} Returns a duplicate-value-free array.
       */
      function baseUniq(array, isSorted, callback) {
        var index = -1,
            indexOf = getIndexOf(),
            length = array ? array.length : 0,
            result = [];

        var isLarge = !isSorted && length >= largeArraySize && indexOf === baseIndexOf,
            seen = (callback || isLarge) ? getArray() : result;

        if (isLarge) {
          var cache = createCache(seen);
          indexOf = cacheIndexOf;
          seen = cache;
        }
        while (++index < length) {
          var value = array[index],
              computed = callback ? callback(value, index, array) : value;

          if (isSorted
                ? !index || seen[seen.length - 1] !== computed
                : indexOf(seen, computed) < 0
              ) {
            if (callback || isLarge) {
              seen.push(computed);
            }
            result.push(value);
          }
        }
        if (isLarge) {
          releaseArray(seen.array);
          releaseObject(seen);
        } else if (callback) {
          releaseArray(seen);
        }
        return result;
      }

      /**
       * Creates a function that aggregates a collection, creating an object composed
       * of keys generated from the results of running each element of the collection
       * through a callback. The given `setter` function sets the keys and values
       * of the composed object.
       *
       * @private
       * @param {Function} setter The setter function.
       * @returns {Function} Returns the new aggregator function.
       */
      function createAggregator(setter) {
        return function(collection, callback, thisArg) {
          var result = {};
          callback = lodash.createCallback(callback, thisArg, 3);

          var index = -1,
              length = collection ? collection.length : 0;

          if (typeof length == 'number') {
            while (++index < length) {
              var value = collection[index];
              setter(result, value, callback(value, index, collection), collection);
            }
          } else {
            forOwn(collection, function(value, key, collection) {
              setter(result, value, callback(value, key, collection), collection);
            });
          }
          return result;
        };
      }

      /**
       * Creates a function that, when called, either curries or invokes `func`
       * with an optional `this` binding and partially applied arguments.
       *
       * @private
       * @param {Function|string} func The function or method name to reference.
       * @param {number} bitmask The bitmask of method flags to compose.
       *  The bitmask may be composed of the following flags:
       *  1 - `_.bind`
       *  2 - `_.bindKey`
       *  4 - `_.curry`
       *  8 - `_.curry` (bound)
       *  16 - `_.partial`
       *  32 - `_.partialRight`
       * @param {Array} [partialArgs] An array of arguments to prepend to those
       *  provided to the new function.
       * @param {Array} [partialRightArgs] An array of arguments to append to those
       *  provided to the new function.
       * @param {*} [thisArg] The `this` binding of `func`.
       * @param {number} [arity] The arity of `func`.
       * @returns {Function} Returns the new function.
       */
      function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
        var isBind = bitmask & 1,
            isBindKey = bitmask & 2,
            isCurry = bitmask & 4,
            isPartial = bitmask & 16,
            isPartialRight = bitmask & 32;

        if (!isBindKey && !isFunction(func)) {
          throw new TypeError;
        }
        if (isPartial && !partialArgs.length) {
          bitmask &= ~16;
          isPartial = partialArgs = false;
        }
        if (isPartialRight && !partialRightArgs.length) {
          bitmask &= ~32;
          isPartialRight = partialRightArgs = false;
        }
        var bindData = func && func.__bindData__;
        if (bindData && bindData !== true) {
          // clone `bindData`
          bindData = slice(bindData);
          if (bindData[2]) {
            bindData[2] = slice(bindData[2]);
          }
          if (bindData[3]) {
            bindData[3] = slice(bindData[3]);
          }
          // set `thisBinding` is not previously bound
          if (isBind && !(bindData[1] & 1)) {
            bindData[4] = thisArg;
          }
          // set if previously bound but not currently (subsequent curried functions)
          if (!isBind && bindData[1] & 1) {
            bitmask |= 8;
          }
          // set curried arity if not yet set
          if (isCurry && !(bindData[1] & 4)) {
            bindData[5] = arity;
          }
          // append partial left arguments
          if (isPartial) {
            push.apply(bindData[2] || (bindData[2] = []), partialArgs);
          }
          // append partial right arguments
          if (isPartialRight) {
            unshift.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
          }
          // merge flags
          bindData[1] |= bitmask;
          return createWrapper.apply(null, bindData);
        }
        // fast path for `_.bind`
        var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;
        return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
      }

      /**
       * Used by `escape` to convert characters to HTML entities.
       *
       * @private
       * @param {string} match The matched character to escape.
       * @returns {string} Returns the escaped character.
       */
      function escapeHtmlChar(match) {
        return htmlEscapes[match];
      }

      /**
       * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
       * customized, this method returns the custom method, otherwise it returns
       * the `baseIndexOf` function.
       *
       * @private
       * @returns {Function} Returns the "indexOf" function.
       */
      function getIndexOf() {
        var result = (result = lodash.indexOf) === indexOf ? baseIndexOf : result;
        return result;
      }

      /**
       * Checks if `value` is a native function.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
       */
      function isNative(value) {
        return typeof value == 'function' && reNative.test(value);
      }

      /**
       * Sets `this` binding data on a given function.
       *
       * @private
       * @param {Function} func The function to set data on.
       * @param {Array} value The data array to set.
       */
      var setBindData = !defineProperty ? noop : function(func, value) {
        descriptor.value = value;
        defineProperty(func, '__bindData__', descriptor);
        descriptor.value = null;
      };

      /**
       * A fallback implementation of `isPlainObject` which checks if a given value
       * is an object created by the `Object` constructor, assuming objects created
       * by the `Object` constructor have no inherited enumerable properties and that
       * there are no `Object.prototype` extensions.
       *
       * @private
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
       */
      function shimIsPlainObject(value) {
        var ctor,
            result;

        // avoid non Object objects, `arguments` objects, and DOM elements
        if (!(value && toString.call(value) == objectClass) ||
            (ctor = value.constructor, isFunction(ctor) && !(ctor instanceof ctor))) {
          return false;
        }
        // In most environments an object's own properties are iterated before
        // its inherited properties. If the last iterated property is an object's
        // own property then there are no inherited enumerable properties.
        forIn(value, function(value, key) {
          result = key;
        });
        return typeof result == 'undefined' || hasOwnProperty.call(value, result);
      }

      /**
       * Used by `unescape` to convert HTML entities to characters.
       *
       * @private
       * @param {string} match The matched character to unescape.
       * @returns {string} Returns the unescaped character.
       */
      function unescapeHtmlChar(match) {
        return htmlUnescapes[match];
      }

      /*--------------------------------------------------------------------------*/

      /**
       * Checks if `value` is an `arguments` object.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
       * @example
       *
       * (function() { return _.isArguments(arguments); })(1, 2, 3);
       * // => true
       *
       * _.isArguments([1, 2, 3]);
       * // => false
       */
      function isArguments(value) {
        return value && typeof value == 'object' && typeof value.length == 'number' &&
          toString.call(value) == argsClass || false;
      }

      /**
       * Checks if `value` is an array.
       *
       * @static
       * @memberOf _
       * @type Function
       * @category Objects
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if the `value` is an array, else `false`.
       * @example
       *
       * (function() { return _.isArray(arguments); })();
       * // => false
       *
       * _.isArray([1, 2, 3]);
       * // => true
       */
      var isArray = nativeIsArray || function(value) {
        return value && typeof value == 'object' && typeof value.length == 'number' &&
          toString.call(value) == arrayClass || false;
      };

      /**
       * A fallback implementation of `Object.keys` which produces an array of the
       * given object's own enumerable property names.
       *
       * @private
       * @type Function
       * @param {Object} object The object to inspect.
       * @returns {Array} Returns an array of property names.
       */
      var shimKeys = function(object) {
        var index, iterable = object, result = [];
        if (!iterable) return result;
        if (!(objectTypes[typeof object])) return result;
          for (index in iterable) {
            if (hasOwnProperty.call(iterable, index)) {
              result.push(index);
            }
          }
        return result
      };

      /**
       * Creates an array composed of the own enumerable property names of an object.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {Object} object The object to inspect.
       * @returns {Array} Returns an array of property names.
       * @example
       *
       * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
       * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
       */
      var keys = !nativeKeys ? shimKeys : function(object) {
        if (!isObject(object)) {
          return [];
        }
        return nativeKeys(object);
      };

      /**
       * Used to convert characters to HTML entities:
       *
       * Though the `>` character is escaped for symmetry, characters like `>` and `/`
       * don't require escaping in HTML and have no special meaning unless they're part
       * of a tag or an unquoted attribute value.
       * http://mathiasbynens.be/notes/ambiguous-ampersands (under "semi-related fun fact")
       */
      var htmlEscapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };

      /** Used to convert HTML entities to characters */
      var htmlUnescapes = invert(htmlEscapes);

      /** Used to match HTML entities and HTML characters */
      var reEscapedHtml = RegExp('(' + keys(htmlUnescapes).join('|') + ')', 'g'),
          reUnescapedHtml = RegExp('[' + keys(htmlEscapes).join('') + ']', 'g');

      /*--------------------------------------------------------------------------*/

      /**
       * Assigns own enumerable properties of source object(s) to the destination
       * object. Subsequent sources will overwrite property assignments of previous
       * sources. If a callback is provided it will be executed to produce the
       * assigned values. The callback is bound to `thisArg` and invoked with two
       * arguments; (objectValue, sourceValue).
       *
       * @static
       * @memberOf _
       * @type Function
       * @alias extend
       * @category Objects
       * @param {Object} object The destination object.
       * @param {...Object} [source] The source objects.
       * @param {Function} [callback] The function to customize assigning values.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Object} Returns the destination object.
       * @example
       *
       * _.assign({ 'name': 'fred' }, { 'employer': 'slate' });
       * // => { 'name': 'fred', 'employer': 'slate' }
       *
       * var defaults = _.partialRight(_.assign, function(a, b) {
       *   return typeof a == 'undefined' ? b : a;
       * });
       *
       * var object = { 'name': 'barney' };
       * defaults(object, { 'name': 'fred', 'employer': 'slate' });
       * // => { 'name': 'barney', 'employer': 'slate' }
       */
      var assign = function(object, source, guard) {
        var index, iterable = object, result = iterable;
        if (!iterable) return result;
        var args = arguments,
            argsIndex = 0,
            argsLength = typeof guard == 'number' ? 2 : args.length;
        if (argsLength > 3 && typeof args[argsLength - 2] == 'function') {
          var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);
        } else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {
          callback = args[--argsLength];
        }
        while (++argsIndex < argsLength) {
          iterable = args[argsIndex];
          if (iterable && objectTypes[typeof iterable]) {
          var ownIndex = -1,
              ownProps = objectTypes[typeof iterable] && keys(iterable),
              length = ownProps ? ownProps.length : 0;

          while (++ownIndex < length) {
            index = ownProps[ownIndex];
            result[index] = callback ? callback(result[index], iterable[index]) : iterable[index];
          }
          }
        }
        return result
      };

      /**
       * Creates a clone of `value`. If `isDeep` is `true` nested objects will also
       * be cloned, otherwise they will be assigned by reference. If a callback
       * is provided it will be executed to produce the cloned values. If the
       * callback returns `undefined` cloning will be handled by the method instead.
       * The callback is bound to `thisArg` and invoked with one argument; (value).
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {*} value The value to clone.
       * @param {boolean} [isDeep=false] Specify a deep clone.
       * @param {Function} [callback] The function to customize cloning values.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {*} Returns the cloned value.
       * @example
       *
       * var characters = [
       *   { 'name': 'barney', 'age': 36 },
       *   { 'name': 'fred',   'age': 40 }
       * ];
       *
       * var shallow = _.clone(characters);
       * shallow[0] === characters[0];
       * // => true
       *
       * var deep = _.clone(characters, true);
       * deep[0] === characters[0];
       * // => false
       *
       * _.mixin({
       *   'clone': _.partialRight(_.clone, function(value) {
       *     return _.isElement(value) ? value.cloneNode(false) : undefined;
       *   })
       * });
       *
       * var clone = _.clone(document.body);
       * clone.childNodes.length;
       * // => 0
       */
      function clone(value, isDeep, callback, thisArg) {
        // allows working with "Collections" methods without using their `index`
        // and `collection` arguments for `isDeep` and `callback`
        if (typeof isDeep != 'boolean' && isDeep != null) {
          thisArg = callback;
          callback = isDeep;
          isDeep = false;
        }
        return baseClone(value, isDeep, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
      }

      /**
       * Creates a deep clone of `value`. If a callback is provided it will be
       * executed to produce the cloned values. If the callback returns `undefined`
       * cloning will be handled by the method instead. The callback is bound to
       * `thisArg` and invoked with one argument; (value).
       *
       * Note: This method is loosely based on the structured clone algorithm. Functions
       * and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and
       * objects created by constructors other than `Object` are cloned to plain `Object` objects.
       * See http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {*} value The value to deep clone.
       * @param {Function} [callback] The function to customize cloning values.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {*} Returns the deep cloned value.
       * @example
       *
       * var characters = [
       *   { 'name': 'barney', 'age': 36 },
       *   { 'name': 'fred',   'age': 40 }
       * ];
       *
       * var deep = _.cloneDeep(characters);
       * deep[0] === characters[0];
       * // => false
       *
       * var view = {
       *   'label': 'docs',
       *   'node': element
       * };
       *
       * var clone = _.cloneDeep(view, function(value) {
       *   return _.isElement(value) ? value.cloneNode(true) : undefined;
       * });
       *
       * clone.node == view.node;
       * // => false
       */
      function cloneDeep(value, callback, thisArg) {
        return baseClone(value, true, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
      }

      /**
       * Creates an object that inherits from the given `prototype` object. If a
       * `properties` object is provided its own enumerable properties are assigned
       * to the created object.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {Object} prototype The object to inherit from.
       * @param {Object} [properties] The properties to assign to the object.
       * @returns {Object} Returns the new object.
       * @example
       *
       * function Shape() {
       *   this.x = 0;
       *   this.y = 0;
       * }
       *
       * function Circle() {
       *   Shape.call(this);
       * }
       *
       * Circle.prototype = _.create(Shape.prototype, { 'constructor': Circle });
       *
       * var circle = new Circle;
       * circle instanceof Circle;
       * // => true
       *
       * circle instanceof Shape;
       * // => true
       */
      function create(prototype, properties) {
        var result = baseCreate(prototype);
        return properties ? assign(result, properties) : result;
      }

      /**
       * Assigns own enumerable properties of source object(s) to the destination
       * object for all destination properties that resolve to `undefined`. Once a
       * property is set, additional defaults of the same property will be ignored.
       *
       * @static
       * @memberOf _
       * @type Function
       * @category Objects
       * @param {Object} object The destination object.
       * @param {...Object} [source] The source objects.
       * @param- {Object} [guard] Allows working with `_.reduce` without using its
       *  `key` and `object` arguments as sources.
       * @returns {Object} Returns the destination object.
       * @example
       *
       * var object = { 'name': 'barney' };
       * _.defaults(object, { 'name': 'fred', 'employer': 'slate' });
       * // => { 'name': 'barney', 'employer': 'slate' }
       */
      var defaults = function(object, source, guard) {
        var index, iterable = object, result = iterable;
        if (!iterable) return result;
        var args = arguments,
            argsIndex = 0,
            argsLength = typeof guard == 'number' ? 2 : args.length;
        while (++argsIndex < argsLength) {
          iterable = args[argsIndex];
          if (iterable && objectTypes[typeof iterable]) {
          var ownIndex = -1,
              ownProps = objectTypes[typeof iterable] && keys(iterable),
              length = ownProps ? ownProps.length : 0;

          while (++ownIndex < length) {
            index = ownProps[ownIndex];
            if (typeof result[index] == 'undefined') result[index] = iterable[index];
          }
          }
        }
        return result
      };

      /**
       * This method is like `_.findIndex` except that it returns the key of the
       * first element that passes the callback check, instead of the element itself.
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {Object} object The object to search.
       * @param {Function|Object|string} [callback=identity] The function called per
       *  iteration. If a property name or object is provided it will be used to
       *  create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {string|undefined} Returns the key of the found element, else `undefined`.
       * @example
       *
       * var characters = {
       *   'barney': {  'age': 36, 'blocked': false },
       *   'fred': {    'age': 40, 'blocked': true },
       *   'pebbles': { 'age': 1,  'blocked': false }
       * };
       *
       * _.findKey(characters, function(chr) {
       *   return chr.age < 40;
       * });
       * // => 'barney' (property order is not guaranteed across environments)
       *
       * // using "_.where" callback shorthand
       * _.findKey(characters, { 'age': 1 });
       * // => 'pebbles'
       *
       * // using "_.pluck" callback shorthand
       * _.findKey(characters, 'blocked');
       * // => 'fred'
       */
      function findKey(object, callback, thisArg) {
        var result;
        callback = lodash.createCallback(callback, thisArg, 3);
        forOwn(object, function(value, key, object) {
          if (callback(value, key, object)) {
            result = key;
            return false;
          }
        });
        return result;
      }

      /**
       * This method is like `_.findKey` except that it iterates over elements
       * of a `collection` in the opposite order.
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {Object} object The object to search.
       * @param {Function|Object|string} [callback=identity] The function called per
       *  iteration. If a property name or object is provided it will be used to
       *  create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {string|undefined} Returns the key of the found element, else `undefined`.
       * @example
       *
       * var characters = {
       *   'barney': {  'age': 36, 'blocked': true },
       *   'fred': {    'age': 40, 'blocked': false },
       *   'pebbles': { 'age': 1,  'blocked': true }
       * };
       *
       * _.findLastKey(characters, function(chr) {
       *   return chr.age < 40;
       * });
       * // => returns `pebbles`, assuming `_.findKey` returns `barney`
       *
       * // using "_.where" callback shorthand
       * _.findLastKey(characters, { 'age': 40 });
       * // => 'fred'
       *
       * // using "_.pluck" callback shorthand
       * _.findLastKey(characters, 'blocked');
       * // => 'pebbles'
       */
      function findLastKey(object, callback, thisArg) {
        var result;
        callback = lodash.createCallback(callback, thisArg, 3);
        forOwnRight(object, function(value, key, object) {
          if (callback(value, key, object)) {
            result = key;
            return false;
          }
        });
        return result;
      }

      /**
       * Iterates over own and inherited enumerable properties of an object,
       * executing the callback for each property. The callback is bound to `thisArg`
       * and invoked with three arguments; (value, key, object). Callbacks may exit
       * iteration early by explicitly returning `false`.
       *
       * @static
       * @memberOf _
       * @type Function
       * @category Objects
       * @param {Object} object The object to iterate over.
       * @param {Function} [callback=identity] The function called per iteration.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Object} Returns `object`.
       * @example
       *
       * function Shape() {
       *   this.x = 0;
       *   this.y = 0;
       * }
       *
       * Shape.prototype.move = function(x, y) {
       *   this.x += x;
       *   this.y += y;
       * };
       *
       * _.forIn(new Shape, function(value, key) {
       *   console.log(key);
       * });
       * // => logs 'x', 'y', and 'move' (property order is not guaranteed across environments)
       */
      var forIn = function(collection, callback, thisArg) {
        var index, iterable = collection, result = iterable;
        if (!iterable) return result;
        if (!objectTypes[typeof iterable]) return result;
        callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
          for (index in iterable) {
            if (callback(iterable[index], index, collection) === false) return result;
          }
        return result
      };

      /**
       * This method is like `_.forIn` except that it iterates over elements
       * of a `collection` in the opposite order.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {Object} object The object to iterate over.
       * @param {Function} [callback=identity] The function called per iteration.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Object} Returns `object`.
       * @example
       *
       * function Shape() {
       *   this.x = 0;
       *   this.y = 0;
       * }
       *
       * Shape.prototype.move = function(x, y) {
       *   this.x += x;
       *   this.y += y;
       * };
       *
       * _.forInRight(new Shape, function(value, key) {
       *   console.log(key);
       * });
       * // => logs 'move', 'y', and 'x' assuming `_.forIn ` logs 'x', 'y', and 'move'
       */
      function forInRight(object, callback, thisArg) {
        var pairs = [];

        forIn(object, function(value, key) {
          pairs.push(key, value);
        });

        var length = pairs.length;
        callback = baseCreateCallback(callback, thisArg, 3);
        while (length--) {
          if (callback(pairs[length--], pairs[length], object) === false) {
            break;
          }
        }
        return object;
      }

      /**
       * Iterates over own enumerable properties of an object, executing the callback
       * for each property. The callback is bound to `thisArg` and invoked with three
       * arguments; (value, key, object). Callbacks may exit iteration early by
       * explicitly returning `false`.
       *
       * @static
       * @memberOf _
       * @type Function
       * @category Objects
       * @param {Object} object The object to iterate over.
       * @param {Function} [callback=identity] The function called per iteration.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Object} Returns `object`.
       * @example
       *
       * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
       *   console.log(key);
       * });
       * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
       */
      var forOwn = function(collection, callback, thisArg) {
        var index, iterable = collection, result = iterable;
        if (!iterable) return result;
        if (!objectTypes[typeof iterable]) return result;
        callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
          var ownIndex = -1,
              ownProps = objectTypes[typeof iterable] && keys(iterable),
              length = ownProps ? ownProps.length : 0;

          while (++ownIndex < length) {
            index = ownProps[ownIndex];
            if (callback(iterable[index], index, collection) === false) return result;
          }
        return result
      };

      /**
       * This method is like `_.forOwn` except that it iterates over elements
       * of a `collection` in the opposite order.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {Object} object The object to iterate over.
       * @param {Function} [callback=identity] The function called per iteration.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Object} Returns `object`.
       * @example
       *
       * _.forOwnRight({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
       *   console.log(key);
       * });
       * // => logs 'length', '1', and '0' assuming `_.forOwn` logs '0', '1', and 'length'
       */
      function forOwnRight(object, callback, thisArg) {
        var props = keys(object),
            length = props.length;

        callback = baseCreateCallback(callback, thisArg, 3);
        while (length--) {
          var key = props[length];
          if (callback(object[key], key, object) === false) {
            break;
          }
        }
        return object;
      }

      /**
       * Creates a sorted array of property names of all enumerable properties,
       * own and inherited, of `object` that have function values.
       *
       * @static
       * @memberOf _
       * @alias methods
       * @category Objects
       * @param {Object} object The object to inspect.
       * @returns {Array} Returns an array of property names that have function values.
       * @example
       *
       * _.functions(_);
       * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
       */
      function functions(object) {
        var result = [];
        forIn(object, function(value, key) {
          if (isFunction(value)) {
            result.push(key);
          }
        });
        return result.sort();
      }

      /**
       * Checks if the specified property name exists as a direct property of `object`,
       * instead of an inherited property.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {Object} object The object to inspect.
       * @param {string} key The name of the property to check.
       * @returns {boolean} Returns `true` if key is a direct property, else `false`.
       * @example
       *
       * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
       * // => true
       */
      function has(object, key) {
        return object ? hasOwnProperty.call(object, key) : false;
      }

      /**
       * Creates an object composed of the inverted keys and values of the given object.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {Object} object The object to invert.
       * @returns {Object} Returns the created inverted object.
       * @example
       *
       * _.invert({ 'first': 'fred', 'second': 'barney' });
       * // => { 'fred': 'first', 'barney': 'second' }
       */
      function invert(object) {
        var index = -1,
            props = keys(object),
            length = props.length,
            result = {};

        while (++index < length) {
          var key = props[index];
          result[object[key]] = key;
        }
        return result;
      }

      /**
       * Checks if `value` is a boolean value.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if the `value` is a boolean value, else `false`.
       * @example
       *
       * _.isBoolean(null);
       * // => false
       */
      function isBoolean(value) {
        return value === true || value === false ||
          value && typeof value == 'object' && toString.call(value) == boolClass || false;
      }

      /**
       * Checks if `value` is a date.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if the `value` is a date, else `false`.
       * @example
       *
       * _.isDate(new Date);
       * // => true
       */
      function isDate(value) {
        return value && typeof value == 'object' && toString.call(value) == dateClass || false;
      }

      /**
       * Checks if `value` is a DOM element.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if the `value` is a DOM element, else `false`.
       * @example
       *
       * _.isElement(document.body);
       * // => true
       */
      function isElement(value) {
        return value && value.nodeType === 1 || false;
      }

      /**
       * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
       * length of `0` and objects with no own enumerable properties are considered
       * "empty".
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {Array|Object|string} value The value to inspect.
       * @returns {boolean} Returns `true` if the `value` is empty, else `false`.
       * @example
       *
       * _.isEmpty([1, 2, 3]);
       * // => false
       *
       * _.isEmpty({});
       * // => true
       *
       * _.isEmpty('');
       * // => true
       */
      function isEmpty(value) {
        var result = true;
        if (!value) {
          return result;
        }
        var className = toString.call(value),
            length = value.length;

        if ((className == arrayClass || className == stringClass || className == argsClass ) ||
            (className == objectClass && typeof length == 'number' && isFunction(value.splice))) {
          return !length;
        }
        forOwn(value, function() {
          return (result = false);
        });
        return result;
      }

      /**
       * Performs a deep comparison between two values to determine if they are
       * equivalent to each other. If a callback is provided it will be executed
       * to compare values. If the callback returns `undefined` comparisons will
       * be handled by the method instead. The callback is bound to `thisArg` and
       * invoked with two arguments; (a, b).
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {*} a The value to compare.
       * @param {*} b The other value to compare.
       * @param {Function} [callback] The function to customize comparing values.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
       * @example
       *
       * var object = { 'name': 'fred' };
       * var copy = { 'name': 'fred' };
       *
       * object == copy;
       * // => false
       *
       * _.isEqual(object, copy);
       * // => true
       *
       * var words = ['hello', 'goodbye'];
       * var otherWords = ['hi', 'goodbye'];
       *
       * _.isEqual(words, otherWords, function(a, b) {
       *   var reGreet = /^(?:hello|hi)$/i,
       *       aGreet = _.isString(a) && reGreet.test(a),
       *       bGreet = _.isString(b) && reGreet.test(b);
       *
       *   return (aGreet || bGreet) ? (aGreet == bGreet) : undefined;
       * });
       * // => true
       */
      function isEqual(a, b, callback, thisArg) {
        return baseIsEqual(a, b, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 2));
      }

      /**
       * Checks if `value` is, or can be coerced to, a finite number.
       *
       * Note: This is not the same as native `isFinite` which will return true for
       * booleans and empty strings. See http://es5.github.io/#x15.1.2.5.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if the `value` is finite, else `false`.
       * @example
       *
       * _.isFinite(-101);
       * // => true
       *
       * _.isFinite('10');
       * // => true
       *
       * _.isFinite(true);
       * // => false
       *
       * _.isFinite('');
       * // => false
       *
       * _.isFinite(Infinity);
       * // => false
       */
      function isFinite(value) {
        return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
      }

      /**
       * Checks if `value` is a function.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
       * @example
       *
       * _.isFunction(_);
       * // => true
       */
      function isFunction(value) {
        return typeof value == 'function';
      }

      /**
       * Checks if `value` is the language type of Object.
       * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
       * @example
       *
       * _.isObject({});
       * // => true
       *
       * _.isObject([1, 2, 3]);
       * // => true
       *
       * _.isObject(1);
       * // => false
       */
      function isObject(value) {
        // check if the value is the ECMAScript language type of Object
        // http://es5.github.io/#x8
        // and avoid a V8 bug
        // http://code.google.com/p/v8/issues/detail?id=2291
        return !!(value && objectTypes[typeof value]);
      }

      /**
       * Checks if `value` is `NaN`.
       *
       * Note: This is not the same as native `isNaN` which will return `true` for
       * `undefined` and other non-numeric values. See http://es5.github.io/#x15.1.2.4.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if the `value` is `NaN`, else `false`.
       * @example
       *
       * _.isNaN(NaN);
       * // => true
       *
       * _.isNaN(new Number(NaN));
       * // => true
       *
       * isNaN(undefined);
       * // => true
       *
       * _.isNaN(undefined);
       * // => false
       */
      function isNaN(value) {
        // `NaN` as a primitive is the only value that is not equal to itself
        // (perform the [[Class]] check first to avoid errors with some host objects in IE)
        return isNumber(value) && value != +value;
      }

      /**
       * Checks if `value` is `null`.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if the `value` is `null`, else `false`.
       * @example
       *
       * _.isNull(null);
       * // => true
       *
       * _.isNull(undefined);
       * // => false
       */
      function isNull(value) {
        return value === null;
      }

      /**
       * Checks if `value` is a number.
       *
       * Note: `NaN` is considered a number. See http://es5.github.io/#x8.5.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if the `value` is a number, else `false`.
       * @example
       *
       * _.isNumber(8.4 * 5);
       * // => true
       */
      function isNumber(value) {
        return typeof value == 'number' ||
          value && typeof value == 'object' && toString.call(value) == numberClass || false;
      }

      /**
       * Checks if `value` is an object created by the `Object` constructor.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
       * @example
       *
       * function Shape() {
       *   this.x = 0;
       *   this.y = 0;
       * }
       *
       * _.isPlainObject(new Shape);
       * // => false
       *
       * _.isPlainObject([1, 2, 3]);
       * // => false
       *
       * _.isPlainObject({ 'x': 0, 'y': 0 });
       * // => true
       */
      var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
        if (!(value && toString.call(value) == objectClass)) {
          return false;
        }
        var valueOf = value.valueOf,
            objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

        return objProto
          ? (value == objProto || getPrototypeOf(value) == objProto)
          : shimIsPlainObject(value);
      };

      /**
       * Checks if `value` is a regular expression.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if the `value` is a regular expression, else `false`.
       * @example
       *
       * _.isRegExp(/fred/);
       * // => true
       */
      function isRegExp(value) {
        return value && typeof value == 'object' && toString.call(value) == regexpClass || false;
      }

      /**
       * Checks if `value` is a string.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if the `value` is a string, else `false`.
       * @example
       *
       * _.isString('fred');
       * // => true
       */
      function isString(value) {
        return typeof value == 'string' ||
          value && typeof value == 'object' && toString.call(value) == stringClass || false;
      }

      /**
       * Checks if `value` is `undefined`.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {*} value The value to check.
       * @returns {boolean} Returns `true` if the `value` is `undefined`, else `false`.
       * @example
       *
       * _.isUndefined(void 0);
       * // => true
       */
      function isUndefined(value) {
        return typeof value == 'undefined';
      }

      /**
       * Creates an object with the same keys as `object` and values generated by
       * running each own enumerable property of `object` through the callback.
       * The callback is bound to `thisArg` and invoked with three arguments;
       * (value, key, object).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {Object} object The object to iterate over.
       * @param {Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Array} Returns a new object with values of the results of each `callback` execution.
       * @example
       *
       * _.mapValues({ 'a': 1, 'b': 2, 'c': 3} , function(num) { return num * 3; });
       * // => { 'a': 3, 'b': 6, 'c': 9 }
       *
       * var characters = {
       *   'fred': { 'name': 'fred', 'age': 40 },
       *   'pebbles': { 'name': 'pebbles', 'age': 1 }
       * };
       *
       * // using "_.pluck" callback shorthand
       * _.mapValues(characters, 'age');
       * // => { 'fred': 40, 'pebbles': 1 }
       */
      function mapValues(object, callback, thisArg) {
        var result = {};
        callback = lodash.createCallback(callback, thisArg, 3);

        forOwn(object, function(value, key, object) {
          result[key] = callback(value, key, object);
        });
        return result;
      }

      /**
       * Recursively merges own enumerable properties of the source object(s), that
       * don't resolve to `undefined` into the destination object. Subsequent sources
       * will overwrite property assignments of previous sources. If a callback is
       * provided it will be executed to produce the merged values of the destination
       * and source properties. If the callback returns `undefined` merging will
       * be handled by the method instead. The callback is bound to `thisArg` and
       * invoked with two arguments; (objectValue, sourceValue).
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {Object} object The destination object.
       * @param {...Object} [source] The source objects.
       * @param {Function} [callback] The function to customize merging properties.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Object} Returns the destination object.
       * @example
       *
       * var names = {
       *   'characters': [
       *     { 'name': 'barney' },
       *     { 'name': 'fred' }
       *   ]
       * };
       *
       * var ages = {
       *   'characters': [
       *     { 'age': 36 },
       *     { 'age': 40 }
       *   ]
       * };
       *
       * _.merge(names, ages);
       * // => { 'characters': [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred', 'age': 40 }] }
       *
       * var food = {
       *   'fruits': ['apple'],
       *   'vegetables': ['beet']
       * };
       *
       * var otherFood = {
       *   'fruits': ['banana'],
       *   'vegetables': ['carrot']
       * };
       *
       * _.merge(food, otherFood, function(a, b) {
       *   return _.isArray(a) ? a.concat(b) : undefined;
       * });
       * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot] }
       */
      function merge(object) {
        var args = arguments,
            length = 2;

        if (!isObject(object)) {
          return object;
        }
        // allows working with `_.reduce` and `_.reduceRight` without using
        // their `index` and `collection` arguments
        if (typeof args[2] != 'number') {
          length = args.length;
        }
        if (length > 3 && typeof args[length - 2] == 'function') {
          var callback = baseCreateCallback(args[--length - 1], args[length--], 2);
        } else if (length > 2 && typeof args[length - 1] == 'function') {
          callback = args[--length];
        }
        var sources = slice(arguments, 1, length),
            index = -1,
            stackA = getArray(),
            stackB = getArray();

        while (++index < length) {
          baseMerge(object, sources[index], callback, stackA, stackB);
        }
        releaseArray(stackA);
        releaseArray(stackB);
        return object;
      }

      /**
       * Creates a shallow clone of `object` excluding the specified properties.
       * Property names may be specified as individual arguments or as arrays of
       * property names. If a callback is provided it will be executed for each
       * property of `object` omitting the properties the callback returns truey
       * for. The callback is bound to `thisArg` and invoked with three arguments;
       * (value, key, object).
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {Object} object The source object.
       * @param {Function|...string|string[]} [callback] The properties to omit or the
       *  function called per iteration.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Object} Returns an object without the omitted properties.
       * @example
       *
       * _.omit({ 'name': 'fred', 'age': 40 }, 'age');
       * // => { 'name': 'fred' }
       *
       * _.omit({ 'name': 'fred', 'age': 40 }, function(value) {
       *   return typeof value == 'number';
       * });
       * // => { 'name': 'fred' }
       */
      function omit(object, callback, thisArg) {
        var result = {};
        if (typeof callback != 'function') {
          var props = [];
          forIn(object, function(value, key) {
            props.push(key);
          });
          props = baseDifference(props, baseFlatten(arguments, true, false, 1));

          var index = -1,
              length = props.length;

          while (++index < length) {
            var key = props[index];
            result[key] = object[key];
          }
        } else {
          callback = lodash.createCallback(callback, thisArg, 3);
          forIn(object, function(value, key, object) {
            if (!callback(value, key, object)) {
              result[key] = value;
            }
          });
        }
        return result;
      }

      /**
       * Creates a two dimensional array of an object's key-value pairs,
       * i.e. `[[key1, value1], [key2, value2]]`.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {Object} object The object to inspect.
       * @returns {Array} Returns new array of key-value pairs.
       * @example
       *
       * _.pairs({ 'barney': 36, 'fred': 40 });
       * // => [['barney', 36], ['fred', 40]] (property order is not guaranteed across environments)
       */
      function pairs(object) {
        var index = -1,
            props = keys(object),
            length = props.length,
            result = Array(length);

        while (++index < length) {
          var key = props[index];
          result[index] = [key, object[key]];
        }
        return result;
      }

      /**
       * Creates a shallow clone of `object` composed of the specified properties.
       * Property names may be specified as individual arguments or as arrays of
       * property names. If a callback is provided it will be executed for each
       * property of `object` picking the properties the callback returns truey
       * for. The callback is bound to `thisArg` and invoked with three arguments;
       * (value, key, object).
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {Object} object The source object.
       * @param {Function|...string|string[]} [callback] The function called per
       *  iteration or property names to pick, specified as individual property
       *  names or arrays of property names.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Object} Returns an object composed of the picked properties.
       * @example
       *
       * _.pick({ 'name': 'fred', '_userid': 'fred1' }, 'name');
       * // => { 'name': 'fred' }
       *
       * _.pick({ 'name': 'fred', '_userid': 'fred1' }, function(value, key) {
       *   return key.charAt(0) != '_';
       * });
       * // => { 'name': 'fred' }
       */
      function pick(object, callback, thisArg) {
        var result = {};
        if (typeof callback != 'function') {
          var index = -1,
              props = baseFlatten(arguments, true, false, 1),
              length = isObject(object) ? props.length : 0;

          while (++index < length) {
            var key = props[index];
            if (key in object) {
              result[key] = object[key];
            }
          }
        } else {
          callback = lodash.createCallback(callback, thisArg, 3);
          forIn(object, function(value, key, object) {
            if (callback(value, key, object)) {
              result[key] = value;
            }
          });
        }
        return result;
      }

      /**
       * An alternative to `_.reduce` this method transforms `object` to a new
       * `accumulator` object which is the result of running each of its own
       * enumerable properties through a callback, with each callback execution
       * potentially mutating the `accumulator` object. The callback is bound to
       * `thisArg` and invoked with four arguments; (accumulator, value, key, object).
       * Callbacks may exit iteration early by explicitly returning `false`.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {Array|Object} object The object to iterate over.
       * @param {Function} [callback=identity] The function called per iteration.
       * @param {*} [accumulator] The custom accumulator value.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {*} Returns the accumulated value.
       * @example
       *
       * var squares = _.transform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function(result, num) {
       *   num *= num;
       *   if (num % 2) {
       *     return result.push(num) < 3;
       *   }
       * });
       * // => [1, 9, 25]
       *
       * var mapped = _.transform({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
       *   result[key] = num * 3;
       * });
       * // => { 'a': 3, 'b': 6, 'c': 9 }
       */
      function transform(object, callback, accumulator, thisArg) {
        var isArr = isArray(object);
        if (accumulator == null) {
          if (isArr) {
            accumulator = [];
          } else {
            var ctor = object && object.constructor,
                proto = ctor && ctor.prototype;

            accumulator = baseCreate(proto);
          }
        }
        if (callback) {
          callback = lodash.createCallback(callback, thisArg, 4);
          (isArr ? forEach : forOwn)(object, function(value, index, object) {
            return callback(accumulator, value, index, object);
          });
        }
        return accumulator;
      }

      /**
       * Creates an array composed of the own enumerable property values of `object`.
       *
       * @static
       * @memberOf _
       * @category Objects
       * @param {Object} object The object to inspect.
       * @returns {Array} Returns an array of property values.
       * @example
       *
       * _.values({ 'one': 1, 'two': 2, 'three': 3 });
       * // => [1, 2, 3] (property order is not guaranteed across environments)
       */
      function values(object) {
        var index = -1,
            props = keys(object),
            length = props.length,
            result = Array(length);

        while (++index < length) {
          result[index] = object[props[index]];
        }
        return result;
      }

      /*--------------------------------------------------------------------------*/

      /**
       * Creates an array of elements from the specified indexes, or keys, of the
       * `collection`. Indexes may be specified as individual arguments or as arrays
       * of indexes.
       *
       * @static
       * @memberOf _
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {...(number|number[]|string|string[])} [index] The indexes of `collection`
       *   to retrieve, specified as individual indexes or arrays of indexes.
       * @returns {Array} Returns a new array of elements corresponding to the
       *  provided indexes.
       * @example
       *
       * _.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
       * // => ['a', 'c', 'e']
       *
       * _.at(['fred', 'barney', 'pebbles'], 0, 2);
       * // => ['fred', 'pebbles']
       */
      function at(collection) {
        var args = arguments,
            index = -1,
            props = baseFlatten(args, true, false, 1),
            length = (args[2] && args[2][args[1]] === collection) ? 1 : props.length,
            result = Array(length);

        while(++index < length) {
          result[index] = collection[props[index]];
        }
        return result;
      }

      /**
       * Checks if a given value is present in a collection using strict equality
       * for comparisons, i.e. `===`. If `fromIndex` is negative, it is used as the
       * offset from the end of the collection.
       *
       * @static
       * @memberOf _
       * @alias include
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {*} target The value to check for.
       * @param {number} [fromIndex=0] The index to search from.
       * @returns {boolean} Returns `true` if the `target` element is found, else `false`.
       * @example
       *
       * _.contains([1, 2, 3], 1);
       * // => true
       *
       * _.contains([1, 2, 3], 1, 2);
       * // => false
       *
       * _.contains({ 'name': 'fred', 'age': 40 }, 'fred');
       * // => true
       *
       * _.contains('pebbles', 'eb');
       * // => true
       */
      function contains(collection, target, fromIndex) {
        var index = -1,
            indexOf = getIndexOf(),
            length = collection ? collection.length : 0,
            result = false;

        fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex) || 0;
        if (isArray(collection)) {
          result = indexOf(collection, target, fromIndex) > -1;
        } else if (typeof length == 'number') {
          result = (isString(collection) ? collection.indexOf(target, fromIndex) : indexOf(collection, target, fromIndex)) > -1;
        } else {
          forOwn(collection, function(value) {
            if (++index >= fromIndex) {
              return !(result = value === target);
            }
          });
        }
        return result;
      }

      /**
       * Creates an object composed of keys generated from the results of running
       * each element of `collection` through the callback. The corresponding value
       * of each key is the number of times the key was returned by the callback.
       * The callback is bound to `thisArg` and invoked with three arguments;
       * (value, index|key, collection).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Object} Returns the composed aggregate object.
       * @example
       *
       * _.countBy([4.3, 6.1, 6.4], function(num) { return Math.floor(num); });
       * // => { '4': 1, '6': 2 }
       *
       * _.countBy([4.3, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
       * // => { '4': 1, '6': 2 }
       *
       * _.countBy(['one', 'two', 'three'], 'length');
       * // => { '3': 2, '5': 1 }
       */
      var countBy = createAggregator(function(result, value, key) {
        (hasOwnProperty.call(result, key) ? result[key]++ : result[key] = 1);
      });

      /**
       * Checks if the given callback returns truey value for **all** elements of
       * a collection. The callback is bound to `thisArg` and invoked with three
       * arguments; (value, index|key, collection).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @alias all
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {boolean} Returns `true` if all elements passed the callback check,
       *  else `false`.
       * @example
       *
       * _.every([true, 1, null, 'yes']);
       * // => false
       *
       * var characters = [
       *   { 'name': 'barney', 'age': 36 },
       *   { 'name': 'fred',   'age': 40 }
       * ];
       *
       * // using "_.pluck" callback shorthand
       * _.every(characters, 'age');
       * // => true
       *
       * // using "_.where" callback shorthand
       * _.every(characters, { 'age': 36 });
       * // => false
       */
      function every(collection, callback, thisArg) {
        var result = true;
        callback = lodash.createCallback(callback, thisArg, 3);

        var index = -1,
            length = collection ? collection.length : 0;

        if (typeof length == 'number') {
          while (++index < length) {
            if (!(result = !!callback(collection[index], index, collection))) {
              break;
            }
          }
        } else {
          forOwn(collection, function(value, index, collection) {
            return (result = !!callback(value, index, collection));
          });
        }
        return result;
      }

      /**
       * Iterates over elements of a collection, returning an array of all elements
       * the callback returns truey for. The callback is bound to `thisArg` and
       * invoked with three arguments; (value, index|key, collection).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @alias select
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Array} Returns a new array of elements that passed the callback check.
       * @example
       *
       * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
       * // => [2, 4, 6]
       *
       * var characters = [
       *   { 'name': 'barney', 'age': 36, 'blocked': false },
       *   { 'name': 'fred',   'age': 40, 'blocked': true }
       * ];
       *
       * // using "_.pluck" callback shorthand
       * _.filter(characters, 'blocked');
       * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
       *
       * // using "_.where" callback shorthand
       * _.filter(characters, { 'age': 36 });
       * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
       */
      function filter(collection, callback, thisArg) {
        var result = [];
        callback = lodash.createCallback(callback, thisArg, 3);

        var index = -1,
            length = collection ? collection.length : 0;

        if (typeof length == 'number') {
          while (++index < length) {
            var value = collection[index];
            if (callback(value, index, collection)) {
              result.push(value);
            }
          }
        } else {
          forOwn(collection, function(value, index, collection) {
            if (callback(value, index, collection)) {
              result.push(value);
            }
          });
        }
        return result;
      }

      /**
       * Iterates over elements of a collection, returning the first element that
       * the callback returns truey for. The callback is bound to `thisArg` and
       * invoked with three arguments; (value, index|key, collection).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @alias detect, findWhere
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {*} Returns the found element, else `undefined`.
       * @example
       *
       * var characters = [
       *   { 'name': 'barney',  'age': 36, 'blocked': false },
       *   { 'name': 'fred',    'age': 40, 'blocked': true },
       *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
       * ];
       *
       * _.find(characters, function(chr) {
       *   return chr.age < 40;
       * });
       * // => { 'name': 'barney', 'age': 36, 'blocked': false }
       *
       * // using "_.where" callback shorthand
       * _.find(characters, { 'age': 1 });
       * // =>  { 'name': 'pebbles', 'age': 1, 'blocked': false }
       *
       * // using "_.pluck" callback shorthand
       * _.find(characters, 'blocked');
       * // => { 'name': 'fred', 'age': 40, 'blocked': true }
       */
      function find(collection, callback, thisArg) {
        callback = lodash.createCallback(callback, thisArg, 3);

        var index = -1,
            length = collection ? collection.length : 0;

        if (typeof length == 'number') {
          while (++index < length) {
            var value = collection[index];
            if (callback(value, index, collection)) {
              return value;
            }
          }
        } else {
          var result;
          forOwn(collection, function(value, index, collection) {
            if (callback(value, index, collection)) {
              result = value;
              return false;
            }
          });
          return result;
        }
      }

      /**
       * This method is like `_.find` except that it iterates over elements
       * of a `collection` from right to left.
       *
       * @static
       * @memberOf _
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {*} Returns the found element, else `undefined`.
       * @example
       *
       * _.findLast([1, 2, 3, 4], function(num) {
       *   return num % 2 == 1;
       * });
       * // => 3
       */
      function findLast(collection, callback, thisArg) {
        var result;
        callback = lodash.createCallback(callback, thisArg, 3);
        forEachRight(collection, function(value, index, collection) {
          if (callback(value, index, collection)) {
            result = value;
            return false;
          }
        });
        return result;
      }

      /**
       * Iterates over elements of a collection, executing the callback for each
       * element. The callback is bound to `thisArg` and invoked with three arguments;
       * (value, index|key, collection). Callbacks may exit iteration early by
       * explicitly returning `false`.
       *
       * Note: As with other "Collections" methods, objects with a `length` property
       * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
       * may be used for object iteration.
       *
       * @static
       * @memberOf _
       * @alias each
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {Function} [callback=identity] The function called per iteration.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Array|Object|string} Returns `collection`.
       * @example
       *
       * _([1, 2, 3]).forEach(function(num) { console.log(num); }).join(',');
       * // => logs each number and returns '1,2,3'
       *
       * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { console.log(num); });
       * // => logs each number and returns the object (property order is not guaranteed across environments)
       */
      function forEach(collection, callback, thisArg) {
        var index = -1,
            length = collection ? collection.length : 0;

        callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
        if (typeof length == 'number') {
          while (++index < length) {
            if (callback(collection[index], index, collection) === false) {
              break;
            }
          }
        } else {
          forOwn(collection, callback);
        }
        return collection;
      }

      /**
       * This method is like `_.forEach` except that it iterates over elements
       * of a `collection` from right to left.
       *
       * @static
       * @memberOf _
       * @alias eachRight
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {Function} [callback=identity] The function called per iteration.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Array|Object|string} Returns `collection`.
       * @example
       *
       * _([1, 2, 3]).forEachRight(function(num) { console.log(num); }).join(',');
       * // => logs each number from right to left and returns '3,2,1'
       */
      function forEachRight(collection, callback, thisArg) {
        var length = collection ? collection.length : 0;
        callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
        if (typeof length == 'number') {
          while (length--) {
            if (callback(collection[length], length, collection) === false) {
              break;
            }
          }
        } else {
          var props = keys(collection);
          length = props.length;
          forOwn(collection, function(value, key, collection) {
            key = props ? props[--length] : --length;
            return callback(collection[key], key, collection);
          });
        }
        return collection;
      }

      /**
       * Creates an object composed of keys generated from the results of running
       * each element of a collection through the callback. The corresponding value
       * of each key is an array of the elements responsible for generating the key.
       * The callback is bound to `thisArg` and invoked with three arguments;
       * (value, index|key, collection).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`
       *
       * @static
       * @memberOf _
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Object} Returns the composed aggregate object.
       * @example
       *
       * _.groupBy([4.2, 6.1, 6.4], function(num) { return Math.floor(num); });
       * // => { '4': [4.2], '6': [6.1, 6.4] }
       *
       * _.groupBy([4.2, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
       * // => { '4': [4.2], '6': [6.1, 6.4] }
       *
       * // using "_.pluck" callback shorthand
       * _.groupBy(['one', 'two', 'three'], 'length');
       * // => { '3': ['one', 'two'], '5': ['three'] }
       */
      var groupBy = createAggregator(function(result, value, key) {
        (hasOwnProperty.call(result, key) ? result[key] : result[key] = []).push(value);
      });

      /**
       * Creates an object composed of keys generated from the results of running
       * each element of the collection through the given callback. The corresponding
       * value of each key is the last element responsible for generating the key.
       * The callback is bound to `thisArg` and invoked with three arguments;
       * (value, index|key, collection).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Object} Returns the composed aggregate object.
       * @example
       *
       * var keys = [
       *   { 'dir': 'left', 'code': 97 },
       *   { 'dir': 'right', 'code': 100 }
       * ];
       *
       * _.indexBy(keys, 'dir');
       * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
       *
       * _.indexBy(keys, function(key) { return String.fromCharCode(key.code); });
       * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
       *
       * _.indexBy(characters, function(key) { this.fromCharCode(key.code); }, String);
       * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
       */
      var indexBy = createAggregator(function(result, value, key) {
        result[key] = value;
      });

      /**
       * Invokes the method named by `methodName` on each element in the `collection`
       * returning an array of the results of each invoked method. Additional arguments
       * will be provided to each invoked method. If `methodName` is a function it
       * will be invoked for, and `this` bound to, each element in the `collection`.
       *
       * @static
       * @memberOf _
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {Function|string} methodName The name of the method to invoke or
       *  the function invoked per iteration.
       * @param {...*} [arg] Arguments to invoke the method with.
       * @returns {Array} Returns a new array of the results of each invoked method.
       * @example
       *
       * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
       * // => [[1, 5, 7], [1, 2, 3]]
       *
       * _.invoke([123, 456], String.prototype.split, '');
       * // => [['1', '2', '3'], ['4', '5', '6']]
       */
      function invoke(collection, methodName) {
        var args = slice(arguments, 2),
            index = -1,
            isFunc = typeof methodName == 'function',
            length = collection ? collection.length : 0,
            result = Array(typeof length == 'number' ? length : 0);

        forEach(collection, function(value) {
          result[++index] = (isFunc ? methodName : value[methodName]).apply(value, args);
        });
        return result;
      }

      /**
       * Creates an array of values by running each element in the collection
       * through the callback. The callback is bound to `thisArg` and invoked with
       * three arguments; (value, index|key, collection).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @alias collect
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Array} Returns a new array of the results of each `callback` execution.
       * @example
       *
       * _.map([1, 2, 3], function(num) { return num * 3; });
       * // => [3, 6, 9]
       *
       * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
       * // => [3, 6, 9] (property order is not guaranteed across environments)
       *
       * var characters = [
       *   { 'name': 'barney', 'age': 36 },
       *   { 'name': 'fred',   'age': 40 }
       * ];
       *
       * // using "_.pluck" callback shorthand
       * _.map(characters, 'name');
       * // => ['barney', 'fred']
       */
      function map(collection, callback, thisArg) {
        var index = -1,
            length = collection ? collection.length : 0;

        callback = lodash.createCallback(callback, thisArg, 3);
        if (typeof length == 'number') {
          var result = Array(length);
          while (++index < length) {
            result[index] = callback(collection[index], index, collection);
          }
        } else {
          result = [];
          forOwn(collection, function(value, key, collection) {
            result[++index] = callback(value, key, collection);
          });
        }
        return result;
      }

      /**
       * Retrieves the maximum value of a collection. If the collection is empty or
       * falsey `-Infinity` is returned. If a callback is provided it will be executed
       * for each value in the collection to generate the criterion by which the value
       * is ranked. The callback is bound to `thisArg` and invoked with three
       * arguments; (value, index, collection).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {*} Returns the maximum value.
       * @example
       *
       * _.max([4, 2, 8, 6]);
       * // => 8
       *
       * var characters = [
       *   { 'name': 'barney', 'age': 36 },
       *   { 'name': 'fred',   'age': 40 }
       * ];
       *
       * _.max(characters, function(chr) { return chr.age; });
       * // => { 'name': 'fred', 'age': 40 };
       *
       * // using "_.pluck" callback shorthand
       * _.max(characters, 'age');
       * // => { 'name': 'fred', 'age': 40 };
       */
      function max(collection, callback, thisArg) {
        var computed = -Infinity,
            result = computed;

        // allows working with functions like `_.map` without using
        // their `index` argument as a callback
        if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
          callback = null;
        }
        if (callback == null && isArray(collection)) {
          var index = -1,
              length = collection.length;

          while (++index < length) {
            var value = collection[index];
            if (value > result) {
              result = value;
            }
          }
        } else {
          callback = (callback == null && isString(collection))
            ? charAtCallback
            : lodash.createCallback(callback, thisArg, 3);

          forEach(collection, function(value, index, collection) {
            var current = callback(value, index, collection);
            if (current > computed) {
              computed = current;
              result = value;
            }
          });
        }
        return result;
      }

      /**
       * Retrieves the minimum value of a collection. If the collection is empty or
       * falsey `Infinity` is returned. If a callback is provided it will be executed
       * for each value in the collection to generate the criterion by which the value
       * is ranked. The callback is bound to `thisArg` and invoked with three
       * arguments; (value, index, collection).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {*} Returns the minimum value.
       * @example
       *
       * _.min([4, 2, 8, 6]);
       * // => 2
       *
       * var characters = [
       *   { 'name': 'barney', 'age': 36 },
       *   { 'name': 'fred',   'age': 40 }
       * ];
       *
       * _.min(characters, function(chr) { return chr.age; });
       * // => { 'name': 'barney', 'age': 36 };
       *
       * // using "_.pluck" callback shorthand
       * _.min(characters, 'age');
       * // => { 'name': 'barney', 'age': 36 };
       */
      function min(collection, callback, thisArg) {
        var computed = Infinity,
            result = computed;

        // allows working with functions like `_.map` without using
        // their `index` argument as a callback
        if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
          callback = null;
        }
        if (callback == null && isArray(collection)) {
          var index = -1,
              length = collection.length;

          while (++index < length) {
            var value = collection[index];
            if (value < result) {
              result = value;
            }
          }
        } else {
          callback = (callback == null && isString(collection))
            ? charAtCallback
            : lodash.createCallback(callback, thisArg, 3);

          forEach(collection, function(value, index, collection) {
            var current = callback(value, index, collection);
            if (current < computed) {
              computed = current;
              result = value;
            }
          });
        }
        return result;
      }

      /**
       * Retrieves the value of a specified property from all elements in the collection.
       *
       * @static
       * @memberOf _
       * @type Function
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {string} property The name of the property to pluck.
       * @returns {Array} Returns a new array of property values.
       * @example
       *
       * var characters = [
       *   { 'name': 'barney', 'age': 36 },
       *   { 'name': 'fred',   'age': 40 }
       * ];
       *
       * _.pluck(characters, 'name');
       * // => ['barney', 'fred']
       */
      var pluck = map;

      /**
       * Reduces a collection to a value which is the accumulated result of running
       * each element in the collection through the callback, where each successive
       * callback execution consumes the return value of the previous execution. If
       * `accumulator` is not provided the first element of the collection will be
       * used as the initial `accumulator` value. The callback is bound to `thisArg`
       * and invoked with four arguments; (accumulator, value, index|key, collection).
       *
       * @static
       * @memberOf _
       * @alias foldl, inject
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {Function} [callback=identity] The function called per iteration.
       * @param {*} [accumulator] Initial value of the accumulator.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {*} Returns the accumulated value.
       * @example
       *
       * var sum = _.reduce([1, 2, 3], function(sum, num) {
       *   return sum + num;
       * });
       * // => 6
       *
       * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
       *   result[key] = num * 3;
       *   return result;
       * }, {});
       * // => { 'a': 3, 'b': 6, 'c': 9 }
       */
      function reduce(collection, callback, accumulator, thisArg) {
        if (!collection) return accumulator;
        var noaccum = arguments.length < 3;
        callback = lodash.createCallback(callback, thisArg, 4);

        var index = -1,
            length = collection.length;

        if (typeof length == 'number') {
          if (noaccum) {
            accumulator = collection[++index];
          }
          while (++index < length) {
            accumulator = callback(accumulator, collection[index], index, collection);
          }
        } else {
          forOwn(collection, function(value, index, collection) {
            accumulator = noaccum
              ? (noaccum = false, value)
              : callback(accumulator, value, index, collection);
          });
        }
        return accumulator;
      }

      /**
       * This method is like `_.reduce` except that it iterates over elements
       * of a `collection` from right to left.
       *
       * @static
       * @memberOf _
       * @alias foldr
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {Function} [callback=identity] The function called per iteration.
       * @param {*} [accumulator] Initial value of the accumulator.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {*} Returns the accumulated value.
       * @example
       *
       * var list = [[0, 1], [2, 3], [4, 5]];
       * var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
       * // => [4, 5, 2, 3, 0, 1]
       */
      function reduceRight(collection, callback, accumulator, thisArg) {
        var noaccum = arguments.length < 3;
        callback = lodash.createCallback(callback, thisArg, 4);
        forEachRight(collection, function(value, index, collection) {
          accumulator = noaccum
            ? (noaccum = false, value)
            : callback(accumulator, value, index, collection);
        });
        return accumulator;
      }

      /**
       * The opposite of `_.filter` this method returns the elements of a
       * collection that the callback does **not** return truey for.
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Array} Returns a new array of elements that failed the callback check.
       * @example
       *
       * var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
       * // => [1, 3, 5]
       *
       * var characters = [
       *   { 'name': 'barney', 'age': 36, 'blocked': false },
       *   { 'name': 'fred',   'age': 40, 'blocked': true }
       * ];
       *
       * // using "_.pluck" callback shorthand
       * _.reject(characters, 'blocked');
       * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
       *
       * // using "_.where" callback shorthand
       * _.reject(characters, { 'age': 36 });
       * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
       */
      function reject(collection, callback, thisArg) {
        callback = lodash.createCallback(callback, thisArg, 3);
        return filter(collection, function(value, index, collection) {
          return !callback(value, index, collection);
        });
      }

      /**
       * Retrieves a random element or `n` random elements from a collection.
       *
       * @static
       * @memberOf _
       * @category Collections
       * @param {Array|Object|string} collection The collection to sample.
       * @param {number} [n] The number of elements to sample.
       * @param- {Object} [guard] Allows working with functions like `_.map`
       *  without using their `index` arguments as `n`.
       * @returns {Array} Returns the random sample(s) of `collection`.
       * @example
       *
       * _.sample([1, 2, 3, 4]);
       * // => 2
       *
       * _.sample([1, 2, 3, 4], 2);
       * // => [3, 1]
       */
      function sample(collection, n, guard) {
        if (collection && typeof collection.length != 'number') {
          collection = values(collection);
        }
        if (n == null || guard) {
          return collection ? collection[baseRandom(0, collection.length - 1)] : undefined$1;
        }
        var result = shuffle(collection);
        result.length = nativeMin(nativeMax(0, n), result.length);
        return result;
      }

      /**
       * Creates an array of shuffled values, using a version of the Fisher-Yates
       * shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
       *
       * @static
       * @memberOf _
       * @category Collections
       * @param {Array|Object|string} collection The collection to shuffle.
       * @returns {Array} Returns a new shuffled collection.
       * @example
       *
       * _.shuffle([1, 2, 3, 4, 5, 6]);
       * // => [4, 1, 6, 3, 5, 2]
       */
      function shuffle(collection) {
        var index = -1,
            length = collection ? collection.length : 0,
            result = Array(typeof length == 'number' ? length : 0);

        forEach(collection, function(value) {
          var rand = baseRandom(0, ++index);
          result[index] = result[rand];
          result[rand] = value;
        });
        return result;
      }

      /**
       * Gets the size of the `collection` by returning `collection.length` for arrays
       * and array-like objects or the number of own enumerable properties for objects.
       *
       * @static
       * @memberOf _
       * @category Collections
       * @param {Array|Object|string} collection The collection to inspect.
       * @returns {number} Returns `collection.length` or number of own enumerable properties.
       * @example
       *
       * _.size([1, 2]);
       * // => 2
       *
       * _.size({ 'one': 1, 'two': 2, 'three': 3 });
       * // => 3
       *
       * _.size('pebbles');
       * // => 7
       */
      function size(collection) {
        var length = collection ? collection.length : 0;
        return typeof length == 'number' ? length : keys(collection).length;
      }

      /**
       * Checks if the callback returns a truey value for **any** element of a
       * collection. The function returns as soon as it finds a passing value and
       * does not iterate over the entire collection. The callback is bound to
       * `thisArg` and invoked with three arguments; (value, index|key, collection).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @alias any
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {boolean} Returns `true` if any element passed the callback check,
       *  else `false`.
       * @example
       *
       * _.some([null, 0, 'yes', false], Boolean);
       * // => true
       *
       * var characters = [
       *   { 'name': 'barney', 'age': 36, 'blocked': false },
       *   { 'name': 'fred',   'age': 40, 'blocked': true }
       * ];
       *
       * // using "_.pluck" callback shorthand
       * _.some(characters, 'blocked');
       * // => true
       *
       * // using "_.where" callback shorthand
       * _.some(characters, { 'age': 1 });
       * // => false
       */
      function some(collection, callback, thisArg) {
        var result;
        callback = lodash.createCallback(callback, thisArg, 3);

        var index = -1,
            length = collection ? collection.length : 0;

        if (typeof length == 'number') {
          while (++index < length) {
            if ((result = callback(collection[index], index, collection))) {
              break;
            }
          }
        } else {
          forOwn(collection, function(value, index, collection) {
            return !(result = callback(value, index, collection));
          });
        }
        return !!result;
      }

      /**
       * Creates an array of elements, sorted in ascending order by the results of
       * running each element in a collection through the callback. This method
       * performs a stable sort, that is, it will preserve the original sort order
       * of equal elements. The callback is bound to `thisArg` and invoked with
       * three arguments; (value, index|key, collection).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an array of property names is provided for `callback` the collection
       * will be sorted by each property value.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {Array|Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Array} Returns a new array of sorted elements.
       * @example
       *
       * _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
       * // => [3, 1, 2]
       *
       * _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
       * // => [3, 1, 2]
       *
       * var characters = [
       *   { 'name': 'barney',  'age': 36 },
       *   { 'name': 'fred',    'age': 40 },
       *   { 'name': 'barney',  'age': 26 },
       *   { 'name': 'fred',    'age': 30 }
       * ];
       *
       * // using "_.pluck" callback shorthand
       * _.map(_.sortBy(characters, 'age'), _.values);
       * // => [['barney', 26], ['fred', 30], ['barney', 36], ['fred', 40]]
       *
       * // sorting by multiple properties
       * _.map(_.sortBy(characters, ['name', 'age']), _.values);
       * // = > [['barney', 26], ['barney', 36], ['fred', 30], ['fred', 40]]
       */
      function sortBy(collection, callback, thisArg) {
        var index = -1,
            isArr = isArray(callback),
            length = collection ? collection.length : 0,
            result = Array(typeof length == 'number' ? length : 0);

        if (!isArr) {
          callback = lodash.createCallback(callback, thisArg, 3);
        }
        forEach(collection, function(value, key, collection) {
          var object = result[++index] = getObject();
          if (isArr) {
            object.criteria = map(callback, function(key) { return value[key]; });
          } else {
            (object.criteria = getArray())[0] = callback(value, key, collection);
          }
          object.index = index;
          object.value = value;
        });

        length = result.length;
        result.sort(compareAscending);
        while (length--) {
          var object = result[length];
          result[length] = object.value;
          if (!isArr) {
            releaseArray(object.criteria);
          }
          releaseObject(object);
        }
        return result;
      }

      /**
       * Converts the `collection` to an array.
       *
       * @static
       * @memberOf _
       * @category Collections
       * @param {Array|Object|string} collection The collection to convert.
       * @returns {Array} Returns the new converted array.
       * @example
       *
       * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
       * // => [2, 3, 4]
       */
      function toArray(collection) {
        if (collection && typeof collection.length == 'number') {
          return slice(collection);
        }
        return values(collection);
      }

      /**
       * Performs a deep comparison of each element in a `collection` to the given
       * `properties` object, returning an array of all elements that have equivalent
       * property values.
       *
       * @static
       * @memberOf _
       * @type Function
       * @category Collections
       * @param {Array|Object|string} collection The collection to iterate over.
       * @param {Object} props The object of property values to filter by.
       * @returns {Array} Returns a new array of elements that have the given properties.
       * @example
       *
       * var characters = [
       *   { 'name': 'barney', 'age': 36, 'pets': ['hoppy'] },
       *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
       * ];
       *
       * _.where(characters, { 'age': 36 });
       * // => [{ 'name': 'barney', 'age': 36, 'pets': ['hoppy'] }]
       *
       * _.where(characters, { 'pets': ['dino'] });
       * // => [{ 'name': 'fred', 'age': 40, 'pets': ['baby puss', 'dino'] }]
       */
      var where = filter;

      /*--------------------------------------------------------------------------*/

      /**
       * Creates an array with all falsey values removed. The values `false`, `null`,
       * `0`, `""`, `undefined`, and `NaN` are all falsey.
       *
       * @static
       * @memberOf _
       * @category Arrays
       * @param {Array} array The array to compact.
       * @returns {Array} Returns a new array of filtered values.
       * @example
       *
       * _.compact([0, 1, false, 2, '', 3]);
       * // => [1, 2, 3]
       */
      function compact(array) {
        var index = -1,
            length = array ? array.length : 0,
            result = [];

        while (++index < length) {
          var value = array[index];
          if (value) {
            result.push(value);
          }
        }
        return result;
      }

      /**
       * Creates an array excluding all values of the provided arrays using strict
       * equality for comparisons, i.e. `===`.
       *
       * @static
       * @memberOf _
       * @category Arrays
       * @param {Array} array The array to process.
       * @param {...Array} [values] The arrays of values to exclude.
       * @returns {Array} Returns a new array of filtered values.
       * @example
       *
       * _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
       * // => [1, 3, 4]
       */
      function difference(array) {
        return baseDifference(array, baseFlatten(arguments, true, true, 1));
      }

      /**
       * This method is like `_.find` except that it returns the index of the first
       * element that passes the callback check, instead of the element itself.
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @category Arrays
       * @param {Array} array The array to search.
       * @param {Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {number} Returns the index of the found element, else `-1`.
       * @example
       *
       * var characters = [
       *   { 'name': 'barney',  'age': 36, 'blocked': false },
       *   { 'name': 'fred',    'age': 40, 'blocked': true },
       *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
       * ];
       *
       * _.findIndex(characters, function(chr) {
       *   return chr.age < 20;
       * });
       * // => 2
       *
       * // using "_.where" callback shorthand
       * _.findIndex(characters, { 'age': 36 });
       * // => 0
       *
       * // using "_.pluck" callback shorthand
       * _.findIndex(characters, 'blocked');
       * // => 1
       */
      function findIndex(array, callback, thisArg) {
        var index = -1,
            length = array ? array.length : 0;

        callback = lodash.createCallback(callback, thisArg, 3);
        while (++index < length) {
          if (callback(array[index], index, array)) {
            return index;
          }
        }
        return -1;
      }

      /**
       * This method is like `_.findIndex` except that it iterates over elements
       * of a `collection` from right to left.
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @category Arrays
       * @param {Array} array The array to search.
       * @param {Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {number} Returns the index of the found element, else `-1`.
       * @example
       *
       * var characters = [
       *   { 'name': 'barney',  'age': 36, 'blocked': true },
       *   { 'name': 'fred',    'age': 40, 'blocked': false },
       *   { 'name': 'pebbles', 'age': 1,  'blocked': true }
       * ];
       *
       * _.findLastIndex(characters, function(chr) {
       *   return chr.age > 30;
       * });
       * // => 1
       *
       * // using "_.where" callback shorthand
       * _.findLastIndex(characters, { 'age': 36 });
       * // => 0
       *
       * // using "_.pluck" callback shorthand
       * _.findLastIndex(characters, 'blocked');
       * // => 2
       */
      function findLastIndex(array, callback, thisArg) {
        var length = array ? array.length : 0;
        callback = lodash.createCallback(callback, thisArg, 3);
        while (length--) {
          if (callback(array[length], length, array)) {
            return length;
          }
        }
        return -1;
      }

      /**
       * Gets the first element or first `n` elements of an array. If a callback
       * is provided elements at the beginning of the array are returned as long
       * as the callback returns truey. The callback is bound to `thisArg` and
       * invoked with three arguments; (value, index, array).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @alias head, take
       * @category Arrays
       * @param {Array} array The array to query.
       * @param {Function|Object|number|string} [callback] The function called
       *  per element or the number of elements to return. If a property name or
       *  object is provided it will be used to create a "_.pluck" or "_.where"
       *  style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {*} Returns the first element(s) of `array`.
       * @example
       *
       * _.first([1, 2, 3]);
       * // => 1
       *
       * _.first([1, 2, 3], 2);
       * // => [1, 2]
       *
       * _.first([1, 2, 3], function(num) {
       *   return num < 3;
       * });
       * // => [1, 2]
       *
       * var characters = [
       *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
       *   { 'name': 'fred',    'blocked': false, 'employer': 'slate' },
       *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
       * ];
       *
       * // using "_.pluck" callback shorthand
       * _.first(characters, 'blocked');
       * // => [{ 'name': 'barney', 'blocked': true, 'employer': 'slate' }]
       *
       * // using "_.where" callback shorthand
       * _.pluck(_.first(characters, { 'employer': 'slate' }), 'name');
       * // => ['barney', 'fred']
       */
      function first(array, callback, thisArg) {
        var n = 0,
            length = array ? array.length : 0;

        if (typeof callback != 'number' && callback != null) {
          var index = -1;
          callback = lodash.createCallback(callback, thisArg, 3);
          while (++index < length && callback(array[index], index, array)) {
            n++;
          }
        } else {
          n = callback;
          if (n == null || thisArg) {
            return array ? array[0] : undefined$1;
          }
        }
        return slice(array, 0, nativeMin(nativeMax(0, n), length));
      }

      /**
       * Flattens a nested array (the nesting can be to any depth). If `isShallow`
       * is truey, the array will only be flattened a single level. If a callback
       * is provided each element of the array is passed through the callback before
       * flattening. The callback is bound to `thisArg` and invoked with three
       * arguments; (value, index, array).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @category Arrays
       * @param {Array} array The array to flatten.
       * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
       * @param {Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Array} Returns a new flattened array.
       * @example
       *
       * _.flatten([1, [2], [3, [[4]]]]);
       * // => [1, 2, 3, 4];
       *
       * _.flatten([1, [2], [3, [[4]]]], true);
       * // => [1, 2, 3, [[4]]];
       *
       * var characters = [
       *   { 'name': 'barney', 'age': 30, 'pets': ['hoppy'] },
       *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
       * ];
       *
       * // using "_.pluck" callback shorthand
       * _.flatten(characters, 'pets');
       * // => ['hoppy', 'baby puss', 'dino']
       */
      function flatten(array, isShallow, callback, thisArg) {
        // juggle arguments
        if (typeof isShallow != 'boolean' && isShallow != null) {
          thisArg = callback;
          callback = (typeof isShallow != 'function' && thisArg && thisArg[isShallow] === array) ? null : isShallow;
          isShallow = false;
        }
        if (callback != null) {
          array = map(array, callback, thisArg);
        }
        return baseFlatten(array, isShallow);
      }

      /**
       * Gets the index at which the first occurrence of `value` is found using
       * strict equality for comparisons, i.e. `===`. If the array is already sorted
       * providing `true` for `fromIndex` will run a faster binary search.
       *
       * @static
       * @memberOf _
       * @category Arrays
       * @param {Array} array The array to search.
       * @param {*} value The value to search for.
       * @param {boolean|number} [fromIndex=0] The index to search from or `true`
       *  to perform a binary search on a sorted array.
       * @returns {number} Returns the index of the matched value or `-1`.
       * @example
       *
       * _.indexOf([1, 2, 3, 1, 2, 3], 2);
       * // => 1
       *
       * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
       * // => 4
       *
       * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
       * // => 2
       */
      function indexOf(array, value, fromIndex) {
        if (typeof fromIndex == 'number') {
          var length = array ? array.length : 0;
          fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0);
        } else if (fromIndex) {
          var index = sortedIndex(array, value);
          return array[index] === value ? index : -1;
        }
        return baseIndexOf(array, value, fromIndex);
      }

      /**
       * Gets all but the last element or last `n` elements of an array. If a
       * callback is provided elements at the end of the array are excluded from
       * the result as long as the callback returns truey. The callback is bound
       * to `thisArg` and invoked with three arguments; (value, index, array).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @category Arrays
       * @param {Array} array The array to query.
       * @param {Function|Object|number|string} [callback=1] The function called
       *  per element or the number of elements to exclude. If a property name or
       *  object is provided it will be used to create a "_.pluck" or "_.where"
       *  style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Array} Returns a slice of `array`.
       * @example
       *
       * _.initial([1, 2, 3]);
       * // => [1, 2]
       *
       * _.initial([1, 2, 3], 2);
       * // => [1]
       *
       * _.initial([1, 2, 3], function(num) {
       *   return num > 1;
       * });
       * // => [1]
       *
       * var characters = [
       *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
       *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
       *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
       * ];
       *
       * // using "_.pluck" callback shorthand
       * _.initial(characters, 'blocked');
       * // => [{ 'name': 'barney',  'blocked': false, 'employer': 'slate' }]
       *
       * // using "_.where" callback shorthand
       * _.pluck(_.initial(characters, { 'employer': 'na' }), 'name');
       * // => ['barney', 'fred']
       */
      function initial(array, callback, thisArg) {
        var n = 0,
            length = array ? array.length : 0;

        if (typeof callback != 'number' && callback != null) {
          var index = length;
          callback = lodash.createCallback(callback, thisArg, 3);
          while (index-- && callback(array[index], index, array)) {
            n++;
          }
        } else {
          n = (callback == null || thisArg) ? 1 : callback || n;
        }
        return slice(array, 0, nativeMin(nativeMax(0, length - n), length));
      }

      /**
       * Creates an array of unique values present in all provided arrays using
       * strict equality for comparisons, i.e. `===`.
       *
       * @static
       * @memberOf _
       * @category Arrays
       * @param {...Array} [array] The arrays to inspect.
       * @returns {Array} Returns an array of shared values.
       * @example
       *
       * _.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]);
       * // => [1, 2]
       */
      function intersection() {
        var args = [],
            argsIndex = -1,
            argsLength = arguments.length,
            caches = getArray(),
            indexOf = getIndexOf(),
            trustIndexOf = indexOf === baseIndexOf,
            seen = getArray();

        while (++argsIndex < argsLength) {
          var value = arguments[argsIndex];
          if (isArray(value) || isArguments(value)) {
            args.push(value);
            caches.push(trustIndexOf && value.length >= largeArraySize &&
              createCache(argsIndex ? args[argsIndex] : seen));
          }
        }
        var array = args[0],
            index = -1,
            length = array ? array.length : 0,
            result = [];

        outer:
        while (++index < length) {
          var cache = caches[0];
          value = array[index];

          if ((cache ? cacheIndexOf(cache, value) : indexOf(seen, value)) < 0) {
            argsIndex = argsLength;
            (cache || seen).push(value);
            while (--argsIndex) {
              cache = caches[argsIndex];
              if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) {
                continue outer;
              }
            }
            result.push(value);
          }
        }
        while (argsLength--) {
          cache = caches[argsLength];
          if (cache) {
            releaseObject(cache);
          }
        }
        releaseArray(caches);
        releaseArray(seen);
        return result;
      }

      /**
       * Gets the last element or last `n` elements of an array. If a callback is
       * provided elements at the end of the array are returned as long as the
       * callback returns truey. The callback is bound to `thisArg` and invoked
       * with three arguments; (value, index, array).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @category Arrays
       * @param {Array} array The array to query.
       * @param {Function|Object|number|string} [callback] The function called
       *  per element or the number of elements to return. If a property name or
       *  object is provided it will be used to create a "_.pluck" or "_.where"
       *  style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {*} Returns the last element(s) of `array`.
       * @example
       *
       * _.last([1, 2, 3]);
       * // => 3
       *
       * _.last([1, 2, 3], 2);
       * // => [2, 3]
       *
       * _.last([1, 2, 3], function(num) {
       *   return num > 1;
       * });
       * // => [2, 3]
       *
       * var characters = [
       *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
       *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
       *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
       * ];
       *
       * // using "_.pluck" callback shorthand
       * _.pluck(_.last(characters, 'blocked'), 'name');
       * // => ['fred', 'pebbles']
       *
       * // using "_.where" callback shorthand
       * _.last(characters, { 'employer': 'na' });
       * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
       */
      function last(array, callback, thisArg) {
        var n = 0,
            length = array ? array.length : 0;

        if (typeof callback != 'number' && callback != null) {
          var index = length;
          callback = lodash.createCallback(callback, thisArg, 3);
          while (index-- && callback(array[index], index, array)) {
            n++;
          }
        } else {
          n = callback;
          if (n == null || thisArg) {
            return array ? array[length - 1] : undefined$1;
          }
        }
        return slice(array, nativeMax(0, length - n));
      }

      /**
       * Gets the index at which the last occurrence of `value` is found using strict
       * equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used
       * as the offset from the end of the collection.
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @category Arrays
       * @param {Array} array The array to search.
       * @param {*} value The value to search for.
       * @param {number} [fromIndex=array.length-1] The index to search from.
       * @returns {number} Returns the index of the matched value or `-1`.
       * @example
       *
       * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
       * // => 4
       *
       * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
       * // => 1
       */
      function lastIndexOf(array, value, fromIndex) {
        var index = array ? array.length : 0;
        if (typeof fromIndex == 'number') {
          index = (fromIndex < 0 ? nativeMax(0, index + fromIndex) : nativeMin(fromIndex, index - 1)) + 1;
        }
        while (index--) {
          if (array[index] === value) {
            return index;
          }
        }
        return -1;
      }

      /**
       * Removes all provided values from the given array using strict equality for
       * comparisons, i.e. `===`.
       *
       * @static
       * @memberOf _
       * @category Arrays
       * @param {Array} array The array to modify.
       * @param {...*} [value] The values to remove.
       * @returns {Array} Returns `array`.
       * @example
       *
       * var array = [1, 2, 3, 1, 2, 3];
       * _.pull(array, 2, 3);
       * console.log(array);
       * // => [1, 1]
       */
      function pull(array) {
        var args = arguments,
            argsIndex = 0,
            argsLength = args.length,
            length = array ? array.length : 0;

        while (++argsIndex < argsLength) {
          var index = -1,
              value = args[argsIndex];
          while (++index < length) {
            if (array[index] === value) {
              splice.call(array, index--, 1);
              length--;
            }
          }
        }
        return array;
      }

      /**
       * Creates an array of numbers (positive and/or negative) progressing from
       * `start` up to but not including `end`. If `start` is less than `stop` a
       * zero-length range is created unless a negative `step` is specified.
       *
       * @static
       * @memberOf _
       * @category Arrays
       * @param {number} [start=0] The start of the range.
       * @param {number} end The end of the range.
       * @param {number} [step=1] The value to increment or decrement by.
       * @returns {Array} Returns a new range array.
       * @example
       *
       * _.range(4);
       * // => [0, 1, 2, 3]
       *
       * _.range(1, 5);
       * // => [1, 2, 3, 4]
       *
       * _.range(0, 20, 5);
       * // => [0, 5, 10, 15]
       *
       * _.range(0, -4, -1);
       * // => [0, -1, -2, -3]
       *
       * _.range(1, 4, 0);
       * // => [1, 1, 1]
       *
       * _.range(0);
       * // => []
       */
      function range(start, end, step) {
        start = +start || 0;
        step = typeof step == 'number' ? step : (+step || 1);

        if (end == null) {
          end = start;
          start = 0;
        }
        // use `Array(length)` so engines like Chakra and V8 avoid slower modes
        // http://youtu.be/XAqIpGU8ZZk#t=17m25s
        var index = -1,
            length = nativeMax(0, ceil((end - start) / (step || 1))),
            result = Array(length);

        while (++index < length) {
          result[index] = start;
          start += step;
        }
        return result;
      }

      /**
       * Removes all elements from an array that the callback returns truey for
       * and returns an array of removed elements. The callback is bound to `thisArg`
       * and invoked with three arguments; (value, index, array).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @category Arrays
       * @param {Array} array The array to modify.
       * @param {Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Array} Returns a new array of removed elements.
       * @example
       *
       * var array = [1, 2, 3, 4, 5, 6];
       * var evens = _.remove(array, function(num) { return num % 2 == 0; });
       *
       * console.log(array);
       * // => [1, 3, 5]
       *
       * console.log(evens);
       * // => [2, 4, 6]
       */
      function remove(array, callback, thisArg) {
        var index = -1,
            length = array ? array.length : 0,
            result = [];

        callback = lodash.createCallback(callback, thisArg, 3);
        while (++index < length) {
          var value = array[index];
          if (callback(value, index, array)) {
            result.push(value);
            splice.call(array, index--, 1);
            length--;
          }
        }
        return result;
      }

      /**
       * The opposite of `_.initial` this method gets all but the first element or
       * first `n` elements of an array. If a callback function is provided elements
       * at the beginning of the array are excluded from the result as long as the
       * callback returns truey. The callback is bound to `thisArg` and invoked
       * with three arguments; (value, index, array).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @alias drop, tail
       * @category Arrays
       * @param {Array} array The array to query.
       * @param {Function|Object|number|string} [callback=1] The function called
       *  per element or the number of elements to exclude. If a property name or
       *  object is provided it will be used to create a "_.pluck" or "_.where"
       *  style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Array} Returns a slice of `array`.
       * @example
       *
       * _.rest([1, 2, 3]);
       * // => [2, 3]
       *
       * _.rest([1, 2, 3], 2);
       * // => [3]
       *
       * _.rest([1, 2, 3], function(num) {
       *   return num < 3;
       * });
       * // => [3]
       *
       * var characters = [
       *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
       *   { 'name': 'fred',    'blocked': false,  'employer': 'slate' },
       *   { 'name': 'pebbles', 'blocked': true, 'employer': 'na' }
       * ];
       *
       * // using "_.pluck" callback shorthand
       * _.pluck(_.rest(characters, 'blocked'), 'name');
       * // => ['fred', 'pebbles']
       *
       * // using "_.where" callback shorthand
       * _.rest(characters, { 'employer': 'slate' });
       * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
       */
      function rest(array, callback, thisArg) {
        if (typeof callback != 'number' && callback != null) {
          var n = 0,
              index = -1,
              length = array ? array.length : 0;

          callback = lodash.createCallback(callback, thisArg, 3);
          while (++index < length && callback(array[index], index, array)) {
            n++;
          }
        } else {
          n = (callback == null || thisArg) ? 1 : nativeMax(0, callback);
        }
        return slice(array, n);
      }

      /**
       * Uses a binary search to determine the smallest index at which a value
       * should be inserted into a given sorted array in order to maintain the sort
       * order of the array. If a callback is provided it will be executed for
       * `value` and each element of `array` to compute their sort ranking. The
       * callback is bound to `thisArg` and invoked with one argument; (value).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @category Arrays
       * @param {Array} array The array to inspect.
       * @param {*} value The value to evaluate.
       * @param {Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {number} Returns the index at which `value` should be inserted
       *  into `array`.
       * @example
       *
       * _.sortedIndex([20, 30, 50], 40);
       * // => 2
       *
       * // using "_.pluck" callback shorthand
       * _.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
       * // => 2
       *
       * var dict = {
       *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50 }
       * };
       *
       * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
       *   return dict.wordToNumber[word];
       * });
       * // => 2
       *
       * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
       *   return this.wordToNumber[word];
       * }, dict);
       * // => 2
       */
      function sortedIndex(array, value, callback, thisArg) {
        var low = 0,
            high = array ? array.length : low;

        // explicitly reference `identity` for better inlining in Firefox
        callback = callback ? lodash.createCallback(callback, thisArg, 1) : identity;
        value = callback(value);

        while (low < high) {
          var mid = (low + high) >>> 1;
          (callback(array[mid]) < value)
            ? low = mid + 1
            : high = mid;
        }
        return low;
      }

      /**
       * Creates an array of unique values, in order, of the provided arrays using
       * strict equality for comparisons, i.e. `===`.
       *
       * @static
       * @memberOf _
       * @category Arrays
       * @param {...Array} [array] The arrays to inspect.
       * @returns {Array} Returns an array of combined values.
       * @example
       *
       * _.union([1, 2, 3], [5, 2, 1, 4], [2, 1]);
       * // => [1, 2, 3, 5, 4]
       */
      function union() {
        return baseUniq(baseFlatten(arguments, true, true));
      }

      /**
       * Creates a duplicate-value-free version of an array using strict equality
       * for comparisons, i.e. `===`. If the array is sorted, providing
       * `true` for `isSorted` will use a faster algorithm. If a callback is provided
       * each element of `array` is passed through the callback before uniqueness
       * is computed. The callback is bound to `thisArg` and invoked with three
       * arguments; (value, index, array).
       *
       * If a property name is provided for `callback` the created "_.pluck" style
       * callback will return the property value of the given element.
       *
       * If an object is provided for `callback` the created "_.where" style callback
       * will return `true` for elements that have the properties of the given object,
       * else `false`.
       *
       * @static
       * @memberOf _
       * @alias unique
       * @category Arrays
       * @param {Array} array The array to process.
       * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
       * @param {Function|Object|string} [callback=identity] The function called
       *  per iteration. If a property name or object is provided it will be used
       *  to create a "_.pluck" or "_.where" style callback, respectively.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Array} Returns a duplicate-value-free array.
       * @example
       *
       * _.uniq([1, 2, 1, 3, 1]);
       * // => [1, 2, 3]
       *
       * _.uniq([1, 1, 2, 2, 3], true);
       * // => [1, 2, 3]
       *
       * _.uniq(['A', 'b', 'C', 'a', 'B', 'c'], function(letter) { return letter.toLowerCase(); });
       * // => ['A', 'b', 'C']
       *
       * _.uniq([1, 2.5, 3, 1.5, 2, 3.5], function(num) { return this.floor(num); }, Math);
       * // => [1, 2.5, 3]
       *
       * // using "_.pluck" callback shorthand
       * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
       * // => [{ 'x': 1 }, { 'x': 2 }]
       */
      function uniq(array, isSorted, callback, thisArg) {
        // juggle arguments
        if (typeof isSorted != 'boolean' && isSorted != null) {
          thisArg = callback;
          callback = (typeof isSorted != 'function' && thisArg && thisArg[isSorted] === array) ? null : isSorted;
          isSorted = false;
        }
        if (callback != null) {
          callback = lodash.createCallback(callback, thisArg, 3);
        }
        return baseUniq(array, isSorted, callback);
      }

      /**
       * Creates an array excluding all provided values using strict equality for
       * comparisons, i.e. `===`.
       *
       * @static
       * @memberOf _
       * @category Arrays
       * @param {Array} array The array to filter.
       * @param {...*} [value] The values to exclude.
       * @returns {Array} Returns a new array of filtered values.
       * @example
       *
       * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
       * // => [2, 3, 4]
       */
      function without(array) {
        return baseDifference(array, slice(arguments, 1));
      }

      /**
       * Creates an array that is the symmetric difference of the provided arrays.
       * See http://en.wikipedia.org/wiki/Symmetric_difference.
       *
       * @static
       * @memberOf _
       * @category Arrays
       * @param {...Array} [array] The arrays to inspect.
       * @returns {Array} Returns an array of values.
       * @example
       *
       * _.xor([1, 2, 3], [5, 2, 1, 4]);
       * // => [3, 5, 4]
       *
       * _.xor([1, 2, 5], [2, 3, 5], [3, 4, 5]);
       * // => [1, 4, 5]
       */
      function xor() {
        var index = -1,
            length = arguments.length;

        while (++index < length) {
          var array = arguments[index];
          if (isArray(array) || isArguments(array)) {
            var result = result
              ? baseUniq(baseDifference(result, array).concat(baseDifference(array, result)))
              : array;
          }
        }
        return result || [];
      }

      /**
       * Creates an array of grouped elements, the first of which contains the first
       * elements of the given arrays, the second of which contains the second
       * elements of the given arrays, and so on.
       *
       * @static
       * @memberOf _
       * @alias unzip
       * @category Arrays
       * @param {...Array} [array] Arrays to process.
       * @returns {Array} Returns a new array of grouped elements.
       * @example
       *
       * _.zip(['fred', 'barney'], [30, 40], [true, false]);
       * // => [['fred', 30, true], ['barney', 40, false]]
       */
      function zip() {
        var array = arguments.length > 1 ? arguments : arguments[0],
            index = -1,
            length = array ? max(pluck(array, 'length')) : 0,
            result = Array(length < 0 ? 0 : length);

        while (++index < length) {
          result[index] = pluck(array, index);
        }
        return result;
      }

      /**
       * Creates an object composed from arrays of `keys` and `values`. Provide
       * either a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]`
       * or two arrays, one of `keys` and one of corresponding `values`.
       *
       * @static
       * @memberOf _
       * @alias object
       * @category Arrays
       * @param {Array} keys The array of keys.
       * @param {Array} [values=[]] The array of values.
       * @returns {Object} Returns an object composed of the given keys and
       *  corresponding values.
       * @example
       *
       * _.zipObject(['fred', 'barney'], [30, 40]);
       * // => { 'fred': 30, 'barney': 40 }
       */
      function zipObject(keys, values) {
        var index = -1,
            length = keys ? keys.length : 0,
            result = {};

        if (!values && length && !isArray(keys[0])) {
          values = [];
        }
        while (++index < length) {
          var key = keys[index];
          if (values) {
            result[key] = values[index];
          } else if (key) {
            result[key[0]] = key[1];
          }
        }
        return result;
      }

      /*--------------------------------------------------------------------------*/

      /**
       * Creates a function that executes `func`, with  the `this` binding and
       * arguments of the created function, only after being called `n` times.
       *
       * @static
       * @memberOf _
       * @category Functions
       * @param {number} n The number of times the function must be called before
       *  `func` is executed.
       * @param {Function} func The function to restrict.
       * @returns {Function} Returns the new restricted function.
       * @example
       *
       * var saves = ['profile', 'settings'];
       *
       * var done = _.after(saves.length, function() {
       *   console.log('Done saving!');
       * });
       *
       * _.forEach(saves, function(type) {
       *   asyncSave({ 'type': type, 'complete': done });
       * });
       * // => logs 'Done saving!', after all saves have completed
       */
      function after(n, func) {
        if (!isFunction(func)) {
          throw new TypeError;
        }
        return function() {
          if (--n < 1) {
            return func.apply(this, arguments);
          }
        };
      }

      /**
       * Creates a function that, when called, invokes `func` with the `this`
       * binding of `thisArg` and prepends any additional `bind` arguments to those
       * provided to the bound function.
       *
       * @static
       * @memberOf _
       * @category Functions
       * @param {Function} func The function to bind.
       * @param {*} [thisArg] The `this` binding of `func`.
       * @param {...*} [arg] Arguments to be partially applied.
       * @returns {Function} Returns the new bound function.
       * @example
       *
       * var func = function(greeting) {
       *   return greeting + ' ' + this.name;
       * };
       *
       * func = _.bind(func, { 'name': 'fred' }, 'hi');
       * func();
       * // => 'hi fred'
       */
      function bind(func, thisArg) {
        return arguments.length > 2
          ? createWrapper(func, 17, slice(arguments, 2), null, thisArg)
          : createWrapper(func, 1, null, null, thisArg);
      }

      /**
       * Binds methods of an object to the object itself, overwriting the existing
       * method. Method names may be specified as individual arguments or as arrays
       * of method names. If no method names are provided all the function properties
       * of `object` will be bound.
       *
       * @static
       * @memberOf _
       * @category Functions
       * @param {Object} object The object to bind and assign the bound methods to.
       * @param {...string} [methodName] The object method names to
       *  bind, specified as individual method names or arrays of method names.
       * @returns {Object} Returns `object`.
       * @example
       *
       * var view = {
       *   'label': 'docs',
       *   'onClick': function() { console.log('clicked ' + this.label); }
       * };
       *
       * _.bindAll(view);
       * jQuery('#docs').on('click', view.onClick);
       * // => logs 'clicked docs', when the button is clicked
       */
      function bindAll(object) {
        var funcs = arguments.length > 1 ? baseFlatten(arguments, true, false, 1) : functions(object),
            index = -1,
            length = funcs.length;

        while (++index < length) {
          var key = funcs[index];
          object[key] = createWrapper(object[key], 1, null, null, object);
        }
        return object;
      }

      /**
       * Creates a function that, when called, invokes the method at `object[key]`
       * and prepends any additional `bindKey` arguments to those provided to the bound
       * function. This method differs from `_.bind` by allowing bound functions to
       * reference methods that will be redefined or don't yet exist.
       * See http://michaux.ca/articles/lazy-function-definition-pattern.
       *
       * @static
       * @memberOf _
       * @category Functions
       * @param {Object} object The object the method belongs to.
       * @param {string} key The key of the method.
       * @param {...*} [arg] Arguments to be partially applied.
       * @returns {Function} Returns the new bound function.
       * @example
       *
       * var object = {
       *   'name': 'fred',
       *   'greet': function(greeting) {
       *     return greeting + ' ' + this.name;
       *   }
       * };
       *
       * var func = _.bindKey(object, 'greet', 'hi');
       * func();
       * // => 'hi fred'
       *
       * object.greet = function(greeting) {
       *   return greeting + 'ya ' + this.name + '!';
       * };
       *
       * func();
       * // => 'hiya fred!'
       */
      function bindKey(object, key) {
        return arguments.length > 2
          ? createWrapper(key, 19, slice(arguments, 2), null, object)
          : createWrapper(key, 3, null, null, object);
      }

      /**
       * Creates a function that is the composition of the provided functions,
       * where each function consumes the return value of the function that follows.
       * For example, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.
       * Each function is executed with the `this` binding of the composed function.
       *
       * @static
       * @memberOf _
       * @category Functions
       * @param {...Function} [func] Functions to compose.
       * @returns {Function} Returns the new composed function.
       * @example
       *
       * var realNameMap = {
       *   'pebbles': 'penelope'
       * };
       *
       * var format = function(name) {
       *   name = realNameMap[name.toLowerCase()] || name;
       *   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
       * };
       *
       * var greet = function(formatted) {
       *   return 'Hiya ' + formatted + '!';
       * };
       *
       * var welcome = _.compose(greet, format);
       * welcome('pebbles');
       * // => 'Hiya Penelope!'
       */
      function compose() {
        var funcs = arguments,
            length = funcs.length;

        while (length--) {
          if (!isFunction(funcs[length])) {
            throw new TypeError;
          }
        }
        return function() {
          var args = arguments,
              length = funcs.length;

          while (length--) {
            args = [funcs[length].apply(this, args)];
          }
          return args[0];
        };
      }

      /**
       * Creates a function which accepts one or more arguments of `func` that when
       * invoked either executes `func` returning its result, if all `func` arguments
       * have been provided, or returns a function that accepts one or more of the
       * remaining `func` arguments, and so on. The arity of `func` can be specified
       * if `func.length` is not sufficient.
       *
       * @static
       * @memberOf _
       * @category Functions
       * @param {Function} func The function to curry.
       * @param {number} [arity=func.length] The arity of `func`.
       * @returns {Function} Returns the new curried function.
       * @example
       *
       * var curried = _.curry(function(a, b, c) {
       *   console.log(a + b + c);
       * });
       *
       * curried(1)(2)(3);
       * // => 6
       *
       * curried(1, 2)(3);
       * // => 6
       *
       * curried(1, 2, 3);
       * // => 6
       */
      function curry(func, arity) {
        arity = typeof arity == 'number' ? arity : (+arity || func.length);
        return createWrapper(func, 4, null, null, null, arity);
      }

      /**
       * Creates a function that will delay the execution of `func` until after
       * `wait` milliseconds have elapsed since the last time it was invoked.
       * Provide an options object to indicate that `func` should be invoked on
       * the leading and/or trailing edge of the `wait` timeout. Subsequent calls
       * to the debounced function will return the result of the last `func` call.
       *
       * Note: If `leading` and `trailing` options are `true` `func` will be called
       * on the trailing edge of the timeout only if the the debounced function is
       * invoked more than once during the `wait` timeout.
       *
       * @static
       * @memberOf _
       * @category Functions
       * @param {Function} func The function to debounce.
       * @param {number} wait The number of milliseconds to delay.
       * @param {Object} [options] The options object.
       * @param {boolean} [options.leading=false] Specify execution on the leading edge of the timeout.
       * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's called.
       * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
       * @returns {Function} Returns the new debounced function.
       * @example
       *
       * // avoid costly calculations while the window size is in flux
       * var lazyLayout = _.debounce(calculateLayout, 150);
       * jQuery(window).on('resize', lazyLayout);
       *
       * // execute `sendMail` when the click event is fired, debouncing subsequent calls
       * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
       *   'leading': true,
       *   'trailing': false
       * });
       *
       * // ensure `batchLog` is executed once after 1 second of debounced calls
       * var source = new EventSource('/stream');
       * source.addEventListener('message', _.debounce(batchLog, 250, {
       *   'maxWait': 1000
       * }, false);
       */
      function debounce(func, wait, options) {
        var args,
            maxTimeoutId,
            result,
            stamp,
            thisArg,
            timeoutId,
            trailingCall,
            lastCalled = 0,
            maxWait = false,
            trailing = true;

        if (!isFunction(func)) {
          throw new TypeError;
        }
        wait = nativeMax(0, wait) || 0;
        if (options === true) {
          var leading = true;
          trailing = false;
        } else if (isObject(options)) {
          leading = options.leading;
          maxWait = 'maxWait' in options && (nativeMax(wait, options.maxWait) || 0);
          trailing = 'trailing' in options ? options.trailing : trailing;
        }
        var delayed = function() {
          var remaining = wait - (now() - stamp);
          if (remaining <= 0) {
            if (maxTimeoutId) {
              clearTimeout(maxTimeoutId);
            }
            var isCalled = trailingCall;
            maxTimeoutId = timeoutId = trailingCall = undefined$1;
            if (isCalled) {
              lastCalled = now();
              result = func.apply(thisArg, args);
              if (!timeoutId && !maxTimeoutId) {
                args = thisArg = null;
              }
            }
          } else {
            timeoutId = setTimeout(delayed, remaining);
          }
        };

        var maxDelayed = function() {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          maxTimeoutId = timeoutId = trailingCall = undefined$1;
          if (trailing || (maxWait !== wait)) {
            lastCalled = now();
            result = func.apply(thisArg, args);
            if (!timeoutId && !maxTimeoutId) {
              args = thisArg = null;
            }
          }
        };

        return function() {
          args = arguments;
          stamp = now();
          thisArg = this;
          trailingCall = trailing && (timeoutId || !leading);

          if (maxWait === false) {
            var leadingCall = leading && !timeoutId;
          } else {
            if (!maxTimeoutId && !leading) {
              lastCalled = stamp;
            }
            var remaining = maxWait - (stamp - lastCalled),
                isCalled = remaining <= 0;

            if (isCalled) {
              if (maxTimeoutId) {
                maxTimeoutId = clearTimeout(maxTimeoutId);
              }
              lastCalled = stamp;
              result = func.apply(thisArg, args);
            }
            else if (!maxTimeoutId) {
              maxTimeoutId = setTimeout(maxDelayed, remaining);
            }
          }
          if (isCalled && timeoutId) {
            timeoutId = clearTimeout(timeoutId);
          }
          else if (!timeoutId && wait !== maxWait) {
            timeoutId = setTimeout(delayed, wait);
          }
          if (leadingCall) {
            isCalled = true;
            result = func.apply(thisArg, args);
          }
          if (isCalled && !timeoutId && !maxTimeoutId) {
            args = thisArg = null;
          }
          return result;
        };
      }

      /**
       * Defers executing the `func` function until the current call stack has cleared.
       * Additional arguments will be provided to `func` when it is invoked.
       *
       * @static
       * @memberOf _
       * @category Functions
       * @param {Function} func The function to defer.
       * @param {...*} [arg] Arguments to invoke the function with.
       * @returns {number} Returns the timer id.
       * @example
       *
       * _.defer(function(text) { console.log(text); }, 'deferred');
       * // logs 'deferred' after one or more milliseconds
       */
      function defer(func) {
        if (!isFunction(func)) {
          throw new TypeError;
        }
        var args = slice(arguments, 1);
        return setTimeout(function() { func.apply(undefined$1, args); }, 1);
      }

      /**
       * Executes the `func` function after `wait` milliseconds. Additional arguments
       * will be provided to `func` when it is invoked.
       *
       * @static
       * @memberOf _
       * @category Functions
       * @param {Function} func The function to delay.
       * @param {number} wait The number of milliseconds to delay execution.
       * @param {...*} [arg] Arguments to invoke the function with.
       * @returns {number} Returns the timer id.
       * @example
       *
       * _.delay(function(text) { console.log(text); }, 1000, 'later');
       * // => logs 'later' after one second
       */
      function delay(func, wait) {
        if (!isFunction(func)) {
          throw new TypeError;
        }
        var args = slice(arguments, 2);
        return setTimeout(function() { func.apply(undefined$1, args); }, wait);
      }

      /**
       * Creates a function that memoizes the result of `func`. If `resolver` is
       * provided it will be used to determine the cache key for storing the result
       * based on the arguments provided to the memoized function. By default, the
       * first argument provided to the memoized function is used as the cache key.
       * The `func` is executed with the `this` binding of the memoized function.
       * The result cache is exposed as the `cache` property on the memoized function.
       *
       * @static
       * @memberOf _
       * @category Functions
       * @param {Function} func The function to have its output memoized.
       * @param {Function} [resolver] A function used to resolve the cache key.
       * @returns {Function} Returns the new memoizing function.
       * @example
       *
       * var fibonacci = _.memoize(function(n) {
       *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
       * });
       *
       * fibonacci(9)
       * // => 34
       *
       * var data = {
       *   'fred': { 'name': 'fred', 'age': 40 },
       *   'pebbles': { 'name': 'pebbles', 'age': 1 }
       * };
       *
       * // modifying the result cache
       * var get = _.memoize(function(name) { return data[name]; }, _.identity);
       * get('pebbles');
       * // => { 'name': 'pebbles', 'age': 1 }
       *
       * get.cache.pebbles.name = 'penelope';
       * get('pebbles');
       * // => { 'name': 'penelope', 'age': 1 }
       */
      function memoize(func, resolver) {
        if (!isFunction(func)) {
          throw new TypeError;
        }
        var memoized = function() {
          var cache = memoized.cache,
              key = resolver ? resolver.apply(this, arguments) : keyPrefix + arguments[0];

          return hasOwnProperty.call(cache, key)
            ? cache[key]
            : (cache[key] = func.apply(this, arguments));
        };
        memoized.cache = {};
        return memoized;
      }

      /**
       * Creates a function that is restricted to execute `func` once. Repeat calls to
       * the function will return the value of the first call. The `func` is executed
       * with the `this` binding of the created function.
       *
       * @static
       * @memberOf _
       * @category Functions
       * @param {Function} func The function to restrict.
       * @returns {Function} Returns the new restricted function.
       * @example
       *
       * var initialize = _.once(createApplication);
       * initialize();
       * initialize();
       * // `initialize` executes `createApplication` once
       */
      function once(func) {
        var ran,
            result;

        if (!isFunction(func)) {
          throw new TypeError;
        }
        return function() {
          if (ran) {
            return result;
          }
          ran = true;
          result = func.apply(this, arguments);

          // clear the `func` variable so the function may be garbage collected
          func = null;
          return result;
        };
      }

      /**
       * Creates a function that, when called, invokes `func` with any additional
       * `partial` arguments prepended to those provided to the new function. This
       * method is similar to `_.bind` except it does **not** alter the `this` binding.
       *
       * @static
       * @memberOf _
       * @category Functions
       * @param {Function} func The function to partially apply arguments to.
       * @param {...*} [arg] Arguments to be partially applied.
       * @returns {Function} Returns the new partially applied function.
       * @example
       *
       * var greet = function(greeting, name) { return greeting + ' ' + name; };
       * var hi = _.partial(greet, 'hi');
       * hi('fred');
       * // => 'hi fred'
       */
      function partial(func) {
        return createWrapper(func, 16, slice(arguments, 1));
      }

      /**
       * This method is like `_.partial` except that `partial` arguments are
       * appended to those provided to the new function.
       *
       * @static
       * @memberOf _
       * @category Functions
       * @param {Function} func The function to partially apply arguments to.
       * @param {...*} [arg] Arguments to be partially applied.
       * @returns {Function} Returns the new partially applied function.
       * @example
       *
       * var defaultsDeep = _.partialRight(_.merge, _.defaults);
       *
       * var options = {
       *   'variable': 'data',
       *   'imports': { 'jq': $ }
       * };
       *
       * defaultsDeep(options, _.templateSettings);
       *
       * options.variable
       * // => 'data'
       *
       * options.imports
       * // => { '_': _, 'jq': $ }
       */
      function partialRight(func) {
        return createWrapper(func, 32, null, slice(arguments, 1));
      }

      /**
       * Creates a function that, when executed, will only call the `func` function
       * at most once per every `wait` milliseconds. Provide an options object to
       * indicate that `func` should be invoked on the leading and/or trailing edge
       * of the `wait` timeout. Subsequent calls to the throttled function will
       * return the result of the last `func` call.
       *
       * Note: If `leading` and `trailing` options are `true` `func` will be called
       * on the trailing edge of the timeout only if the the throttled function is
       * invoked more than once during the `wait` timeout.
       *
       * @static
       * @memberOf _
       * @category Functions
       * @param {Function} func The function to throttle.
       * @param {number} wait The number of milliseconds to throttle executions to.
       * @param {Object} [options] The options object.
       * @param {boolean} [options.leading=true] Specify execution on the leading edge of the timeout.
       * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
       * @returns {Function} Returns the new throttled function.
       * @example
       *
       * // avoid excessively updating the position while scrolling
       * var throttled = _.throttle(updatePosition, 100);
       * jQuery(window).on('scroll', throttled);
       *
       * // execute `renewToken` when the click event is fired, but not more than once every 5 minutes
       * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
       *   'trailing': false
       * }));
       */
      function throttle(func, wait, options) {
        var leading = true,
            trailing = true;

        if (!isFunction(func)) {
          throw new TypeError;
        }
        if (options === false) {
          leading = false;
        } else if (isObject(options)) {
          leading = 'leading' in options ? options.leading : leading;
          trailing = 'trailing' in options ? options.trailing : trailing;
        }
        debounceOptions.leading = leading;
        debounceOptions.maxWait = wait;
        debounceOptions.trailing = trailing;

        return debounce(func, wait, debounceOptions);
      }

      /**
       * Creates a function that provides `value` to the wrapper function as its
       * first argument. Additional arguments provided to the function are appended
       * to those provided to the wrapper function. The wrapper is executed with
       * the `this` binding of the created function.
       *
       * @static
       * @memberOf _
       * @category Functions
       * @param {*} value The value to wrap.
       * @param {Function} wrapper The wrapper function.
       * @returns {Function} Returns the new function.
       * @example
       *
       * var p = _.wrap(_.escape, function(func, text) {
       *   return '<p>' + func(text) + '</p>';
       * });
       *
       * p('Fred, Wilma, & Pebbles');
       * // => '<p>Fred, Wilma, &amp; Pebbles</p>'
       */
      function wrap(value, wrapper) {
        return createWrapper(wrapper, 16, [value]);
      }

      /*--------------------------------------------------------------------------*/

      /**
       * Creates a function that returns `value`.
       *
       * @static
       * @memberOf _
       * @category Utilities
       * @param {*} value The value to return from the new function.
       * @returns {Function} Returns the new function.
       * @example
       *
       * var object = { 'name': 'fred' };
       * var getter = _.constant(object);
       * getter() === object;
       * // => true
       */
      function constant(value) {
        return function() {
          return value;
        };
      }

      /**
       * Produces a callback bound to an optional `thisArg`. If `func` is a property
       * name the created callback will return the property value for a given element.
       * If `func` is an object the created callback will return `true` for elements
       * that contain the equivalent object properties, otherwise it will return `false`.
       *
       * @static
       * @memberOf _
       * @category Utilities
       * @param {*} [func=identity] The value to convert to a callback.
       * @param {*} [thisArg] The `this` binding of the created callback.
       * @param {number} [argCount] The number of arguments the callback accepts.
       * @returns {Function} Returns a callback function.
       * @example
       *
       * var characters = [
       *   { 'name': 'barney', 'age': 36 },
       *   { 'name': 'fred',   'age': 40 }
       * ];
       *
       * // wrap to create custom callback shorthands
       * _.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {
       *   var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);
       *   return !match ? func(callback, thisArg) : function(object) {
       *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
       *   };
       * });
       *
       * _.filter(characters, 'age__gt38');
       * // => [{ 'name': 'fred', 'age': 40 }]
       */
      function createCallback(func, thisArg, argCount) {
        var type = typeof func;
        if (func == null || type == 'function') {
          return baseCreateCallback(func, thisArg, argCount);
        }
        // handle "_.pluck" style callback shorthands
        if (type != 'object') {
          return property(func);
        }
        var props = keys(func),
            key = props[0],
            a = func[key];

        // handle "_.where" style callback shorthands
        if (props.length == 1 && a === a && !isObject(a)) {
          // fast path the common case of providing an object with a single
          // property containing a primitive value
          return function(object) {
            var b = object[key];
            return a === b && (a !== 0 || (1 / a == 1 / b));
          };
        }
        return function(object) {
          var length = props.length,
              result = false;

          while (length--) {
            if (!(result = baseIsEqual(object[props[length]], func[props[length]], null, true))) {
              break;
            }
          }
          return result;
        };
      }

      /**
       * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
       * corresponding HTML entities.
       *
       * @static
       * @memberOf _
       * @category Utilities
       * @param {string} string The string to escape.
       * @returns {string} Returns the escaped string.
       * @example
       *
       * _.escape('Fred, Wilma, & Pebbles');
       * // => 'Fred, Wilma, &amp; Pebbles'
       */
      function escape(string) {
        return string == null ? '' : String(string).replace(reUnescapedHtml, escapeHtmlChar);
      }

      /**
       * This method returns the first argument provided to it.
       *
       * @static
       * @memberOf _
       * @category Utilities
       * @param {*} value Any value.
       * @returns {*} Returns `value`.
       * @example
       *
       * var object = { 'name': 'fred' };
       * _.identity(object) === object;
       * // => true
       */
      function identity(value) {
        return value;
      }

      /**
       * Adds function properties of a source object to the destination object.
       * If `object` is a function methods will be added to its prototype as well.
       *
       * @static
       * @memberOf _
       * @category Utilities
       * @param {Function|Object} [object=lodash] object The destination object.
       * @param {Object} source The object of functions to add.
       * @param {Object} [options] The options object.
       * @param {boolean} [options.chain=true] Specify whether the functions added are chainable.
       * @example
       *
       * function capitalize(string) {
       *   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
       * }
       *
       * _.mixin({ 'capitalize': capitalize });
       * _.capitalize('fred');
       * // => 'Fred'
       *
       * _('fred').capitalize().value();
       * // => 'Fred'
       *
       * _.mixin({ 'capitalize': capitalize }, { 'chain': false });
       * _('fred').capitalize();
       * // => 'Fred'
       */
      function mixin(object, source, options) {
        var chain = true,
            methodNames = source && functions(source);

        if (!source || (!options && !methodNames.length)) {
          if (options == null) {
            options = source;
          }
          ctor = lodashWrapper;
          source = object;
          object = lodash;
          methodNames = functions(source);
        }
        if (options === false) {
          chain = false;
        } else if (isObject(options) && 'chain' in options) {
          chain = options.chain;
        }
        var ctor = object,
            isFunc = isFunction(ctor);

        forEach(methodNames, function(methodName) {
          var func = object[methodName] = source[methodName];
          if (isFunc) {
            ctor.prototype[methodName] = function() {
              var chainAll = this.__chain__,
                  value = this.__wrapped__,
                  args = [value];

              push.apply(args, arguments);
              var result = func.apply(object, args);
              if (chain || chainAll) {
                if (value === result && isObject(result)) {
                  return this;
                }
                result = new ctor(result);
                result.__chain__ = chainAll;
              }
              return result;
            };
          }
        });
      }

      /**
       * Reverts the '_' variable to its previous value and returns a reference to
       * the `lodash` function.
       *
       * @static
       * @memberOf _
       * @category Utilities
       * @returns {Function} Returns the `lodash` function.
       * @example
       *
       * var lodash = _.noConflict();
       */
      function noConflict() {
        context._ = oldDash;
        return this;
      }

      /**
       * A no-operation function.
       *
       * @static
       * @memberOf _
       * @category Utilities
       * @example
       *
       * var object = { 'name': 'fred' };
       * _.noop(object) === undefined;
       * // => true
       */
      function noop() {
        // no operation performed
      }

      /**
       * Gets the number of milliseconds that have elapsed since the Unix epoch
       * (1 January 1970 00:00:00 UTC).
       *
       * @static
       * @memberOf _
       * @category Utilities
       * @example
       *
       * var stamp = _.now();
       * _.defer(function() { console.log(_.now() - stamp); });
       * // => logs the number of milliseconds it took for the deferred function to be called
       */
      var now = isNative(now = Date.now) && now || function() {
        return new Date().getTime();
      };

      /**
       * Converts the given value into an integer of the specified radix.
       * If `radix` is `undefined` or `0` a `radix` of `10` is used unless the
       * `value` is a hexadecimal, in which case a `radix` of `16` is used.
       *
       * Note: This method avoids differences in native ES3 and ES5 `parseInt`
       * implementations. See http://es5.github.io/#E.
       *
       * @static
       * @memberOf _
       * @category Utilities
       * @param {string} value The value to parse.
       * @param {number} [radix] The radix used to interpret the value to parse.
       * @returns {number} Returns the new integer value.
       * @example
       *
       * _.parseInt('08');
       * // => 8
       */
      var parseInt = nativeParseInt(whitespace + '08') == 8 ? nativeParseInt : function(value, radix) {
        // Firefox < 21 and Opera < 15 follow the ES3 specified implementation of `parseInt`
        return nativeParseInt(isString(value) ? value.replace(reLeadingSpacesAndZeros, '') : value, radix || 0);
      };

      /**
       * Creates a "_.pluck" style function, which returns the `key` value of a
       * given object.
       *
       * @static
       * @memberOf _
       * @category Utilities
       * @param {string} key The name of the property to retrieve.
       * @returns {Function} Returns the new function.
       * @example
       *
       * var characters = [
       *   { 'name': 'fred',   'age': 40 },
       *   { 'name': 'barney', 'age': 36 }
       * ];
       *
       * var getName = _.property('name');
       *
       * _.map(characters, getName);
       * // => ['barney', 'fred']
       *
       * _.sortBy(characters, getName);
       * // => [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 }]
       */
      function property(key) {
        return function(object) {
          return object[key];
        };
      }

      /**
       * Produces a random number between `min` and `max` (inclusive). If only one
       * argument is provided a number between `0` and the given number will be
       * returned. If `floating` is truey or either `min` or `max` are floats a
       * floating-point number will be returned instead of an integer.
       *
       * @static
       * @memberOf _
       * @category Utilities
       * @param {number} [min=0] The minimum possible value.
       * @param {number} [max=1] The maximum possible value.
       * @param {boolean} [floating=false] Specify returning a floating-point number.
       * @returns {number} Returns a random number.
       * @example
       *
       * _.random(0, 5);
       * // => an integer between 0 and 5
       *
       * _.random(5);
       * // => also an integer between 0 and 5
       *
       * _.random(5, true);
       * // => a floating-point number between 0 and 5
       *
       * _.random(1.2, 5.2);
       * // => a floating-point number between 1.2 and 5.2
       */
      function random(min, max, floating) {
        var noMin = min == null,
            noMax = max == null;

        if (floating == null) {
          if (typeof min == 'boolean' && noMax) {
            floating = min;
            min = 1;
          }
          else if (!noMax && typeof max == 'boolean') {
            floating = max;
            noMax = true;
          }
        }
        if (noMin && noMax) {
          max = 1;
        }
        min = +min || 0;
        if (noMax) {
          max = min;
          min = 0;
        } else {
          max = +max || 0;
        }
        if (floating || min % 1 || max % 1) {
          var rand = nativeRandom();
          return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand +'').length - 1)))), max);
        }
        return baseRandom(min, max);
      }

      /**
       * Resolves the value of property `key` on `object`. If `key` is a function
       * it will be invoked with the `this` binding of `object` and its result returned,
       * else the property value is returned. If `object` is falsey then `undefined`
       * is returned.
       *
       * @static
       * @memberOf _
       * @category Utilities
       * @param {Object} object The object to inspect.
       * @param {string} key The name of the property to resolve.
       * @returns {*} Returns the resolved value.
       * @example
       *
       * var object = {
       *   'cheese': 'crumpets',
       *   'stuff': function() {
       *     return 'nonsense';
       *   }
       * };
       *
       * _.result(object, 'cheese');
       * // => 'crumpets'
       *
       * _.result(object, 'stuff');
       * // => 'nonsense'
       */
      function result(object, key) {
        if (object) {
          var value = object[key];
          return isFunction(value) ? object[key]() : value;
        }
      }

      /**
       * A micro-templating method that handles arbitrary delimiters, preserves
       * whitespace, and correctly escapes quotes within interpolated code.
       *
       * Note: In the development build, `_.template` utilizes sourceURLs for easier
       * debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
       *
       * For more information on precompiling templates see:
       * https://lodash.com/custom-builds
       *
       * For more information on Chrome extension sandboxes see:
       * http://developer.chrome.com/stable/extensions/sandboxingEval.html
       *
       * @static
       * @memberOf _
       * @category Utilities
       * @param {string} text The template text.
       * @param {Object} data The data object used to populate the text.
       * @param {Object} [options] The options object.
       * @param {RegExp} [options.escape] The "escape" delimiter.
       * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
       * @param {Object} [options.imports] An object to import into the template as local variables.
       * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
       * @param {string} [sourceURL] The sourceURL of the template's compiled source.
       * @param {string} [variable] The data object variable name.
       * @returns {Function|string} Returns a compiled function when no `data` object
       *  is given, else it returns the interpolated text.
       * @example
       *
       * // using the "interpolate" delimiter to create a compiled template
       * var compiled = _.template('hello <%= name %>');
       * compiled({ 'name': 'fred' });
       * // => 'hello fred'
       *
       * // using the "escape" delimiter to escape HTML in data property values
       * _.template('<b><%- value %></b>', { 'value': '<script>' });
       * // => '<b>&lt;script&gt;</b>'
       *
       * // using the "evaluate" delimiter to generate HTML
       * var list = '<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>';
       * _.template(list, { 'people': ['fred', 'barney'] });
       * // => '<li>fred</li><li>barney</li>'
       *
       * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
       * _.template('hello ${ name }', { 'name': 'pebbles' });
       * // => 'hello pebbles'
       *
       * // using the internal `print` function in "evaluate" delimiters
       * _.template('<% print("hello " + name); %>!', { 'name': 'barney' });
       * // => 'hello barney!'
       *
       * // using a custom template delimiters
       * _.templateSettings = {
       *   'interpolate': /{{([\s\S]+?)}}/g
       * };
       *
       * _.template('hello {{ name }}!', { 'name': 'mustache' });
       * // => 'hello mustache!'
       *
       * // using the `imports` option to import jQuery
       * var list = '<% jq.each(people, function(name) { %><li><%- name %></li><% }); %>';
       * _.template(list, { 'people': ['fred', 'barney'] }, { 'imports': { 'jq': jQuery } });
       * // => '<li>fred</li><li>barney</li>'
       *
       * // using the `sourceURL` option to specify a custom sourceURL for the template
       * var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });
       * compiled(data);
       * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
       *
       * // using the `variable` option to ensure a with-statement isn't used in the compiled template
       * var compiled = _.template('hi <%= data.name %>!', null, { 'variable': 'data' });
       * compiled.source;
       * // => function(data) {
       *   var __t, __p = '', __e = _.escape;
       *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
       *   return __p;
       * }
       *
       * // using the `source` property to inline compiled templates for meaningful
       * // line numbers in error messages and a stack trace
       * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
       *   var JST = {\
       *     "main": ' + _.template(mainText).source + '\
       *   };\
       * ');
       */
      function template(text, data, options) {
        // based on John Resig's `tmpl` implementation
        // http://ejohn.org/blog/javascript-micro-templating/
        // and Laura Doktorova's doT.js
        // https://github.com/olado/doT
        var settings = lodash.templateSettings;
        text = String(text || '');

        // avoid missing dependencies when `iteratorTemplate` is not defined
        options = defaults({}, options, settings);

        var imports = defaults({}, options.imports, settings.imports),
            importsKeys = keys(imports),
            importsValues = values(imports);

        var isEvaluating,
            index = 0,
            interpolate = options.interpolate || reNoMatch,
            source = "__p += '";

        // compile the regexp to match each delimiter
        var reDelimiters = RegExp(
          (options.escape || reNoMatch).source + '|' +
          interpolate.source + '|' +
          (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
          (options.evaluate || reNoMatch).source + '|$'
        , 'g');

        text.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
          interpolateValue || (interpolateValue = esTemplateValue);

          // escape characters that cannot be included in string literals
          source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);

          // replace delimiters with snippets
          if (escapeValue) {
            source += "' +\n__e(" + escapeValue + ") +\n'";
          }
          if (evaluateValue) {
            isEvaluating = true;
            source += "';\n" + evaluateValue + ";\n__p += '";
          }
          if (interpolateValue) {
            source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
          }
          index = offset + match.length;

          // the JS engine embedded in Adobe products requires returning the `match`
          // string in order to produce the correct `offset` value
          return match;
        });

        source += "';\n";

        // if `variable` is not specified, wrap a with-statement around the generated
        // code to add the data object to the top of the scope chain
        var variable = options.variable,
            hasVariable = variable;

        if (!hasVariable) {
          variable = 'obj';
          source = 'with (' + variable + ') {\n' + source + '\n}\n';
        }
        // cleanup code by stripping empty strings
        source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
          .replace(reEmptyStringMiddle, '$1')
          .replace(reEmptyStringTrailing, '$1;');

        // frame code as the function body
        source = 'function(' + variable + ') {\n' +
          (hasVariable ? '' : variable + ' || (' + variable + ' = {});\n') +
          "var __t, __p = '', __e = _.escape" +
          (isEvaluating
            ? ', __j = Array.prototype.join;\n' +
              "function print() { __p += __j.call(arguments, '') }\n"
            : ';\n'
          ) +
          source +
          'return __p\n}';

        // Use a sourceURL for easier debugging.
        // http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
        var sourceURL = '\n/*\n//# sourceURL=' + (options.sourceURL || '/lodash/template/source[' + (templateCounter++) + ']') + '\n*/';

        try {
          var result = Function(importsKeys, 'return ' + source + sourceURL).apply(undefined$1, importsValues);
        } catch(e) {
          e.source = source;
          throw e;
        }
        if (data) {
          return result(data);
        }
        // provide the compiled function's source by its `toString` method, in
        // supported environments, or the `source` property as a convenience for
        // inlining compiled templates during the build process
        result.source = source;
        return result;
      }

      /**
       * Executes the callback `n` times, returning an array of the results
       * of each callback execution. The callback is bound to `thisArg` and invoked
       * with one argument; (index).
       *
       * @static
       * @memberOf _
       * @category Utilities
       * @param {number} n The number of times to execute the callback.
       * @param {Function} callback The function called per iteration.
       * @param {*} [thisArg] The `this` binding of `callback`.
       * @returns {Array} Returns an array of the results of each `callback` execution.
       * @example
       *
       * var diceRolls = _.times(3, _.partial(_.random, 1, 6));
       * // => [3, 6, 4]
       *
       * _.times(3, function(n) { mage.castSpell(n); });
       * // => calls `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively
       *
       * _.times(3, function(n) { this.cast(n); }, mage);
       * // => also calls `mage.castSpell(n)` three times
       */
      function times(n, callback, thisArg) {
        n = (n = +n) > -1 ? n : 0;
        var index = -1,
            result = Array(n);

        callback = baseCreateCallback(callback, thisArg, 1);
        while (++index < n) {
          result[index] = callback(index);
        }
        return result;
      }

      /**
       * The inverse of `_.escape` this method converts the HTML entities
       * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to their
       * corresponding characters.
       *
       * @static
       * @memberOf _
       * @category Utilities
       * @param {string} string The string to unescape.
       * @returns {string} Returns the unescaped string.
       * @example
       *
       * _.unescape('Fred, Barney &amp; Pebbles');
       * // => 'Fred, Barney & Pebbles'
       */
      function unescape(string) {
        return string == null ? '' : String(string).replace(reEscapedHtml, unescapeHtmlChar);
      }

      /**
       * Generates a unique ID. If `prefix` is provided the ID will be appended to it.
       *
       * @static
       * @memberOf _
       * @category Utilities
       * @param {string} [prefix] The value to prefix the ID with.
       * @returns {string} Returns the unique ID.
       * @example
       *
       * _.uniqueId('contact_');
       * // => 'contact_104'
       *
       * _.uniqueId();
       * // => '105'
       */
      function uniqueId(prefix) {
        var id = ++idCounter;
        return String(prefix == null ? '' : prefix) + id;
      }

      /*--------------------------------------------------------------------------*/

      /**
       * Creates a `lodash` object that wraps the given value with explicit
       * method chaining enabled.
       *
       * @static
       * @memberOf _
       * @category Chaining
       * @param {*} value The value to wrap.
       * @returns {Object} Returns the wrapper object.
       * @example
       *
       * var characters = [
       *   { 'name': 'barney',  'age': 36 },
       *   { 'name': 'fred',    'age': 40 },
       *   { 'name': 'pebbles', 'age': 1 }
       * ];
       *
       * var youngest = _.chain(characters)
       *     .sortBy('age')
       *     .map(function(chr) { return chr.name + ' is ' + chr.age; })
       *     .first()
       *     .value();
       * // => 'pebbles is 1'
       */
      function chain(value) {
        value = new lodashWrapper(value);
        value.__chain__ = true;
        return value;
      }

      /**
       * Invokes `interceptor` with the `value` as the first argument and then
       * returns `value`. The purpose of this method is to "tap into" a method
       * chain in order to perform operations on intermediate results within
       * the chain.
       *
       * @static
       * @memberOf _
       * @category Chaining
       * @param {*} value The value to provide to `interceptor`.
       * @param {Function} interceptor The function to invoke.
       * @returns {*} Returns `value`.
       * @example
       *
       * _([1, 2, 3, 4])
       *  .tap(function(array) { array.pop(); })
       *  .reverse()
       *  .value();
       * // => [3, 2, 1]
       */
      function tap(value, interceptor) {
        interceptor(value);
        return value;
      }

      /**
       * Enables explicit method chaining on the wrapper object.
       *
       * @name chain
       * @memberOf _
       * @category Chaining
       * @returns {*} Returns the wrapper object.
       * @example
       *
       * var characters = [
       *   { 'name': 'barney', 'age': 36 },
       *   { 'name': 'fred',   'age': 40 }
       * ];
       *
       * // without explicit chaining
       * _(characters).first();
       * // => { 'name': 'barney', 'age': 36 }
       *
       * // with explicit chaining
       * _(characters).chain()
       *   .first()
       *   .pick('age')
       *   .value();
       * // => { 'age': 36 }
       */
      function wrapperChain() {
        this.__chain__ = true;
        return this;
      }

      /**
       * Produces the `toString` result of the wrapped value.
       *
       * @name toString
       * @memberOf _
       * @category Chaining
       * @returns {string} Returns the string result.
       * @example
       *
       * _([1, 2, 3]).toString();
       * // => '1,2,3'
       */
      function wrapperToString() {
        return String(this.__wrapped__);
      }

      /**
       * Extracts the wrapped value.
       *
       * @name valueOf
       * @memberOf _
       * @alias value
       * @category Chaining
       * @returns {*} Returns the wrapped value.
       * @example
       *
       * _([1, 2, 3]).valueOf();
       * // => [1, 2, 3]
       */
      function wrapperValueOf() {
        return this.__wrapped__;
      }

      /*--------------------------------------------------------------------------*/

      // add functions that return wrapped values when chaining
      lodash.after = after;
      lodash.assign = assign;
      lodash.at = at;
      lodash.bind = bind;
      lodash.bindAll = bindAll;
      lodash.bindKey = bindKey;
      lodash.chain = chain;
      lodash.compact = compact;
      lodash.compose = compose;
      lodash.constant = constant;
      lodash.countBy = countBy;
      lodash.create = create;
      lodash.createCallback = createCallback;
      lodash.curry = curry;
      lodash.debounce = debounce;
      lodash.defaults = defaults;
      lodash.defer = defer;
      lodash.delay = delay;
      lodash.difference = difference;
      lodash.filter = filter;
      lodash.flatten = flatten;
      lodash.forEach = forEach;
      lodash.forEachRight = forEachRight;
      lodash.forIn = forIn;
      lodash.forInRight = forInRight;
      lodash.forOwn = forOwn;
      lodash.forOwnRight = forOwnRight;
      lodash.functions = functions;
      lodash.groupBy = groupBy;
      lodash.indexBy = indexBy;
      lodash.initial = initial;
      lodash.intersection = intersection;
      lodash.invert = invert;
      lodash.invoke = invoke;
      lodash.keys = keys;
      lodash.map = map;
      lodash.mapValues = mapValues;
      lodash.max = max;
      lodash.memoize = memoize;
      lodash.merge = merge;
      lodash.min = min;
      lodash.omit = omit;
      lodash.once = once;
      lodash.pairs = pairs;
      lodash.partial = partial;
      lodash.partialRight = partialRight;
      lodash.pick = pick;
      lodash.pluck = pluck;
      lodash.property = property;
      lodash.pull = pull;
      lodash.range = range;
      lodash.reject = reject;
      lodash.remove = remove;
      lodash.rest = rest;
      lodash.shuffle = shuffle;
      lodash.sortBy = sortBy;
      lodash.tap = tap;
      lodash.throttle = throttle;
      lodash.times = times;
      lodash.toArray = toArray;
      lodash.transform = transform;
      lodash.union = union;
      lodash.uniq = uniq;
      lodash.values = values;
      lodash.where = where;
      lodash.without = without;
      lodash.wrap = wrap;
      lodash.xor = xor;
      lodash.zip = zip;
      lodash.zipObject = zipObject;

      // add aliases
      lodash.collect = map;
      lodash.drop = rest;
      lodash.each = forEach;
      lodash.eachRight = forEachRight;
      lodash.extend = assign;
      lodash.methods = functions;
      lodash.object = zipObject;
      lodash.select = filter;
      lodash.tail = rest;
      lodash.unique = uniq;
      lodash.unzip = zip;

      // add functions to `lodash.prototype`
      mixin(lodash);

      /*--------------------------------------------------------------------------*/

      // add functions that return unwrapped values when chaining
      lodash.clone = clone;
      lodash.cloneDeep = cloneDeep;
      lodash.contains = contains;
      lodash.escape = escape;
      lodash.every = every;
      lodash.find = find;
      lodash.findIndex = findIndex;
      lodash.findKey = findKey;
      lodash.findLast = findLast;
      lodash.findLastIndex = findLastIndex;
      lodash.findLastKey = findLastKey;
      lodash.has = has;
      lodash.identity = identity;
      lodash.indexOf = indexOf;
      lodash.isArguments = isArguments;
      lodash.isArray = isArray;
      lodash.isBoolean = isBoolean;
      lodash.isDate = isDate;
      lodash.isElement = isElement;
      lodash.isEmpty = isEmpty;
      lodash.isEqual = isEqual;
      lodash.isFinite = isFinite;
      lodash.isFunction = isFunction;
      lodash.isNaN = isNaN;
      lodash.isNull = isNull;
      lodash.isNumber = isNumber;
      lodash.isObject = isObject;
      lodash.isPlainObject = isPlainObject;
      lodash.isRegExp = isRegExp;
      lodash.isString = isString;
      lodash.isUndefined = isUndefined;
      lodash.lastIndexOf = lastIndexOf;
      lodash.mixin = mixin;
      lodash.noConflict = noConflict;
      lodash.noop = noop;
      lodash.now = now;
      lodash.parseInt = parseInt;
      lodash.random = random;
      lodash.reduce = reduce;
      lodash.reduceRight = reduceRight;
      lodash.result = result;
      lodash.runInContext = runInContext;
      lodash.size = size;
      lodash.some = some;
      lodash.sortedIndex = sortedIndex;
      lodash.template = template;
      lodash.unescape = unescape;
      lodash.uniqueId = uniqueId;

      // add aliases
      lodash.all = every;
      lodash.any = some;
      lodash.detect = find;
      lodash.findWhere = find;
      lodash.foldl = reduce;
      lodash.foldr = reduceRight;
      lodash.include = contains;
      lodash.inject = reduce;

      mixin(function() {
        var source = {};
        forOwn(lodash, function(func, methodName) {
          if (!lodash.prototype[methodName]) {
            source[methodName] = func;
          }
        });
        return source;
      }(), false);

      /*--------------------------------------------------------------------------*/

      // add functions capable of returning wrapped and unwrapped values when chaining
      lodash.first = first;
      lodash.last = last;
      lodash.sample = sample;

      // add aliases
      lodash.take = first;
      lodash.head = first;

      forOwn(lodash, function(func, methodName) {
        var callbackable = methodName !== 'sample';
        if (!lodash.prototype[methodName]) {
          lodash.prototype[methodName]= function(n, guard) {
            var chainAll = this.__chain__,
                result = func(this.__wrapped__, n, guard);

            return !chainAll && (n == null || (guard && !(callbackable && typeof n == 'function')))
              ? result
              : new lodashWrapper(result, chainAll);
          };
        }
      });

      /*--------------------------------------------------------------------------*/

      /**
       * The semantic version number.
       *
       * @static
       * @memberOf _
       * @type string
       */
      lodash.VERSION = '2.4.2';

      // add "Chaining" functions to the wrapper
      lodash.prototype.chain = wrapperChain;
      lodash.prototype.toString = wrapperToString;
      lodash.prototype.value = wrapperValueOf;
      lodash.prototype.valueOf = wrapperValueOf;

      // add `Array` functions that return unwrapped values
      forEach(['join', 'pop', 'shift'], function(methodName) {
        var func = arrayRef[methodName];
        lodash.prototype[methodName] = function() {
          var chainAll = this.__chain__,
              result = func.apply(this.__wrapped__, arguments);

          return chainAll
            ? new lodashWrapper(result, chainAll)
            : result;
        };
      });

      // add `Array` functions that return the existing wrapped value
      forEach(['push', 'reverse', 'sort', 'unshift'], function(methodName) {
        var func = arrayRef[methodName];
        lodash.prototype[methodName] = function() {
          func.apply(this.__wrapped__, arguments);
          return this;
        };
      });

      // add `Array` functions that return new wrapped values
      forEach(['concat', 'slice', 'splice'], function(methodName) {
        var func = arrayRef[methodName];
        lodash.prototype[methodName] = function() {
          return new lodashWrapper(func.apply(this.__wrapped__, arguments), this.__chain__);
        };
      });

      return lodash;
    }

    /*--------------------------------------------------------------------------*/

    // expose Lo-Dash
    var _ = runInContext();

    // some AMD build optimizers like r.js check for condition patterns like the following:
    if (freeExports && freeModule) {
      // in Node.js or RingoJS
      if (moduleExports) {
        (freeModule.exports = _)._ = _;
      }
      // in Narwhal or Rhino -require
      else {
        freeExports._ = _;
      }
    }
    else {
      // in a browser or Rhino
      root._ = _;
    }
  }.call(commonjsGlobal));
  });

  function cannotRead() {
    throw new Error('Cannot read in a SynchronousWriteTransaction');
  }

  function SynchronousWriteTransaction() {}

  lodash.mixin(SynchronousWriteTransaction.prototype, {
    get: cannotRead,
    find: cannotRead,
    findOne: cannotRead,
    upsert: function upsert(_, result) {
      return result;
    },
    del: function del(_, result) {
      return result;
    },
    canPushTransaction: function canPushTransaction() {
      return false;
    }
  });

  var SynchronousWriteTransaction_1 = SynchronousWriteTransaction;

  var NullTransaction$1, ReadTransaction, SynchronousWriteTransaction$1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  NullTransaction$1 = NullTransaction_1;

  SynchronousWriteTransaction$1 = SynchronousWriteTransaction_1;

  ReadTransaction = (function(_super) {
    __extends(ReadTransaction, _super);

    function ReadTransaction() {
      this.dirtyIds = {};
      this.dirtyScans = {};
      this.log = [];
    }

    ReadTransaction.prototype._extractFragment = function(doc) {
      if (!doc) {
        return null;
      }
      return {
        _id: doc._id,
        _version: doc._version
      };
    };

    ReadTransaction.prototype.get = function(collectionName, result, _id) {
      this.dirtyIds[collectionName] = this.dirtyIds[collectionName] || {};
      this.dirtyIds[collectionName][_id] = true;
      this.log.push(this._extractFragment(result));
      return result;
    };

    ReadTransaction.prototype.find = function(collectionName, result) {
      this.dirtyScans[collectionName] = true;
      this.log.push(result.map(this._extractFragment));
      return result;
    };

    ReadTransaction.prototype.findOne = function(collectionName, result) {
      this.dirtyScans[collectionName] = true;
      this.log.push(this._extractFragment(result));
      return result;
    };

    ReadTransaction.prototype.canPushTransaction = function(transaction) {
      return transaction instanceof SynchronousWriteTransaction$1;
    };

    return ReadTransaction;

  })(NullTransaction$1);

  var ReadTransaction_1 = ReadTransaction;

  var ObservableRead, ReadTransaction$1, WithObservableReads, _;

  ReadTransaction$1 = ReadTransaction_1;

  _ = lodash;

  ObservableRead = (function() {
    function ObservableRead(db, func, context) {
      this.db = db;
      this.func = func;
      this.context = context;
      this.lastReadTransaction = null;
      this.lastValue = null;
      this.subscribers = [];
      this.changeListener = this.changeListener.bind(this);
      this.db.on('change', this.changeListener);
      this.rerunTransaction();
    }

    ObservableRead.prototype.subscribe = function(cb) {
      this.subscribers.push(cb);
      cb(this.lastValue);
      return this;
    };

    ObservableRead.prototype.dispose = function() {
      return this.db.removeListener('change', this.changeListener);
    };

    ObservableRead.prototype.rerunTransaction = function() {
      var nextReadTransaction, prevValue, value;
      nextReadTransaction = new ReadTransaction$1();
      value = this.db.withTransaction(nextReadTransaction, this.func, this.context);
      if (!this.lastReadTransaction || !_.isEqual(this.lastReadTransaction.log, nextReadTransaction.log)) {
        this.lastReadTransaction = nextReadTransaction;
        prevValue = this.lastValue;
        this.lastValue = value;
        return this.subscribers.forEach((function(cb) {
          cb(this.lastValue, prevValue);
        }), this);
      }
    };

    ObservableRead.prototype.changeListener = function(changeRecords) {
      var collectionName, dirtyIdsForCollection, documentFragment, documentFragments, i;
      if (!this.lastReadTransaction) {
        this.rerunTransaction();
        return;
      }
      for (collectionName in changeRecords) {
        if (this.lastReadTransaction.dirtyScans[collectionName]) {
          this.rerunTransaction();
          return;
        }
        dirtyIdsForCollection = this.lastReadTransaction.dirtyIds[collectionName] || {};
        documentFragments = changeRecords[collectionName];
        i = 0;
        while (i < documentFragments.length) {
          documentFragment = documentFragments[i];
          if (dirtyIdsForCollection[documentFragment._id]) {
            this.rerunTransaction();
            return;
          }
          i++;
        }
      }
    };

    return ObservableRead;

  })();

  WithObservableReads = {
    observe: function(func, context) {
      return new ObservableRead(this, func, context);
    }
  };

  var WithObservableReads_1 = WithObservableReads;

  var eventemitter3 = createCommonjsModule(function (module) {

  var has = Object.prototype.hasOwnProperty;

  //
  // We store our EE objects in a plain object whose properties are event names.
  // If `Object.create(null)` is not supported we prefix the event names with a
  // `~` to make sure that the built-in object properties are not overridden or
  // used as an attack vector.
  // We also assume that `Object.create(null)` is available when the event name
  // is an ES6 Symbol.
  //
  var prefix = typeof Object.create !== 'function' ? '~' : false;

  /**
   * Representation of a single EventEmitter function.
   *
   * @param {Function} fn Event handler to be called.
   * @param {Mixed} context Context for function execution.
   * @param {Boolean} [once=false] Only emit once
   * @api private
   */
  function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  }

  /**
   * Minimal EventEmitter interface that is molded against the Node.js
   * EventEmitter interface.
   *
   * @constructor
   * @api public
   */
  function EventEmitter() { /* Nothing to set */ }

  /**
   * Hold the assigned EventEmitters by name.
   *
   * @type {Object}
   * @private
   */
  EventEmitter.prototype._events = undefined;

  /**
   * Return an array listing the events for which the emitter has registered
   * listeners.
   *
   * @returns {Array}
   * @api public
   */
  EventEmitter.prototype.eventNames = function eventNames() {
    var events = this._events
      , names = []
      , name;

    if (!events) return names;

    for (name in events) {
      if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
    }

    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }

    return names;
  };

  /**
   * Return a list of assigned event listeners.
   *
   * @param {String} event The events that should be listed.
   * @param {Boolean} exists We only need to know if there are listeners.
   * @returns {Array|Boolean}
   * @api public
   */
  EventEmitter.prototype.listeners = function listeners(event, exists) {
    var evt = prefix ? prefix + event : event
      , available = this._events && this._events[evt];

    if (exists) return !!available;
    if (!available) return [];
    if (available.fn) return [available.fn];

    for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
      ee[i] = available[i].fn;
    }

    return ee;
  };

  /**
   * Emit an event to all registered event listeners.
   *
   * @param {String} event The name of the event.
   * @returns {Boolean} Indication if we've emitted an event.
   * @api public
   */
  EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;

    if (!this._events || !this._events[evt]) return false;

    var listeners = this._events[evt]
      , len = arguments.length
      , args
      , i;

    if ('function' === typeof listeners.fn) {
      if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

      switch (len) {
        case 1: return listeners.fn.call(listeners.context), true;
        case 2: return listeners.fn.call(listeners.context, a1), true;
        case 3: return listeners.fn.call(listeners.context, a1, a2), true;
        case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }

      for (i = 1, args = new Array(len -1); i < len; i++) {
        args[i - 1] = arguments[i];
      }

      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length
        , j;

      for (i = 0; i < length; i++) {
        if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

        switch (len) {
          case 1: listeners[i].fn.call(listeners[i].context); break;
          case 2: listeners[i].fn.call(listeners[i].context, a1); break;
          case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
          default:
            if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
              args[j - 1] = arguments[j];
            }

            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }

    return true;
  };

  /**
   * Register a new EventListener for the given event.
   *
   * @param {String} event Name of the event.
   * @param {Function} fn Callback function.
   * @param {Mixed} [context=this] The context of the function.
   * @api public
   */
  EventEmitter.prototype.on = function on(event, fn, context) {
    var listener = new EE(fn, context || this)
      , evt = prefix ? prefix + event : event;

    if (!this._events) this._events = prefix ? {} : Object.create(null);
    if (!this._events[evt]) this._events[evt] = listener;
    else {
      if (!this._events[evt].fn) this._events[evt].push(listener);
      else this._events[evt] = [
        this._events[evt], listener
      ];
    }

    return this;
  };

  /**
   * Add an EventListener that's only called once.
   *
   * @param {String} event Name of the event.
   * @param {Function} fn Callback function.
   * @param {Mixed} [context=this] The context of the function.
   * @api public
   */
  EventEmitter.prototype.once = function once(event, fn, context) {
    var listener = new EE(fn, context || this, true)
      , evt = prefix ? prefix + event : event;

    if (!this._events) this._events = prefix ? {} : Object.create(null);
    if (!this._events[evt]) this._events[evt] = listener;
    else {
      if (!this._events[evt].fn) this._events[evt].push(listener);
      else this._events[evt] = [
        this._events[evt], listener
      ];
    }

    return this;
  };

  /**
   * Remove event listeners.
   *
   * @param {String} event The event we want to remove.
   * @param {Function} fn The listener that we need to find.
   * @param {Mixed} context Only remove listeners matching this context.
   * @param {Boolean} once Only remove once listeners.
   * @api public
   */
  EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;

    if (!this._events || !this._events[evt]) return this;

    var listeners = this._events[evt]
      , events = [];

    if (fn) {
      if (listeners.fn) {
        if (
             listeners.fn !== fn
          || (once && !listeners.once)
          || (context && listeners.context !== context)
        ) {
          events.push(listeners);
        }
      } else {
        for (var i = 0, length = listeners.length; i < length; i++) {
          if (
               listeners[i].fn !== fn
            || (once && !listeners[i].once)
            || (context && listeners[i].context !== context)
          ) {
            events.push(listeners[i]);
          }
        }
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) {
      this._events[evt] = events.length === 1 ? events[0] : events;
    } else {
      delete this._events[evt];
    }

    return this;
  };

  /**
   * Remove all listeners or only the listeners for the specified event.
   *
   * @param {String} event The event want to remove all listeners for.
   * @api public
   */
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    if (!this._events) return this;

    if (event) delete this._events[prefix ? prefix + event : event];
    else this._events = prefix ? {} : Object.create(null);

    return this;
  };

  //
  // Alias methods names because people roll like that.
  //
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  //
  // This function doesn't apply anymore.
  //
  EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
    return this;
  };

  //
  // Expose the prefix.
  //
  EventEmitter.prefixed = prefix;

  //
  // Expose the module.
  //
  {
    module.exports = EventEmitter;
  }
  });

  var NullTransaction$2, ReadOnlyTransaction, WriteTransaction,
    __hasProp$1 = {}.hasOwnProperty,
    __extends$1 = function(child, parent) { for (var key in parent) { if (__hasProp$1.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  NullTransaction$2 = NullTransaction_1;

  WriteTransaction = WriteTransaction_1;

  ReadOnlyTransaction = (function(_super) {
    __extends$1(ReadOnlyTransaction, _super);

    function ReadOnlyTransaction() {
      return ReadOnlyTransaction.__super__.constructor.apply(this, arguments);
    }

    ReadOnlyTransaction.prototype.canPushTransaction = function(transaction) {
      return !(transaction instanceof WriteTransaction);
    };

    return ReadOnlyTransaction;

  })(NullTransaction$2);

  var ReadOnlyTransaction_1 = ReadOnlyTransaction;

  var NullTransaction$3, WriteTransaction$1,
    __hasProp$2 = {}.hasOwnProperty,
    __extends$2 = function(child, parent) { for (var key in parent) { if (__hasProp$2.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  NullTransaction$3 = NullTransaction_1;

  WriteTransaction$1 = (function(_super) {
    __extends$2(WriteTransaction, _super);

    function WriteTransaction(db) {
      this.db = db;
      this.dirtyIds = {};
      this.queued = false;
      this.traces = {};
    }

    WriteTransaction.prototype._ensureQueued = function() {
      if (this.db.debug) {
        this.traces[new Error().stack.split('\n').slice(1).join('\n')] = true;
      }
      if (!this.queued) {
        this.queued = true;
        return process.nextTick((function(_this) {
          return function() {
            return _this._flush();
          };
        })(this));
      }
    };

    WriteTransaction.prototype.upsert = function(collectionName, result, docs) {
      if (!Array.isArray(docs)) {
        docs = [docs];
      }
      this.dirtyIds[collectionName] = this.dirtyIds[collectionName] || {};
      docs.forEach((function(_this) {
        return function(doc) {
          return _this.dirtyIds[collectionName][doc._id] = true;
        };
      })(this));
      this._ensureQueued();
      return result;
    };

    WriteTransaction.prototype.del = function(collectionName, result, id) {
      this.dirtyIds[collectionName] = this.dirtyIds[collectionName] || {};
      this.dirtyIds[collectionName][id] = true;
      this._ensureQueued();
      return result;
    };

    WriteTransaction.prototype.canPushTransaction = function(transaction) {
      return true;
    };

    WriteTransaction.prototype._flush = function() {
      var ReadOnlyTransaction, changeRecords, collectionName, documentFragments, id, ids, version, _ref;
      ReadOnlyTransaction = ReadOnlyTransaction_1;
      changeRecords = {};
      _ref = this.dirtyIds;
      for (collectionName in _ref) {
        ids = _ref[collectionName];
        documentFragments = [];
        for (id in ids) {
          version = this.db.collections[collectionName].versions[id];
          documentFragments.push({
            _id: id,
            _version: version
          });
        }
        changeRecords[collectionName] = documentFragments;
      }
      this.dirtyIds = {};
      this.queued = false;
      return this.db.batchedUpdates((function(_this) {
        return function() {
          return _this.db.withTransaction(new ReadOnlyTransaction(), function() {
            var e, prev_prepare, traces;
            if (_this.db.debug) {
              traces = _this.traces;
              _this.traces = {};
              prev_prepare = Error.prepareStackTrace;
              Error.prepareStackTrace = function(e) {
                var stack, trace;
                stack = e.stack;
                for (trace in traces) {
                  stack += '\nFrom observed write:\n' + trace;
                }
                return stack;
              };
              try {
                return _this.db.emit('change', changeRecords);
              } catch (_error) {
                e = _error;
                return _this.db.uncaughtExceptionHandler(e);
              } finally {
                Error.prepareStackTrace = prev_prepare;
              }
            } else {
              try {
                return _this.db.emit('change', changeRecords);
              } catch (_error) {
                e = _error;
                return _this.db.uncaughtExceptionHandler(e);
              }
            }
          });
        };
      })(this));
    };

    return WriteTransaction;

  })(NullTransaction$3);

  var WriteTransaction_1 = WriteTransaction$1;

  var EventEmitter$1, WithObservableWrites, WriteTransaction$2, _$1;

  EventEmitter$1 = eventemitter3;

  WriteTransaction$2 = WriteTransaction_1;

  _$1 = lodash;

  WithObservableWrites = {
    getDefaultTransaction: function() {
      this.setMaxListeners(0);
      return new WriteTransaction$2(this);
    }
  };

  _$1.mixin(WithObservableWrites, EventEmitter$1.prototype);

  var WithObservableWrites_1 = WithObservableWrites;

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  /**
   * Use invariant() to assert state which your program assumes to be true.
   *
   * Provide sprintf-style format (only %s is supported) and arguments
   * to provide information about what broke and what you were
   * expecting.
   *
   * The invariant message will be stripped in production, but the invariant
   * will remain to ensure logic does not differ in production.
   */

  var NODE_ENV = process.env.NODE_ENV;

  var invariant = function(condition, format, a, b, c, d, e, f) {
    if (NODE_ENV !== 'production') {
      if (format === undefined) {
        throw new Error('invariant requires an error message argument');
      }
    }

    if (!condition) {
      var error;
      if (format === undefined) {
        error = new Error(
          'Minified exception occurred; use the non-minified dev environment ' +
          'for the full error message and additional helpful warnings.'
        );
      } else {
        var args = [a, b, c, d, e, f];
        var argIndex = 0;
        error = new Error(
          format.replace(/%s/g, function() { return args[argIndex++]; })
        );
        error.name = 'Invariant Violation';
      }

      error.framesToPop = 1; // we don't care about invariant's own frame
      throw error;
    }
  };

  var invariant_1 = invariant;

  var WithReactMixin, createMixin, invariant$1;

  invariant$1 = invariant_1;

  createMixin = function(db) {
    var Mixin;
    return Mixin = {
      componentWillMount: function() {
        invariant$1(this.observeData != null, 'You must implement observeData: ' + this.constructor.displayName);
        this.subscription = null;
        this.prevData = null;
        this.data = {};
        if (this.shouldComponentUpdate != null) {
          this._userShouldComponentUpdate = this.shouldComponentUpdate;
          this.shouldComponentUpdate = this._shouldComponentUpdate;
        }
        return this._refresh();
      },
      _shouldComponentUpdate: function(nextProps, nextState, nextContext) {
        var nextData;
        nextData = this.data;
        this.data = this.prevData;
        try {
          return this._userShouldComponentUpdate(nextProps, nextState, nextData, nextContext);
        } finally {
          this.data = nextData;
          this.prevData = this.data;
        }
      },
      _refresh: function() {
        if (this.subscription) {
          this.subscription.dispose();
        }
        this.subscription = db.observe(this.observeData);
        return this.subscription.subscribe(this._setData);
      },
      _setData: function(nextData, prevData) {
        if (this.componentWillReceiveData) {
          this.componentWillReceiveData(nextData);
        }
        this.prevData = this.data;
        this.data = nextData;
        if (prevData) {
          return this.setState({});
        }
      },
      componentWillUpdate: function(nextProps, nextState) {
        var prevProps, prevState;
        prevProps = this.props;
        prevState = this.state;
        this.props = nextProps;
        this.state = nextState;
        try {
          return this._refresh();
        } finally {
          this.props = prevProps;
          this.state = prevState;
        }
      },
      componentWillUnmount: function() {
        if (this.subscription) {
          return this.subscription.dispose();
        }
      }
    };
  };

  WithReactMixin = {
    getReactMixin: function() {
      if (this.mixin == null) {
        this.mixin = createMixin(this);
      }
      return this.mixin;
    }
  };

  var WithReactMixin_1 = WithReactMixin;

  var _createClass$1 = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }






  var ServerQuery = (function () {
    function ServerQuery(cache, key) {
      _classCallCheck$1(this, ServerQuery);

      this.cache = cache;
      this.key = key;

      this.mounted = false;
      this.querying = false;
    }

    _createClass$1(ServerQuery, [{
      key: 'getInitialState',
      value: function getInitialState() {
        return {};
      }
    }, {
      key: 'queryDidMount',
      value: function queryDidMount() {}
    }, {
      key: 'queryDidUpdate',
      value: function queryDidUpdate(prevProps) {}
    }, {
      key: 'query',
      value: function query() {
        throw new Error('ServerQuery.query() not implemented');
      }
    }, {
      key: 'setState',
      value: function setState(updates) {
        var _this = this;

        var mergedState = lodash.assign({}, this.state, updates);
        var cb = function cb() {
          _this.cache.serverQueries.upsert({
            _id: _this.key,
            state: mergedState
          });
        };

        this.state = mergedState;

        if (this.querying) {
          this.cache.withTransaction(new SynchronousWriteTransaction_1(), cb);
        } else {
          cb();
        }
      }
    }, {
      key: 'execute',
      value: function execute(props) {
        this.querying = true;
        try {
          if (!this.mounted) {
            this.props = props;
            this.state = this.getInitialState();
            this.setState(this.state);
            this.state = this.cache.serverQueries.get(this.key).state;
            this.mounted = true;
            this.queryDidMount();
          } else {
            var prevProps = this.props;
            var prevState = this.state;
            this.props = props;
            this.state = this.cache.serverQueries.get(this.key).state;
            this.queryDidUpdate(prevProps, prevState);
          }

          return this.query();
        } finally {
          this.querying = false;
        }
      }
    }]);

    return ServerQuery;
  })();

  function createNewServerQuery(cache, key, spec) {
    invariant_1(spec.hasOwnProperty('query'), 'You must implement query()');

    if (!cache.hasOwnProperty('serverQueries')) {
      cache.addCollection('serverQueries');
    }

    var serverQuery = new ServerQuery(cache, key);
    lodash.mixin(serverQuery, spec);

    return serverQuery;
  }

  var serverQueries = {};
  var numTypes = 0;

  var WithServerQuery = {
    createServerQuery: function createServerQuery(spec) {
      var cache = this;
      invariant_1(spec.hasOwnProperty('statics'), 'spec must have statics property');
      invariant_1(spec.statics.hasOwnProperty('getKey'), 'statics.getKey must be a function');

      var typeId = numTypes++;

      function getInstance(props) {
        var key = spec.statics.getKey(props);
        invariant_1(typeof key === 'string', 'You must return a string key');
        key = typeId + '~' + key;
        if (!serverQueries.hasOwnProperty(key)) {
          serverQueries[key] = createNewServerQuery(cache, key, spec);
        }
        return serverQueries[key];
      }

      function serverQuery(props) {
        return getInstance(props).execute(props);
      }

      serverQuery.getInstance = getInstance;

      return serverQuery;
    }
  };

  var WithServerQuery_1 = WithServerQuery;

  function _typeof$1(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }



  var EJSON$1 = {}; // Global!
  var customTypes = {};
  // Add a custom type, using a method of your choice to get to and
  // from a basic JSON-able representation.  The factory argument
  // is a function of JSON-able --> your object
  // The type you add must have:
  // - A clone() method, so that Meteor can deep-copy it when necessary.
  // - A equals() method, so that Meteor can compare it
  // - A toJSONValue() method, so that Meteor can serialize it
  // - a typeName() method, to show how to look it up in our type table.
  // It is okay if these methods are monkey-patched on.
  EJSON$1.addType = function (name, factory) {
    if (lodash.has(customTypes, name)) throw new Error("Type " + name + " already present");
    customTypes[name] = factory;
  };

  var builtinConverters = [{ // Date
    matchJSONValue: function matchJSONValue(obj) {
      return lodash.has(obj, '$date') && lodash.size(obj) === 1;
    },
    matchObject: function matchObject(obj) {
      return obj instanceof Date;
    },
    toJSONValue: function toJSONValue(obj) {
      return { $date: obj.getTime() };
    },
    fromJSONValue: function fromJSONValue(obj) {
      return new Date(obj.$date);
    }
  }, { // Binary
    matchJSONValue: function matchJSONValue(obj) {
      return lodash.has(obj, '$binary') && lodash.size(obj) === 1;
    },
    matchObject: function matchObject(obj) {
      return typeof Uint8Array !== 'undefined' && obj instanceof Uint8Array || obj && lodash.has(obj, '$Uint8ArrayPolyfill');
    },
    toJSONValue: function toJSONValue(obj) {
      return { $binary: EJSON$1._base64Encode(obj) };
    },
    fromJSONValue: function fromJSONValue(obj) {
      return EJSON$1._base64Decode(obj.$binary);
    }
  }, { // Escaping one level
    matchJSONValue: function matchJSONValue(obj) {
      return lodash.has(obj, '$escape') && lodash.size(obj) === 1;
    },
    matchObject: function matchObject(obj) {
      if (lodash.isEmpty(obj) || lodash.size(obj) > 2) {
        return false;
      }
      return lodash.any(builtinConverters, function (converter) {
        return converter.matchJSONValue(obj);
      });
    },
    toJSONValue: function toJSONValue(obj) {
      var newObj = {};
      lodash.each(obj, function (value, key) {
        newObj[key] = EJSON$1.toJSONValue(value);
      });
      return { $escape: newObj };
    },
    fromJSONValue: function fromJSONValue(obj) {
      var newObj = {};
      lodash.each(obj.$escape, function (value, key) {
        newObj[key] = EJSON$1.fromJSONValue(value);
      });
      return newObj;
    }
  }, { // Custom
    matchJSONValue: function matchJSONValue(obj) {
      return lodash.has(obj, '$type') && lodash.has(obj, '$value') && lodash.size(obj) === 2;
    },
    matchObject: function matchObject(obj) {
      return EJSON$1._isCustomType(obj);
    },
    toJSONValue: function toJSONValue(obj) {
      return { $type: obj.typeName(), $value: obj.toJSONValue() };
    },
    fromJSONValue: function fromJSONValue(obj) {
      var typeName = obj.$type;
      var converter = customTypes[typeName];
      return converter(obj.$value);
    }
  }];

  EJSON$1._isCustomType = function (obj) {
    return obj && typeof obj.toJSONValue === 'function' && typeof obj.typeName === 'function' && lodash.has(customTypes, obj.typeName());
  };

  //for both arrays and objects, in-place modification.
  var adjustTypesToJSONValue = EJSON$1._adjustTypesToJSONValue = function (obj) {
    if (obj === null) return null;
    var maybeChanged = toJSONValueHelper(obj);
    if (maybeChanged !== undefined) return maybeChanged;
    lodash.each(obj, function (value, key) {
      if ((typeof value === "undefined" ? "undefined" : _typeof$1(value)) !== 'object' && value !== undefined) return; // continue
      var changed = toJSONValueHelper(value);
      if (changed) {
        obj[key] = changed;
        return; // on to the next key
      }
      // if we get here, value is an object but not adjustable
      // at this level.  recurse.
      adjustTypesToJSONValue(value);
    });
    return obj;
  };

  // Either return the JSON-compatible version of the argument, or undefined (if
  // the item isn't itself replaceable, but maybe some fields in it are)
  var toJSONValueHelper = function toJSONValueHelper(item) {
    for (var i = 0; i < builtinConverters.length; i++) {
      var converter = builtinConverters[i];
      if (converter.matchObject(item)) {
        return converter.toJSONValue(item);
      }
    }
    return undefined;
  };

  EJSON$1.toJSONValue = function (item) {
    var changed = toJSONValueHelper(item);
    if (changed !== undefined) return changed;
    if ((typeof item === "undefined" ? "undefined" : _typeof$1(item)) === 'object') {
      item = EJSON$1.clone(item);
      adjustTypesToJSONValue(item);
    }
    return item;
  };

  //for both arrays and objects. Tries its best to just
  // use the object you hand it, but may return something
  // different if the object you hand it itself needs changing.
  var adjustTypesFromJSONValue = EJSON$1._adjustTypesFromJSONValue = function (obj) {
    if (obj === null) return null;
    var maybeChanged = fromJSONValueHelper(obj);
    if (maybeChanged !== obj) return maybeChanged;
    lodash.each(obj, function (value, key) {
      if ((typeof value === "undefined" ? "undefined" : _typeof$1(value)) === 'object') {
        var changed = fromJSONValueHelper(value);
        if (value !== changed) {
          obj[key] = changed;
          return;
        }
        // if we get here, value is an object but not adjustable
        // at this level.  recurse.
        adjustTypesFromJSONValue(value);
      }
    });
    return obj;
  };

  // Either return the argument changed to have the non-json
  // rep of itself (the Object version) or the argument itself.

  // DOES NOT RECURSE.  For actually getting the fully-changed value, use
  // EJSON.fromJSONValue
  var fromJSONValueHelper = function fromJSONValueHelper(value) {
    if ((typeof value === "undefined" ? "undefined" : _typeof$1(value)) === 'object' && value !== null) {
      if (lodash.size(value) <= 2 && lodash.all(value, function (v, k) {
        return typeof k === 'string' && k.substr(0, 1) === '$';
      })) {
        for (var i = 0; i < builtinConverters.length; i++) {
          var converter = builtinConverters[i];
          if (converter.matchJSONValue(value)) {
            return converter.fromJSONValue(value);
          }
        }
      }
    }
    return value;
  };

  EJSON$1.fromJSONValue = function (item) {
    var changed = fromJSONValueHelper(item);
    if (changed === item && (typeof item === "undefined" ? "undefined" : _typeof$1(item)) === 'object') {
      item = EJSON$1.clone(item);
      adjustTypesFromJSONValue(item);
      return item;
    } else {
      return changed;
    }
  };

  EJSON$1.stringify = function (item) {
    return JSON.stringify(EJSON$1.toJSONValue(item));
  };

  EJSON$1.parse = function (item) {
    return EJSON$1.fromJSONValue(JSON.parse(item));
  };

  EJSON$1.isBinary = function (obj) {
    return typeof Uint8Array !== 'undefined' && obj instanceof Uint8Array || obj && obj.$Uint8ArrayPolyfill;
  };

  EJSON$1.equals = function (a, b, options) {
    var i;
    var keyOrderSensitive = !!(options && options.keyOrderSensitive);
    if (a === b) return true;
    if (!a || !b) // if either one is falsy, they'd have to be === to be equal
      return false;
    if (!((typeof a === "undefined" ? "undefined" : _typeof$1(a)) === 'object' && (typeof b === "undefined" ? "undefined" : _typeof$1(b)) === 'object')) return false;
    if (a instanceof Date && b instanceof Date) return a.valueOf() === b.valueOf();
    if (EJSON$1.isBinary(a) && EJSON$1.isBinary(b)) {
      if (a.length !== b.length) return false;
      for (i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }
    if (typeof a.equals === 'function') return a.equals(b, options);
    if (a instanceof Array) {
      if (!(b instanceof Array)) return false;
      if (a.length !== b.length) return false;
      for (i = 0; i < a.length; i++) {
        if (!EJSON$1.equals(a[i], b[i], options)) return false;
      }
      return true;
    }
    // fall back to structural equality of objects
    var ret;
    if (keyOrderSensitive) {
      var bKeys = [];
      lodash.each(b, function (val, x) {
        bKeys.push(x);
      });
      i = 0;
      ret = lodash.all(a, function (val, x) {
        if (i >= bKeys.length) {
          return false;
        }
        if (x !== bKeys[i]) {
          return false;
        }
        if (!EJSON$1.equals(val, b[bKeys[i]], options)) {
          return false;
        }
        i++;
        return true;
      });
      return ret && i === bKeys.length;
    } else {
      i = 0;
      ret = lodash.all(a, function (val, key) {
        if (!lodash.has(b, key)) {
          return false;
        }
        if (!EJSON$1.equals(val, b[key], options)) {
          return false;
        }
        i++;
        return true;
      });
      return ret && lodash.size(b) === i;
    }
  };

  EJSON$1.clone = function (v) {
    var ret;
    if ((typeof v === "undefined" ? "undefined" : _typeof$1(v)) !== "object") return v;
    if (v === null) return null; // null has typeof "object"
    if (v instanceof Date) return new Date(v.getTime());
    if (EJSON$1.isBinary(v)) {
      ret = EJSON$1.newBinary(v.length);
      for (var i = 0; i < v.length; i++) {
        ret[i] = v[i];
      }
      return ret;
    }
    if (lodash.isArray(v) || lodash.isArguments(v)) {
      // For some reason, _.map doesn't work in this context on Opera (weird test
      // failures).
      ret = [];
      for (i = 0; i < v.length; i++) {
        ret[i] = EJSON$1.clone(v[i]);
      }return ret;
    }
    // handle general user-defined typed Objects if they have a clone method
    if (typeof v.clone === 'function') {
      return v.clone();
    }
    // handle other objects
    ret = {};
    lodash.each(v, function (value, key) {
      ret[key] = EJSON$1.clone(value);
    });
    return ret;
  };

  var EJSON_1 = EJSON$1;

  function _typeof$2(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

  /*
  ========================================
  Meteor is licensed under the MIT License
  ========================================

  Copyright (C) 2011--2012 Meteor Development Group

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


  ====================================================================
  This license applies to all code in Meteor that is not an externally
  maintained library. Externally maintained libraries have their own
  licenses, included below:
  ====================================================================

  */

  var LocalCollection = {};



  // Like _.isArray, but doesn't regard polyfilled Uint8Arrays on old browsers as
  // arrays.
  var isArray = function isArray(x) {
    return lodash.isArray(x) && !EJSON_1.isBinary(x);
  };

  var _anyIfArray = function _anyIfArray(x, f) {
    if (isArray(x)) return lodash.any(x, f);
    return f(x);
  };

  var _anyIfArrayPlus = function _anyIfArrayPlus(x, f) {
    if (f(x)) return true;
    return isArray(x) && lodash.any(x, f);
  };

  var hasOperators = function hasOperators(valueSelector) {
    var theseAreOperators = undefined;
    for (var selKey in valueSelector) {
      var thisIsOperator = selKey.substr(0, 1) === '$';
      if (theseAreOperators === undefined) {
        theseAreOperators = thisIsOperator;
      } else if (theseAreOperators !== thisIsOperator) {
        throw new Error("Inconsistent selector: " + valueSelector);
      }
    }
    return !!theseAreOperators; // {} has no operators
  };

  var compileValueSelector = function compileValueSelector(valueSelector) {
    if (valueSelector == null) {
      // undefined or null
      return function (value) {
        return _anyIfArray(value, function (x) {
          return x == null; // undefined or null
        });
      };
    }

    // Selector is a non-null primitive (and not an array or RegExp either).
    if (!lodash.isObject(valueSelector)) {
      return function (value) {
        return _anyIfArray(value, function (x) {
          return x === valueSelector;
        });
      };
    }

    if (valueSelector instanceof RegExp) {
      return function (value) {
        if (value === undefined) return false;
        return _anyIfArray(value, function (x) {
          return valueSelector.test(x);
        });
      };
    }

    // Arrays match either identical arrays or arrays that contain it as a value.
    if (isArray(valueSelector)) {
      return function (value) {
        if (!isArray(value)) return false;
        return _anyIfArrayPlus(value, function (x) {
          return LocalCollection._f._equal(valueSelector, x);
        });
      };
    }

    // It's an object, but not an array or regexp.
    if (hasOperators(valueSelector)) {
      var operatorFunctions = [];
      lodash.each(valueSelector, function (operand, operator) {
        if (!lodash.has(VALUE_OPERATORS, operator)) throw new Error("Unrecognized operator: " + operator);
        operatorFunctions.push(VALUE_OPERATORS[operator](operand, valueSelector.$options));
      });
      return function (value) {
        return lodash.all(operatorFunctions, function (f) {
          return f(value);
        });
      };
    }

    // It's a literal; compare value (or element of value array) directly to the
    // selector.
    return function (value) {
      return _anyIfArray(value, function (x) {
        return LocalCollection._f._equal(valueSelector, x);
      });
    };
  };

  // XXX can factor out common logic below
  var LOGICAL_OPERATORS = {
    "$and": function $and(subSelector) {
      if (!isArray(subSelector) || lodash.isEmpty(subSelector)) throw Error("$and/$or/$nor must be nonempty array");
      var subSelectorFunctions = lodash.map(subSelector, compileDocumentSelector);
      return function (doc) {
        return lodash.all(subSelectorFunctions, function (f) {
          return f(doc);
        });
      };
    },

    "$or": function $or(subSelector) {
      if (!isArray(subSelector) || lodash.isEmpty(subSelector)) throw Error("$and/$or/$nor must be nonempty array");
      var subSelectorFunctions = lodash.map(subSelector, compileDocumentSelector);
      return function (doc) {
        return lodash.any(subSelectorFunctions, function (f) {
          return f(doc);
        });
      };
    },

    "$nor": function $nor(subSelector) {
      if (!isArray(subSelector) || lodash.isEmpty(subSelector)) throw Error("$and/$or/$nor must be nonempty array");
      var subSelectorFunctions = lodash.map(subSelector, compileDocumentSelector);
      return function (doc) {
        return lodash.all(subSelectorFunctions, function (f) {
          return !f(doc);
        });
      };
    },

    "$where": function $where(selectorValue) {
      if (!(selectorValue instanceof Function)) {
        selectorValue = Function("return " + selectorValue);
      }
      return function (doc) {
        return selectorValue.call(doc);
      };
    }
  };

  var VALUE_OPERATORS = {
    "$in": function $in(operand) {
      if (!isArray(operand)) throw new Error("Argument to $in must be array");
      return function (value) {
        return _anyIfArrayPlus(value, function (x) {
          return lodash.any(operand, function (operandElt) {
            return LocalCollection._f._equal(operandElt, x);
          });
        });
      };
    },

    "$all": function $all(operand) {
      if (!isArray(operand)) throw new Error("Argument to $all must be array");
      return function (value) {
        if (!isArray(value)) return false;
        return lodash.all(operand, function (operandElt) {
          return lodash.any(value, function (valueElt) {
            return LocalCollection._f._equal(operandElt, valueElt);
          });
        });
      };
    },

    "$lt": function $lt(operand) {
      return function (value) {
        return _anyIfArray(value, function (x) {
          return LocalCollection._f._cmp(x, operand) < 0;
        });
      };
    },

    "$lte": function $lte(operand) {
      return function (value) {
        return _anyIfArray(value, function (x) {
          return LocalCollection._f._cmp(x, operand) <= 0;
        });
      };
    },

    "$gt": function $gt(operand) {
      return function (value) {
        return _anyIfArray(value, function (x) {
          return LocalCollection._f._cmp(x, operand) > 0;
        });
      };
    },

    "$gte": function $gte(operand) {
      return function (value) {
        return _anyIfArray(value, function (x) {
          return LocalCollection._f._cmp(x, operand) >= 0;
        });
      };
    },

    "$ne": function $ne(operand) {
      return function (value) {
        return !_anyIfArrayPlus(value, function (x) {
          return LocalCollection._f._equal(x, operand);
        });
      };
    },

    "$nin": function $nin(operand) {
      if (!isArray(operand)) throw new Error("Argument to $nin must be array");
      var inFunction = VALUE_OPERATORS.$in(operand);
      return function (value) {
        // Field doesn't exist, so it's not-in operand
        if (value === undefined) return true;
        return !inFunction(value);
      };
    },

    "$exists": function $exists(operand) {
      return function (value) {
        return operand === (value !== undefined);
      };
    },

    "$mod": function $mod(operand) {
      var divisor = operand[0],
          remainder = operand[1];
      return function (value) {
        return _anyIfArray(value, function (x) {
          return x % divisor === remainder;
        });
      };
    },

    "$size": function $size(operand) {
      return function (value) {
        return isArray(value) && operand === value.length;
      };
    },

    "$type": function $type(operand) {
      return function (value) {
        // A nonexistent field is of no type.
        if (value === undefined) return false;
        // Definitely not _anyIfArrayPlus: $type: 4 only matches arrays that have
        // arrays as elements according to the Mongo docs.
        return _anyIfArray(value, function (x) {
          return LocalCollection._f._type(x) === operand;
        });
      };
    },

    "$regex": function $regex(operand, options) {
      if (options !== undefined) {
        // Options passed in $options (even the empty string) always overrides
        // options in the RegExp object itself.

        // Be clear that we only support the JS-supported options, not extended
        // ones (eg, Mongo supports x and s). Ideally we would implement x and s
        // by transforming the regexp, but not today...
        if (/[^gim]/.test(options)) throw new Error("Only the i, m, and g regexp options are supported");

        var regexSource = operand instanceof RegExp ? operand.source : operand;
        operand = new RegExp(regexSource, options);
      } else if (!(operand instanceof RegExp)) {
        operand = new RegExp(operand);
      }

      return function (value) {
        if (value === undefined) return false;
        return _anyIfArray(value, function (x) {
          return operand.test(x);
        });
      };
    },

    "$options": function $options(operand) {
      // evaluation happens at the $regex function above
      return function (value) {
        return true;
      };
    },

    "$elemMatch": function $elemMatch(operand) {
      var matcher = compileDocumentSelector(operand);
      return function (value) {
        if (!isArray(value)) return false;
        return lodash.any(value, function (x) {
          return matcher(x);
        });
      };
    },

    "$not": function $not(operand) {
      var matcher = compileValueSelector(operand);
      return function (value) {
        return !matcher(value);
      };
    },

    "$near": function $near(operand) {
      // Always returns true. Must be handled in post-filter/sort/limit
      return function (value) {
        return true;
      };
    },

    "$geoIntersects": function $geoIntersects(operand) {
      // Always returns true. Must be handled in post-filter/sort/limit
      return function (value) {
        return true;
      };
    }

  };

  // helpers used by compiled selector code
  LocalCollection._f = {
    // XXX for _all and _in, consider building 'inquery' at compile time..

    _type: function _type(v) {
      if (typeof v === "number") return 1;
      if (typeof v === "string") return 2;
      if (typeof v === "boolean") return 8;
      if (isArray(v)) return 4;
      if (v === null) return 10;
      if (v instanceof RegExp) return 11;
      if (typeof v === "function")
        // note that typeof(/x/) === "function"
        return 13;
      if (v instanceof Date) return 9;
      if (EJSON_1.isBinary(v)) return 5;
      return 3; // object

      // XXX support some/all of these:
      // 14, symbol
      // 15, javascript code with scope
      // 16, 18: 32-bit/64-bit integer
      // 17, timestamp
      // 255, minkey
      // 127, maxkey
    },

    // deep equality test: use for literal document and array matches
    _equal: function _equal(a, b) {
      return EJSON_1.equals(a, b, { keyOrderSensitive: true });
    },

    // maps a type code to a value that can be used to sort values of
    // different types
    _typeorder: function _typeorder(t) {
      // http://www.mongodb.org/display/DOCS/What+is+the+Compare+Order+for+BSON+Types
      // XXX what is the correct sort position for Javascript code?
      // ('100' in the matrix below)
      // XXX minkey/maxkey
      return [-1, // (not a type)
      1, // number
      2, // string
      3, // object
      4, // array
      5, // binary
      -1, // deprecated
      6, // ObjectID
      7, // bool
      8, // Date
      0, // null
      9, // RegExp
      -1, // deprecated
      100, // JS code
      2, // deprecated (symbol)
      100, // JS code
      1, // 32-bit int
      8, // Mongo timestamp
      1 // 64-bit int
      ][t];
    },

    // compare two values of unknown type according to BSON ordering
    // semantics. (as an extension, consider 'undefined' to be less than
    // any other value.) return negative if a is less, positive if b is
    // less, or 0 if equal
    _cmp: function _cmp(a, b) {
      if (a === undefined) return b === undefined ? 0 : -1;
      if (b === undefined) return 1;
      var ta = LocalCollection._f._type(a);
      var tb = LocalCollection._f._type(b);
      var oa = LocalCollection._f._typeorder(ta);
      var ob = LocalCollection._f._typeorder(tb);
      if (oa !== ob) return oa < ob ? -1 : 1;
      if (ta !== tb)
        // XXX need to implement this if we implement Symbol or integers, or
        // Timestamp
        throw Error("Missing type coercion logic in _cmp");
      if (ta === 7) {
        // ObjectID
        // Convert to string.
        ta = tb = 2;
        a = a.toHexString();
        b = b.toHexString();
      }
      if (ta === 9) {
        // Date
        // Convert to millis.
        ta = tb = 1;
        a = a.getTime();
        b = b.getTime();
      }

      if (ta === 1) // double
        return a - b;
      if (tb === 2) // string
        return a < b ? -1 : a === b ? 0 : 1;
      if (ta === 3) {
        // Object
        // this could be much more efficient in the expected case ...
        var to_array = function to_array(obj) {
          var ret = [];
          for (var key in obj) {
            ret.push(key);
            ret.push(obj[key]);
          }
          return ret;
        };
        return LocalCollection._f._cmp(to_array(a), to_array(b));
      }
      if (ta === 4) {
        // Array
        for (var i = 0;; i++) {
          if (i === a.length) return i === b.length ? 0 : -1;
          if (i === b.length) return 1;
          var s = LocalCollection._f._cmp(a[i], b[i]);
          if (s !== 0) return s;
        }
      }
      if (ta === 5) {
        // binary
        // Surprisingly, a small binary blob is always less than a large one in
        // Mongo.
        if (a.length !== b.length) return a.length - b.length;
        for (i = 0; i < a.length; i++) {
          if (a[i] < b[i]) return -1;
          if (a[i] > b[i]) return 1;
        }
        return 0;
      }
      if (ta === 8) {
        // boolean
        if (a) return b ? 0 : 1;
        return b ? -1 : 0;
      }
      if (ta === 10) // null
        return 0;
      if (ta === 11) // regexp
        throw Error("Sorting not supported on regular expression"); // XXX
      // 13: javascript code
      // 14: symbol
      // 15: javascript code with scope
      // 16: 32-bit integer
      // 17: timestamp
      // 18: 64-bit integer
      // 255: minkey
      // 127: maxkey
      if (ta === 13) // javascript code
        throw Error("Sorting not supported on Javascript code"); // XXX
      throw Error("Unknown type to sort");
    }
  };

  // For unit tests. True if the given document matches the given
  // selector.
  LocalCollection._matches = function (selector, doc) {
    return LocalCollection._compileSelector(selector)(doc);
  };

  // _makeLookupFunction(key) returns a lookup function.
  //
  // A lookup function takes in a document and returns an array of matching
  // values.  This array has more than one element if any segment of the key other
  // than the last one is an array.  ie, any arrays found when doing non-final
  // lookups result in this function "branching"; each element in the returned
  // array represents the value found at this branch. If any branch doesn't have a
  // final value for the full key, its element in the returned list will be
  // undefined. It always returns a non-empty array.
  //
  // _makeLookupFunction('a.x')({a: {x: 1}}) returns [1]
  // _makeLookupFunction('a.x')({a: {x: [1]}}) returns [[1]]
  // _makeLookupFunction('a.x')({a: 5})  returns [undefined]
  // _makeLookupFunction('a.x')({a: [{x: 1},
  //                                 {x: [2]},
  //                                 {y: 3}]})
  //   returns [1, [2], undefined]
  LocalCollection._makeLookupFunction = function (key) {
    var dotLocation = key.indexOf('.');
    var first, lookupRest, nextIsNumeric;
    if (dotLocation === -1) {
      first = key;
    } else {
      first = key.substr(0, dotLocation);
      var rest = key.substr(dotLocation + 1);
      lookupRest = LocalCollection._makeLookupFunction(rest);
      // Is the next (perhaps final) piece numeric (ie, an array lookup?)
      nextIsNumeric = /^\d+(\.|$)/.test(rest);
    }

    return function (doc) {
      if (doc == null) // null or undefined
        return [undefined];
      var firstLevel = doc[first];

      // We don't "branch" at the final level.
      if (!lookupRest) return [firstLevel];

      // It's an empty array, and we're not done: we won't find anything.
      if (isArray(firstLevel) && firstLevel.length === 0) return [undefined];

      // For each result at this level, finish the lookup on the rest of the key,
      // and return everything we find. Also, if the next result is a number,
      // don't branch here.
      //
      // Technically, in MongoDB, we should be able to handle the case where
      // objects have numeric keys, but Mongo doesn't actually handle this
      // consistently yet itself, see eg
      // https://jira.mongodb.org/browse/SERVER-2898
      // https://github.com/mongodb/mongo/blob/master/jstests/array_match2.js
      if (!isArray(firstLevel) || nextIsNumeric) firstLevel = [firstLevel];
      return Array.prototype.concat.apply([], lodash.map(firstLevel, lookupRest));
    };
  };

  // The main compilation function for a given selector.
  var compileDocumentSelector = function compileDocumentSelector(docSelector) {
    var perKeySelectors = [];
    lodash.each(docSelector, function (subSelector, key) {
      if (key.substr(0, 1) === '$') {
        // Outer operators are either logical operators (they recurse back into
        // this function), or $where.
        if (!lodash.has(LOGICAL_OPERATORS, key)) throw new Error("Unrecognized logical operator: " + key);
        perKeySelectors.push(LOGICAL_OPERATORS[key](subSelector));
      } else {
        var lookUpByIndex = LocalCollection._makeLookupFunction(key);
        var valueSelectorFunc = compileValueSelector(subSelector);
        perKeySelectors.push(function (doc) {
          var branchValues = lookUpByIndex(doc);
          // We apply the selector to each "branched" value and return true if any
          // match. This isn't 100% consistent with MongoDB; eg, see:
          // https://jira.mongodb.org/browse/SERVER-8585
          return lodash.any(branchValues, valueSelectorFunc);
        });
      }
    });

    return function (doc) {
      return lodash.all(perKeySelectors, function (f) {
        return f(doc);
      });
    };
  };

  // Given a selector, return a function that takes one argument, a
  // document, and returns true if the document matches the selector,
  // else false.
  LocalCollection._compileSelector = function (selector) {
    // you can pass a literal function instead of a selector
    if (selector instanceof Function) return function (doc) {
      return selector.call(doc);
    };

    // shorthand -- scalars match _id
    if (LocalCollection._selectorIsId(selector)) {
      return function (doc) {
        return EJSON_1.equals(doc._id, selector);
      };
    }

    // protect against dangerous selectors.  falsey and {_id: falsey} are both
    // likely programmer error, and not what you want, particularly for
    // destructive operations.
    if (!selector || '_id' in selector && !selector._id) return function (doc) {
      return false;
    };

    // Top level can't be an array or true or binary.
    if (typeof selector === 'boolean' || isArray(selector) || EJSON_1.isBinary(selector)) throw new Error("Invalid selector: " + selector);

    return compileDocumentSelector(selector);
  };

  // Give a sort spec, which can be in any of these forms:
  //   {"key1": 1, "key2": -1}
  //   [["key1", "asc"], ["key2", "desc"]]
  //   ["key1", ["key2", "desc"]]
  //
  // (.. with the first form being dependent on the key enumeration
  // behavior of your javascript VM, which usually does what you mean in
  // this case if the key names don't look like integers ..)
  //
  // return a function that takes two objects, and returns -1 if the
  // first object comes first in order, 1 if the second object comes
  // first, or 0 if neither object comes before the other.

  LocalCollection._compileSort = function (spec) {
    var sortSpecParts = [];

    if (spec instanceof Array) {
      for (var i = 0; i < spec.length; i++) {
        if (typeof spec[i] === "string") {
          sortSpecParts.push({
            lookup: LocalCollection._makeLookupFunction(spec[i]),
            ascending: true
          });
        } else {
          sortSpecParts.push({
            lookup: LocalCollection._makeLookupFunction(spec[i][0]),
            ascending: spec[i][1] !== "desc"
          });
        }
      }
    } else if ((typeof spec === 'undefined' ? 'undefined' : _typeof$2(spec)) === "object") {
      for (var key in spec) {
        sortSpecParts.push({
          lookup: LocalCollection._makeLookupFunction(key),
          ascending: spec[key] >= 0
        });
      }
    } else {
      throw Error("Bad sort specification: ", JSON.stringify(spec));
    }

    if (sortSpecParts.length === 0) return function () {
      return 0;
    };

    // reduceValue takes in all the possible values for the sort key along various
    // branches, and returns the min or max value (according to the bool
    // findMin). Each value can itself be an array, and we look at its values
    // too. (ie, we do a single level of flattening on branchValues, then find the
    // min/max.)
    var reduceValue = function reduceValue(branchValues, findMin) {
      var reduced;
      var first = true;
      // Iterate over all the values found in all the branches, and if a value is
      // an array itself, iterate over the values in the array separately.
      lodash.each(branchValues, function (branchValue) {
        // Value not an array? Pretend it is.
        if (!isArray(branchValue)) branchValue = [branchValue];
        // Value is an empty array? Pretend it was missing, since that's where it
        // should be sorted.
        if (isArray(branchValue) && branchValue.length === 0) branchValue = [undefined];
        lodash.each(branchValue, function (value) {
          // We should get here at least once: lookup functions return non-empty
          // arrays, so the outer loop runs at least once, and we prevented
          // branchValue from being an empty array.
          if (first) {
            reduced = value;
            first = false;
          } else {
            // Compare the value we found to the value we found so far, saving it
            // if it's less (for an ascending sort) or more (for a descending
            // sort).
            var cmp = LocalCollection._f._cmp(reduced, value);
            if (findMin && cmp > 0 || !findMin && cmp < 0) reduced = value;
          }
        });
      });
      return reduced;
    };

    return function (a, b) {
      for (var i = 0; i < sortSpecParts.length; ++i) {
        var specPart = sortSpecParts[i];
        var aValue = reduceValue(specPart.lookup(a), specPart.ascending);
        var bValue = reduceValue(specPart.lookup(b), specPart.ascending);
        var compare = LocalCollection._f._cmp(aValue, bValue);
        if (compare !== 0) return specPart.ascending ? compare : -compare;
      }    return 0;
    };
  };

  var compileDocumentSelector_1 = compileDocumentSelector;
  var compileSort = LocalCollection._compileSort;

  var selector = {
  	compileDocumentSelector: compileDocumentSelector_1,
  	compileSort: compileSort
  };

  var utils = createCommonjsModule(function (module, exports) {
  var compileDocumentSelector, compileSort, deg2rad, getDistanceFromLatLngInM, pointInPolygon, processGeoIntersectsOperator, processNearOperator, _;

  _ = lodash;

  compileDocumentSelector = selector.compileDocumentSelector;

  compileSort = selector.compileSort;

  exports.compileDocumentSelector = compileDocumentSelector;

  exports.processFind = function(items, selector, options) {
    var filtered;
    filtered = _.filter(_.values(items), compileDocumentSelector(selector));
    filtered = processNearOperator(selector, filtered);
    filtered = processGeoIntersectsOperator(selector, filtered);
    if (options && options.sort) {
      filtered.sort(compileSort(options.sort));
    }
    if (options && options.skip) {
      filtered = _.rest(filtered, options.skip);
    }
    if (options && options.limit) {
      filtered = _.first(filtered, options.limit);
    }
    if (options && options.fields) {
      filtered = exports.filterFields(filtered, options.fields);
    }
    return filtered;
  };

  exports.filterFields = function(items, fields) {
    if (fields == null) {
      fields = {};
    }
    if (_.keys(fields).length === 0) {
      return items;
    }
    return _.map(items, function(item) {
      var field, from, newItem, obj, path, pathElem, to, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3;
      newItem = {};
      if (_.first(_.values(fields)) === 1) {
        _ref = _.keys(fields).concat(["_id"]);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          field = _ref[_i];
          path = field.split(".");
          obj = item;
          for (_j = 0, _len1 = path.length; _j < _len1; _j++) {
            pathElem = path[_j];
            if (obj) {
              obj = obj[pathElem];
            }
          }
          if (obj == null) {
            continue;
          }
          from = item;
          to = newItem;
          _ref1 = _.initial(path);
          for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
            pathElem = _ref1[_k];
            to[pathElem] = to[pathElem] || {};
            to = to[pathElem];
            from = from[pathElem];
          }
          to[_.last(path)] = from[_.last(path)];
        }
        return newItem;
      } else {
        _ref2 = _.keys(fields).concat(["_id"]);
        for (_l = 0, _len3 = _ref2.length; _l < _len3; _l++) {
          field = _ref2[_l];
          path = field.split(".");
          obj = item;
          _ref3 = _.initial(path);
          for (_m = 0, _len4 = _ref3.length; _m < _len4; _m++) {
            pathElem = _ref3[_m];
            if (obj) {
              obj = obj[pathElem];
            }
          }
          if (obj == null) {
            continue;
          }
          delete obj[_.last(path)];
        }
        return item;
      }
    });
  };

  exports.createUid = function() {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r, v;
      r = Math.random() * 16 | 0;
      v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  };

  processNearOperator = function(selector, list) {
    var distances, geo, key, value;
    for (key in selector) {
      value = selector[key];
      if ((value != null) && value['$near']) {
        geo = value['$near']['$geometry'];
        if (geo.type !== 'Point') {
          break;
        }
        list = _.filter(list, function(doc) {
          return doc[key] && doc[key].type === 'Point';
        });
        distances = _.map(list, function(doc) {
          return {
            doc: doc,
            distance: getDistanceFromLatLngInM(geo.coordinates[1], geo.coordinates[0], doc[key].coordinates[1], doc[key].coordinates[0])
          };
        });
        distances = _.filter(distances, function(item) {
          return item.distance >= 0;
        });
        distances = _.sortBy(distances, 'distance');
        if (value['$near']['$maxDistance']) {
          distances = _.filter(distances, function(item) {
            return item.distance <= value['$near']['$maxDistance'];
          });
        }
        distances = _.first(distances, 100);
        list = _.pluck(distances, 'doc');
      }
    }
    return list;
  };

  pointInPolygon = function(point, polygon) {
    if (!_.isEqual(_.first(polygon.coordinates[0]), _.last(polygon.coordinates[0]))) {
      throw new Error("First must equal last");
    }
    if (point.coordinates[0] < Math.min.apply(this, _.map(polygon.coordinates[0], function(coord) {
      return coord[0];
    }))) {
      return false;
    }
    if (point.coordinates[1] < Math.min.apply(this, _.map(polygon.coordinates[0], function(coord) {
      return coord[1];
    }))) {
      return false;
    }
    if (point.coordinates[0] > Math.max.apply(this, _.map(polygon.coordinates[0], function(coord) {
      return coord[0];
    }))) {
      return false;
    }
    if (point.coordinates[1] > Math.max.apply(this, _.map(polygon.coordinates[0], function(coord) {
      return coord[1];
    }))) {
      return false;
    }
    return true;
  };

  getDistanceFromLatLngInM = function(lat1, lng1, lat2, lng2) {
    var R, a, c, d, dLat, dLng;
    R = 6370986;
    dLat = deg2rad(lat2 - lat1);
    dLng = deg2rad(lng2 - lng1);
    a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    d = R * c;
    return d;
  };

  deg2rad = function(deg) {
    return deg * (Math.PI / 180);
  };

  processGeoIntersectsOperator = function(selector, list) {
    var geo, key, value;
    for (key in selector) {
      value = selector[key];
      if ((value != null) && value['$geoIntersects']) {
        geo = value['$geoIntersects']['$geometry'];
        if (geo.type !== 'Polygon') {
          break;
        }
        list = _.filter(list, function(doc) {
          if (!doc[key] || doc[key].type !== 'Point') {
            return false;
          }
          return pointInPolygon(doc[key], geo);
        });
      }
    }
    return list;
  };

  exports.regularizeUpsert = function(docs, bases, success, error) {
    var item, items, _i, _len, _ref;
    if (_.isFunction(bases)) {
      _ref = [void 0, bases, success], bases = _ref[0], success = _ref[1], error = _ref[2];
    }
    if (!_.isArray(docs)) {
      docs = [docs];
      bases = [bases];
    } else {
      bases = bases || [];
    }
    items = _.map(docs, function(doc, i) {
      return {
        doc: doc,
        base: i < bases.length ? bases[i] : void 0
      };
    });
    for (_i = 0, _len = items.length; _i < _len; _i++) {
      item = items[_i];
      if (item.doc._id == null) {
        throw new Error('All documents in the upsert must have an _id');
      }
    }
    return [items, success, error];
  };
  });
  var utils_1 = utils.compileDocumentSelector;
  var utils_2 = utils.processFind;
  var utils_3 = utils.filterFields;
  var utils_4 = utils.createUid;
  var utils_5 = utils.regularizeUpsert;

  var Collection, MemoryDb, NullTransaction$4, WithObservableReads$1, WithObservableWrites$1, WithReactMixin$1, WithServerQuery$1, processFind, utils$1, _$2;

  NullTransaction$4 = NullTransaction_1;

  WithObservableReads$1 = WithObservableReads_1;

  WithObservableWrites$1 = WithObservableWrites_1;

  WithReactMixin$1 = WithReactMixin_1;

  WithServerQuery$1 = WithServerQuery_1;

  _$2 = lodash;

  utils$1 = utils;

  processFind = utils.processFind;

  var MemoryDb_1 = MemoryDb = (function() {
    function MemoryDb() {
      this.collections = {};
      this.debug = true;
      this.batchedUpdates = function(cb) {
        return cb();
      };
      this.transaction = this.getDefaultTransaction();
    }

    MemoryDb.prototype.uncaughtExceptionHandler = function(e) {
      throw e;
    };

    MemoryDb.prototype.getDefaultTransaction = function() {
      return new NullTransaction$4();
    };

    MemoryDb.prototype.serialize = function() {
      var collectionName, data;
      data = {};
      for (collectionName in this.collections) {
        data[collectionName] = this.collections[collectionName].serialize();
      }
      return data;
    };

    MemoryDb.deserialize = function(data) {
      var collection, collectionName, db;
      db = new MemoryDb();
      for (collectionName in data) {
        collection = Collection.deserialize(db, data[collectionName]);
        db.collections[collectionName] = collection;
        db[collectionName] = collection;
      }
      return db;
    };

    MemoryDb.prototype.addCollection = function(name) {
      var collection;
      if (this[name] != null) {
        return;
      }
      collection = new Collection(name, this);
      this[name] = collection;
      return this.collections[name] = collection;
    };

    MemoryDb.prototype.withTransaction = function(transaction, func, context) {
      var prevTransaction;
      if (!this.transaction.canPushTransaction(transaction)) {
        throw new Error('Already in a transaction');
      }
      prevTransaction = this.transaction;
      this.transaction = transaction;
      try {
        return func.call(context);
      } finally {
        this.transaction = prevTransaction;
      }
    };

    return MemoryDb;

  })();

  _$2.mixin(MemoryDb.prototype, WithObservableReads$1);

  _$2.mixin(MemoryDb.prototype, WithObservableWrites$1);

  _$2.mixin(MemoryDb.prototype, WithReactMixin$1);

  _$2.mixin(MemoryDb.prototype, WithServerQuery$1);

  Collection = (function() {
    function Collection(name, db) {
      this.name = name;
      this.db = db;
      this.items = {};
      this.versions = {};
      this.version = 1;
    }

    Collection.prototype.serialize = function() {
      return {
        name: this.name,
        items: this.items,
        versions: this.versions,
        version: this.version
      };
    };

    Collection.deserialize = function(db, data) {
      var collection;
      collection = new Collection(data.name, db);
      collection.items = data.items;
      collection.versions = data.versions;
      collection.version = data.version;
      return collection;
    };

    Collection.prototype.find = function(selector, options) {
      return this.db.transaction.find(this.name, this._findFetch(selector, options), selector, options);
    };

    Collection.prototype.findOne = function(selector, options) {
      return this.db.transaction.findOne(this.name, this._findOne(selector, options), selector, options);
    };

    Collection.prototype._findOne = function(selector, options) {
      var results;
      options = options || {};
      results = this._findFetch(selector, options);
      if (results.length > 0) {
        return results[0];
      } else {
        return null;
      }
    };

    Collection.prototype._findFetch = function(selector, options) {
      return processFind(this.items, selector, options);
    };

    Collection.prototype.get = function(_id, missing) {
      return this.db.transaction.get(this.name, this._findOne({
        _id: _id
      }), _id) || missing || null;
    };

    Collection.prototype.upsert = function(docs) {
      var doc, item, items, _1, _2, _i, _len, _ref;
      _ref = utils$1.regularizeUpsert(docs), items = _ref[0], _1 = _ref[1], _2 = _ref[2];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        doc = _$2.assign({}, this.items[item.doc._id] || {}, item.doc);
        this.items[item.doc._id] = doc;
        this.version += 1;
        this.versions[doc._id] = (this.versions[doc._id] || 0) + 1;
        this.items[doc._id]._version = this.versions[doc._id];
      }
      return this.db.transaction.upsert(this.name, docs, docs);
    };

    Collection.prototype.del = function(id) {
      var prev_version;
      if (_$2.has(this.items, id)) {
        prev_version = this.items[id]._version;
        this.version += 1;
        this.versions[id] = prev_version + 1;
        delete this.items[id];
      }
      return this.db.transaction.del(this.name, null, id);
    };

    Collection.prototype.remove = function(selector, options) {
      var results;
      results = this._findFetch(selector, options);
      return results.forEach((function(_this) {
        return function(doc) {
          return _this.del(doc._id);
        };
      })(this));
    };

    return Collection;

  })();

  var minimongoCache = MemoryDb_1;

  var InteractionManager;
  var ReactNative;

  if (isReactNative) {
    InteractionManager = require('react-native').InteractionManager; // eslint-disable-line

    ReactNative = require('react-native/Libraries/Renderer/shims/ReactNative'); // eslint-disable-line
  }

  process.nextTick = setImmediate;
  var db = new minimongoCache();
  db.debug = false;

  if (ReactNative) {
    db.batchedUpdates = ReactNative.unstable_batchedUpdates;
  }

  function runAfterOtherComputations(fn) {
    InteractionManager ? InteractionManager.runAfterInteractions(function () {
      trackr.afterFlush(function () {
        fn();
      });
    }) : trackr.afterFlush(function () {
      fn();
    });
  }

  var Data = {
    _endpoint: null,
    _options: null,
    ddp: null,
    subscriptions: {},
    db: db,
    calls: [],
    getUrl: function getUrl() {
      return this._endpoint.substring(0, this._endpoint.indexOf('/websocket'));
    },
    waitDdpReady: function waitDdpReady(cb) {
      var _this = this;

      if (this.ddp) {
        cb();
      } else {
        runAfterOtherComputations(function () {
          _this.waitDdpReady(cb);
        });
      }
    },
    _cbs: [],
    onChange: function onChange(cb) {
      this.db.on('change', cb);
      this.ddp.on('connected', cb);
      this.ddp.on('disconnected', cb);
      this.on('loggingIn', cb);
      this.on('change', cb);
    },
    offChange: function offChange(cb) {
      this.db.off('change', cb);
      this.ddp.off('connected', cb);
      this.ddp.off('disconnected', cb);
      this.off('loggingIn', cb);
      this.off('change', cb);
    },
    on: function on(eventName, cb) {
      this._cbs.push({
        eventName: eventName,
        callback: cb
      });
    },
    off: function off(eventName, cb) {
      this._cbs.splice(this._cbs.findIndex(function (_cb) {
        return _cb.callback === cb && _cb.eventName === eventName;
      }), 1);
    },
    notify: function notify(eventName) {
      this._cbs.forEach(function (cb) {
        if (cb.eventName === eventName && typeof cb.callback === 'function') {
          cb.callback();
        }
      });
    },
    waitDdpConnected: function waitDdpConnected(cb) {
      var _this2 = this;

      if (this.ddp && this.ddp.status === 'connected') {
        cb();
      } else if (this.ddp) {
        this.ddp.once('connected', cb);
      } else {
        setTimeout(function () {
          _this2.waitDdpConnected(cb);
        }, 10);
      }
    }
  };

  function call (eventName) {
    var args = Array.prototype.slice.call(arguments, 1);

    if (args.length && typeof args[args.length - 1] === 'function') {
      var callback = args.pop();
    }

    var id = Data.ddp.method(eventName, args);
    Data.calls.push({
      id: id,
      callback: callback
    });
  }

  var Cursor = /*#__PURE__*/function () {
    function Cursor(collection, docs) {
      _classCallCheck(this, Cursor);

      this._docs = docs || [];
      this._collection = collection;
    }

    _createClass(Cursor, [{
      key: "count",
      value: function count() {
        return this._docs.length;
      }
    }, {
      key: "fetch",
      value: function fetch() {
        return this._transformedDocs();
      }
    }, {
      key: "forEach",
      value: function forEach(callback) {
        this._transformedDocs().forEach(callback);
      }
    }, {
      key: "map",
      value: function map(callback) {
        return this._transformedDocs().map(callback);
      }
    }, {
      key: "_transformedDocs",
      value: function _transformedDocs() {
        return this._collection._transform ? this._docs.map(this._collection._transform) : this._docs;
      }
    }]);

    return Cursor;
  }();

  var Collection$1 = /*#__PURE__*/function () {
    function Collection(name) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Collection);

      if (!Data.db[name]) Data.db.addCollection(name);
      this._collection = Data.db[name];
      this._name = name;
      this._transform = wrapTransform(options.transform);
    }

    _createClass(Collection, [{
      key: "find",
      value: function find(selector, options) {
        var docs;

        if (typeof selector == 'string') {
          if (options) {
            docs = this._collection.findOne({
              _id: selector
            }, options);
          } else {
            docs = this._collection.get(selector);
          }

          if (docs) {
            docs = [docs];
          }
        } else {
          docs = this._collection.find(selector, options);
        }

        return new Cursor(this, docs);
      }
    }, {
      key: "findOne",
      value: function findOne(selector, options) {
        var result;

        if (selector._id && !options) {
          result = this._collection.get(selector._id);
          if (result && this._transform) result = this._transform(result);
        } else {
          result = this.find(selector, options);

          if (result) {
            if (this._cursoredFind) result = result.fetch();
            result = result[0];
          }
        }

        return result;
      }
    }, {
      key: "insert",
      value: function insert(item) {
        var _this = this;

        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
        var id;

        if ('_id' in item) {
          if (!item._id || typeof item._id != 'string') {
            return callback("Meteor requires document _id fields to be non-empty strings");
          }

          id = item._id;
        } else {
          id = item._id = Random.id();
        }

        if (this._collection.get(id)) return callback({
          error: 409,
          reason: "Duplicate key _id with value ".concat(id)
        });

        this._collection.upsert(item);

        Data.waitDdpConnected(function () {
          call("/".concat(_this._name, "/insert"), item, function (err) {
            if (err) {
              _this._collection.del(id);

              return callback(err);
            }

            callback(null, id);
          });
        });
        return id;
      }
    }, {
      key: "update",
      value: function update(id, modifier) {
        var _this2 = this;

        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {};

        if (typeof options == 'function') {
          callback = options;
          options = {};
        }

        var element = this.findOne(id);
        if (!element) return callback({
          error: 409,
          reason: "Item not found in collection ".concat(this._name, " with id ").concat(id)
        }); // change mini mongo for optimize UI changes

        this._collection.upsert(_objectSpread2({
          _id: element._id
        }, modifier.$set));

        Data.waitDdpConnected(function () {
          call("/".concat(_this2._name, "/update"), {
            _id: element._id
          }, modifier, function (err) {
            if (err) {
              return callback(err);
            }

            callback(null, id);
          });
        });
      }
    }, {
      key: "remove",
      value: function remove(id) {
        var _this3 = this;

        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
        var element = this.findOne(id);

        if (element) {
          this._collection.del(element._id);

          Data.waitDdpConnected(function () {
            call("/".concat(_this3._name, "/remove"), {
              _id: element._id
            }, function (err, res) {
              if (err) {
                _this3._collection.upsert(element);

                return callback(err);
              }

              callback(null, res);
            });
          });
        } else {
          callback("No document with _id : ".concat(id));
        }
      }
    }]);

    return Collection;
  }(); //From Meteor core
  // Wrap a transform function to return objects that have the _id field
  // of the untransformed document. This ensures that subsystems such as
  // the observe-sequence package that call `observe` can keep track of
  // the documents identities.
  //
  // - Require that it returns objects
  // - If the return value has an _id field, verify that it matches the
  //   original _id field
  // - If the return value doesn't have an _id field, add it back.

  function wrapTransform(transform) {
    if (!transform) return null; // No need to doubly-wrap transforms.

    if (transform.__wrappedTransform__) return transform;

    var wrapped = function wrapped(doc) {
      if (doc._id) {
        // XXX do we ever have a transform on the oplog's collection? because that
        // collection has no _id.
        throw new Error("can only transform documents with _id");
      }

      var id = doc._id; // XXX consider making tracker a weak dependency and checking Package.tracker here

      var transformed = trackr.nonreactive(function () {
        return transform(doc);
      });

      if (!isPlainObject(transformed)) {
        throw new Error("transform must return object");
      }

      if (transformed._id) {
        if (!EJSON.equals(transformed._id, id)) {
          throw new Error("transformed document can't have different _id");
        }
      } else {
        transformed._id = id;
      }

      return transformed;
    };

    wrapped.__wrappedTransform__ = true;
    return wrapped;
  }

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
  	if (val === null || val === undefined) {
  		throw new TypeError('Object.assign cannot be called with null or undefined');
  	}

  	return Object(val);
  }

  function shouldUseNative() {
  	try {
  		if (!Object.assign) {
  			return false;
  		}

  		// Detect buggy property enumeration order in older V8 versions.

  		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
  		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
  		test1[5] = 'de';
  		if (Object.getOwnPropertyNames(test1)[0] === '5') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test2 = {};
  		for (var i = 0; i < 10; i++) {
  			test2['_' + String.fromCharCode(i)] = i;
  		}
  		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
  			return test2[n];
  		});
  		if (order2.join('') !== '0123456789') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test3 = {};
  		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
  			test3[letter] = letter;
  		});
  		if (Object.keys(Object.assign({}, test3)).join('') !==
  				'abcdefghijklmnopqrst') {
  			return false;
  		}

  		return true;
  	} catch (err) {
  		// We don't expect any of the above to throw, but better to be safe.
  		return false;
  	}
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  	var from;
  	var to = toObject(target);
  	var symbols;

  	for (var s = 1; s < arguments.length; s++) {
  		from = Object(arguments[s]);

  		for (var key in from) {
  			if (hasOwnProperty.call(from, key)) {
  				to[key] = from[key];
  			}
  		}

  		if (getOwnPropertySymbols) {
  			symbols = getOwnPropertySymbols(from);
  			for (var i = 0; i < symbols.length; i++) {
  				if (propIsEnumerable.call(from, symbols[i])) {
  					to[symbols[i]] = from[symbols[i]];
  				}
  			}
  		}
  	}

  	return to;
  };

  var n="function"===typeof Symbol&&Symbol.for,p=n?Symbol.for("react.element"):60103,q=n?Symbol.for("react.portal"):60106,r=n?Symbol.for("react.fragment"):60107,t=n?Symbol.for("react.strict_mode"):60108,u=n?Symbol.for("react.profiler"):60114,v=n?Symbol.for("react.provider"):60109,w=n?Symbol.for("react.context"):60110,x=n?Symbol.for("react.forward_ref"):60112,y=n?Symbol.for("react.suspense"):60113,z=n?Symbol.for("react.memo"):60115,A=n?Symbol.for("react.lazy"):
  60116,B="function"===typeof Symbol&&Symbol.iterator;function C(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return "Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
  var D={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E={};function F(a,b,c){this.props=a;this.context=b;this.refs=E;this.updater=c||D;}F.prototype.isReactComponent={};F.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(C(85));this.updater.enqueueSetState(this,a,b,"setState");};F.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};
  function G(){}G.prototype=F.prototype;function H(a,b,c){this.props=a;this.context=b;this.refs=E;this.updater=c||D;}var I=H.prototype=new G;I.constructor=H;objectAssign(I,F.prototype);I.isPureReactComponent=!0;var J={current:null},K=Object.prototype.hasOwnProperty,L={key:!0,ref:!0,__self:!0,__source:!0};
  function M(a,b,c){var e,d={},g=null,k=null;if(null!=b)for(e in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),b)K.call(b,e)&&!L.hasOwnProperty(e)&&(d[e]=b[e]);var f=arguments.length-2;if(1===f)d.children=c;else if(1<f){for(var h=Array(f),m=0;m<f;m++)h[m]=arguments[m+2];d.children=h;}if(a&&a.defaultProps)for(e in f=a.defaultProps,f)void 0===d[e]&&(d[e]=f[e]);return {$$typeof:p,type:a,key:g,ref:k,props:d,_owner:J.current}}
  function N(a,b){return {$$typeof:p,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return "object"===typeof a&&null!==a&&a.$$typeof===p}function escape(a){var b={"=":"=0",":":"=2"};return "$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g,Q=[];function R(a,b,c,e){if(Q.length){var d=Q.pop();d.result=a;d.keyPrefix=b;d.func=c;d.context=e;d.count=0;return d}return {result:a,keyPrefix:b,func:c,context:e,count:0}}
  function S(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>Q.length&&Q.push(a);}
  function T(a,b,c,e){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case p:case q:g=!0;}}if(g)return c(e,a,""===b?"."+U(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){d=a[k];var f=b+U(d,k);g+=T(d,f,c,e);}else if(null===a||"object"!==typeof a?f=null:(f=B&&a[B]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=f.call(a),k=
  0;!(d=a.next()).done;)d=d.value,f=b+U(d,k++),g+=T(d,f,c,e);else if("object"===d)throw c=""+a,Error(C(31,"[object Object]"===c?"object with keys {"+Object.keys(a).join(", ")+"}":c,""));return g}function V(a,b,c){return null==a?0:T(a,"",b,c)}function U(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function W(a,b){a.func.call(a.context,b,a.count++);}
  function aa(a,b,c){var e=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?X(a,e,c,function(a){return a}):null!=a&&(O(a)&&(a=N(a,d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(P,"$&/")+"/")+c)),e.push(a));}function X(a,b,c,e,d){var g="";null!=c&&(g=(""+c).replace(P,"$&/")+"/");b=R(b,g,e,d);V(a,aa,b);S(b);}var Y={current:null};function Z(){var a=Y.current;if(null===a)throw Error(C(321));return a}
  var ba={ReactCurrentDispatcher:Y,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:J,IsSomeRendererActing:{current:!1},assign:objectAssign};var Children={map:function(a,b,c){if(null==a)return a;var e=[];X(a,e,null,b,c);return e},forEach:function(a,b,c){if(null==a)return a;b=R(null,null,b,c);V(a,W,b);S(b);},count:function(a){return V(a,function(){return null},null)},toArray:function(a){var b=[];X(a,b,null,function(a){return a});return b},only:function(a){if(!O(a))throw Error(C(143));return a}};
  var Component=F;var Fragment=r;var Profiler=u;var PureComponent=H;var StrictMode=t;var Suspense=y;var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ba;
  var cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(C(267,a));var e=objectAssign({},a.props),d=a.key,g=a.ref,k=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,k=J.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var f=a.type.defaultProps;for(h in b)K.call(b,h)&&!L.hasOwnProperty(h)&&(e[h]=void 0===b[h]&&void 0!==f?f[h]:b[h]);}var h=arguments.length-2;if(1===h)e.children=c;else if(1<h){f=Array(h);for(var m=0;m<h;m++)f[m]=arguments[m+2];e.children=f;}return {$$typeof:p,type:a.type,
  key:d,ref:g,props:e,_owner:k}};var createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:w,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:v,_context:a};return a.Consumer=a};var createElement=M;var createFactory=function(a){var b=M.bind(null,a);b.type=a;return b};var createRef=function(){return {current:null}};var forwardRef=function(a){return {$$typeof:x,render:a}};var isValidElement=O;
  var lazy=function(a){return {$$typeof:A,_ctor:a,_status:-1,_result:null}};var memo=function(a,b){return {$$typeof:z,type:a,compare:void 0===b?null:b}};var useCallback=function(a,b){return Z().useCallback(a,b)};var useContext=function(a,b){return Z().useContext(a,b)};var useDebugValue=function(){};var useEffect=function(a,b){return Z().useEffect(a,b)};var useImperativeHandle=function(a,b,c){return Z().useImperativeHandle(a,b,c)};
  var useLayoutEffect=function(a,b){return Z().useLayoutEffect(a,b)};var useMemo=function(a,b){return Z().useMemo(a,b)};var useReducer=function(a,b,c){return Z().useReducer(a,b,c)};var useRef=function(a){return Z().useRef(a)};var useState=function(a){return Z().useState(a)};var version="16.13.1";

  var react_production_min = {
  	Children: Children,
  	Component: Component,
  	Fragment: Fragment,
  	Profiler: Profiler,
  	PureComponent: PureComponent,
  	StrictMode: StrictMode,
  	Suspense: Suspense,
  	__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  	cloneElement: cloneElement,
  	createContext: createContext,
  	createElement: createElement,
  	createFactory: createFactory,
  	createRef: createRef,
  	forwardRef: forwardRef,
  	isValidElement: isValidElement,
  	lazy: lazy,
  	memo: memo,
  	useCallback: useCallback,
  	useContext: useContext,
  	useDebugValue: useDebugValue,
  	useEffect: useEffect,
  	useImperativeHandle: useImperativeHandle,
  	useLayoutEffect: useLayoutEffect,
  	useMemo: useMemo,
  	useReducer: useReducer,
  	useRef: useRef,
  	useState: useState,
  	version: version
  };

  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

  var ReactPropTypesSecret_1 = ReactPropTypesSecret;

  var printWarning = function() {};

  if (process.env.NODE_ENV !== 'production') {
    var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
    var loggedTypeFailures = {};
    var has = Function.call.bind(Object.prototype.hasOwnProperty);

    printWarning = function(text) {
      var message = 'Warning: ' + text;
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };
  }

  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param {object} typeSpecs Map of name to a ReactPropType
   * @param {object} values Runtime values that need to be type-checked
   * @param {string} location e.g. "prop", "context", "child context"
   * @param {string} componentName Name of the component for error messages.
   * @param {?Function} getStack Returns the component stack.
   * @private
   */
  function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
    if (process.env.NODE_ENV !== 'production') {
      for (var typeSpecName in typeSpecs) {
        if (has(typeSpecs, typeSpecName)) {
          var error;
          // Prop type validation may throw. In case they do, we don't want to
          // fail the render phase where it didn't fail before. So we log it.
          // After these have been cleaned up, we'll let them throw.
          try {
            // This is intentionally an invariant that gets caught. It's the same
            // behavior as without this statement except with a better message.
            if (typeof typeSpecs[typeSpecName] !== 'function') {
              var err = Error(
                (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
                'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
              );
              err.name = 'Invariant Violation';
              throw err;
            }
            error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
          } catch (ex) {
            error = ex;
          }
          if (error && !(error instanceof Error)) {
            printWarning(
              (componentName || 'React class') + ': type specification of ' +
              location + ' `' + typeSpecName + '` is invalid; the type checker ' +
              'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
              'You may have forgotten to pass an argument to the type checker ' +
              'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
              'shape all require an argument).'
            );
          }
          if (error instanceof Error && !(error.message in loggedTypeFailures)) {
            // Only monitor this failure once because there tends to be a lot of the
            // same error.
            loggedTypeFailures[error.message] = true;

            var stack = getStack ? getStack() : '';

            printWarning(
              'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
            );
          }
        }
      }
    }
  }

  /**
   * Resets warning cache when testing.
   *
   * @private
   */
  checkPropTypes.resetWarningCache = function() {
    if (process.env.NODE_ENV !== 'production') {
      loggedTypeFailures = {};
    }
  };

  var checkPropTypes_1 = checkPropTypes;

  var react_development = createCommonjsModule(function (module, exports) {



  if (process.env.NODE_ENV !== "production") {
    (function() {

  var _assign = objectAssign;
  var checkPropTypes = checkPropTypes_1;

  var ReactVersion = '16.13.1';

  // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
  // nor polyfill, then a plain number is used for performance.
  var hasSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
  var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
  var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
  var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
  var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
  var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
  var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
  var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
  var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
  var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
  var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
  var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
  var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
  var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
  var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
  var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
  var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
  var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';
  function getIteratorFn(maybeIterable) {
    if (maybeIterable === null || typeof maybeIterable !== 'object') {
      return null;
    }

    var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

    if (typeof maybeIterator === 'function') {
      return maybeIterator;
    }

    return null;
  }

  /**
   * Keeps track of the current dispatcher.
   */
  var ReactCurrentDispatcher = {
    /**
     * @internal
     * @type {ReactComponent}
     */
    current: null
  };

  /**
   * Keeps track of the current batch's configuration such as how long an update
   * should suspend for if it needs to.
   */
  var ReactCurrentBatchConfig = {
    suspense: null
  };

  /**
   * Keeps track of the current owner.
   *
   * The current owner is the component who should own any components that are
   * currently being constructed.
   */
  var ReactCurrentOwner = {
    /**
     * @internal
     * @type {ReactComponent}
     */
    current: null
  };

  var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
  function describeComponentFrame (name, source, ownerName) {
    var sourceInfo = '';

    if (source) {
      var path = source.fileName;
      var fileName = path.replace(BEFORE_SLASH_RE, '');

      {
        // In DEV, include code for a common special case:
        // prefer "folder/index.js" instead of just "index.js".
        if (/^index\./.test(fileName)) {
          var match = path.match(BEFORE_SLASH_RE);

          if (match) {
            var pathBeforeSlash = match[1];

            if (pathBeforeSlash) {
              var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
              fileName = folderName + '/' + fileName;
            }
          }
        }
      }

      sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
    } else if (ownerName) {
      sourceInfo = ' (created by ' + ownerName + ')';
    }

    return '\n    in ' + (name || 'Unknown') + sourceInfo;
  }

  var Resolved = 1;
  function refineResolvedLazyComponent(lazyComponent) {
    return lazyComponent._status === Resolved ? lazyComponent._result : null;
  }

  function getWrappedName(outerType, innerType, wrapperName) {
    var functionName = innerType.displayName || innerType.name || '';
    return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
  }

  function getComponentName(type) {
    if (type == null) {
      // Host root, text node or just invalid type.
      return null;
    }

    {
      if (typeof type.tag === 'number') {
        error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
      }
    }

    if (typeof type === 'function') {
      return type.displayName || type.name || null;
    }

    if (typeof type === 'string') {
      return type;
    }

    switch (type) {
      case REACT_FRAGMENT_TYPE:
        return 'Fragment';

      case REACT_PORTAL_TYPE:
        return 'Portal';

      case REACT_PROFILER_TYPE:
        return "Profiler";

      case REACT_STRICT_MODE_TYPE:
        return 'StrictMode';

      case REACT_SUSPENSE_TYPE:
        return 'Suspense';

      case REACT_SUSPENSE_LIST_TYPE:
        return 'SuspenseList';
    }

    if (typeof type === 'object') {
      switch (type.$$typeof) {
        case REACT_CONTEXT_TYPE:
          return 'Context.Consumer';

        case REACT_PROVIDER_TYPE:
          return 'Context.Provider';

        case REACT_FORWARD_REF_TYPE:
          return getWrappedName(type, type.render, 'ForwardRef');

        case REACT_MEMO_TYPE:
          return getComponentName(type.type);

        case REACT_BLOCK_TYPE:
          return getComponentName(type.render);

        case REACT_LAZY_TYPE:
          {
            var thenable = type;
            var resolvedThenable = refineResolvedLazyComponent(thenable);

            if (resolvedThenable) {
              return getComponentName(resolvedThenable);
            }

            break;
          }
      }
    }

    return null;
  }

  var ReactDebugCurrentFrame = {};
  var currentlyValidatingElement = null;
  function setCurrentlyValidatingElement(element) {
    {
      currentlyValidatingElement = element;
    }
  }

  {
    // Stack implementation injected by the current renderer.
    ReactDebugCurrentFrame.getCurrentStack = null;

    ReactDebugCurrentFrame.getStackAddendum = function () {
      var stack = ''; // Add an extra top frame while an element is being validated

      if (currentlyValidatingElement) {
        var name = getComponentName(currentlyValidatingElement.type);
        var owner = currentlyValidatingElement._owner;
        stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
      } // Delegate to the injected renderer-specific implementation


      var impl = ReactDebugCurrentFrame.getCurrentStack;

      if (impl) {
        stack += impl() || '';
      }

      return stack;
    };
  }

  /**
   * Used by act() to track whether you're inside an act() scope.
   */
  var IsSomeRendererActing = {
    current: false
  };

  var ReactSharedInternals = {
    ReactCurrentDispatcher: ReactCurrentDispatcher,
    ReactCurrentBatchConfig: ReactCurrentBatchConfig,
    ReactCurrentOwner: ReactCurrentOwner,
    IsSomeRendererActing: IsSomeRendererActing,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: _assign
  };

  {
    _assign(ReactSharedInternals, {
      // These should not be included in production.
      ReactDebugCurrentFrame: ReactDebugCurrentFrame,
      // Shim for React DOM 16.0.0 which still destructured (but not used) this.
      // TODO: remove in React 17.0.
      ReactComponentTreeHook: {}
    });
  }

  // by calls to these methods by a Babel plugin.
  //
  // In PROD (or in packages without access to React internals),
  // they are left as they are instead.

  function warn(format) {
    {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      printWarning('warn', format, args);
    }
  }
  function error(format) {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }

  function printWarning(level, format, args) {
    // When changing this logic, you might want to also
    // update consoleWithStackDev.www.js as well.
    {
      var hasExistingStack = args.length > 0 && typeof args[args.length - 1] === 'string' && args[args.length - 1].indexOf('\n    in') === 0;

      if (!hasExistingStack) {
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        var stack = ReactDebugCurrentFrame.getStackAddendum();

        if (stack !== '') {
          format += '%s';
          args = args.concat([stack]);
        }
      }

      var argsWithFormat = args.map(function (item) {
        return '' + item;
      }); // Careful: RN currently depends on this prefix

      argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
      // breaks IE9: https://github.com/facebook/react/issues/13610
      // eslint-disable-next-line react-internal/no-production-logging

      Function.prototype.apply.call(console[level], console, argsWithFormat);

      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });
        throw new Error(message);
      } catch (x) {}
    }
  }

  var didWarnStateUpdateForUnmountedComponent = {};

  function warnNoop(publicInstance, callerName) {
    {
      var _constructor = publicInstance.constructor;
      var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
      var warningKey = componentName + "." + callerName;

      if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
        return;
      }

      error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);

      didWarnStateUpdateForUnmountedComponent[warningKey] = true;
    }
  }
  /**
   * This is the abstract API for an update queue.
   */


  var ReactNoopUpdateQueue = {
    /**
     * Checks whether or not this composite component is mounted.
     * @param {ReactClass} publicInstance The instance we want to test.
     * @return {boolean} True if mounted, false otherwise.
     * @protected
     * @final
     */
    isMounted: function (publicInstance) {
      return false;
    },

    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {?function} callback Called after component is updated.
     * @param {?string} callerName name of the calling function in the public API.
     * @internal
     */
    enqueueForceUpdate: function (publicInstance, callback, callerName) {
      warnNoop(publicInstance, 'forceUpdate');
    },

    /**
     * Replaces all of the state. Always use this or `setState` to mutate state.
     * You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {object} completeState Next state.
     * @param {?function} callback Called after component is updated.
     * @param {?string} callerName name of the calling function in the public API.
     * @internal
     */
    enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
      warnNoop(publicInstance, 'replaceState');
    },

    /**
     * Sets a subset of the state. This only exists because _pendingState is
     * internal. This provides a merging strategy that is not available to deep
     * properties which is confusing. TODO: Expose pendingState or don't use it
     * during the merge.
     *
     * @param {ReactClass} publicInstance The instance that should rerender.
     * @param {object} partialState Next partial state to be merged with state.
     * @param {?function} callback Called after component is updated.
     * @param {?string} Name of the calling function in the public API.
     * @internal
     */
    enqueueSetState: function (publicInstance, partialState, callback, callerName) {
      warnNoop(publicInstance, 'setState');
    }
  };

  var emptyObject = {};

  {
    Object.freeze(emptyObject);
  }
  /**
   * Base class helpers for the updating state of a component.
   */


  function Component(props, context, updater) {
    this.props = props;
    this.context = context; // If a component has string refs, we will assign a different object later.

    this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
    // renderer.

    this.updater = updater || ReactNoopUpdateQueue;
  }

  Component.prototype.isReactComponent = {};
  /**
   * Sets a subset of the state. Always use this to mutate
   * state. You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * There is no guarantee that calls to `setState` will run synchronously,
   * as they may eventually be batched together.  You can provide an optional
   * callback that will be executed when the call to setState is actually
   * completed.
   *
   * When a function is provided to setState, it will be called at some point in
   * the future (not synchronously). It will be called with the up to date
   * component arguments (state, props, context). These values can be different
   * from this.* because your function may be called after receiveProps but before
   * shouldComponentUpdate, and this new state, props, and context will not yet be
   * assigned to this.
   *
   * @param {object|function} partialState Next partial state or function to
   *        produce next partial state to be merged with current state.
   * @param {?function} callback Called after state is updated.
   * @final
   * @protected
   */

  Component.prototype.setState = function (partialState, callback) {
    if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
      {
        throw Error( "setState(...): takes an object of state variables to update or a function which returns an object of state variables." );
      }
    }

    this.updater.enqueueSetState(this, partialState, callback, 'setState');
  };
  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {?function} callback Called after update is complete.
   * @final
   * @protected
   */


  Component.prototype.forceUpdate = function (callback) {
    this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
  };
  /**
   * Deprecated APIs. These APIs used to exist on classic React classes but since
   * we would like to deprecate them, we're not going to move them over to this
   * modern base class. Instead, we define a getter that warns if it's accessed.
   */


  {
    var deprecatedAPIs = {
      isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
      replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
    };

    var defineDeprecationWarning = function (methodName, info) {
      Object.defineProperty(Component.prototype, methodName, {
        get: function () {
          warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);

          return undefined;
        }
      });
    };

    for (var fnName in deprecatedAPIs) {
      if (deprecatedAPIs.hasOwnProperty(fnName)) {
        defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
      }
    }
  }

  function ComponentDummy() {}

  ComponentDummy.prototype = Component.prototype;
  /**
   * Convenience component with default shallow equality check for sCU.
   */

  function PureComponent(props, context, updater) {
    this.props = props;
    this.context = context; // If a component has string refs, we will assign a different object later.

    this.refs = emptyObject;
    this.updater = updater || ReactNoopUpdateQueue;
  }

  var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
  pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

  _assign(pureComponentPrototype, Component.prototype);

  pureComponentPrototype.isPureReactComponent = true;

  // an immutable object with a single mutable value
  function createRef() {
    var refObject = {
      current: null
    };

    {
      Object.seal(refObject);
    }

    return refObject;
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var RESERVED_PROPS = {
    key: true,
    ref: true,
    __self: true,
    __source: true
  };
  var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;

  {
    didWarnAboutStringRefs = {};
  }

  function hasValidRef(config) {
    {
      if (hasOwnProperty.call(config, 'ref')) {
        var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

        if (getter && getter.isReactWarning) {
          return false;
        }
      }
    }

    return config.ref !== undefined;
  }

  function hasValidKey(config) {
    {
      if (hasOwnProperty.call(config, 'key')) {
        var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

        if (getter && getter.isReactWarning) {
          return false;
        }
      }
    }

    return config.key !== undefined;
  }

  function defineKeyPropWarningGetter(props, displayName) {
    var warnAboutAccessingKey = function () {
      {
        if (!specialPropKeyWarningShown) {
          specialPropKeyWarningShown = true;

          error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      }
    };

    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }

  function defineRefPropWarningGetter(props, displayName) {
    var warnAboutAccessingRef = function () {
      {
        if (!specialPropRefWarningShown) {
          specialPropRefWarningShown = true;

          error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      }
    };

    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }

  function warnIfStringRefCannotBeAutoConverted(config) {
    {
      if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
        var componentName = getComponentName(ReactCurrentOwner.current.type);

        if (!didWarnAboutStringRefs[componentName]) {
          error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://fb.me/react-strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);

          didWarnAboutStringRefs[componentName] = true;
        }
      }
    }
  }
  /**
   * Factory method to create a new React element. This no longer adheres to
   * the class pattern, so do not use new to call it. Also, instanceof check
   * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
   * if something is a React Element.
   *
   * @param {*} type
   * @param {*} props
   * @param {*} key
   * @param {string|object} ref
   * @param {*} owner
   * @param {*} self A *temporary* helper to detect places where `this` is
   * different from the `owner` when React.createElement is called, so that we
   * can warn. We want to get rid of owner and replace string `ref`s with arrow
   * functions, and as long as `this` and owner are the same, there will be no
   * change in behavior.
   * @param {*} source An annotation object (added by a transpiler or otherwise)
   * indicating filename, line number, and/or other information.
   * @internal
   */


  var ReactElement = function (type, key, ref, self, source, owner, props) {
    var element = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: REACT_ELEMENT_TYPE,
      // Built-in properties that belong on the element
      type: type,
      key: key,
      ref: ref,
      props: props,
      // Record the component responsible for creating this element.
      _owner: owner
    };

    {
      // The validation flag is currently mutative. We put it on
      // an external backing store so that we can freeze the whole object.
      // This can be replaced with a WeakMap once they are implemented in
      // commonly used development environments.
      element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
      // the validation flag non-enumerable (where possible, which should
      // include every environment we run tests in), so the test framework
      // ignores it.

      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      }); // self and source are DEV only properties.

      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      }); // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.

      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });

      if (Object.freeze) {
        Object.freeze(element.props);
        Object.freeze(element);
      }
    }

    return element;
  };
  /**
   * Create and return a new ReactElement of the given type.
   * See https://reactjs.org/docs/react-api.html#createelement
   */

  function createElement(type, config, children) {
    var propName; // Reserved names are extracted

    var props = {};
    var key = null;
    var ref = null;
    var self = null;
    var source = null;

    if (config != null) {
      if (hasValidRef(config)) {
        ref = config.ref;

        {
          warnIfStringRefCannotBeAutoConverted(config);
        }
      }

      if (hasValidKey(config)) {
        key = '' + config.key;
      }

      self = config.__self === undefined ? null : config.__self;
      source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

      for (propName in config) {
        if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
          props[propName] = config[propName];
        }
      }
    } // Children can be more than one argument, and those are transferred onto
    // the newly allocated props object.


    var childrenLength = arguments.length - 2;

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);

      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }

      {
        if (Object.freeze) {
          Object.freeze(childArray);
        }
      }

      props.children = childArray;
    } // Resolve default props


    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    {
      if (key || ref) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }

        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }

    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
  function cloneAndReplaceKey(oldElement, newKey) {
    var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
    return newElement;
  }
  /**
   * Clone and return a new ReactElement using element as the starting point.
   * See https://reactjs.org/docs/react-api.html#cloneelement
   */

  function cloneElement(element, config, children) {
    if (!!(element === null || element === undefined)) {
      {
        throw Error( "React.cloneElement(...): The argument must be a React element, but you passed " + element + "." );
      }
    }

    var propName; // Original props are copied

    var props = _assign({}, element.props); // Reserved names are extracted


    var key = element.key;
    var ref = element.ref; // Self is preserved since the owner is preserved.

    var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
    // transpiler, and the original source is probably a better indicator of the
    // true owner.

    var source = element._source; // Owner will be preserved, unless ref is overridden

    var owner = element._owner;

    if (config != null) {
      if (hasValidRef(config)) {
        // Silently steal the ref from the parent.
        ref = config.ref;
        owner = ReactCurrentOwner.current;
      }

      if (hasValidKey(config)) {
        key = '' + config.key;
      } // Remaining properties override existing props


      var defaultProps;

      if (element.type && element.type.defaultProps) {
        defaultProps = element.type.defaultProps;
      }

      for (propName in config) {
        if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
          if (config[propName] === undefined && defaultProps !== undefined) {
            // Resolve default props
            props[propName] = defaultProps[propName];
          } else {
            props[propName] = config[propName];
          }
        }
      }
    } // Children can be more than one argument, and those are transferred onto
    // the newly allocated props object.


    var childrenLength = arguments.length - 2;

    if (childrenLength === 1) {
      props.children = children;
    } else if (childrenLength > 1) {
      var childArray = Array(childrenLength);

      for (var i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }

      props.children = childArray;
    }

    return ReactElement(element.type, key, ref, self, source, owner, props);
  }
  /**
   * Verifies the object is a ReactElement.
   * See https://reactjs.org/docs/react-api.html#isvalidelement
   * @param {?object} object
   * @return {boolean} True if `object` is a ReactElement.
   * @final
   */

  function isValidElement(object) {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }

  var SEPARATOR = '.';
  var SUBSEPARATOR = ':';
  /**
   * Escape and wrap key so it is safe to use as a reactid
   *
   * @param {string} key to be escaped.
   * @return {string} the escaped key.
   */

  function escape(key) {
    var escapeRegex = /[=:]/g;
    var escaperLookup = {
      '=': '=0',
      ':': '=2'
    };
    var escapedString = ('' + key).replace(escapeRegex, function (match) {
      return escaperLookup[match];
    });
    return '$' + escapedString;
  }
  /**
   * TODO: Test that a single child and an array with one item have the same key
   * pattern.
   */


  var didWarnAboutMaps = false;
  var userProvidedKeyEscapeRegex = /\/+/g;

  function escapeUserProvidedKey(text) {
    return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
  }

  var POOL_SIZE = 10;
  var traverseContextPool = [];

  function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
    if (traverseContextPool.length) {
      var traverseContext = traverseContextPool.pop();
      traverseContext.result = mapResult;
      traverseContext.keyPrefix = keyPrefix;
      traverseContext.func = mapFunction;
      traverseContext.context = mapContext;
      traverseContext.count = 0;
      return traverseContext;
    } else {
      return {
        result: mapResult,
        keyPrefix: keyPrefix,
        func: mapFunction,
        context: mapContext,
        count: 0
      };
    }
  }

  function releaseTraverseContext(traverseContext) {
    traverseContext.result = null;
    traverseContext.keyPrefix = null;
    traverseContext.func = null;
    traverseContext.context = null;
    traverseContext.count = 0;

    if (traverseContextPool.length < POOL_SIZE) {
      traverseContextPool.push(traverseContext);
    }
  }
  /**
   * @param {?*} children Children tree container.
   * @param {!string} nameSoFar Name of the key path so far.
   * @param {!function} callback Callback to invoke with each child found.
   * @param {?*} traverseContext Used to pass information throughout the traversal
   * process.
   * @return {!number} The number of children in this subtree.
   */


  function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
    var type = typeof children;

    if (type === 'undefined' || type === 'boolean') {
      // All of the above are perceived as null.
      children = null;
    }

    var invokeCallback = false;

    if (children === null) {
      invokeCallback = true;
    } else {
      switch (type) {
        case 'string':
        case 'number':
          invokeCallback = true;
          break;

        case 'object':
          switch (children.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_PORTAL_TYPE:
              invokeCallback = true;
          }

      }
    }

    if (invokeCallback) {
      callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array
      // so that it's consistent if the number of children grows.
      nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
      return 1;
    }

    var child;
    var nextName;
    var subtreeCount = 0; // Count of children found in the current subtree.

    var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; i++) {
        child = children[i];
        nextName = nextNamePrefix + getComponentKey(child, i);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else {
      var iteratorFn = getIteratorFn(children);

      if (typeof iteratorFn === 'function') {

        {
          // Warn about using Maps as children
          if (iteratorFn === children.entries) {
            if (!didWarnAboutMaps) {
              warn('Using Maps as children is deprecated and will be removed in ' + 'a future major release. Consider converting children to ' + 'an array of keyed ReactElements instead.');
            }

            didWarnAboutMaps = true;
          }
        }

        var iterator = iteratorFn.call(children);
        var step;
        var ii = 0;

        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else if (type === 'object') {
        var addendum = '';

        {
          addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
        }

        var childrenString = '' + children;

        {
          {
            throw Error( "Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + ")." + addendum );
          }
        }
      }
    }

    return subtreeCount;
  }
  /**
   * Traverses children that are typically specified as `props.children`, but
   * might also be specified through attributes:
   *
   * - `traverseAllChildren(this.props.children, ...)`
   * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
   *
   * The `traverseContext` is an optional argument that is passed through the
   * entire traversal. It can be used to store accumulations or anything else that
   * the callback might find relevant.
   *
   * @param {?*} children Children tree object.
   * @param {!function} callback To invoke upon traversing each child.
   * @param {?*} traverseContext Context for traversal.
   * @return {!number} The number of children in this subtree.
   */


  function traverseAllChildren(children, callback, traverseContext) {
    if (children == null) {
      return 0;
    }

    return traverseAllChildrenImpl(children, '', callback, traverseContext);
  }
  /**
   * Generate a key string that identifies a component within a set.
   *
   * @param {*} component A component that could contain a manual key.
   * @param {number} index Index that is used if a manual key is not provided.
   * @return {string}
   */


  function getComponentKey(component, index) {
    // Do some typechecking here since we call this blindly. We want to ensure
    // that we don't block potential future ES APIs.
    if (typeof component === 'object' && component !== null && component.key != null) {
      // Explicit key
      return escape(component.key);
    } // Implicit key determined by the index in the set


    return index.toString(36);
  }

  function forEachSingleChild(bookKeeping, child, name) {
    var func = bookKeeping.func,
        context = bookKeeping.context;
    func.call(context, child, bookKeeping.count++);
  }
  /**
   * Iterates through children that are typically specified as `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
   *
   * The provided forEachFunc(child, index) will be called for each
   * leaf child.
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} forEachFunc
   * @param {*} forEachContext Context for forEachContext.
   */


  function forEachChildren(children, forEachFunc, forEachContext) {
    if (children == null) {
      return children;
    }

    var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
    traverseAllChildren(children, forEachSingleChild, traverseContext);
    releaseTraverseContext(traverseContext);
  }

  function mapSingleChildIntoContext(bookKeeping, child, childKey) {
    var result = bookKeeping.result,
        keyPrefix = bookKeeping.keyPrefix,
        func = bookKeeping.func,
        context = bookKeeping.context;
    var mappedChild = func.call(context, child, bookKeeping.count++);

    if (Array.isArray(mappedChild)) {
      mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {
        return c;
      });
    } else if (mappedChild != null) {
      if (isValidElement(mappedChild)) {
        mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
        // traverseAllChildren used to do for objects as children
        keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
      }

      result.push(mappedChild);
    }
  }

  function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
    var escapedPrefix = '';

    if (prefix != null) {
      escapedPrefix = escapeUserProvidedKey(prefix) + '/';
    }

    var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
    traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
    releaseTraverseContext(traverseContext);
  }
  /**
   * Maps children that are typically specified as `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenmap
   *
   * The provided mapFunction(child, key, index) will be called for each
   * leaf child.
   *
   * @param {?*} children Children tree container.
   * @param {function(*, int)} func The map function.
   * @param {*} context Context for mapFunction.
   * @return {object} Object containing the ordered map of results.
   */


  function mapChildren(children, func, context) {
    if (children == null) {
      return children;
    }

    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, func, context);
    return result;
  }
  /**
   * Count the number of children that are typically specified as
   * `props.children`.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrencount
   *
   * @param {?*} children Children tree container.
   * @return {number} The number of children.
   */


  function countChildren(children) {
    return traverseAllChildren(children, function () {
      return null;
    }, null);
  }
  /**
   * Flatten a children object (typically specified as `props.children`) and
   * return an array with appropriately re-keyed children.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
   */


  function toArray(children) {
    var result = [];
    mapIntoWithKeyPrefixInternal(children, result, null, function (child) {
      return child;
    });
    return result;
  }
  /**
   * Returns the first child in a collection of children and verifies that there
   * is only one child in the collection.
   *
   * See https://reactjs.org/docs/react-api.html#reactchildrenonly
   *
   * The current implementation of this function assumes that a single child gets
   * passed without a wrapper, but the purpose of this helper function is to
   * abstract away the particular structure of children.
   *
   * @param {?object} children Child collection structure.
   * @return {ReactElement} The first and only `ReactElement` contained in the
   * structure.
   */


  function onlyChild(children) {
    if (!isValidElement(children)) {
      {
        throw Error( "React.Children.only expected to receive a single React element child." );
      }
    }

    return children;
  }

  function createContext(defaultValue, calculateChangedBits) {
    if (calculateChangedBits === undefined) {
      calculateChangedBits = null;
    } else {
      {
        if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') {
          error('createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);
        }
      }
    }

    var context = {
      $$typeof: REACT_CONTEXT_TYPE,
      _calculateChangedBits: calculateChangedBits,
      // As a workaround to support multiple concurrent renderers, we categorize
      // some renderers as primary and others as secondary. We only expect
      // there to be two concurrent renderers at most: React Native (primary) and
      // Fabric (secondary); React DOM (primary) and React ART (secondary).
      // Secondary renderers store their context values on separate fields.
      _currentValue: defaultValue,
      _currentValue2: defaultValue,
      // Used to track how many concurrent renderers this context currently
      // supports within in a single renderer. Such as parallel server rendering.
      _threadCount: 0,
      // These are circular
      Provider: null,
      Consumer: null
    };
    context.Provider = {
      $$typeof: REACT_PROVIDER_TYPE,
      _context: context
    };
    var hasWarnedAboutUsingNestedContextConsumers = false;
    var hasWarnedAboutUsingConsumerProvider = false;

    {
      // A separate object, but proxies back to the original context object for
      // backwards compatibility. It has a different $$typeof, so we can properly
      // warn for the incorrect usage of Context as a Consumer.
      var Consumer = {
        $$typeof: REACT_CONTEXT_TYPE,
        _context: context,
        _calculateChangedBits: context._calculateChangedBits
      }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

      Object.defineProperties(Consumer, {
        Provider: {
          get: function () {
            if (!hasWarnedAboutUsingConsumerProvider) {
              hasWarnedAboutUsingConsumerProvider = true;

              error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
            }

            return context.Provider;
          },
          set: function (_Provider) {
            context.Provider = _Provider;
          }
        },
        _currentValue: {
          get: function () {
            return context._currentValue;
          },
          set: function (_currentValue) {
            context._currentValue = _currentValue;
          }
        },
        _currentValue2: {
          get: function () {
            return context._currentValue2;
          },
          set: function (_currentValue2) {
            context._currentValue2 = _currentValue2;
          }
        },
        _threadCount: {
          get: function () {
            return context._threadCount;
          },
          set: function (_threadCount) {
            context._threadCount = _threadCount;
          }
        },
        Consumer: {
          get: function () {
            if (!hasWarnedAboutUsingNestedContextConsumers) {
              hasWarnedAboutUsingNestedContextConsumers = true;

              error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
            }

            return context.Consumer;
          }
        }
      }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

      context.Consumer = Consumer;
    }

    {
      context._currentRenderer = null;
      context._currentRenderer2 = null;
    }

    return context;
  }

  function lazy(ctor) {
    var lazyType = {
      $$typeof: REACT_LAZY_TYPE,
      _ctor: ctor,
      // React uses these fields to store the result.
      _status: -1,
      _result: null
    };

    {
      // In production, this would just set it on the object.
      var defaultProps;
      var propTypes;
      Object.defineProperties(lazyType, {
        defaultProps: {
          configurable: true,
          get: function () {
            return defaultProps;
          },
          set: function (newDefaultProps) {
            error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

            defaultProps = newDefaultProps; // Match production behavior more closely:

            Object.defineProperty(lazyType, 'defaultProps', {
              enumerable: true
            });
          }
        },
        propTypes: {
          configurable: true,
          get: function () {
            return propTypes;
          },
          set: function (newPropTypes) {
            error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

            propTypes = newPropTypes; // Match production behavior more closely:

            Object.defineProperty(lazyType, 'propTypes', {
              enumerable: true
            });
          }
        }
      });
    }

    return lazyType;
  }

  function forwardRef(render) {
    {
      if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
        error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
      } else if (typeof render !== 'function') {
        error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
      } else {
        if (render.length !== 0 && render.length !== 2) {
          error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
        }
      }

      if (render != null) {
        if (render.defaultProps != null || render.propTypes != null) {
          error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');
        }
      }
    }

    return {
      $$typeof: REACT_FORWARD_REF_TYPE,
      render: render
    };
  }

  function isValidElementType(type) {
    return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
    type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
  }

  function memo(type, compare) {
    {
      if (!isValidElementType(type)) {
        error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
      }
    }

    return {
      $$typeof: REACT_MEMO_TYPE,
      type: type,
      compare: compare === undefined ? null : compare
    };
  }

  function resolveDispatcher() {
    var dispatcher = ReactCurrentDispatcher.current;

    if (!(dispatcher !== null)) {
      {
        throw Error( "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem." );
      }
    }

    return dispatcher;
  }

  function useContext(Context, unstable_observedBits) {
    var dispatcher = resolveDispatcher();

    {
      if (unstable_observedBits !== undefined) {
        error('useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://fb.me/rules-of-hooks' : '');
      } // TODO: add a more generic warning for invalid values.


      if (Context._context !== undefined) {
        var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
        // and nobody should be using this in existing code.

        if (realContext.Consumer === Context) {
          error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
        } else if (realContext.Provider === Context) {
          error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
        }
      }
    }

    return dispatcher.useContext(Context, unstable_observedBits);
  }
  function useState(initialState) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useState(initialState);
  }
  function useReducer(reducer, initialArg, init) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useReducer(reducer, initialArg, init);
  }
  function useRef(initialValue) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useRef(initialValue);
  }
  function useEffect(create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useEffect(create, deps);
  }
  function useLayoutEffect(create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useLayoutEffect(create, deps);
  }
  function useCallback(callback, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useCallback(callback, deps);
  }
  function useMemo(create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useMemo(create, deps);
  }
  function useImperativeHandle(ref, create, deps) {
    var dispatcher = resolveDispatcher();
    return dispatcher.useImperativeHandle(ref, create, deps);
  }
  function useDebugValue(value, formatterFn) {
    {
      var dispatcher = resolveDispatcher();
      return dispatcher.useDebugValue(value, formatterFn);
    }
  }

  var propTypesMisspellWarningShown;

  {
    propTypesMisspellWarningShown = false;
  }

  function getDeclarationErrorAddendum() {
    if (ReactCurrentOwner.current) {
      var name = getComponentName(ReactCurrentOwner.current.type);

      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }

    return '';
  }

  function getSourceInfoErrorAddendum(source) {
    if (source !== undefined) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }

    return '';
  }

  function getSourceInfoErrorAddendumForProps(elementProps) {
    if (elementProps !== null && elementProps !== undefined) {
      return getSourceInfoErrorAddendum(elementProps.__source);
    }

    return '';
  }
  /**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */


  var ownerHasKeyUseWarning = {};

  function getCurrentComponentErrorInfo(parentType) {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }

    return info;
  }
  /**
   * Warn if the element doesn't have an explicit key assigned to it.
   * This element is in an array. The array could grow and shrink or be
   * reordered. All children that haven't already been validated are required to
   * have a "key" property assigned to it. Error statuses are cached so a warning
   * will only be shown once.
   *
   * @internal
   * @param {ReactElement} element Element that requires a key.
   * @param {*} parentType element's parent's type.
   */


  function validateExplicitKey(element, parentType) {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }

    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = '';

    if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
      // Give the component that originally created this child.
      childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
    }

    setCurrentlyValidatingElement(element);

    {
      error('Each child in a list should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);
    }

    setCurrentlyValidatingElement(null);
  }
  /**
   * Ensure that every element either is passed in a static location, in an
   * array with an explicit keys property defined, or in an object literal
   * with valid key property.
   *
   * @internal
   * @param {ReactNode} node Statically passed child of any type.
   * @param {*} parentType node's parent's type.
   */


  function validateChildKeys(node, parentType) {
    if (typeof node !== 'object') {
      return;
    }

    if (Array.isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);

      if (typeof iteratorFn === 'function') {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;

          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
  /**
   * Given an element, validate that its props follow the propTypes definition,
   * provided by the type.
   *
   * @param {ReactElement} element
   */


  function validatePropTypes(element) {
    {
      var type = element.type;

      if (type === null || type === undefined || typeof type === 'string') {
        return;
      }

      var name = getComponentName(type);
      var propTypes;

      if (typeof type === 'function') {
        propTypes = type.propTypes;
      } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      type.$$typeof === REACT_MEMO_TYPE)) {
        propTypes = type.propTypes;
      } else {
        return;
      }

      if (propTypes) {
        setCurrentlyValidatingElement(element);
        checkPropTypes(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);
        setCurrentlyValidatingElement(null);
      } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
        propTypesMisspellWarningShown = true;

        error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
      }

      if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
        error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
      }
    }
  }
  /**
   * Given a fragment, validate that it can only be provided with fragment props
   * @param {ReactElement} fragment
   */


  function validateFragmentProps(fragment) {
    {
      setCurrentlyValidatingElement(fragment);
      var keys = Object.keys(fragment.props);

      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        if (key !== 'children' && key !== 'key') {
          error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

          break;
        }
      }

      if (fragment.ref !== null) {
        error('Invalid attribute `ref` supplied to `React.Fragment`.');
      }

      setCurrentlyValidatingElement(null);
    }
  }
  function createElementWithValidation(type, props, children) {
    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.

    if (!validType) {
      var info = '';

      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendumForProps(props);

      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      var typeString;

      if (type === null) {
        typeString = 'null';
      } else if (Array.isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }

      {
        error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
      }
    }

    var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.

    if (element == null) {
      return element;
    } // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)


    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    if (type === REACT_FRAGMENT_TYPE) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }

    return element;
  }
  var didWarnAboutDeprecatedCreateFactory = false;
  function createFactoryWithValidation(type) {
    var validatedFactory = createElementWithValidation.bind(null, type);
    validatedFactory.type = type;

    {
      if (!didWarnAboutDeprecatedCreateFactory) {
        didWarnAboutDeprecatedCreateFactory = true;

        warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');
      } // Legacy hook: remove it


      Object.defineProperty(validatedFactory, 'type', {
        enumerable: false,
        get: function () {
          warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');

          Object.defineProperty(this, 'type', {
            value: type
          });
          return type;
        }
      });
    }

    return validatedFactory;
  }
  function cloneElementWithValidation(element, props, children) {
    var newElement = cloneElement.apply(this, arguments);

    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }

    validatePropTypes(newElement);
    return newElement;
  }

  {

    try {
      var frozenObject = Object.freeze({});
      var testMap = new Map([[frozenObject, null]]);
      var testSet = new Set([frozenObject]); // This is necessary for Rollup to not consider these unused.
      // https://github.com/rollup/rollup/issues/1771
      // TODO: we can remove these if Rollup fixes the bug.

      testMap.set(0, 0);
      testSet.add(0);
    } catch (e) {
    }
  }

  var createElement$1 =  createElementWithValidation ;
  var cloneElement$1 =  cloneElementWithValidation ;
  var createFactory =  createFactoryWithValidation ;
  var Children = {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  };

  exports.Children = Children;
  exports.Component = Component;
  exports.Fragment = REACT_FRAGMENT_TYPE;
  exports.Profiler = REACT_PROFILER_TYPE;
  exports.PureComponent = PureComponent;
  exports.StrictMode = REACT_STRICT_MODE_TYPE;
  exports.Suspense = REACT_SUSPENSE_TYPE;
  exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
  exports.cloneElement = cloneElement$1;
  exports.createContext = createContext;
  exports.createElement = createElement$1;
  exports.createFactory = createFactory;
  exports.createRef = createRef;
  exports.forwardRef = forwardRef;
  exports.isValidElement = isValidElement;
  exports.lazy = lazy;
  exports.memo = memo;
  exports.useCallback = useCallback;
  exports.useContext = useContext;
  exports.useDebugValue = useDebugValue;
  exports.useEffect = useEffect;
  exports.useImperativeHandle = useImperativeHandle;
  exports.useLayoutEffect = useLayoutEffect;
  exports.useMemo = useMemo;
  exports.useReducer = useReducer;
  exports.useRef = useRef;
  exports.useState = useState;
  exports.version = ReactVersion;
    })();
  }
  });
  var react_development_1 = react_development.Children;
  var react_development_2 = react_development.Component;
  var react_development_3 = react_development.Fragment;
  var react_development_4 = react_development.Profiler;
  var react_development_5 = react_development.PureComponent;
  var react_development_6 = react_development.StrictMode;
  var react_development_7 = react_development.Suspense;
  var react_development_8 = react_development.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  var react_development_9 = react_development.cloneElement;
  var react_development_10 = react_development.createContext;
  var react_development_11 = react_development.createElement;
  var react_development_12 = react_development.createFactory;
  var react_development_13 = react_development.createRef;
  var react_development_14 = react_development.forwardRef;
  var react_development_15 = react_development.isValidElement;
  var react_development_16 = react_development.lazy;
  var react_development_17 = react_development.memo;
  var react_development_18 = react_development.useCallback;
  var react_development_19 = react_development.useContext;
  var react_development_20 = react_development.useDebugValue;
  var react_development_21 = react_development.useEffect;
  var react_development_22 = react_development.useImperativeHandle;
  var react_development_23 = react_development.useLayoutEffect;
  var react_development_24 = react_development.useMemo;
  var react_development_25 = react_development.useReducer;
  var react_development_26 = react_development.useRef;
  var react_development_27 = react_development.useState;
  var react_development_28 = react_development.version;

  var react = createCommonjsModule(function (module) {

  if (process.env.NODE_ENV === 'production') {
    module.exports = react_production_min;
  } else {
    module.exports = react_development;
  }
  });
  var react_1 = react.Children;
  var react_2 = react.Component;
  var react_3 = react.Fragment;
  var react_4 = react.Profiler;
  var react_5 = react.PureComponent;
  var react_6 = react.StrictMode;
  var react_7 = react.Suspense;
  var react_8 = react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  var react_9 = react.cloneElement;
  var react_10 = react.createContext;
  var react_11 = react.createElement;
  var react_12 = react.createFactory;
  var react_13 = react.createRef;
  var react_14 = react.forwardRef;
  var react_15 = react.isValidElement;
  var react_16 = react.lazy;
  var react_17 = react.memo;
  var react_18 = react.useCallback;
  var react_19 = react.useContext;
  var react_20 = react.useDebugValue;
  var react_21 = react.useEffect;
  var react_22 = react.useImperativeHandle;
  var react_23 = react.useLayoutEffect;
  var react_24 = react.useMemo;
  var react_25 = react.useReducer;
  var react_26 = react.useRef;
  var react_27 = react.useState;
  var react_28 = react.version;

  var useTracker = (function (trackerFn) {
    var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var _useState = react_27(trackerFn()),
        _useState2 = _slicedToArray(_useState, 2),
        response = _useState2[0],
        setResponse = _useState2[1];

    var meteorDataDep = new trackr.Dependency();
    var computation = null;

    var dataChangedCallback = function dataChangedCallback() {
      meteorDataDep.changed();
    };

    var stopComputation = function stopComputation() {
      computation && computation.stop();
      computation = null;
    };

    Data.onChange(dataChangedCallback);
    react_21(function () {
      stopComputation();
      trackr.autorun(function (currentComputation) {
        meteorDataDep.depend();
        computation = currentComputation;
        setResponse(trackerFn());
      });
      return function () {
        stopComputation();
        Data.offChange(dataChangedCallback);
      };
    }, deps);
    return response;
  });

  function withTracker(options) {
    return function (Component) {
      var expandedOptions = typeof options === 'function' ? {
        getMeteorData: options
      } : options;
      var getMeteorData = expandedOptions.getMeteorData,
          _expandedOptions$pure = expandedOptions.pure,
          pure = _expandedOptions$pure === void 0 ? true : _expandedOptions$pure;
      var WithTracker = /*#__PURE__*/react_14(function (props, ref) {
        var data = useTracker(function () {
          return getMeteorData(props) || {};
        });
        return /*#__PURE__*/react.createElement(Component, _extends({
          ref: ref
        }, props, data));
      });
      return pure ? /*#__PURE__*/react_17(WithTracker) : WithTracker;
    };
  }

  var stringify = function stringify(value) {
    if (value === undefined) {
      return 'undefined';
    }

    return EJSON.stringify(value);
  };

  var parse = function parse(serialized) {
    if (serialized === undefined || serialized === 'undefined') {
      return undefined;
    }

    return EJSON.parse(serialized);
  };

  var ReactiveDict = /*#__PURE__*/function () {
    function ReactiveDict(dictName) {
      _classCallCheck(this, ReactiveDict);

      this.keys = {};

      if (_typeof(dictName) === 'object') {
        for (var i in dictName) {
          this.keys[i] = stringify(dictName[i]);
        }
      }
    }

    _createClass(ReactiveDict, [{
      key: "set",
      value: function set(keyOrObject, value) {
        if (_typeof(keyOrObject) === 'object' && value === undefined) {
          this._setObject(keyOrObject);

          return;
        } // the input isn't an object, so it must be a key
        // and we resume with the rest of the function


        var key = keyOrObject;
        value = stringify(value);
        var oldSerializedValue = 'undefined';

        if (Object.keys(this.keys).indexOf(key) !== -1) {
          oldSerializedValue = this.keys[key];
        }

        if (value === oldSerializedValue) {
          return;
        }

        this.keys[key] = value;
        Data.notify('change');
      }
    }, {
      key: "setDefault",
      value: function setDefault(key, value) {
        // for now, explicitly check for undefined, since there is no
        // ReactiveDict.clear().  Later we might have a ReactiveDict.clear(), in which case
        // we should check if it has the key.
        if (this.keys[key] === undefined) {
          this.set(key, value);
        }
      }
    }, {
      key: "get",
      value: function get(key) {
        return parse(this.keys[key]);
      }
    }, {
      key: "equals",
      value: function equals(key, value) {
        // We don't allow objects (or arrays that might include objects) for
        // .equals, because JSON.stringify doesn't canonicalize object key
        // order. (We can make equals have the right return value by parsing the
        // current value and using EJSON.equals, but we won't have a canonical
        // element of keyValueDeps[key] to store the dependency.) You can still use
        // "EJSON.equals(reactiveDict.get(key), value)".
        //
        // XXX we could allow arrays as long as we recursively check that there
        // are no objects
        if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean' && typeof value !== 'undefined' && !(value instanceof Date) && !(MongoID.ObjectID && value instanceof MongoID.ObjectID) && value !== null) {
          throw new Error('ReactiveDict.equals: value must be scalar');
        }

        var oldValue;

        if (Object.keys(this.keys).indexOf(key) !== -1) {
          oldValue = parse(this.keys[key]);
        }

        return EJSON.equals(oldValue, value);
      }
    }, {
      key: "_setObject",
      value: function _setObject(object) {
        var keys = Object.keys(object);

        for (var i in keys) {
          this.set(i, keys[i]);
        }
      }
    }]);

    return ReactiveDict;
  }();

  var Storage;

  if (isReactNative) {
    try {
      Storage = require('@react-native-community/async-storage')["default"];
    } catch (e) {
      throw new MeteorError('RequiresAsyncStorage', "@socialize/react-native-meteor requires on @react-native-community/async-storage.\n            please run npm install --save @react-native-community/async-storage");
    }
  } else {
    Storage = localStorage;
  }

  var TOKEN_KEY = 'reactnativemeteor_usertoken';
  var User = {
    user: function user() {
      if (!this._userIdSaved) return null;
      return this.users.findOne(this._userIdSaved);
    },
    users: new Collection$1('users'),
    userId: function userId() {
      if (!this._userIdSaved) return null;
      var user = this.users.findOne(this._userIdSaved);
      return user && user._id;
    },
    _isLoggingIn: true,
    loggingIn: function loggingIn() {
      return this._isLoggingIn;
    },
    logout: function logout(callback) {
      var _this = this;

      call('logout', function (err) {
        _this.handleLogout();

        _this.connect();

        typeof callback === 'function' && callback(err);
      });
    },
    handleLogout: function handleLogout() {
      Storage.removeItem(TOKEN_KEY);
      Data._tokenIdSaved = null;
      this._userIdSaved = null;
    },
    loginWithPassword: function loginWithPassword(selector, password, callback) {
      var _this2 = this;

      if (typeof selector === 'string') {
        if (selector.indexOf('@') === -1) {
          selector = {
            username: selector
          };
        } else {
          selector = {
            email: selector
          };
        }
      }

      this._startLoggingIn();

      call('login', {
        user: selector,
        password: hashPassword(password)
      }, function (err, result) {
        _this2._endLoggingIn();

        _this2._handleLoginCallback(err, result);

        typeof callback === 'function' && callback(err);
      });
    },
    logoutOtherClients: function logoutOtherClients() {
      var _this3 = this;

      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      call('getNewToken', function (err, res) {
        if (err) return callback(err);

        _this3._handleLoginCallback(err, res);

        call('removeOtherTokens', function (err) {
          callback(err);
        });
      });
    },
    _login: function _login(user, callback) {
      var _this4 = this;

      this._startLoggingIn();

      this.call('login', user, function (err, result) {
        _this4._endLoggingIn();

        _this4._handleLoginCallback(err, result);

        typeof callback === 'function' && callback(err);
      });
    },
    _startLoggingIn: function _startLoggingIn() {
      this._isLoggingIn = true;
      Data.notify('loggingIn');
    },
    _endLoggingIn: function _endLoggingIn() {
      this._isLoggingIn = false;
      Data.notify('loggingIn');
    },
    _handleLoginCallback: function _handleLoginCallback(err, result) {
      if (!err) {
        // save user id and token
        Storage.setItem(TOKEN_KEY, result.token);
        Data._tokenIdSaved = result.token;
        this._userIdSaved = result.id;
        Data.notify('onLogin');
      } else {
        Data.notify('onLoginFailure');
        this.handleLogout();
      }

      Data.notify('change');
    },
    _loginWithToken: function _loginWithToken(value) {
      var _this5 = this;

      Data._tokenIdSaved = value;

      if (value !== null) {
        this._startLoggingIn();

        call('login', {
          resume: value
        }, function (err, result) {
          _this5._endLoggingIn();

          _this5._handleLoginCallback(err, result);
        });
      } else {
        this._endLoggingIn();
      }
    },
    getAuthToken: function getAuthToken() {
      return Data._tokenIdSaved;
    },
    getAuthTokenFromStorage: function getAuthTokenFromStorage() {
      return Storage.getItem(TOKEN_KEY);
    },
    _loadInitialUser: function _loadInitialUser() {
      var _this6 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var value;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                value = null;
                _context.prev = 1;
                _context.next = 4;
                return _this6.getAuthTokenFromStorage();

              case 4:
                value = _context.sent;
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                console && console.warn("Error Loading User: ".concat(_context.t0.message));

              case 10:
                _context.prev = 10;

                _this6._loginWithToken(value);

                return _context.finish(10);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 7, 10, 13]]);
      }))();
    }
  };

  var Accounts = {
    createUser: function createUser(options) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      // Replace password with the hashed password.
      options.password = hashPassword(options.password);

      User._startLoggingIn();

      call('createUser', options, function (err, result) {
        User._endLoggingIn();

        User._handleLoginCallback(err, result);

        callback(err);
      });
    },
    changePassword: function changePassword(oldPassword, newPassword) {
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      // TODO check Meteor.user() to prevent if not logged
      if (typeof newPassword !== 'string' || !newPassword) {
        return callback(new MeteorError('EmptyPassword', 'Password may not be empty'));
      }

      call('changePassword', oldPassword ? hashPassword(oldPassword) : null, hashPassword(newPassword), function (err, res) {
        callback(err);
      });
    },
    forgotPassword: function forgotPassword(options) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      if (!options.email) {
        return callback(new MeteorError('EmptyEmail', 'Must pass options.email'));
      }

      call('forgotPassword', options, function (err) {
        callback(err);
      });
    },
    resetPassword: function resetPassword(token, newPassword) {
      var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

      if (!newPassword) {
        return callback(new MeteorError('EmptyPassword', 'Must pass options.email'));
      }

      call('resetPassword', token, hashPassword(newPassword), function (err, result) {
        if (!err) {
          User._loginWithToken(result.token);
        }

        callback(err);
      });
    },
    onLogin: function onLogin(cb) {
      Data.on('onLogin', cb);
    },
    onLoginFailure: function onLoginFailure(cb) {
      Data.on('onLoginFailure', cb);
    }
  };

  var NetInfo;

  if (isReactNative) {
    try {
      NetInfo = require('@react-native-community/netinfo');
    } catch (e) {
      throw new MeteorError('RequiresNetInfo', "@socialize/react-native-meteor requires on @react-native-community/netinfo.\n            please run npm install --save @react-native-community/netinfo");
    }
  }

  var unsubscribe;
  module.exports = _objectSpread2(_objectSpread2({
    Accounts: Accounts,
    Random: Random,
    Tracker: trackr,
    EJSON: EJSON,
    Error: MeteorError,
    ReactiveDict: ReactiveDict,
    isClient: true,
    isReactNative: isReactNative,
    Mongo: {
      Collection: Collection$1
    },
    withTracker: withTracker,
    useTracker: useTracker,
    getData: function getData() {
      return Data;
    }
  }, User), {}, {
    status: function status() {
      return {
        connected: Data.ddp ? Data.ddp.status === 'connected' : false,
        status: Data.ddp ? Data.ddp.status : 'disconnected'
      };
    },
    call: call,
    disconnect: function disconnect() {
      if (Data.ddp) {
        Data.ddp.disconnect();
        Data.ddp = null;
      }

      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
    },
    _get: function _get(obj
    /* , arguments */
    ) {
      for (var i = 1; i < arguments.length; i++) {
        if (!(arguments[i] in obj)) {
          return undefined;
        }

        obj = obj[arguments[i]];
      }

      return obj;
    },
    _ensure: function _ensure(obj
    /* , arguments */
    ) {
      for (var i = 1; i < arguments.length; i++) {
        var key = arguments[i];

        if (!(key in obj)) {
          obj[key] = {};
        }

        obj = obj[key];
      }

      return obj;
    },
    _delete: function _delete(obj
    /* , arguments */
    ) {
      var stack = [obj];
      var leaf = true;

      for (var i = 1; i < arguments.length - 1; i++) {
        var key = arguments[i];

        if (!(key in obj)) {
          leaf = false;
          break;
        }

        obj = obj[key];

        if (_typeof(obj) !== 'object') {
          break;
        }

        stack.push(obj);
      }

      for (var _i = stack.length - 1; _i >= 0; _i--) {
        var _key = arguments[_i + 1];

        if (leaf) {
          leaf = false;
        } else {
          for (var other in stack[_i][_key]) {
            return;
          }
        } // not empty -- we're done


        delete stack[_i][_key];
      }
    },
    _subscriptionsRestart: function _subscriptionsRestart() {
      for (var i in Data.subscriptions) {
        var sub = Data.subscriptions[i];
        Data.ddp.unsub(sub.subIdRemember);
        sub.subIdRemember = Data.ddp.sub(sub.name, sub.params);
      }
    },
    waitDdpConnected: Data.waitDdpConnected.bind(Data),
    reconnect: function reconnect() {
      if (Data.ddp) {
        Data.ddp.connect();
      } else {
        this.connect();
      }
    },
    connect: function connect(endpoint, options) {
      var _this = this;

      if (!Data.ddp) {
        if (!endpoint) {
          endpoint = Data._endpoint;
        }

        if (!options) {
          options = Data._options;
        }

        Data._endpoint = endpoint;
        Data._options = options;
        this.ddp = Data.ddp = new DDP(_objectSpread2({
          endpoint: endpoint,
          SocketConstructor: WebSocket
        }, options));

        if (NetInfo) {
          unsubscribe = NetInfo.addEventListener(function (_ref) {
            var isConnected = _ref.isConnected;

            if (isConnected && Data.ddp.autoReconnect) {
              Data.ddp.connect();
            }
          });
        }

        Data.ddp.on('connected', function () {
          Data.notify('change');
          console && console.info('Connected to DDP server.');

          _this._loadInitialUser().then(function () {
            _this._subscriptionsRestart();
          });
        });
        var lastDisconnect = null;
        Data.ddp.on('disconnected', function () {
          Data.notify('change');
          console && console.info('Disconnected from DDP server.');

          if (!Data.ddp.autoReconnect) {
            return;
          }

          if (!lastDisconnect || new Date() - lastDisconnect > 3000) {
            Data.ddp.connect();
          }

          lastDisconnect = new Date();
        });
        Data.ddp.on('added', function (message) {
          if (!Data.db[message.collection]) {
            Data.db.addCollection(message.collection);
          }

          Data.db[message.collection].upsert(_objectSpread2({
            _id: message.id
          }, message.fields));
        });
        Data.ddp.on('ready', function (message) {
          var idsMap = new Map();

          for (var i in Data.subscriptions) {
            var sub = Data.subscriptions[i];
            idsMap.set(sub.subIdRemember, sub.id);
          }

          for (var _i2 in message.subs) {
            var subId = idsMap.get(message.subs[_i2]);

            if (subId) {
              var _sub = Data.subscriptions[subId];
              _sub.ready = true;

              _sub.readyDeps.changed();

              _sub.readyCallback && _sub.readyCallback();
            }
          }
        });
        Data.ddp.on('changed', function (message) {
          var unset = {};

          if (message.cleared) {
            message.cleared.forEach(function (field) {
              unset[field] = null;
            });
          }

          Data.db[message.collection] && Data.db[message.collection].upsert(_objectSpread2(_objectSpread2({
            _id: message.id
          }, message.fields), unset));
        });
        Data.ddp.on('removed', function (message) {
          Data.db[message.collection] && Data.db[message.collection].del(message.id);
        });
        Data.ddp.on('result', function (message) {
          var call = Data.calls.find(function (call) {
            return call.id === message.id;
          });

          if (typeof call.callback === 'function') {
            call.callback(message.error, message.result);
          }

          Data.calls.splice(Data.calls.findIndex(function (call) {
            return call.id === message.id;
          }), 1);
        });
        Data.ddp.on('nosub', function (message) {
          for (var i in Data.subscriptions) {
            var sub = Data.subscriptions[i];

            if (sub.subIdRemember === message.id) {
              console.warn('No subscription existing for', sub.name);
            }
          }
        });
      } else {
        this.reconnect();
      }
    },
    subscribe: function subscribe(name) {
      var params = Array.prototype.slice.call(arguments, 1);
      var callbacks = {};

      if (params.length) {
        var lastParam = params[params.length - 1];

        if (typeof lastParam === 'function') {
          callbacks.onReady = params.pop();
        } else if (lastParam && (typeof lastParam.onReady === 'function' || typeof lastParam.onError === 'function' || typeof lastParam.onStop === 'function')) {
          callbacks = params.pop();
        }
      } // Is there an existing sub with the same name and param, run in an
      // invalidated Computation? This will happen if we are rerunning an
      // existing computation.
      //
      // For example, consider a rerun of:
      //
      //     Tracker.autorun(function () {
      //       Meteor.subscribe("foo", Session.get("foo"));
      //       Meteor.subscribe("bar", Session.get("bar"));
      //     });
      //
      // If "foo" has changed but "bar" has not, we will match the "bar"
      // subcribe to an existing inactive subscription in order to not
      // unsub and resub the subscription unnecessarily.
      //
      // We only look for one such sub; if there are N apparently-identical subs
      // being invalidated, we will require N matching subscribe calls to keep
      // them all active.


      var existing = false;

      for (var i in Data.subscriptions) {
        var sub = Data.subscriptions[i];

        if (sub.inactive && sub.name === name && EJSON.equals(sub.params, params)) {
          existing = sub;
        }
      }

      var id;

      if (existing) {
        id = existing.id;
        existing.inactive = false;

        if (callbacks.onReady) {
          // If the sub is not already ready, replace any ready callback with the
          // one provided now. (It's not really clear what users would expect for
          // an onReady callback inside an autorun; the semantics we provide is
          // that at the time the sub first becomes ready, we call the last
          // onReady callback provided, if any.)
          if (!existing.ready) {
            existing.readyCallback = callbacks.onReady;
          }
        }

        if (callbacks.onStop) {
          existing.stopCallback = callbacks.onStop;
        }
      } else {
        // New sub! Generate an id, save it locally, and send message.
        id = Random.id();
        var subIdRemember = Data.ddp.sub(name, params);
        Data.subscriptions[id] = {
          id: id,
          subIdRemember: subIdRemember,
          name: name,
          params: EJSON.clone(params),
          inactive: false,
          ready: false,
          readyDeps: new trackr.Dependency(),
          readyCallback: callbacks.onReady,
          stopCallback: callbacks.onStop,
          stop: function stop() {
            Data.ddp.unsub(this.subIdRemember);
            delete Data.subscriptions[this.id];
            this.ready && this.readyDeps.changed();

            if (callbacks.onStop) {
              callbacks.onStop();
            }
          }
        };
      } // return a handle to the application.


      var handle = {
        stop: function stop() {
          if (Data.subscriptions[id]) {
            Data.subscriptions[id].stop();
          }
        },
        ready: function ready() {
          if (!Data.subscriptions[id]) {
            return false;
          }

          var record = Data.subscriptions[id];
          record.readyDeps.depend();
          return record.ready;
        },
        subscriptionId: id
      };

      if (trackr.active) {
        // We're in a reactive computation, so we'd like to unsubscribe when the
        // computation is invalidated... but not if the rerun just re-subscribes
        // to the same subscription!  When a rerun happens, we use onInvalidate
        // as a change to mark the subscription "inactive" so that it can
        // be reused from the rerun.  If it isn't reused, it's killed from
        // an afterFlush.
        trackr.onInvalidate(function () {
          if (Data.subscriptions[id]) {
            Data.subscriptions[id].inactive = true;
          }

          trackr.afterFlush(function () {
            if (Data.subscriptions[id] && Data.subscriptions[id].inactive) {
              handle.stop();
            }
          });
        });
      }

      return handle;
    }
  });

})));

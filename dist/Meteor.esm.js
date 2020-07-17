import Trackr from 'trackr';
import EJSON from 'ejson';
import EventEmitter from 'wolfy87-eventemitter';
import Minimongo from 'minimongo-cache';
import React, { useState, useEffect, memo, forwardRef } from 'react';

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
var i = 0;
function uniqueId() {
  return (i++).toString();
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

var InteractionManager;
var ReactNative;

if (isReactNative) {
  InteractionManager = require('react-native').InteractionManager; // eslint-disable-line

  ReactNative = require('react-native/Libraries/Renderer/shims/ReactNative'); // eslint-disable-line
}

process.nextTick = setImmediate;
var db = new Minimongo();
db.debug = false;

if (ReactNative) {
  db.batchedUpdates = ReactNative.unstable_batchedUpdates;
}

function runAfterOtherComputations(fn) {
  InteractionManager ? InteractionManager.runAfterInteractions(function () {
    Trackr.afterFlush(function () {
      fn();
    });
  }) : Trackr.afterFlush(function () {
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

var Collection = /*#__PURE__*/function () {
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

    var transformed = Trackr.nonreactive(function () {
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

var useTracker = (function (trackerFn) {
  var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var _useState = useState(trackerFn()),
      _useState2 = _slicedToArray(_useState, 2),
      response = _useState2[0],
      setResponse = _useState2[1];

  var meteorDataDep = new Trackr.Dependency();
  var computation = null;

  var dataChangedCallback = function dataChangedCallback() {
    meteorDataDep.changed();
  };

  var stopComputation = function stopComputation() {
    computation && computation.stop();
    computation = null;
  };

  Data.onChange(dataChangedCallback);
  useEffect(function () {
    stopComputation();
    Trackr.autorun(function (currentComputation) {
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
    var WithTracker = /*#__PURE__*/forwardRef(function (props, ref) {
      var data = useTracker(function () {
        return getMeteorData(props) || {};
      });
      return /*#__PURE__*/React.createElement(Component, _extends({
        ref: ref
      }, props, data));
    });
    return pure ? /*#__PURE__*/memo(WithTracker) : WithTracker;
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
  users: new Collection('users'),
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
  Tracker: Trackr,
  EJSON: EJSON,
  Error: MeteorError,
  ReactiveDict: ReactiveDict,
  isClient: true,
  isReactNative: isReactNative,
  Mongo: {
    Collection: Collection
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
        readyDeps: new Trackr.Dependency(),
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

    if (Trackr.active) {
      // We're in a reactive computation, so we'd like to unsubscribe when the
      // computation is invalidated... but not if the rerun just re-subscribes
      // to the same subscription!  When a rerun happens, we use onInvalidate
      // as a change to mark the subscription "inactive" so that it can
      // be reused from the rerun.  If it isn't reused, it's killed from
      // an afterFlush.
      Trackr.onInvalidate(function () {
        if (Data.subscriptions[id]) {
          Data.subscriptions[id].inactive = true;
        }

        Trackr.afterFlush(function () {
          if (Data.subscriptions[id] && Data.subscriptions[id].inactive) {
            handle.stop();
          }
        });
      });
    }

    return handle;
  }
});

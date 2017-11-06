(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash/fp"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash/fp"], factory);
	else if(typeof exports === 'object')
		exports["react-social-auth"] = factory(require("lodash/fp"));
	else
		root["react-social-auth"] = factory(root["lodash/fp"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
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

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryParameter = exports.hasRequiredSettings = exports.loadScript = undefined;

var _fp = __webpack_require__(4);

var _fp2 = _interopRequireDefault(_fp);

var _futilJs = __webpack_require__(15);

var F = _interopRequireWildcard(_futilJs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadScript = exports.loadScript = function loadScript(id, src, onload) {
  if (typeof document !== 'undefined') {
    if (!document.getElementById(id)) {
      var siblingElement = _fp2.default.head(document.getElementsByTagName('script'));
      var scriptElement = document.createElement('script');
      F.extendOn(scriptElement, { id: id, src: src, onload: onload, async: true });
      siblingElement.parentNode.insertBefore(scriptElement, siblingElement);
    }
  }
};

var hasProperties = _fp2.default.curry(function (properties, instance) {
  return _fp2.default.every(function (property) {
    return _fp2.default.has(property, instance) && !_fp2.default.isNil(property, instance);
  }, properties);
});

var hasRequiredSettings = exports.hasRequiredSettings = function hasRequiredSettings(instance) {
  var requiredSettings = ['appId', 'onSuccess', 'component'];
  if (!hasProperties(requiredSettings, instance)) {
    throw '[Social Authentication] - A valid value for the following setting is required ' + requiredSettings.join(', ') + '.';
  } else {
    return true;
  }
};

var getQueryParameter = exports.getQueryParameter = function getQueryParameter(name) {
  if (typeof window !== 'undefined') {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(11);
} else {
  module.exports = __webpack_require__(12);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
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


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(2);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
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

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LinkedInAuth = exports.GoogleAuth = undefined;

var _GoogleAuth = __webpack_require__(10);

var _GoogleAuth2 = _interopRequireDefault(_GoogleAuth);

var _LinkedInAuth = __webpack_require__(16);

var _LinkedInAuth2 = _interopRequireDefault(_LinkedInAuth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.GoogleAuth = _GoogleAuth2.default;
exports.LinkedInAuth = _LinkedInAuth2.default;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _common = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getAuthPayload = function getAuthPayload(appId, user) {
  var profile = user.getBasicProfile();
  var authResponse = user.getAuthResponse();
  return {
    type: 'google',
    profile: {
      id: profile.getId(),
      firstName: profile.getGivenName(),
      lastName: profile.getFamilyName(),
      email: profile.getEmail()
    },
    authResponse: {
      clientId: appId,
      token: authResponse.id_token
    }
  };
};

var GoogleAuth = function (_React$Component) {
  _inherits(GoogleAuth, _React$Component);

  function GoogleAuth(props) {
    _classCallCheck(this, GoogleAuth);

    var _this = _possibleConstructorReturn(this, (GoogleAuth.__proto__ || Object.getPrototypeOf(GoogleAuth)).call(this, props));

    (0, _common.hasRequiredSettings)(_this.props);
    return _this;
  }

  _createClass(GoogleAuth, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          appId = _props.appId,
          _props$scope = _props.scope,
          scope = _props$scope === undefined ? 'profile email' : _props$scope,
          _props$fetchBasicProf = _props.fetchBasicProfile,
          fetchBasicProfile = _props$fetchBasicProf === undefined ? true : _props$fetchBasicProf;


      (0, _common.loadScript)('google-platform', 'https://apis.google.com/js/platform.js', function () {
        var gapi = window.gapi;
        gapi.load('auth2', function () {
          if (!gapi.auth2.getAuthInstance()) {
            gapi.auth2.init({
              client_id: appId,
              fetch_basic_profile: fetchBasicProfile,
              scope: scope
            });
          }
        });
      });
    }
  }, {
    key: 'clickHandler',
    value: function clickHandler() {
      var _this2 = this;

      var gapi = window.gapi;
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signIn().then(function (user) {
        return _this2.props.onSuccess(getAuthPayload(_this2.props.appId, user));
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var Component = this.props.component;

      return _react2.default.createElement(Component, { onClick: this.clickHandler.bind(this) });
    }
  }]);

  return GoogleAuth;
}(_react2.default.Component);

exports.default = GoogleAuth;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 React v16.0.0
 react.production.min.js

 Copyright (c) 2013-present, Facebook, Inc.

 This source code is licensed under the MIT license found in the
 LICENSE file in the root directory of this source tree.
*/
var f=__webpack_require__(6),p=__webpack_require__(7);__webpack_require__(1);var r=__webpack_require__(2);
function t(a){for(var b=arguments.length-1,d="Minified React error #"+a+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d"+a,e=0;e<b;e++)d+="\x26args[]\x3d"+encodeURIComponent(arguments[e+1]);b=Error(d+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name="Invariant Violation";b.framesToPop=1;throw b;}
var u={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function v(a,b,d){this.props=a;this.context=b;this.refs=p;this.updater=d||u}v.prototype.isReactComponent={};v.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?t("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};v.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function w(a,b,d){this.props=a;this.context=b;this.refs=p;this.updater=d||u}function x(){}x.prototype=v.prototype;var y=w.prototype=new x;y.constructor=w;f(y,v.prototype);y.isPureReactComponent=!0;function z(a,b,d){this.props=a;this.context=b;this.refs=p;this.updater=d||u}var A=z.prototype=new x;A.constructor=z;f(A,v.prototype);A.unstable_isAsyncReactComponent=!0;A.render=function(){return this.props.children};
var B={Component:v,PureComponent:w,AsyncComponent:z},C={current:null},D=Object.prototype.hasOwnProperty,E="function"===typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103,F={key:!0,ref:!0,__self:!0,__source:!0};function G(a,b,d,e,c,g,k){return{$$typeof:E,type:a,key:b,ref:d,props:k,_owner:g}}
G.createElement=function(a,b,d){var e,c={},g=null,k=null,m=null,q=null;if(null!=b)for(e in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),m=void 0===b.__self?null:b.__self,q=void 0===b.__source?null:b.__source,b)D.call(b,e)&&!F.hasOwnProperty(e)&&(c[e]=b[e]);var l=arguments.length-2;if(1===l)c.children=d;else if(1<l){for(var h=Array(l),n=0;n<l;n++)h[n]=arguments[n+2];c.children=h}if(a&&a.defaultProps)for(e in l=a.defaultProps,l)void 0===c[e]&&(c[e]=l[e]);return G(a,g,k,m,q,C.current,c)};
G.createFactory=function(a){var b=G.createElement.bind(null,a);b.type=a;return b};G.cloneAndReplaceKey=function(a,b){return G(a.type,b,a.ref,a._self,a._source,a._owner,a.props)};
G.cloneElement=function(a,b,d){var e=f({},a.props),c=a.key,g=a.ref,k=a._self,m=a._source,q=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,q=C.current);void 0!==b.key&&(c=""+b.key);if(a.type&&a.type.defaultProps)var l=a.type.defaultProps;for(h in b)D.call(b,h)&&!F.hasOwnProperty(h)&&(e[h]=void 0===b[h]&&void 0!==l?l[h]:b[h])}var h=arguments.length-2;if(1===h)e.children=d;else if(1<h){l=Array(h);for(var n=0;n<h;n++)l[n]=arguments[n+2];e.children=l}return G(a.type,c,g,k,m,q,e)};
G.isValidElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===E};var H="function"===typeof Symbol&&Symbol.iterator,I="function"===typeof Symbol&&Symbol["for"]&&Symbol["for"]("react.element")||60103;function escape(a){var b={"\x3d":"\x3d0",":":"\x3d2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var J=/\/+/g,K=[];
function L(a,b,d,e){if(K.length){var c=K.pop();c.result=a;c.keyPrefix=b;c.func=d;c.context=e;c.count=0;return c}return{result:a,keyPrefix:b,func:d,context:e,count:0}}function M(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>K.length&&K.push(a)}
function N(a,b,d,e){var c=typeof a;if("undefined"===c||"boolean"===c)a=null;if(null===a||"string"===c||"number"===c||"object"===c&&a.$$typeof===I)return d(e,a,""===b?"."+O(a,0):b),1;var g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){c=a[k];var m=b+O(c,k);g+=N(c,m,d,e)}else if(m=H&&a[H]||a["@@iterator"],"function"===typeof m)for(a=m.call(a),k=0;!(c=a.next()).done;)c=c.value,m=b+O(c,k++),g+=N(c,m,d,e);else"object"===c&&(d=""+a,t("31","[object Object]"===d?"object with keys {"+
Object.keys(a).join(", ")+"}":d,""));return g}function O(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function P(a,b){a.func.call(a.context,b,a.count++)}function Q(a,b,d){var e=a.result,c=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?R(a,e,d,r.thatReturnsArgument):null!=a&&(G.isValidElement(a)&&(a=G.cloneAndReplaceKey(a,c+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(J,"$\x26/")+"/")+d)),e.push(a))}
function R(a,b,d,e,c){var g="";null!=d&&(g=(""+d).replace(J,"$\x26/")+"/");b=L(b,g,e,c);null==a||N(a,"",Q,b);M(b)}var S={forEach:function(a,b,d){if(null==a)return a;b=L(null,null,b,d);null==a||N(a,"",P,b);M(b)},map:function(a,b,d){if(null==a)return a;var e=[];R(a,e,null,b,d);return e},count:function(a){return null==a?0:N(a,"",r.thatReturnsNull,null)},toArray:function(a){var b=[];R(a,b,null,r.thatReturnsArgument);return b}};
module.exports={Children:{map:S.map,forEach:S.forEach,count:S.count,toArray:S.toArray,only:function(a){G.isValidElement(a)?void 0:t("143");return a}},Component:B.Component,PureComponent:B.PureComponent,unstable_AsyncComponent:B.AsyncComponent,createElement:G.createElement,cloneElement:G.cloneElement,isValidElement:G.isValidElement,createFactory:G.createFactory,version:"16.0.0",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:C,assign:f}};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.0.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== "production") {
(function() {

'use strict';

var objectAssign$1 = __webpack_require__(6);
var require$$0 = __webpack_require__(8);
var emptyObject = __webpack_require__(7);
var invariant = __webpack_require__(1);
var emptyFunction = __webpack_require__(2);
var checkPropTypes = __webpack_require__(13);

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule reactProdInvariant
 * 
 */

{
  var warning = require$$0;
}

function warnNoop(publicInstance, callerName) {
  {
    var constructor = publicInstance.constructor;
    warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass');
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

var ReactNoopUpdateQueue_1 = ReactNoopUpdateQueue;

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule lowPriorityWarning
 */

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning_1 = lowPriorityWarning;

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue_1;
}

ReactComponent.prototype.isReactComponent = {};

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
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
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
ReactComponent.prototype.forceUpdate = function (callback) {
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
    Object.defineProperty(ReactComponent.prototype, methodName, {
      get: function () {
        lowPriorityWarning_1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
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

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue_1;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
var pureComponentPrototype = ReactPureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
objectAssign$1(pureComponentPrototype, ReactComponent.prototype);
pureComponentPrototype.isPureReactComponent = true;

function ReactAsyncComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue_1;
}

var asyncComponentPrototype = ReactAsyncComponent.prototype = new ComponentDummy();
asyncComponentPrototype.constructor = ReactAsyncComponent;
// Avoid an extra prototype jump for these methods.
objectAssign$1(asyncComponentPrototype, ReactComponent.prototype);
asyncComponentPrototype.unstable_isAsyncReactComponent = true;
asyncComponentPrototype.render = function () {
  return this.props.children;
};

var ReactBaseClasses = {
  Component: ReactComponent,
  PureComponent: ReactPureComponent,
  AsyncComponent: ReactAsyncComponent
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactCurrentOwner
 * 
 */

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

var ReactCurrentOwner_1 = ReactCurrentOwner;

var hasOwnProperty = Object.prototype.hasOwnProperty;

{
  var warning$2 = require$$0;
}

// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE$1 = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown;
var specialPropRefWarningShown;

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
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warning$2(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
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
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warning$2(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE$1,

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
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
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
 * See https://facebook.github.io/react/docs/react-api.html#createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
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
  }

  // Resolve default props
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
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE$1) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner_1.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/react-api.html#createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/react-api.html#cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = objectAssign$1({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner_1.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
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
  }

  // Children can be more than one argument, and those are transferred onto
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
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE$1;
};

var ReactElement_1 = ReactElement;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactDebugCurrentFrame
 * 
 */

var ReactDebugCurrentFrame = {};

{
  // Component that is being worked on
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      return impl();
    }
    return null;
  };
}

var ReactDebugCurrentFrame_1 = ReactDebugCurrentFrame;

{
  var warning$1 = require$$0;

  var _require = ReactDebugCurrentFrame_1,
      getStackAddendum = _require.getStackAddendum;
}

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.
// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

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

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
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
    var iteratorFn = ITERATOR_SYMBOL && children[ITERATOR_SYMBOL] || children[FAUX_ITERATOR_SYMBOL];
    if (typeof iteratorFn === 'function') {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          warning$1(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', getStackAddendum());
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
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + getStackAddendum();
      }
      var childrenString = '' + children;
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
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
  }
  // Implicit key determined by the index in the set
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
 * See https://facebook.github.io/react/docs/react-api.html#react.children.foreach
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
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement_1.isValidElement(mappedChild)) {
      mappedChild = ReactElement_1.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
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
 * See https://facebook.github.io/react/docs/react-api.html#react.children.map
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
 * See https://facebook.github.io/react/docs/react-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  count: countChildren,
  toArray: toArray
};

var ReactChildren_1 = ReactChildren;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactVersion
 */

var ReactVersion = '16.0.0';

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/react-api.html#react.children.only
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
  !ReactElement_1.isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

var onlyChild_1 = onlyChild;

/**
 * Copyright (c) 2016-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @providesModule describeComponentFrame
 */

var describeComponentFrame$1 = function (name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule getComponentName
 * 
 */

function getComponentName$1(instanceOrFiber) {
  if (typeof instanceOrFiber.getName === 'function') {
    // Stack reconciler
    var instance = instanceOrFiber;
    return instance.getName();
  }
  if (typeof instanceOrFiber.tag === 'number') {
    // Fiber reconciler
    var fiber = instanceOrFiber;
    var type = fiber.type;

    if (typeof type === 'string') {
      return type;
    }
    if (typeof type === 'function') {
      return type.displayName || type.name;
    }
  }
  return null;
}

var getComponentName_1 = getComponentName$1;

{
  var checkPropTypes$1 = checkPropTypes;
  var lowPriorityWarning$1 = lowPriorityWarning_1;
  var ReactDebugCurrentFrame$1 = ReactDebugCurrentFrame_1;
  var warning$3 = require$$0;
  var describeComponentFrame = describeComponentFrame$1;
  var getComponentName = getComponentName_1;

  var currentlyValidatingElement = null;

  var getDisplayName = function (element) {
    if (element == null) {
      return '#empty';
    } else if (typeof element === 'string' || typeof element === 'number') {
      return '#text';
    } else if (typeof element.type === 'string') {
      return element.type;
    } else {
      return element.type.displayName || element.type.name || 'Unknown';
    }
  };

  var getStackAddendum$1 = function () {
    var stack = '';
    if (currentlyValidatingElement) {
      var name = getDisplayName(currentlyValidatingElement);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
    }
    stack += ReactDebugCurrentFrame$1.getStackAddendum() || '';
    return stack;
  };
}

var ITERATOR_SYMBOL$1 = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL$1 = '@@iterator'; // Before Symbol spec.

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner_1.current) {
    var name = getComponentName(ReactCurrentOwner_1.current);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
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
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
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
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner_1.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
  }

  currentlyValidatingElement = element;
  {
    warning$3(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum$1());
  }
  currentlyValidatingElement = null;
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
      if (ReactElement_1.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement_1.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = ITERATOR_SYMBOL$1 && node[ITERATOR_SYMBOL$1] || node[FAUX_ITERATOR_SYMBOL$1];
    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement_1.isValidElement(step.value)) {
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
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  var propTypes = componentClass.propTypes;

  if (propTypes) {
    currentlyValidatingElement = element;
    checkPropTypes$1(propTypes, element.props, 'prop', name, getStackAddendum$1);
    currentlyValidatingElement = null;
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    warning$3(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
  }
}

var ReactElementValidator$1 = {
  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      var info = '';
      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(props);
      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      info += ReactDebugCurrentFrame$1.getStackAddendum() || '';

      warning$3(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info);
    }

    var element = ReactElement_1.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator$1.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    {
      Object.defineProperty(validatedFactory, 'type', {
        enumerable: false,
        get: function () {
          lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
          Object.defineProperty(this, 'type', {
            value: type
          });
          return type;
        }
      });
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement_1.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }
};

var ReactElementValidator_1 = ReactElementValidator$1;

{
  var warning$4 = require$$0;
}

function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(Object.prototype.hasOwnProperty)
  // Strip regex characters so we can use it for regex
  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  // Remove hasOwnProperty from the template to make it generic
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function getDisplayName$1(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName = void 0;

  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
  warning$4(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id);
  return describeComponentFrame$1(name || '', element && element._source, ownerName || '');
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    !item ? invariant(false, 'Item must have been set') : void 0;
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : void 0;
      !nextChild.isMounted ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    !item ? invariant(false, 'Item must have been set') : void 0;
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function () {
    var info = '';
    var currentOwner = ReactCurrentOwner_1.current;
    if (currentOwner) {
      !(typeof currentOwner.tag !== 'number') ? invariant(false, 'Fiber owners should not show up in Stack stack traces.') : void 0;
      if (typeof currentOwner._debugID === 'number') {
        info += ReactComponentTreeHook.getStackAddendumByID(currentOwner._debugID);
      }
    }
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName$1(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs
};

var ReactComponentTreeHook_1 = ReactComponentTreeHook;

var createElement = ReactElement_1.createElement;
var createFactory = ReactElement_1.createFactory;
var cloneElement = ReactElement_1.cloneElement;

{
  var ReactElementValidator = ReactElementValidator_1;
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var React = {
  Children: {
    map: ReactChildren_1.map,
    forEach: ReactChildren_1.forEach,
    count: ReactChildren_1.count,
    toArray: ReactChildren_1.toArray,
    only: onlyChild_1
  },

  Component: ReactBaseClasses.Component,
  PureComponent: ReactBaseClasses.PureComponent,
  unstable_AsyncComponent: ReactBaseClasses.AsyncComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement_1.isValidElement,

  createFactory: createFactory,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: ReactCurrentOwner_1,
    // Used by renderers to avoid bundling object-assign twice in UMD bundles:
    assign: objectAssign$1
  }
};

{
  objectAssign$1(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
    // These should not be included in production.
    ReactComponentTreeHook: ReactComponentTreeHook_1,
    ReactDebugCurrentFrame: ReactDebugCurrentFrame_1
  });
}

var ReactEntry = React;

module.exports = ReactEntry;

})();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(1);
  var warning = __webpack_require__(8);
  var ReactPropTypesSecret = __webpack_require__(14);
  var loggedTypeFailures = {};
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
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory(__webpack_require__(4));
	else if(typeof define === 'function' && define.amd)
		define(["lodash/fp"], factory);
	else if(typeof exports === 'object')
		exports["futil-js"] = factory(require("lodash/fp"));
	else
		root["futil-js"] = factory(root["lodash/fp"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapValuesIndexed = exports.reduceIndexed = exports.eachIndexed = exports.findIndexed = exports.mapIndexed = exports.each = exports.mapValues = exports.reduce = exports.inversions = exports.unsetOn = exports.setOn = exports.mergeOn = exports.defaultsOn = exports.extendOn = exports.includesIn = exports.pickIn = exports.hasIn = exports.getIn = undefined;

var _fp = __webpack_require__(0);

var _fp2 = _interopRequireDefault(_fp);

var _aspect = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var noRearg = { rearg: false };
var mutable = { immutable: false };
var noCap = { cap: false

  // Flips
  // ----------
};var getIn = exports.getIn = _fp2.default.get.convert(noRearg);
var hasIn = exports.hasIn = _fp2.default.has.convert(noRearg);
var pickIn = exports.pickIn = _fp2.default.pick.convert(noRearg);
var includesIn = exports.includesIn = _fp2.default.includes.convert(noRearg);

// Mutables
// ----------
var extendOn = exports.extendOn = _fp2.default.extend.convert(mutable);
var defaultsOn = exports.defaultsOn = _fp2.default.defaults.convert(mutable);
var mergeOn = exports.mergeOn = _fp2.default.merge.convert(mutable);
var setOn = exports.setOn = _fp2.default.set.convert(mutable);
// Curry required until https://github.com/lodash/lodash/issues/3440 is resolved
var unsetOn = exports.unsetOn = _fp2.default.curryN(2, _fp2.default.unset.convert({ immutable: false }));

// This reduce based version is easier to maintain but requires calling `F.inversions.fn` instead of `F.fn`
var inversionList = ['get', 'pick', 'includes'];
var inversions = exports.inversions = _fp2.default.reduce(function (memo, x) {
  return _fp2.default.set(x + 'In', _fp2.default[x].convert(noRearg), memo);
}, {}, inversionList);

// Uncaps
// ------
// Un-prefixed Deprecated
var reduce = exports.reduce = _aspect.aspects.deprecate('reduce', '1.28.0', 'reduceIndexed')(_fp2.default.reduce.convert(noCap));
var mapValues = exports.mapValues = _aspect.aspects.deprecate('mapValues', '1.28.0', 'mapValuesIndexed')(_fp2.default.mapValues.convert(noCap));
var each = exports.each = _aspect.aspects.deprecate('each', '1.28.0', 'eachIndexed')(_fp2.default.each.convert(noCap));

var mapIndexed = exports.mapIndexed = _fp2.default.map.convert(noCap);
var findIndexed = exports.findIndexed = _fp2.default.find.convert(noCap);
var eachIndexed = exports.eachIndexed = _fp2.default.each.convert(noCap);
var reduceIndexed = exports.reduceIndexed = _fp2.default.reduce.convert(noCap);
var mapValuesIndexed = exports.mapValuesIndexed = _fp2.default.mapValues.convert(noCap);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBlankDeep = exports.isNotBlank = exports.isBlank = exports.append = exports.isMultiple = exports.exists = exports.isNotNil = exports.tapError = exports.throws = undefined;

var _fp = __webpack_require__(0);

var _fp2 = _interopRequireDefault(_fp);

var _tree = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var throws = exports.throws = function throws(x) {
  throw x;
};
var tapError = exports.tapError = function tapError(f) {
  return function (e) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    f.apply(undefined, [e].concat(args));
    throw e;
  };
};
var isNotNil = exports.isNotNil = _fp2.default.negate(_fp2.default.isNil);
var exists = exports.exists = isNotNil;
var isMultiple = exports.isMultiple = function isMultiple(x) {
  return (x || []).length > 1;
};
var append = exports.append = _fp2.default.curry(function (x, y) {
  return y + x;
});

// True for everything except null, undefined, '', [], and {}
var isBlank = exports.isBlank = _fp2.default.overSome([_fp2.default.isNil, _fp2.default.isEqual(''), _fp2.default.isEqual([]), _fp2.default.isEqual({})]);
var isNotBlank = exports.isNotBlank = _fp2.default.negate(isBlank);
var isBlankDeep = exports.isBlankDeep = function isBlankDeep(combinator) {
  return function (x) {
    return combinator(isBlank, (0, _tree.tree)().leaves(x));
  };
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flags = exports.zipObjectDeepWith = exports.arrayToObject = exports.cycle = exports.mergeRanges = exports.insertAtIndex = exports.pushOn = exports.pushIn = exports.push = exports.repeated = exports.dotJoinWith = exports.dotJoin = exports.compactJoin = undefined;

var _fp = __webpack_require__(0);

var _fp2 = _interopRequireDefault(_fp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: Move to proper files and expose
var callUnless = function callUnless(check) {
  return function (failFn) {
    return function (fn) {
      return function (x, y) {
        return check(x) ? failFn(y) : check(y) ? failFn(x) : fn(x, y);
      };
    };
  };
};
var callUnlessEmpty = callUnless(_fp2.default.isEmpty);
var wrapArray = function wrapArray(x) {
  return [x];
};
var callUnlessEmptyArray = callUnlessEmpty(wrapArray);
var dropRight = _fp2.default.dropRight(1);
var last = _fp2.default.takeRight(1);

// Arrays
// ------
var compactJoin = exports.compactJoin = _fp2.default.curry(function (join, x) {
  return _fp2.default.compact(x).join(join);
});
var dotJoin = exports.dotJoin = compactJoin('.');
var dotJoinWith = exports.dotJoinWith = function dotJoinWith(fn) {
  return function (x) {
    return _fp2.default.filter(fn, x).join('.');
  };
};
var repeated = exports.repeated = _fp2.default.flow(_fp2.default.groupBy(function (e) {
  return e;
}), _fp2.default.filter(function (e) {
  return e.length > 1;
}), _fp2.default.flatten, _fp2.default.uniq);
var push = exports.push = _fp2.default.curry(function (val, arr) {
  return arr.concat([val]);
});
var pushIn = exports.pushIn = _fp2.default.curry(function (arr, val) {
  return arr.concat([val]);
});
var pushOn = exports.pushOn = _fp2.default.curry(function (arr, val) {
  arr.push(val);
  return arr;
});
var insertAtIndex = exports.insertAtIndex = function insertAtIndex(index, val, str) {
  return str.slice(0, index) + val + str.slice(index);
};

var overlaps = function overlaps(x, y) {
  return y[0] > x[1];
};
var mergeRange = function mergeRange(x, y) {
  return [[x[0], _fp2.default.max(x.concat(y))]];
};
var actuallMergeRanges = callUnlessEmptyArray(function (x, y) {
  return overlaps(x, y) ? [x, y] : mergeRange(x, y);
});
var mergeRanges = exports.mergeRanges = _fp2.default.flow(_fp2.default.sortBy([0, 1]), _fp2.default.reduce(function (result, range) {
  return dropRight(result).concat(actuallMergeRanges(_fp2.default.flatten(last(result)), range));
}, []));

// [a, b...] -> a -> b
var cycle = exports.cycle = _fp2.default.curry(function (a, n) {
  return a[(a.indexOf(n) + 1) % a.length];
});

var arrayToObject = exports.arrayToObject = _fp2.default.curry(function (k, v, a) {
  return _fp2.default.flow(_fp2.default.keyBy(k), _fp2.default.mapValues(v))(a);
});

// zipObject that supports functions instead of objects
var zipObjectDeepWith = exports.zipObjectDeepWith = _fp2.default.curry(function (x, y) {
  return _fp2.default.zipObjectDeep(x, _fp2.default.isFunction(y) && _fp2.default.isArray(x) ? _fp2.default.times(y, x.length) : y);
});

var flags = exports.flags = zipObjectDeepWith(_fp2.default, function () {
  return true;
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tree = exports.treeLookup = exports.leaves = exports.treeToArray = exports.treeToArrayBy = exports.reduceTree = exports.walk = exports.traverse = exports.isTraversable = undefined;

var _fp = __webpack_require__(0);

var _fp2 = _interopRequireDefault(_fp);

var _array = __webpack_require__(3);

var _conversion = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isTraversable = exports.isTraversable = function isTraversable(x) {
  return _fp2.default.isArray(x) || _fp2.default.isPlainObject(x);
};
var traverse = exports.traverse = function traverse(x) {
  return isTraversable(x) && !_fp2.default.isEmpty(x) && x;
};

var walk = exports.walk = function walk() {
  var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : traverse;
  return function (pre) {
    var post = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _fp2.default.noop;
    var parents = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var parentIndexes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    return function (tree, index) {
      return pre(tree, index, parents, parentIndexes) || (0, _conversion.findIndexed)(walk(next)(pre, post, [tree].concat(_toConsumableArray(parents)), [index].concat(_toConsumableArray(parentIndexes))), next(tree, index, parents, parentIndexes) || []) || post(tree, index, parents, parentIndexes);
    };
  };
};

var reduceTree = exports.reduceTree = function reduceTree() {
  var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : traverse;
  return _fp2.default.curry(function (f, result, tree) {
    walk(next)(function () {
      for (var _len = arguments.length, x = Array(_len), _key = 0; _key < _len; _key++) {
        x[_key] = arguments[_key];
      }

      result = f.apply(undefined, [result].concat(x));
    })(tree);
    return result;
  });
};

var treeToArrayBy = exports.treeToArrayBy = function treeToArrayBy() {
  var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : traverse;
  return _fp2.default.curry(function (fn, tree) {
    return reduceTree(next)(function (r, x) {
      return (0, _array.push)(fn(x), r);
    }, [], tree);
  });
};
var treeToArray = exports.treeToArray = function treeToArray() {
  var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : traverse;
  return treeToArrayBy(next)(function (x) {
    return x;
  });
};

var leaves = exports.leaves = function leaves() {
  var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : traverse;
  return _fp2.default.flow(treeToArray(next), _fp2.default.reject(next));
};

var treeLookup = exports.treeLookup = function treeLookup() {
  var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : traverse;
  var buildIteratee = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _fp2.default.identity;
  return function (path, tree) {
    return _fp2.default.reduce(function (tree, path) {
      return _fp2.default.find(buildIteratee(path), next(tree));
    }, tree, path);
  };
};

var tree = exports.tree = function tree() {
  var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : traverse;
  var buildIteratee = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _fp2.default.identity;
  return {
    walk: walk(next),
    reduce: reduceTree(next),
    toArrayBy: treeToArrayBy(next),
    toArray: treeToArray(next),
    leaves: leaves(next),
    lookup: treeLookup(next, buildIteratee)
  };
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepMap = exports.map = exports.findApply = exports.flowMap = undefined;

var _fp = __webpack_require__(0);

var _fp2 = _interopRequireDefault(_fp);

var _tree = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flowMap = exports.flowMap = function flowMap() {
  return _fp2.default.map(_fp2.default.flow.apply(_fp2.default, arguments));
};
var findApply = exports.findApply = _fp2.default.curry(function (f, arr) {
  return f(_fp2.default.find(f, arr));
});

// Algebras
// --------
// A generic map that works for plain objects and arrays
var map = exports.map = _fp2.default.curry(function (f, x) {
  return (_fp2.default.isArray(x) ? _fp2.default.map : _fp2.default.mapValues).convert({ cap: false })(f, x);
});
// Map for any recursive algebraic data structure
// defaults in multidimensional arrays and recursive plain objects
var deepMap = exports.deepMap = _fp2.default.curry(function (fn, obj) {
  var _map = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : map;

  var is = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _tree.isTraversable;
  return _map(function (e) {
    return is(e) ? deepMap(fn, fn(e), _map, is) : e;
  }, obj);
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whenTruthy = exports.whenExists = exports.unless = exports.when = exports.ifElse = exports.overNone = undefined;

var _fp = __webpack_require__(0);

var _fp2 = _interopRequireDefault(_fp);

var _function = __webpack_require__(8);

var _lang = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ([f, g]) -> !f(x) && !g(x)
var overNone = exports.overNone = _fp2.default.flow(_fp2.default.overSome, _fp2.default.negate);

var boolIteratee = function boolIteratee(x) {
  return _fp2.default.isBoolean(x) ? function () {
    return x;
  } : _fp2.default.iteratee(x);
};
// Port from Ramda
var ifElse = exports.ifElse = _fp2.default.curry(function (condition, onTrue, onFalse) {
  return function (x) {
    return boolIteratee(condition)(x) ? (0, _function.callOrReturn)(onTrue, x) : (0, _function.callOrReturn)(onFalse, x);
  };
});
var when = exports.when = _fp2.default.curry(function (condition, t) {
  return ifElse(condition, t, _fp2.default.identity);
});
var unless = exports.unless = _fp2.default.curry(function (condition, f) {
  return ifElse(condition, _fp2.default.identity, f);
});

var whenExists = exports.whenExists = when(_lang.exists);
var whenTruthy = exports.whenTruthy = when(Boolean);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aspects = exports.aspectSync = exports.aspect = undefined;

var _fp = __webpack_require__(0);

var _fp2 = _interopRequireDefault(_fp);

var _conversion = __webpack_require__(1);

var _lang = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Core
var aspect = exports.aspect = function aspect(_ref) {
  var _ref$name = _ref.name,
      name = _ref$name === undefined ? 'aspect' : _ref$name,
      _ref$init = _ref.init,
      init = _ref$init === undefined ? _fp2.default.noop : _ref$init,
      _ref$after = _ref.after,
      after = _ref$after === undefined ? _fp2.default.noop : _ref$after,
      _ref$before = _ref.before,
      before = _ref$before === undefined ? _fp2.default.noop : _ref$before,
      _ref$always = _ref.always,
      always = _ref$always === undefined ? _fp2.default.noop : _ref$always,
      _ref$onError = _ref.onError,
      onError = _ref$onError === undefined ? _lang.throws : _ref$onError;
  return function (f) {
    var _f$state = f.state,
        state = _f$state === undefined ? {} : _f$state;

    init(state);
    // Trick to set function.name of anonymous function
    var x = _defineProperty({}, name, function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = void 0;
      var error = void 0;
      return Promise.resolve().then(function () {
        return before(args, state);
      }).then(function () {
        return f.apply(undefined, args);
      }).then(function (r) {
        result = r;
      }).then(function () {
        return after(result, state, args);
      }).catch(function (e) {
        return onError(e, state, args);
      }).catch(function (e) {
        error = e;
      }).then(function () {
        return always(state, args);
      }).then(function () {
        if (error) throw error;
      }).then(function () {
        return result;
      });
    });
    x[name].state = state;
    return x[name];
  };
};

var aspectSync = exports.aspectSync = function aspectSync(_ref2) {
  var _ref2$name = _ref2.name,
      name = _ref2$name === undefined ? 'aspect' : _ref2$name,
      _ref2$init = _ref2.init,
      init = _ref2$init === undefined ? _fp2.default.noop : _ref2$init,
      _ref2$after = _ref2.after,
      after = _ref2$after === undefined ? _fp2.default.noop : _ref2$after,
      _ref2$before = _ref2.before,
      before = _ref2$before === undefined ? _fp2.default.noop : _ref2$before,
      _ref2$always = _ref2.always,
      always = _ref2$always === undefined ? _fp2.default.noop : _ref2$always,
      _ref2$onError = _ref2.onError,
      onError = _ref2$onError === undefined ? _lang.throws : _ref2$onError;
  return function (f) {
    var _f$state2 = f.state,
        state = _f$state2 === undefined ? {} : _f$state2;

    init(state);
    // Trick to set function.name of anonymous function
    var x = _defineProperty({}, name, function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      try {
        before(args, state);
        var result = f.apply(undefined, args);
        after(result, state, args);
        return result;
      } catch (e) {
        onError(e, state, args);
        throw e;
      } finally {
        always(state, args);
      }
    });
    x[name].state = state;
    return x[name];
  };
};

// Example Aspects
var logs = function logs() {
  var extend = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _conversion.defaultsOn;
  return aspect({
    init: extend({ logs: [] }),
    after: function after(result, state) {
      return state.logs.push(result);
    },
    name: 'logs'
  });
};
var error = function error() {
  var extend = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _conversion.defaultsOn;
  return aspect({
    init: extend({ error: null }),
    onError: (0, _conversion.setOn)('error'),
    name: 'error'
  });
};
var errors = function errors() {
  var extend = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _conversion.defaultsOn;
  return aspect({
    init: extend({ errors: [] }),
    onError: function onError(e, state) {
      return state.errors.push(e);
    },
    name: 'errors'
  });
};
var status = function status() {
  var extend = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _conversion.defaultsOn;
  return aspect({
    init: extend({
      status: null,
      processing: false,
      succeeded: false,
      failed: false,
      // Computed get/set properties don't work, probably because lodash extend methods don't support copying them
      setStatus: function setStatus(x) {
        this.status = x;
        this.failed = x === 'failed';
        this.succeeded = x === 'succeeded';
        this.processing = x === 'processing';
      }
    }),
    before: function before(params, state) {
      state.setStatus('processing');
    },
    after: function after(result, state) {
      state.setStatus('succeeded');
    },

    onError: (0, _lang.tapError)(function (e, state) {
      state.setStatus('failed');
    }),
    name: 'status'
  });
};
var clearStatus = function clearStatus() {
  var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  return aspect({
    always: function always(state) {
      if (timeout !== null) {
        setTimeout(function () {
          state.setStatus(null);
        }, timeout);
      }
    },

    name: 'clearStatus'
  });
};
// This is a function just for consistency
var concurrency = function concurrency() {
  return aspect({
    before: function before(params, state) {
      if (state.processing) {
        throw Error('Concurrent Runs Not Allowed');
      }
    },

    name: 'concurrency'
  });
};

var command = function command(extend, timeout) {
  return _fp2.default.flow(status(extend), clearStatus(timeout), concurrency(extend), error(extend));
};

var deprecate = function deprecate(subject, version, alternative) {
  return aspectSync({
    before: function before() {
      return console.warn('`' + subject + '` is deprecated' + (version ? ' as of ' + version : '') + (alternative ? ' in favor of `' + alternative + '`' : '') + ' ' + _fp2.default.trim((Error().stack || '').split('\n')[3]));
    }
  });
};

var aspects = exports.aspects = {
  logs: logs,
  error: error,
  errors: errors,
  status: status,
  deprecate: deprecate,
  clearStatus: clearStatus,
  concurrency: concurrency,
  command: command
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounceAsync = exports.defer = exports.comply = exports.composeApply = exports.converge = exports.boundMethod = exports.callOrReturn = exports.maybeCall = undefined;

var _fp = __webpack_require__(0);

var _fp2 = _interopRequireDefault(_fp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Function
// --------
// (fn, a, b) -> fn(a, b)
var maybeCall = exports.maybeCall = function maybeCall(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return _fp2.default.isFunction(fn) && fn.apply(undefined, args);
};
// (fn, a, b) -> fn(a, b)
var callOrReturn = exports.callOrReturn = function callOrReturn(fn) {
  for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    args[_key2 - 1] = arguments[_key2];
  }

  return _fp2.default.isFunction(fn) ? fn.apply(undefined, args) : fn;
};
// (a, Monoid f) -> f[a] :: f a
var boundMethod = exports.boundMethod = function boundMethod(method, object) {
  return object[method].bind(object);
};

// http://ramdajs.com/docs/#converge
var converge = exports.converge = function converge(converger, branches) {
  return function () {
    return converger(_fp2.default.over(branches).apply(undefined, arguments));
  };
};

var composeApply = exports.composeApply = function composeApply(f, g) {
  return function (x) {
    return f(g(x))(x);
  };
};
var comply = exports.comply = composeApply;

// Prettier version of `defer` the one from bluebird docs
var defer = exports.defer = function defer() {
  var resolve = void 0;
  var reject = void 0;
  var promise = new Promise(function (res, rej) {
    resolve = res;
    reject = rej;
  });
  return {
    resolve: resolve,
    reject: reject,
    promise: promise
  };
};
// `_.debounce` for async functions, which require consistently returning a single promise for all queued calls
var debounceAsync = exports.debounceAsync = function debounceAsync(n, f) {
  var deferred = defer();
  var debounced = _fp2.default.debounce(n, function () {
    deferred.resolve(f.apply(undefined, arguments));
    deferred = defer();
  });
  return function () {
    debounced.apply(undefined, arguments);
    return deferred.promise;
  };
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greaterThanOne = undefined;

var _conversion = __webpack_require__(1);

Object.keys(_conversion).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _conversion[key];
    }
  });
});

var _collection = __webpack_require__(5);

Object.keys(_collection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _collection[key];
    }
  });
});

var _function = __webpack_require__(8);

Object.keys(_function).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _function[key];
    }
  });
});

var _string = __webpack_require__(10);

Object.keys(_string).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _string[key];
    }
  });
});

var _object = __webpack_require__(11);

Object.keys(_object).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _object[key];
    }
  });
});

var _aspect = __webpack_require__(7);

Object.keys(_aspect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aspect[key];
    }
  });
});

var _array = __webpack_require__(3);

Object.keys(_array).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _array[key];
    }
  });
});

var _logic = __webpack_require__(6);

Object.keys(_logic).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _logic[key];
    }
  });
});

var _regex = __webpack_require__(12);

Object.keys(_regex).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _regex[key];
    }
  });
});

var _lang = __webpack_require__(2);

Object.keys(_lang).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _lang[key];
    }
  });
});

var _lens = __webpack_require__(13);

Object.keys(_lens).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _lens[key];
    }
  });
});

var _tree = __webpack_require__(4);

Object.keys(_tree).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _tree[key];
    }
  });
});

var _fp = __webpack_require__(0);

var _fp2 = _interopRequireDefault(_fp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Math
// ----
var greaterThanOne = exports.greaterThanOne = _fp2.default.lt(1);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoLabelOptions = exports.autoLabelOption = exports.autoLabel = exports.trimStrings = exports.concatStrings = exports.parens = exports.quote = exports.wrap = undefined;

var _collection = __webpack_require__(5);

var _fp = __webpack_require__(0);

var _fp2 = _interopRequireDefault(_fp);

var _logic = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wrap = exports.wrap = function wrap(pre, post, content) {
  return (pre || '') + content + (post || pre || '');
};
var quote = exports.quote = _fp2.default.partial(wrap, ['"', '"']);
var parens = exports.parens = _fp2.default.partial(wrap, ['(', ')']);
var concatStrings = exports.concatStrings = _fp2.default.flow(_fp2.default.compact, _fp2.default.map(_fp2.default.trim), _fp2.default.join(' '));
var trimStrings = exports.trimStrings = (0, _collection.map)((0, _logic.when)(_fp2.default.isString, _fp2.default.trim));

var autoLabel = exports.autoLabel = function autoLabel() {
  var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  // Prevent Acronyms from being lower cased
  var acronymRegex = new RegExp('([A-Z])([A-Z])($|.)', 'g');
  while (string.match(acronymRegex)) {
    string = string.replace(acronymRegex, '$1 $2$3');
  }
  string = _fp2.default.startCase(string);
  // Remove Mid-Acronym Whitespace
  var whitespacedAcronymRegex = new RegExp('([A-Z])[ ]([A-Z])($|[^a-z])', 'g');
  while (string.match(whitespacedAcronymRegex)) {
    string = string.replace(whitespacedAcronymRegex, '$1$2$3');
  }
  // Put a space between words and numbers
  string = string.replace(/([a-z]|[A-Z])([0-9])/g, '$1 $2');

  return string;
};
var autoLabelOption = exports.autoLabelOption = function autoLabelOption(a) {
  return {
    value: a.value || a,
    label: a.label || autoLabel(a.value || a)
  };
};
var autoLabelOptions = exports.autoLabelOptions = _fp2.default.map(autoLabelOption);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invertByArray = exports.mergeAllArrays = exports.pickOn = exports.diffArray = exports.diff = exports.simpleDiffArray = exports.simpleDiff = exports.unkeyBy = exports.cascadeProp = exports.cascadePropKey = exports.cascadeKey = exports.cascadeIn = exports.cascade = exports.aliasIn = exports.alias = exports.getOrReturn = exports.mapProp = exports.compareDeep = exports.matchesSignature = exports.unflattenObject = exports.flattenObject = exports.isFlatObject = exports.unwind = exports.renameProperty = exports.pickInto = exports.stripEmptyObjects = exports.isNotEmptyObject = exports.isEmptyObject = exports.compactObject = exports.chunkObject = exports.singleObjectR = exports.singleObject = undefined;

var _fp = __webpack_require__(0);

var _fp2 = _interopRequireDefault(_fp);

var _array = __webpack_require__(3);

var _logic = __webpack_require__(6);

var _lang = __webpack_require__(2);

var _conversion = __webpack_require__(1);

var _collection = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// (k, v) -> {k: v}
var singleObject = exports.singleObject = _fp2.default.curry(function (key, value) {
  return _defineProperty({}, key, value);
});
var singleObjectR = exports.singleObjectR = _fp2.default.flip(singleObject);

// Formerly objToObjArr
// ({a, b}) -> [{a}, {b}]
var chunkObject = exports.chunkObject = function chunkObject(value) {
  return _fp2.default.isArray(value) ? value : _fp2.default.map(_fp2.default.spread(singleObject), _fp2.default.toPairs(value));
};

// Remove properties with falsey values: ({ a: 1, b: null, c: false}) -> {a:1}
var compactObject = exports.compactObject = _fp2.default.pickBy(_fp2.default.identity);

var isEmptyObject = exports.isEmptyObject = _fp2.default.isEqual({});

var isNotEmptyObject = exports.isNotEmptyObject = _fp2.default.negate(isEmptyObject);

// { a:1, b:{}, c:2 } -> { a:1, c:2 }
var stripEmptyObjects = exports.stripEmptyObjects = _fp2.default.pickBy(isNotEmptyObject);

// const crazyBS = (f, g) => (a, b) => f(a)(g(b))

// { a: { b: 1, c: 2 } }, [ 'b' ] -> { a: { b: 1 } }
var pickInto = exports.pickInto = function pickInto(map, source) {
  return _fp2.default.mapValues((0, _conversion.pickIn)(source), map);
};

// map rename implementation (not used here yet):
// http://jsfiddle.net/daedalus28/8uQUD/
var renameProperty = exports.renameProperty = _fp2.default.curry(function (from, to, target) {
  target[to] = target[from];
  delete target[from];
  return target;
});

// { x:['a','b'], y:1 } -> [{ x:'a', y:1 }, { x:'b', y:1 }] just like mongo's `$unwind`
var unwind = exports.unwind = _fp2.default.curry(function (prop, x) {
  return _fp2.default.map(function (y) {
    return _fp2.default.set(prop, y, x);
  }, _fp2.default.get(prop, x));
});

var isFlatObject = exports.isFlatObject = (0, _logic.overNone)([_fp2.default.isPlainObject, _fp2.default.isArray]);

// { a: { b: { c: 1 } } } => { 'a.b.c' : 1 }
var flattenObject = exports.flattenObject = function flattenObject(input, paths) {
  return (0, _conversion.reduceIndexed)(function (output, value, key) {
    return _fp2.default.merge(output, (isFlatObject(value) ? singleObjectR : flattenObject)(value, (0, _array.dotJoinWith)(_lang.isNotNil)([paths, key])));
  }, {}, input);
};

// { 'a.b.c' : 1 } => { a: { b: { c: 1 } } }
var unflattenObject = exports.unflattenObject = function unflattenObject(x) {
  return _fp2.default.zipObjectDeep(_fp2.default.keys(x), _fp2.default.values(x));
};

// Returns true if object keys are only elements from signature list (but does not require all signature keys to be present)
var matchesSignature = exports.matchesSignature = _fp2.default.curry(function (signature, value) {
  return _fp2.default.isObject(value) && !_fp2.default.difference(_fp2.default.keys(value), signature).length;
});

// Checks if a property deep in a given item equals to a given value
var compareDeep = exports.compareDeep = _fp2.default.curry(function (path, item, value) {
  return _fp2.default.get(path, item) === value;
});

// Applies a map function at a specific path
// e.g.: mapProp(double, 'a', {a:2, b:1}) -> {a:4, b:1}
var mapProp = exports.mapProp = _fp2.default.curry(function (fn, key, obj) {
  return _fp2.default.set(key, fn(_fp2.default.get(key, obj)), obj);
});

// `_.get` that returns the target object if lookup fails
var getOrReturn = exports.getOrReturn = _fp2.default.curry(function (prop, x) {
  return _fp2.default.getOr(x, prop, x);
});
// `_.get` that returns the prop if lookup fails
var alias = exports.alias = _fp2.default.curry(function (prop, x) {
  return _fp2.default.getOr(prop, prop, x);
});
// flipped alias
var aliasIn = exports.aliasIn = _fp2.default.curry(function (x, prop) {
  return _fp2.default.getOr(prop, prop, x);
});

// A `_.get` that takes an array of paths and returns the value at the first path that matches
var cascade = exports.cascade = _fp2.default.curry(function (paths, obj) {
  return (0, _collection.findApply)((0, _conversion.getIn)(obj), paths);
});
// Flipped cascade
var cascadeIn = exports.cascadeIn = _fp2.default.curry(function (obj, paths) {
  return cascade(paths, obj);
});
// A `_.get` that takes an array of paths and returns the first path that matched
var cascadeKey = exports.cascadeKey = _fp2.default.curry(function (paths, obj) {
  return _fp2.default.find((0, _conversion.getIn)(obj), paths);
});
// A `_.get` that takes an array of paths and returns the first path that exists
var cascadePropKey = exports.cascadePropKey = _fp2.default.curry(function (paths, obj) {
  return _fp2.default.find((0, _conversion.hasIn)(obj), paths);
});
// A `_.get` that takes an array of paths and returns the first value that has an existing path
var cascadeProp = exports.cascadeProp = _fp2.default.curry(function (paths, obj) {
  return _fp2.default.get(cascadePropKey(paths, obj), obj);
});

var unkeyBy = exports.unkeyBy = _fp2.default.curry(function (keyName, obj) {
  return (0, _conversion.mapIndexed)(function (val, key) {
    return _fp2.default.extend(val, _defineProperty({}, keyName || key, key));
  })(obj);
});

var simpleDiff = exports.simpleDiff = function simpleDiff(original, deltas) {
  var o = flattenObject(original);
  return _fp2.default.flow(flattenObject, (0, _conversion.mapValuesIndexed)(function (to, field) {
    return { from: o[field], to: to };
  }), _fp2.default.omitBy(function (x) {
    return x.from === x.to;
  }))(deltas);
};
var simpleDiffArray = exports.simpleDiffArray = _fp2.default.flow(simpleDiff, unkeyBy('field'));

var diff = exports.diff = function diff(original, deltas) {
  var o = flattenObject(original);
  var d = flattenObject(deltas);
  return _fp2.default.flow((0, _conversion.mapValuesIndexed)(function (_, field) {
    return { from: o[field], to: d[field] };
  }), _fp2.default.omitBy(function (x) {
    return x.from === x.to;
  }))(_fp2.default.merge(o, d));
};
var diffArray = exports.diffArray = _fp2.default.flow(diff, unkeyBy('field'));

// A `_.pick` that mutates the object
var pickOn = exports.pickOn = function pickOn() {
  var paths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var obj = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return _fp2.default.flow(_fp2.default.keys, _fp2.default.map(function (key) {
    if (!_fp2.default.includes(key, paths)) {
      delete obj[key];
    }
  }))(obj);
};

// Straight from the lodash docs
var mergeAllArrays = exports.mergeAllArrays = _fp2.default.mergeAllWith(function (objValue, srcValue) {
  if (_fp2.default.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});
// { a: [x, y, z], b: [x] } -> { x: [a, b], y: [a], z: [a] }
var invertByArray = exports.invertByArray = _fp2.default.flow((0, _conversion.mapIndexed)(function (arr, key) {
  return (0, _array.zipObjectDeepWith)(arr, function () {
    return [key];
  });
}), mergeAllArrays);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.highlight = exports.highlightFromPostings = exports.postingsForWords = exports.postings = exports.matchAnyWord = exports.matchAllWords = exports.makeAndTest = exports.makeRegex = exports.testRegex = undefined;

var _fp = __webpack_require__(0);

var _fp2 = _interopRequireDefault(_fp);

var _array = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testRegex = exports.testRegex = _fp2.default.curry(function (regex, str) {
  return new RegExp(regex).test(str);
});
var makeRegex = exports.makeRegex = function makeRegex(options) {
  return function (text) {
    return RegExp(text, options);
  };
};
var makeAndTest = exports.makeAndTest = function makeAndTest(options) {
  return _fp2.default.flow(makeRegex(options), testRegex);
};

var anyWordToRegexp = _fp2.default.flow(_fp2.default.words, _fp2.default.join('|'));

var wordsToRegexp = _fp2.default.flow(_fp2.default.words, _fp2.default.map(function (x) {
  return '(?=.*' + x + ')';
}), _fp2.default.join(''));

var matchWords = _fp2.default.curry(function (buildRegex, x) {
  // Not inlining so that we don't create the regexp every time
  var regexp = RegExp(buildRegex(x), 'gi');
  return function (y) {
    return !!(y && y.match(regexp));
  };
});

var matchAllWords = exports.matchAllWords = matchWords(wordsToRegexp);

var matchAnyWord = exports.matchAnyWord = matchWords(anyWordToRegexp);

var postings = exports.postings = _fp2.default.curry(function (regex, str) {
  var match = regex.exec(str);
  var result = [];

  while (match) {
    result.push([match.index, regex.lastIndex]);
    match = regex.exec(str);
  }
  return result;
});

var postingsForWords = exports.postingsForWords = _fp2.default.curry(function (string, str) {
  return _fp2.default.reduce(function (result, word) {
    return (0, _array.push)(postings(RegExp(word, 'gi'), str), result);
  }, [])(_fp2.default.words(string));
});

var highlightFromPostings = exports.highlightFromPostings = _fp2.default.curry(function (start, end, postings, str) {
  var offset = 0;
  _fp2.default.each(function (posting) {
    str = (0, _array.insertAtIndex)(posting[0] + offset, start, str);
    offset += start.length;
    str = (0, _array.insertAtIndex)(posting[1] + offset, end, str);
    offset += end.length;
  }, (0, _array.mergeRanges)(postings));
  return str;
});

var highlight = exports.highlight = _fp2.default.curry(function (start, end, pattern, input) {
  return highlightFromPostings(start, end, _fp2.default.flatten(postingsForWords(pattern, input)), input);
});

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.off = exports.on = exports.flip = exports.sets = exports.set = exports.views = exports.view = exports.lensOf = exports.lensProp = exports.objToFn = exports.fnToObj = exports.objectLens = exports.functionLens = undefined;

var _fp = __webpack_require__(0);

var _fp2 = _interopRequireDefault(_fp);

var _conversion = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Stubs
var functionLens = exports.functionLens = function functionLens(val) {
  return function () {
    if (!arguments.length) return val;
    val = arguments.length <= 0 ? undefined : arguments[0];
  };
};
var objectLens = exports.objectLens = function objectLens(val) {
  return {
    get: function get() {
      return val;
    },
    set: function set(x) {
      val = x;
    }
  };
};

// Lens Conversion
var fnToObj = exports.fnToObj = function fnToObj(fn) {
  return {
    get: fn,
    set: fn
  };
};
var objToFn = exports.objToFn = function objToFn(lens) {
  return function () {
    return arguments.length ? lens.set(arguments.length <= 0 ? undefined : arguments[0]) : lens.get();
  };
};

// Lens Construction
var lensProp = exports.lensProp = function lensProp(field, source) {
  return {
    get: function get() {
      return _fp2.default.get(field, source);
    }, //source[field],
    set: function set(value) {
      (0, _conversion.setOn)(field, value, source);
      // source[field] = value
    }
  };
};

// NOTE: This used to use mapValues; however, doing so would sometimes cause issues
// in some edge cases like trying to lens state coming from an inject function
// in the mobx library. It would inadvertently cause the inject to re-run.
// Using reduce here alleviates that issue.
var lensOf = exports.lensOf = function lensOf(object) {
  return _fp2.default.reduce(function (res, key) {
    res[key] = lensProp(key, object);
    return res;
  }, {}, _fp2.default.keys(object));
};

// Lens Manipulation
var view = exports.view = function view(lens) {
  return lens.get ? lens.get() : lens();
};
var views = exports.views = function views(lens) {
  return function () {
    return view(lens);
  };
};
var set = exports.set = _fp2.default.curry(function (val, lens) {
  return lens.set ? lens.set(val) : lens(val);
});
var sets = exports.sets = _fp2.default.curry(function (val, lens) {
  return function () {
    return set(val, lens);
  };
});
var flip = exports.flip = function flip(lens) {
  return function () {
    return set(!view(lens), lens);
  };
};
var on = exports.on = sets(true);
var off = exports.off = sets(false);

/***/ })
/******/ ]);
});
//# sourceMappingURL=futil-js.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(5);

var _react2 = _interopRequireDefault(_react);

var _common = __webpack_require__(3);

var _linkedin = __webpack_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinkedInAuth = function (_React$Component) {
  _inherits(LinkedInAuth, _React$Component);

  function LinkedInAuth(props) {
    _classCallCheck(this, LinkedInAuth);

    var _this = _possibleConstructorReturn(this, (LinkedInAuth.__proto__ || Object.getPrototypeOf(LinkedInAuth)).call(this, props));

    (0, _common.hasRequiredSettings)(_this.props);
    return _this;
  }

  _createClass(LinkedInAuth, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var authPayload = (0, _linkedin.getAuthPayload)(this.props);
      if (authPayload) {
        this.props.onSuccess(authPayload);
      }
    }
  }, {
    key: 'clickHandler',
    value: function clickHandler() {
      var _props = this.props,
          appId = _props.appId,
          _props$scope = _props.scope,
          scope = _props$scope === undefined ? 'r_basicprofile r_emailaddress' : _props$scope;

      (0, _linkedin.requestAuthenticationCode)({ appId: appId, scope: scope });
    }
  }, {
    key: 'render',
    value: function render() {
      var Component = this.props.component;

      return _react2.default.createElement(Component, { onClick: this.clickHandler.bind(this) });
    }
  }]);

  return LinkedInAuth;
}(_react2.default.Component);

exports.default = LinkedInAuth;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAuthPayload = exports.requestAuthenticationCode = undefined;

var _fp = __webpack_require__(4);

var _fp2 = _interopRequireDefault(_fp);

var _common = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadAuthorizationUrl = function loadAuthorizationUrl(_ref) {
  var appId = _ref.appId,
      state = _ref.state,
      scope = _ref.scope;

  var current = encodeURIComponent(window.location.href);
  var base = 'https://www.linkedin.com/oauth/v2/authorization?response_type=code&';
  return base + 'client_id=' + appId + '&redirect_uri=' + current + '&state=' + state + '&scope=' + encodeURIComponent(scope);
};

var resetUrl = function resetUrl() {
  if (typeof window !== 'undefined') {
    var code = (0, _common.getQueryParameter)('code');
    var state = (0, _common.getQueryParameter)('state');
    var newURL = window.location.href.replace('code=' + code + '&state=' + state, '');

    if (newURL.endsWith('?')) {
      newURL = newURL.slice(0, -1);
    }

    window.history.replaceState(null, null, newURL);
    localStorage.linkedInReactLogin = '';
    localStorage.linkedInReactLoginRedirectUri = '';
  }
};

var getAuthenticationCode = function getAuthenticationCode() {
  if (typeof localStorage !== 'undefined') {
    var state = localStorage.linkedInReactLogin;
    var redirectUri = localStorage.linkedInReactLoginRedirectUri;
    if (!redirectUri || !state || state !== (0, _common.getQueryParameter)('state') || !(0, _common.getQueryParameter)('code')) {
      return;
    }
    state = (0, _common.getQueryParameter)('state');
    var authenticationCode = (0, _common.getQueryParameter)('code');
    resetUrl();
    return { authenticationCode: authenticationCode, state: state };
  }
};

var requestAuthenticationCode = exports.requestAuthenticationCode = function requestAuthenticationCode(_ref2) {
  var appId = _ref2.appId,
      scope = _ref2.scope;

  var state = Math.random().toString(36).substring(7);
  localStorage.linkedInReactLogin = state;
  localStorage.linkedInReactLoginRedirectUri = window.location.href;
  window.location.href = loadAuthorizationUrl({ appId: appId, state: state, scope: scope });
};

var getAuthPayload = exports.getAuthPayload = function getAuthPayload(_ref3) {
  var appId = _ref3.appId;

  var result = getAuthenticationCode();
  if (result) {
    var authenticationCode = result.authenticationCode,
        state = result.state;

    return {
      type: 'linkedin',
      authResponse: {
        grant_type: 'authorization_code',
        code: authenticationCode,
        client_id: appId,
        client_secret: state,
        redirect_uri: window.location.href
      }
    };
  } else {
    return;
  }
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=react-social-auth.js.map
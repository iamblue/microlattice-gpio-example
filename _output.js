var require = function (name) {
return global[name](this);
}
global['ml-event'] = function() {
var module = {};
module.exports = {};
var util = require('ml-utils');
function EventEmitter() {
  this._events = {};
};

module.exports.EventEmitter = EventEmitter;

EventEmitter.prototype.emit = function(type) {
  if (!this._events) {
    this._events = {};
  }

  // About to emit 'error' event but there are no listeners for it.
  if (type === 'error' && !this._events.error) {
    var err = arguments[1];
    if (err instanceof Error) {
      throw err;
    } else {
      throw Error("Uncaught 'error' event");
    }
    return false;
  }

  var listeners = this._events[type];
  if (util.isArray(listeners)) {
    listeners = listeners.slice();
    var len = arguments.length;
    var args = new Array(len - 1);
    for (var i = 1; i < len; ++i) {
      args[i - 1] = arguments[i];
    }
    for (var i = 0; i < listeners.length; ++i) {
      listeners[i].apply(this, args);
    }
    return true;
  }

  return false;
};


EventEmitter.prototype.addListener = function(type, listener) {
  if (!util.isFunction(listener)) {
    throw new TypeError('listener must be a function');
  }

  if (!this._events) {
    this._events = {};
  }
  if (!this._events[type]) {
    this._events[type] = [];
  }

  this._events[type].push(listener);

  return this;
};


EventEmitter.prototype.on = EventEmitter.prototype.addListener;


EventEmitter.prototype.once = function(type, listener) {
  if (!util.isFunction(listener)) {
    throw new TypeError('listener must be a function');
  }

  var f = function() {
    // here `this` is this not global, because EventEmitter binds event object
    // for this when it calls back the handler.
    this.removeListener(f.type, f);
    f.listener.apply(this, arguments);
  };

  f.type = type;
  f.listener = listener;

  this.on(type, f);

  return this;
};


EventEmitter.prototype.removeListener = function(type, listener) {
  if (!util.isFunction(listener)) {
    throw new TypeError('listener must be a function');
  }

  var list = this._events[type];
  if (Array.isArray(list)) {
    for (var i = list.length - 1; i >= 0; --i) {
      if (list[i] == listener ||
          (list[i].listener && list[i].listener == listener)) {
        list.splice(i, 1);
        break;
      }
    }
  }

  return this;

};


EventEmitter.prototype.removeAllListeners = function(type) {
  if (arguments.length === 0) {
    this._events = {};
  } else {
    delete this._events[type];
  }

  return this;
};
return module.exports;
}
global['ml-utils'] = function() {
var module = {};
module.exports = {};
function isFunction(arg) {
  return typeof arg === 'function';
}

module.exports.isFunction = isFunction;
module.exports.isArray = Array.isArray;

return module.exports;
}
var EventEmitter = require('ml-event').EventEmitter;
var eventStatus = new EventEmitter();
global.eventStatus = eventStatus;
__pinmux(35, 8);var status = 0;__wifi({mode: 'station', auth: 'PSK_WPA2',ssid: 'mcs1',password: '12345678',});global.eventStatus.on('wifiConnect', function(){});function loop() {setTimeout(function() {__gpioWrite(35, status);if (status == 0) {status = 1;} else{status = 0;}loop();}, 2000);}loop();
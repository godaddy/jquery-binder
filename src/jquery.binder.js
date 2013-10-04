(function (factory) {
  //Universal Module Definition (UMD)
  //https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(this.jQuery);
  }
}(function ($) {

  var watchers = {}; //events that are being tracked
  var bind = $.fn.bind; //original bind method
  var unbind = $.fn.unbind; //original unbind method

  //update bind/unbind methods
  $.fn.bind = newBind; //new bind method
  $.fn.unbind = newUnbind; //new unbind method

  //extend base jQuery object (global methods)
  $.binder = {
    watch: trackEventHandler
    , get: getElementsForHandler
  }

  return $; //return jQuery object

  //adds an item to the event tracking list
  function trackEventHandler(event) {
    watchers[event] = watchers[event] || [];
  }

  //gets the elements listening for a tracked event
  //returns a jquery object containing the elements
  function getElementsForHandler(event) {
    var ret = $();
    var w = watchers[event] || [];
    for (var i = 0; i < w.length; i++) {
      var elem = w[i].elem;
      ret = ret.add(elem);
    }
    return ret;
  }

  //new bind method
  function newBind(event, handler) {
    //call base bind method
    bind.apply(this, arguments);

    //if a matching event, add to watch list
    for (var evt in watchers) {
      if (!watchers.hasOwnProperty(evt)) continue;
      if (evt === event) {
        this.each(function () {
          //add item to watch list
          var entry = getWatchedElem(watchers[evt], this);
          entry.handlers.push(handler);
        });
      }
    }

    //return chainable object
    return this;
  }

  //new unbind method
  function newUnbind(event, handler) {
    //call base unapply
    unbind.apply(this, arguments);

    if (typeof event === "undefined") {
      return this.each(function () {
        for (var i = 0; i < watchers.length; i++) {
          removeWatchedElem(watchers[i], this);
        }
      });
    } else for (var evt in watchers) {
      if (!watchers.hasOwnProperty(evt)) continue;
      if (evt === event) {
        if (typeof handler == "undefined") {
          this.each(function () {
            removeWatchedElem(watchers[evt], this);
          })
        } else {
          this.each(function () {
            removeWatchedElemHandler(watchers[evt], this, handler);
          })
        }
      }
    }
    return this;
  }

  //gets the watched element, will add if not present
  //keeps a handle on the element itself and its' handlers
  function getWatchedElem(watching, elem) {
    for (var i = 0; i < watching.length; i++) {
      if (watching[i].elem === elem) return watching[i];
    };
    var ret = {
      elem: elem
      , handlers: []
    }
    watching.push(ret);
    return ret;
  }

  //removes all handlers and the element itself from the watch list (unbind)
  function removeWatchedElem(watching, elem) {
    for (var i = 0; i < watching.length; i++) {
      if (watching[i].elem == elem) {
        watching.splice(i, 1);
        i--;
      }
    }
  }

  //removes a specific handler from the watched element
  function removeWatchedElemHandler(watching, elem, handler) {
    var eh = getWatchedElem(watching, elem);
    for (var i = 0; i < eh.handlers.length; i++) {
      if (eh.handlers[i] == handler) {
        eh.handlers.splice(i, 1);
        i--;
      }
    }

    //if there are no handlers left, remove the element
    if (eh.handlers.length == 0) {
      removeWatchedElem(watching, elem);
    }
  }

}));
/*end jQuery.binder*/

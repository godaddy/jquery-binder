/*! jQuery.binder - Copyright (c) 2013 GoDaddy.com - MIT License
 *
 * Extends jQuery to include methods for tracking elements with are subscribed to events
 *
 * Warning:
 * this extension overrides the default bind/unbind behavior, it should be completely
 * compatible with the 1.9.x and 2.0.x releases, this may change in the future
 * if bind/unbind functionality changes.
 *
 * This should only be used when absolutely needed, and likely only for custom events
 * in another extension.
 *
 * Example:
 * //start watching for an event's binding
 * $.binder.watch("someEvent");
 *
 * //bind elements to the event
 * $("#elem").bind("someEvent", function(evt){
 * //event handler
 * });
 *
 * //get those elements listening for the event
 * $.binder.get("someEvent"); //returns jquery object with "#elem" included
 *
 **/
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
}(function($){

  //extend base jQuery object (global methods)
  $.binder = {
    watch: trackEventHandler
    ,get: getElementsForHandler
  }

  var watchers = {}; //events that are being tracked
  var bind = $.fn.bind; //original bind method
  var unbind = $.fn.unbind; //original unbind method

  $.fn.bind = newBind; //new bind method
  $.fn.unbind = newUnbind; //new unbind method

  //adds an item to the event tracking list
  function trackEventHandler(event) {
    watchers[event] = watchers[event]  || [];
  }

  //gets the elements listening for a tracked event
  //returns a jquery object containing the elements
  function getElementsForHandler(event) {
    var ret = $();
    var w = watchers[event] || [];
    for (var i=0; i<w.length; i++) {
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
        this.each(function(){
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
      return this.forEach(removeWatchedElemHandler);
    } else for (var evt in watchers) {
      if (!watchers.hasOwnProperty(evt)) continue;
      if (evt === event) {
        if (typeof handler == "undefined") {
          this.each(function(){
            removeWatchedElem(watchers[evt], this);
          })
        } else {
          this.each(function(){
            removeWatchedElemHandler(watchers[evt], this);
          })
        }
      }
    }
    return this;
  }

  //gets the watched element, will add if not present
  //keeps a handle on the element itself and its' handlers
  function getWatchedElem(watching, elem) {
    for (var i=0; i<watching.length; i++) {
      if (watching[i].elem === elem) return watching[i];
    };
    var ret = {
      elem: elem
      ,handlers: []
    }
    watching.push(ret);
    return ret;
  }

  //removes all handlers and the element itself from the watch list (unbind)
  function removeWatchedElem(watching, elem) {
    for (var i=0; i<watching.length; i++) {
      if (watching[i].elem == elem) {
        watching.splice(i,1);
        i--;
      }
    }
  }

  //removes a specific handler from the watched element
  function removeWatchedElemHandler(watching, elem, handler) {
    var eh = getWatchedElem(watching, elem);
    for (var i=0; i<eh.handlers.length; i++) {
      if (eh.handlers[i] == handler) {
        eh.handlers.splice(i,1);
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

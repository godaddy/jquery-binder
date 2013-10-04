/*! jQuery.binder - Copyright (c) {{year}} GoDaddy.com - MIT License
 * http://github.com/godaddy/jquery-binder/
 *
 * {{filename}} generated {{now}}
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
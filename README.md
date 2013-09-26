jQuery Binder
=============

jQuery Plugin to track elements with a given event listener.

Use:

Reference/Include `dist/jquery.binder.min.js`.

Example:

    //start watching for an event's binding
    $.binder.watch("someEvent");
    
    //bind elements to the event
    $("#elem").bind("someEvent", function(e){
        //event handler
    });
    
    //get those elements listening for the event
    var elems = $.binder.get("someEvent"); //returns jquery object with "#elem" included

    //optionally reduce elements selected
    elems = elems.not(":active");

    //create an event to trigger
    var event = new $.Event("someEvent", {});

    //trigger the event on the elements
    elems.trigger("someEvent", event);


Warning:

    this extension overrides the default bind/unbind behavior, it should be completely 
    compatible with the 1.9.x and 2.0.x releases, this may change in the future
    if bind/unbind functionality changes.
    
    This should only be used when absolutely needed, and likely only for custom events
    in another extension.


License:

    The MIT License (MIT)

    Copyright (c) 2013 GoDaddy.com

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
    FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
    COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
    IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

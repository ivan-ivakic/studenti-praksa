/* Copyright (c) 2010 Chris O'Hara <cohara87@gmail.com>. MIT Licensed */
// Include the chain.js microframework (http://github.com/chriso/chain.js)
(function(a){a=a||{};var b={},c,d;c=function(a,d,e){var f=a.halt=!1;a.error=function(a){throw a},a.next=function(c){c&&(f=!1);if(!a.halt&&d&&d.length){var e=d.shift(),g=e.shift();f=!0;try{b[g].apply(a,[e,e.length,g])}catch(h){a.error(h)}}return a};for(var g in b){if(typeof a[g]==="function")continue;(function(e){a[e]=function(){var g=Array.prototype.slice.call(arguments);if(e==="onError"){if(d){b.onError.apply(a,[g,g.length]);return a}var h={};b.onError.apply(h,[g,g.length]);return c(h,null,"onError")}g.unshift(e);if(!d)return c({},[g],e);a.then=a[e],d.push(g);return f?a:a.next()}})(g)}e&&(a.then=a[e]),a.call=function(b,c){c.unshift(b),d.unshift(c),a.next(!0)};return a.next()},d=a.addMethod=function(d){var e=Array.prototype.slice.call(arguments),f=e.pop();for(var g=0,h=e.length;g<h;g++)typeof e[g]==="string"&&(b[e[g]]=f);--h||(b["then"+d.substr(0,1).toUpperCase()+d.substr(1)]=f),c(a)},d("chain",function(a){var b=this,c=function(){if(!b.halt){if(!a.length)return b.next(!0);try{null!=a.shift().call(b,c,b.error)&&c()}catch(d){b.error(d)}}};c()}),d("run",function(a,b){var c=this,d=function(){c.halt||--b||c.next(!0)},e=function(a){c.error(a)};for(var f=0,g=b;!c.halt&&f<g;f++)null!=a[f].call(c,d,e)&&d()}),d("defer",function(a){var b=this;setTimeout(function(){b.next(!0)},a.shift())}),d("onError",function(a,b){var c=this;this.error=function(d){c.halt=!0;for(var e=0;e<b;e++)a[e].call(c,d)}})})(this);

var head = document.getElementsByTagName('head')[0] || document.documentElement;

addMethod('load', function (args, argc) {
  for (var queue = [], i = 0; i < argc; i++) {

    // Handle array
    if (typeof args[i] === 'object') {
      args[i].forEach(function(node){
        (function(node){
          queue.push(asyncLoadScript(node));
        }(node));
      });
    }

    // Default to string
    else {
      (function(i){
        queue.push(asyncLoadScript(args[i]));
      }(i));
    }
  }

  this.call('run', queue);
});

function asyncLoadScript(src) {
  return function (onload, onerror) {
    var ext = src.slice((src.lastIndexOf(".") - 1 >>> 0) + 2);

    // Handle CSS
    if (ext === 'css') {
      var target = document.createElement('link');
      target.type = 'text/css';
      target.rel = 'stylesheet';
      target.href = src;
    }

    // Otherwise assume JS
    else {
      var target = document.createElement('script');
      target.type = 'text/javascript';
      target.src = src;
    }

    target.onload = onload;
    target.onerror = onerror;
    target.onreadystatechange = function () {
      var state = this.readyState;
      if (state === 'loaded' || state === 'complete') {
        target.onreadystatechange = null;
        onload();
      }
    };

    // Append the target file to head
    head.appendChild(target);
  }
}

/*------------------------------------------------------------------------------------
  Window.requestAnimationFrame()
  https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
------------------------------------------------------------------------------------*/
window.requestAnimationFrame = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.msRequestAnimationFrame
  || function(callback) { return setTimeout(callback, 16.666); };



/*------------------------------------------------------------------------------------
  Element.matches()
  https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
------------------------------------------------------------------------------------*/
Element.prototype.matches = (Element.prototype.matches || Element.prototype.mozMatchesSelector
  || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector
  || Element.prototype.webkitMatchesSelector || Element.prototype.webkitMatchesSelector)
  || function (selector) {
      var element = this;
      var matches = (element.document || element.ownerDocument).querySelectorAll(selector);
      var i = 0;
      while (matches[i] && matches[i] !== element) { i++; }
      return matches[i] ? true : false;
    };


/*------------------------------------------------------------------------------------
  Element.classList()
  https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
  http://purl.eligrey.com/github/classList.js/
------------------------------------------------------------------------------------*/
if("document" in self){if(!("classList" in document.createElement("_"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false,q;do{r=t[s]+"";q=g(this,r);while(q!==-1){this.splice(q,1);o=true;q=g(this,r)}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}if(q===true||q===false){return q}else{return !o}};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))}else{(function(){var b=document.createElement("_");b.classList.add("c1","c2");if(!b.classList.contains("c2")){var c=function(e){var d=DOMTokenList.prototype[e];DOMTokenList.prototype[e]=function(h){var g,f=arguments.length;for(g=0;g<f;g++){h=arguments[g];d.call(this,h)}}};c("add");c("remove")}b.classList.toggle("c3",false);if(b.classList.contains("c3")){var a=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(d,e){if(1 in arguments&&!this.contains(d)===!e){return e}else{return a.call(this,d)}}}b=null}())}};


/*------------------------------------------------------------------------------------
  console.trace()
------------------------------------------------------------------------------------*/
if (window.console !== undefined) {
  if (!window.console.trace) {
    window.console.trace = window.console.log;
  }
}

'use strict';


/*------------------------------------------------------------------------------------
  Hide debug messages?
------------------------------------------------------------------------------------*/
if (App.debug === false || window.console === undefined || App.env === 'production') {
  var console = {
    log: function(){},
    debug: function(){},
    info: function(){},
    warn: function(){},
    error: function(){}
  };
  window.console = console;
}


/*------------------------------------------------------------------------------------
  Define some global paths
------------------------------------------------------------------------------------*/
window.path = {
  scripts: 'scripts/'
};


/*------------------------------------------------------------------------------------
  Load placeholder
------------------------------------------------------------------------------------*/
App.load = {
  critical: {},
  primary: {},
  secondary: {}
};


/*------------------------------------------------------------------------------------
  Define global ux variable
------------------------------------------------------------------------------------*/
window.ux = {
  support: {},
  device: {
    screenSize: {},
    resolution: null
  },
  viewport: {
    visible: {}
  },
  scroll: {
    direction: false
  },
  events: {
    userHasScrolled: false
  },
  preload: {},
  func: {}
};


/*------------------------------------------------------------------------------------
  QUEUES

  ABOUT:
    In order to modularize and truly separate script components, we cannot mix calls
    and listeners all over the place. One component may need to listen to a different
    component's ajax success call, and so on. Plus, for performance reasons, it's
    better to execute once on e.g., a page resize, than to have 10 resize listeners
    and various calculations which may be CPU intensive.

    In order to solve this problem, we can store our functions in a queue, and then
    just execute the queue at specific time. This can be once on every resize tick,
    or perhaps on an ajax success/dom insert to trigger "equal-column" calc again.

  HOW TO USE:
    If you wish to add something to the e.g., resize queue, write:

    queue.pageUnload.push(function myFunctionName(){
      // This code will be executed on "pageUnload" event
    });

    ---

    This will add your function to the "globalResizeEvents" queue. Later, in some
    resize listener when you wish to execute trigger queue, write:

    queue.trigger('pageUnload');

    This will run every stored function in the queue. In the order they were added.

    ---

    To remove a function from the desired queue, use:

    queue.remove('myFunctionName', 'pageUnload');

  TIP:
    You can also create custom queue names and give them whatever names you want. If
    you need to create a new queue for you component, feel free to do so. But try to
    use existing queues if possible, to keep the list shorter.

------------------------------------------------------------------------------------*/
window.queue = {
  jQuery: [],
  pageLoad: [],
  pageUnload: [],
  globalClick: [],
  globalScroll: [],
  globalResize: [],
  domChange: [],

  // If the queue does not exist yet, create it
  check: function(queueName) {
    if (queue[queueName] === undefined) { queue[queueName] = []; }
  },

  // Abstraction for adding functions to queue
  add: function(queueName, func) {
    this.check(queueName);
    queue[queueName].push(func);
  },

  // Trigger a specific queue
  trigger: function(queueName) {
    console.log('queue.' + queueName + '();');
    this.check(queueName);
    queue[queueName].forEach(function(func){
      func();
    });
  },

  // Remove a function from the queue based on its name
  remove: function(functionName, queueName) {
    queue[queueName].forEach(function(func, index){
      if (func.name === functionName) {
        queue[queueName].splice(index, 1);
        return;
      }
    });
  }
};


/*------------------------------------------------------------------------------------
  Log when documentReady and windowLoad events pass
------------------------------------------------------------------------------------*/
App.documentReady = App.documentReady || false;
App.windowLoad = App.windowLoad || false;

/*------------------------------------------------------------------------------------
  Finds the first matched parent in native javascript.
  Similar to jQuery.closest();

  - First you provide a starting point / target element (usually event.target)
  - You must specify a wanted selector for the parent, e.g. "div.class" or an array
    of selectors like ['.selector1', '#selector2', '[selector3]']
  - You can be performant and specify an optional limiterSelector. Without it, this
    will check for matches all the way up to the root/body element
  - If matched, returns the element itself
  - If not matched, return false
------------------------------------------------------------------------------------*/
function closest(target, wantedSelector, limiterSelector) {
  var current = target;
  var limiterSelector = limiterSelector || 'body';
  var match = false;

  // Iterate through parent elements until you reach some end
  while (match === false) {

    // If this is the bubbling limit...
    if (current.matches(limiterSelector)===true || current.matches('body')===true) {
      if (current.matches(wantedSelector)===true) {
        match = current;
      } else {
        return false;
      }
    }

    // Simple string match first...
    if (typeof wantedSelector==='string' && current.matches(wantedSelector)===true) {
      match = current;
    }

    // In case, we're dealing with an array of possible matches, check each selector individually..
    else if (typeof wantedSelector==='object') {
      wantedSelector.forEach(function(currentSelector){
        if (current.matches(currentSelector)===true) {
          match = current;
        }
      });
    }

    // If no matches, move up the parent tree...
    current = current.parentElement;
  }

  // If everything so far passes, return the element
  return match;
}



/*------------------------------------------------------------------------------------
  Simple NodeList to array conversion
------------------------------------------------------------------------------------*/
window.array = function(NodeList) {
  return Array.prototype.slice.call(NodeList);
}



/*------------------------------------------------------------------------------------
  Detects if callback exists and returns a blank function if it does not
------------------------------------------------------------------------------------*/
App.callback = function(callback) {
  if (callback === null || callback === undefined || callback === false) {
    return function(){};
  } else {
    return callback;
  }
}



/*------------------------------------------------------------------------------------
  Simple append / prepend functions.
  Accepts html string, e.g. "<div class='foo'>bar</div>"
------------------------------------------------------------------------------------*/
function appendix(html) {
  if (typeof html === 'string') {
    var p = document.createElement('div');
    p.innerHTML = html;
    return array(p.children);
  }
  else if (typeof html === 'object') {
    return [html];
  }
}

window.append = function(html, targetElement) {
  var targetElement = targetElement || document.body;
  appendix(html).forEach(function(node){
    targetElement.appendChild(node);
  });
}

window.prepend = function(html, targetElement) {
  var targetElement = targetElement || document.body;
  appendix(html).forEach(function(node){
    targetElement.insertBefore(node, targetElement);
  });
}



/*------------------------------------------------------------------------------------
  Handle clicks and taps on mobile without delay
  Currently uses Hammer.js as a dependency
------------------------------------------------------------------------------------*/
window.handleClick = function(target, callback) {

  target.addEventListener('click', function(e){
    callback(e);
  }, false);

  // Handle taps
  // Code is inspired by: https://github.com/filamentgroup/tappy
  var startTime, cancel, startX, startY, currentX, currentY;
  var scrollTolerance = 8;

  target.addEventListener('touchstart', function(e){
    console.log('-----');
    var touches = e.touches || e.targetTouches;
    startTime = (new Date()).getTime();

    // Break if multiple fingers are detected...
    if (touches.length > 1) {
      return false;
    }

    // Log starting positions...
    startX = touches[0].pageX;
    startY = touches[0].pageY;
  }, false);

  target.addEventListener('touchmove', function(e){
    if (!cancel) {
      var touches = e.touches || e.targetTouches;
      currentX = touches[0].pageX;
      currentY = touches[0].pageY;
      if (Math.abs(startY - currentY) > scrollTolerance || Math.abs(startX - currentX) > scrollTolerance) {
        cancel = true;
      }
    }
  }, false);

  target.addEventListener('touchend', function(e){
    var timePressed = (new Date()).getTime() - startTime;
    if (timePressed > 500) {
      cancel = false;
      return;
    }

    // Make sure no modifiers are present. http://www.jacklmoore.com/notes/click-events/
    // if ((e.which && e.which > 1) || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey) {
    //   cancel = false;
    //   return;
    // }

    // Break if we have logged cancellation
    if (cancel === true) {
      cancel = false;
      return;
    }

    // If everything so far has passed, trigger callback
    e.preventDefault();
    callback(e);
  }, false);
};



/*------------------------------------------------------------------------------------
  Encapsulation to make sure your callback code runs only if/when documentReady
  or windowLoad event has fired (even after it has passed)
------------------------------------------------------------------------------------*/
window.whenReady = function(callback) {
  if (App.documentReady === true) {
    requestAnimationFrame(callback);
  } else {
    setTimeout(function(){
      whenReady(callback);
    }, 50);
  }
};

window.whenLoaded = function(callback) {
  if (App.windowLoad === true) {
    requestAnimationFrame(callback);
  } else {
    setTimeout(function(){
      whenLoaded(callback);
    }, 100);
  }
};



/*------------------------------------------------------------------------------------
  A general encapsulation to wait for a boolean property (or an object containing
  multiple booleans) to become TRUE

  An example usage scenario is to wait for critical resources to load, before calling
  some secondary / less important resources.
------------------------------------------------------------------------------------*/
window.whenTrue = function(path, callback) {
  var callback = callback || function(){};
  var loadPath = path.split('.');
  var mustBeTrue;

  // ARE YOU NOT ENTERTAINED !?
  if (loadPath.length === 1) {
    mustBeTrue = App.load[loadPath[0]];
  } else if (loadPath.length === 2) {
    mustBeTrue = App.load[loadPath[0]][loadPath[1]];
  } else if (loadPath.length === 3) {
    mustBeTrue = App.load[loadPath[0]][loadPath[1]][loadPath[2]];
  } else if (loadPath.length === 4) {
    mustBeTrue = App.load[loadPath[0]][loadPath[1]][loadPath[2]][loadPath[3]];
  } else if (loadPath.length > 4) {
    console.error('whenTrue(); ERROR: Entertainment level is too damn high!');
  }

  // We use an external function to do this specific work and call back if it return true
  if (ifTrue(mustBeTrue)) {
    callback();
  }

  // Otherwise, we check back here again after a delay
  else {
    setTimeout(function(){
      whenTrue(path, callback);
    }, 50);
  }
};


window.ifTrue = function(mustBeTrue) {

  // Handle an object (every key must be TRUE to pass)
  if (typeof mustBeTrue === 'object') {

    // Empty object will qualify automatically as TRUE
    if (Object.keys(mustBeTrue).length !== 0) {
      for (var property in mustBeTrue) {
        if (mustBeTrue.hasOwnProperty(property)) {
          if (mustBeTrue[property] !== true) {
            return false;
          }
        }
      }
    }

    // If everything passes up to here, return true
    return true;
  }

  // Handle a direct boolean
  else if (typeof mustBeTrue === 'boolean') {
    if (mustBeTrue === true) {
      return true;
    } else {
      return false;
    }
  }

  // String is not allowed
  else if (typeof mustBeTrue === 'string') {
    console.error('whenTrue(); ERROR: String is not allowed. Must be a boolean or object...');
    return false;
  }

  // Fallback error
  else {
    console.error('whenTrue(); ERROR: Incompatible value type!');
    return false;
  }
};



/*------------------------------------------------------------------------------------
  Light scroll
  - Triggers with a delay, not instantly, therefore is less intensive on the cpu
  - Callbacks on requestAnimationFrame for additional performance
------------------------------------------------------------------------------------*/
App.lightScroll = function(callback, delay) {
  var timer;
  var delay = delay || 60;
  var scrollCounter = 0;
  var scrollTrigger = 5;
  var touchCounter = 0;
  var touchTrigger = 25;
  var isTouchDevice = false;

  // Listen for general scroll events...
  window.addEventListener('scroll', function(e){
    if (touchCounter === 0) { scrollTrigger = 5; } else { scrollTrigger = 25; }
    if (scrollCounter > scrollTrigger){ parseScroll(e, true); }
    else { scrollCounter++; parseScroll(e, false); }
  }, true);

  // Listen to touchmove events as fallback
  window.addEventListener('touchmove', function(e){
    if (touchCounter > touchTrigger){ parseScroll(e, true); }
    else { touchCounter++; parseScroll(e, false); }
  }, true);

  // Scroll parser
  function parseScroll(e, counterTrigger) {

    // Log that user has scrolled at least once
    ux.events.userHasScrolled = true;

    // If trigger is true, callback immediatelly
    if (counterTrigger){
      requestAnimationFrame(callback);
      scrollCounter = 0;
      touchCounter = 0;
      timer = false;
      return;
    }

    // If scroll counters are low, proceed with regular Timeout
    clearTimeout(timer);
    timer = setTimeout(function(){
      scrollCounter = 0;
      requestAnimationFrame(callback);
    }, delay);
  }
};



/*------------------------------------------------------------------------------------
  Light resize
  - Triggers with a delay, not instantly, therefore is less intensive on the cpu
  - Callbacks on requestAnimationFrame for additional performance
------------------------------------------------------------------------------------*/
App.lightResize = function(callback, delay) {
  var timer;
  var delay = delay || 100;
  window.addEventListener('resize', function(){
    clearTimeout(timer);
    timer = setTimeout(function(){
      requestAnimationFrame(callback);
    }, delay);
  });
};



/*------------------------------------------------------------------------------------
  Get scrollbar width
------------------------------------------------------------------------------------*/
whenReady(function scrollbarWidth(){

  // Create a tester element
  var html = '<div id="scrollTester" style="width:100px;height:100px;overflow-y:scroll;visibility:hidden;"><div style="width:100%;"><div/></div>';
  append(html, document.body);

  // Anchor working elements
  var tester = document.getElementById('scrollTester');
  var child = tester.querySelector('div');

  // Calculate scrollbar width
  ux.scroll.scrollbarWidth = 100 - child.offsetWidth;

  // Calculate scrollbar position (right-to-left languages have scrollbar on the other side)
  if (tester.getBoundingClientRect().left !== child.getBoundingClientRect().left) {
    ux.scroll.scrollbarPosition = 'left';
  } else {
    ux.scroll.scrollbarPosition = 'right';
  }

  // Remove the tester from the DOM
  document.body.removeChild(tester);
});



/*------------------------------------------------------------------------------------
  Update user info on scroll event
------------------------------------------------------------------------------------*/
App.getScrollMetadata = function(){
  var treshold = 50;

  // Set scroll offset
  ux.scroll.offsetPrevious = ux.scroll.offset;
  ux.scroll.offset = document.documentElement.scrollTop || document.body.scrollTop;

  // We compare distance traveled with a defined treshold and report scroll direction
  if( (ux.scroll.offset - ux.scroll.offsetPrevious) > treshold ){
    ux.scroll.direction = 'down';
  } else if( (ux.scroll.offsetPrevious - ux.scroll.offset) > treshold ){
    ux.scroll.direction = 'up';
  }

  // Update viewport visibility values
  ux.viewport.visible = {
    from: ux.scroll.offset,
    center: ux.scroll.offset + (ux.viewport.height / 2),
    to: ux.scroll.offset + ux.viewport.height
  };
}

// Get initial scrollMetadata on documentLoad
whenReady(function scrollMetadata(){
  App.getScrollMetadata();
});

// Update scrollMetadata on scroll
App.lightScroll(App.getScrollMetadata, 20);



/*------------------------------------------------------------------------------------
  Update user info on resize event
------------------------------------------------------------------------------------*/
App.getViewportMetadata = function(){

  // Refresh scroll metadata first
  App.getScrollMetadata();

  // Find the helper element
  var screenHelper = document.getElementById('screenSize');

  // Return error if no helper element is found
  if (screenHelper===null || screenHelper===undefined) {
    console.error('App.getViewportMetadata(): Unable to read screen size! Check the #screenSize element');
    return false;
  }

  // Get dimensions
  // We don't check "window" for screen size due to iOS browser bugs
  ux.viewport.width = screenHelper.offsetWidth;
  ux.viewport.height = screenHelper.offsetHeight;

  // Parse device size
  var rawSizes = window.getComputedStyle(screenHelper).getPropertyValue('font-family');
  ux.device.screenSize.all = rawSizes.replace(/['"]+/g, '').split(', ');
  ux.device.screenSize.last = ux.device.screenSize.all[ux.device.screenSize.all.length-1];

  // Parse device resolution
  var rawResolution = window.getComputedStyle(screenHelper).getPropertyValue('content');
  ux.device.resolution = rawResolution.replace(/['"]+/g, '').split(', ');
}

// Get initial viewportMetadata on documentLoad
whenReady(function viewportMetadata(){
  App.getViewportMetadata();
});

// Update viewportMetadata on resize
App.lightResize(App.getViewportMetadata, 40);



/*------------------------------------------------------------------------------------

  Main function for matching conditions.

  You can ask to match:
  - Satin media quries (small, smallPlus, medium, mediumPlus, large, largePlus)
  - Device resolution (@2x)
  - Device OS (ios, android)
  - Element ID or class (#modal, .pgHome, etc...)

  Additionally, if the condition starts with a "!" character, then the result will
  be inversed. E.g. "!android" will match if it is NOT an android device.

------------------------------------------------------------------------------------*/
App.matchCondition = function (condition) {
  var match = false;
  var reverse = condition.charAt(0) === '!';
  condition = condition.replace(/^(!)/, '');

  // Clean the condition from spaces and tabs just to be sure
  condition = condition.replace(/ /g,'').replace(/\t/g,'');

  // Catch common errors gracefully
  if (App.documentReady === false) {
    console.warn('Warning: App.matchCondition() needs to be run after DOM is ready');
    return false;
  }

  // If the condition starts with a "@" character, then we're matching resolutions
  if (condition.charAt(0) === '@') {
    for (var i=0; i < ux.device.resolution.length; i++) {
      if (ux.device.resolution.indexOf(condition) > -1) { match = true; }
    }
  }

  // If the condition starts with a "#" character, then we're matching an ID
  else if (condition.charAt(0) === '#') {
    var element = document.getElementById(condition.substring(1));
    if (element !== null && element !== undefined) {
      match = true;
    }
  }

  // If the condition starts with a "." character, then we're matching a class
  else if (condition.charAt(0) === '.') {
    var element = document.querySelector(condition);
    if (element !== null && element !== undefined) {
      match = true;
    }
  }

  // Matching iOS devices?
  else if (condition.indexOf('ios') > -1) {
    match = matchDeviceOS('ios');
  }

  // Matching Android devices?
  else if (condition.indexOf('android') > -1) {
    match = matchDeviceOS('android');
  }

  // Default assumes that the condition is a media query / device screen size condition
  else {
    if (ux.device.screenSize.all.indexOf(condition) > -1) { match = true; }
  }

  // Device match helper
  function matchDeviceOS(deviceOS) {
    if (App.device.os === deviceOS) { return true; }
    else { return false; }
  }

  // Return match results
  // console.log(match);
  // return match;
  if (reverse === true) { return !match; }
  else { return match; }
}

// Backward compatibility for now
App.checkMediaQuery = function(condition, explicit){
  console.trace('Warning: App.checkMediaQuery() is deprecated and will be removed in future versions. Switch to App.matchCondition() instead.');
  App.matchCondition(condition);
};



/*------------------------------------------------------------------------------------

  Wrapper function for matching multiple conditions using the helper above.

  Accepts:
  - A raw condition string such as "-small -!large -@2x"
  - A parsed array of conditions such as ['small', '!large', '@2x']

------------------------------------------------------------------------------------*/
App.matchAllConditions = function (rawConditions) {
  var matchedConditions = 0;

  // Parse raw string?
  if (typeof rawConditions === 'string') {
    var conditions = rawConditions.replace(/ /g, '').replace(/^(-)/, '').split('-');
  } else {
    var conditions = rawConditions;
  }

  // Check each condition
  conditions.forEach(function(cond){
    if (App.matchCondition(cond) === true) {
      matchedConditions++;
    }
  });

  // If we have not matched ALL of the conditions, this is a false
  if (matchedConditions === conditions.length) { return true; }
  else { return false; }
}



/*------------------------------------------------------------------------------------
  Check if element is currently visible on the screen
------------------------------------------------------------------------------------*/
App.checkIfVisible = function(el, targetScope, tresholdMultiplier) {

  // We can also forward a tresholdMultiplier without targetScope
  if (typeof targetScope === 'number') {
    tresholdMultiplier = targetScope;
    targetScope = null;
  }

  // Parse scope
  var scope = document.body;
  if (isElement(targetScope)) { scope = targetScope; }
  else if (targetScope !== null) { scope = document.querySelector(targetScope); }

  // Get scope dimensions
  if (scope === document.body) { var scopeHeight = ux.viewport.height; }
  else { var scopeHeight = scope.getBoundingClientRect().height; }

  // Default treshold and multiplier
  var tresholdMultiplier = tresholdMultiplier || 1;
  var treshold = scopeHeight * tresholdMultiplier;

  // Increase the treshold even further for smaller devices, since the user will
  // usually be scrolling much faster.
  if (App.matchCondition('!mediumPlus')){
    treshold = treshold * 1.5;
  }

  var bounds = el.getBoundingClientRect();

  if (
    (bounds.top + bounds.height) >= (0 - treshold) &&
    bounds.top < (scopeHeight + treshold)
  ){ return true; }
  else { return false; }
}


/*------------------------------------------------------------------------------------
  setTimeout() abstraction which collapses any timeout to 0ms if the browser does
  not support css transitions
------------------------------------------------------------------------------------*/
window.animationTimeout = function(timeout, callback) {

  // Get transition support data the first time
  if (ux.support.transitions === undefined) {
    if (document.getElementsByTagName('html')[0].classList.contains('transitions')) {
      ux.support.transitions = true;
    } else {
      ux.support.transitions = false;
    }
  }

  // Make the check
  if (ux.support.transitions === true) {
    setTimeout(callback, timeout);
  } else {
    callback();
  }
}


/*------------------------------------------------------------------------------------
  Check if a variable is a DOM element
------------------------------------------------------------------------------------*/
window.isElement = function(o) {
  if (o === null) { return false; }
  return (
    typeof Node === "object" ? o instanceof Node :
    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
  );
}


/*------------------------------------------------------------------------------------
  Generate a random GUID (global unique identifier)
------------------------------------------------------------------------------------*/
App.guid = function() {
  return (Math.random().toString(36).slice(2));
}

// Add some global user events to the queue
whenReady(function scrollMetadata(){

  document.addEventListener('click', function(){
    queue.trigger('globalClick');
  });

  App.lightResize(function(){
    queue.trigger('globalResize');
  }, 300);

  App.lightScroll(function(){
    queue.trigger('globalScroll');
  }, 300);

});

App.mediaLoader = {
  debug: false,
  verbose: false,
  selector: '[data-src]',
  filter: ':not(script):not([data-delay]):not([loadedOnCurrentSize]):not([data-ignore]):not([src^="data:"])',
  loaded: [],


  /*------------------------------------------------------------------------------------
    CHECK
  ------------------------------------------------------------------------------------*/
  check: function(target) {
    if(this.debug){ console.log('%cApp.mediaLoader.check()', 'color:gray;'); }

    // Base setup
    var target = target || null;
    var localNodes;
    var offset = {};
    var toBeLoaded = [];

    // Determine if check is global or scoped
    if (target === undefined || target === null) {
      localNodes = document.querySelectorAll(App.mediaLoader.selector + App.mediaLoader.filter);
    } else {
      localNodes = target.querySelectorAll(App.mediaLoader.selector + App.mediaLoader.filter);
    }

    // Debug
    if(this.debug && this.verbose){ console.log(target, localNodes); }

    // Iterate through nodeList
    array(localNodes).forEach(function(node) {

      // Skip the delay tags
      if (node.getAttribute('data-delay') !== null && node.getAttribute('data-delay') !== undefined) { return; }

      // Load only media which is about to be visible
      var scope = node.getAttribute('data-scope') || null;
      if (App.checkIfVisible(node, scope)) {
        toBeLoaded.push(node);
      }
    });

    // Load those nodes in bulk
    toBeLoaded.forEach(function(node){
      App.mediaLoader.load(node);
    });
  },


  /*------------------------------------------------------------------------------------
    LOAD
  ------------------------------------------------------------------------------------*/
  load: function(node, callback) {
    var callback = callback || function(){};
    var pNode = App.mediaLoader.parseNode(node);
    if(this.debug && this.verbose){ console.log('%cApp.mediaLoader.load("'+ pNode.src +'")', 'color:gray;'); }

    // Get media style (if it has one)
    var style = node.getAttribute('style') || '';

    // Don't start a new load if the sources match
    var nodeSrc = node.getAttribute('src') || '';
    if (nodeSrc.indexOf(pNode.src) > -1 || pNode.styleAttr.indexOf(pNode.src) > -1) {
      pNode.status = 'done';
      App.mediaLoader.onComplete(pNode, callback);
      return;
    }

    // Mark node as loading...
    pNode.el.setAttribute('loading', '');

    // Handle native elements
    if (pNode.isNative) {
      pNode.el.onload = function(){ pNode.status='done'; App.mediaLoader.onComplete(pNode, callback); };
      pNode.el.onerror = function(){ pNode.status='error'; App.mediaLoader.onComplete(pNode, callback); };

      // Streaming media should load with enough buffer to play, but not loaded completely
      if (pNode.isStreamingMedia) {

        // Maybe we have to show the fallback poster instead of a video?
        if(this.debug){ console.log(pNode.src, pNode.fallbackSrc); }
        if (pNode.src === '#blank' && pNode.fallbackSrc !== null) {
          pNode.el.src = pNode.src;
          pNode.el.setAttribute('poster', pNode.fallbackSrc);
          pNode.status='done';
          App.mediaLoader.onComplete(pNode, callback);
          return;
        }

        // Otherwise proceed normally...
        else {
          var listener = function(){
            pNode.status = 'done';
            App.mediaLoader.onComplete(pNode, callback);
            pNode.el.removeEventListener('canplay', listener);
          };
          if(pNode.readyState > 2) { listener(); }
          else { pNode.el.addEventListener('canplay', listener); }
        }
      }

      pNode.el.src = pNode.src;
      return;
    }

    // Non-native elements need a shadow image to improvise load event
    else {
      var shadowImage = new Image();
      shadowImage.onload = function(){
        pNode.status = 'done';
        shadowImage = null;
        App.mediaLoader.onComplete(pNode, callback);
      };
      shadowImage.onerror = function(){
        pNode.status = 'error';
        shadowImage = null;
        App.mediaLoader.onComplete(pNode, callback);
      };

      // Start the call...
      shadowImage.src = pNode.src;

      // Add the matched source as background image
      var newStyle = 'background-image:url("'+ pNode.src +'")';
      if (pNode.styleAttr !== null) { newStyle = pNode.styleAttr + newStyle; }
      pNode.el.setAttribute('style', newStyle);
    }
  },


  /*------------------------------------------------------------------------------------
    PARSE NODE
  ------------------------------------------------------------------------------------*/
  parseNode: function(node, callback) {
    var callback = callback || function(){};
    var nativeElements = ['img', 'video', 'audio', 'source', 'iframe'];

    // Parser object
    var pNode = {};
      pNode.el = node;
      pNode.tag = node.tagName.toLowerCase();
      pNode.src = '#blank'; // Default, blank src is a valid hashtag
      pNode.styleAttr = node.getAttribute('style') || '';
      pNode.nativeSrc = node.getAttribute('src');
      pNode.fallbackSrc = node.getAttribute('data-fallback');
      pNode.dataSrc = App.mediaLoader.parseSrc(node.getAttribute('data-src'));
      pNode.delay = pNode.el.getAttribute('data-delay');
      pNode.isNative = (nativeElements.indexOf(pNode.tag) > -1);
      pNode.isStreamingMedia = (['audio', 'video'].indexOf(pNode.tag) > -1);
      pNode.isSimpleSrc = (pNode.dataSrc.length === 1);
      pNode.isLoadedOnCurrentSize = (pNode.el.getAttribute('loadedOnCurrentSize') !== null && pNode.el.getAttribute('loadedOnCurrentSize') !== undefined);
      pNode.isAlreadyLoaded = false;

    // Element has a src, but no data-src attribute?
    if (pNode.nativeSrc !== null && pNode.nativeSrc !== '' && pNode.dataSrc === false) {
      pNode.isAlreadyLoaded = (App.mediaLoader.loaded.indexOf(pNode.nativeSrc) > -1 || pNode.el.complete === true);
      pNode.src = pNode.nativeSrc;
    }

    // If there is only one file in data-src, then we do not check anything further
    if (pNode.isSimpleSrc) {
      pNode.src = pNode.dataSrc[0].src;
    }

    // Otherwise, determine which of the multiple sources matches
    else if (pNode.isLoadedOnCurrentSize === false) {
      for(var i=pNode.dataSrc.length-1; i>=0; i--){

        // If the source has no conditions, then it is loaded by default
        if (pNode.dataSrc[i].conditions.length < 1 && pNode.src === '#blank') {
          pNode.src = pNode.dataSrc[i].src;
        }

        // Otherwise, check if all conditions match
        else if (App.mediaLoader.checkConditions(pNode.dataSrc[i].conditions) === true  && pNode.src === '#blank') {
          pNode.src = pNode.dataSrc[i].src;
        }
      };
    }

    return pNode;
  },


  /*------------------------------------------------------------------------------------
    PARSE DATA-SRC ARRAY
  ------------------------------------------------------------------------------------*/
  parseSrc: function(dataSrc) {
    if (dataSrc === null) { return false; }

    var cleaned = dataSrc
      .replace(/\[ /g, '')
      .replace(/\[/g, '')
      .replace(/\ ]/g, '')
      .replace(/\]/g, '')
      .replace(/  /g, '')
      .replace(/  /g, '')
      .replace(/, /g, ',')
      .replace(/(\r\n|\n|\r)/gm,"");
    var sets = cleaned.split(',');
    var parsedSrc = [];

    sets.forEach(function(node, i){
      var params = node.split(' -');
      var conditions = params.splice(1, params.length-1);
      parsedSrc.push({
        src: App.mediaPath + params[0],
        conditions: conditions
      });
    });

    return parsedSrc;
  },


  /*------------------------------------------------------------------------------------
    CHECK IF ALL CONDITIONS MATCH
  ------------------------------------------------------------------------------------*/
  checkConditions: function(conditions) {
    var matchedConditions = 0;

    conditions.forEach(function(cond){
      if (App.matchCondition(cond) === true) {
        matchedConditions++;
      }
    });

    if (matchedConditions === conditions.length) { return true; }
    else { return false; }
  },


  /*------------------------------------------------------------------------------------
    SINGLE NODE FINISHES LOADING
  ------------------------------------------------------------------------------------*/
  onComplete: function(pNode, callback) {

    if (pNode.status === 'done') {
      if(this.debug && this.verbose){ console.log('%cApp.mediaLoader.done("'+ pNode.src +'")', 'color:#68B046;'); }
      App.mediaLoader.loaded.push(pNode.src);
    } else {
      if(this.debug && this.verbose){ console.error('App.mediaLoader.done("'+ pNode.src +'") 404'); }
      pNode.el.setAttribute('loadError', '');
    }

    // Node is no longer loading...
    pNode.el.removeAttribute('loading', '');
    pNode.el.removeAttribute('data-delay', '');

    // Check if we need to fade in the media after it has loaded
    if (pNode.el.getAttribute('data-fadeIn') !== null) {
      pNode.el.classList.add('fadeStart');
      animationTimeout(600, function(){
        pNode.el.removeAttribute('data-fadeIn');
        pNode.el.classList.remove('fadeStart');
      });
    }

    // On single sources, disable further checks. There are no alternatives anyways [performance]
    if (pNode.isSimpleSrc) {
      pNode.el.setAttribute('data-ignore', '');
    }

    // On multiple sources, ignore further checks until the viewport changes size [performance]
    else {
      pNode.el.setAttribute('loadedOnCurrentSize', '');
    }

    // Mark node as loaded
    pNode.el.setAttribute('loaded', '');

    // Run callback function asynchronously
    setTimeout(callback, 0);
  },


  /*------------------------------------------------------------------------------------
    WAIT FOR ALL (TO LOAD)
  ------------------------------------------------------------------------------------*/
  waitForAll: function(scope, callback, delayPriority) {
    var t = this;
    var nodesLoaded = 0;
    var delayPriority = delayPriority || 0;
    var filter = '';
    var localNodes = [];
    var guid = App.guid();
    var timeoutDuration = 20000;
    var callback = App.callback(callback);

    // Check for common errors
    if (typeof scope === 'function') {
      console.error('%cApp.mediaLoader.waitForAll(); ERROR: First parameter cannot be a function!', 'color:red;');
      return false;
    }

    // If target is only a selector, find the target first...
    if (typeof scope === 'string') {
      scope = document.querySelectorAll(scope);
    }

    // Decide if delayed nodes are also counted
    if (delayPriority === 0) {
      filter = this.filter;
    } else {
      filter = ':not(script):not([loadedOnCurrentSize]):not([data-ignore]):not([src^="data:"])';
    }

    // If scope is an array of objects, we concatenate all of their results
    if (scope[0]) {
      array(scope).forEach(function(node){
        var newNodes = array(node.querySelectorAll(App.mediaLoader.selector + filter + ', [src]' + filter));
        localNodes = localNodes.concat(newNodes);

        // Does the scope element itself have a data-src?
        if (node.getAttribute('data-src')) {
          if(this.debug && this.verbose){ console.log('This scope has a src itself!', 1111, node); }
          localNodes.unshift(node);
        }
      });
    }

    // Otherwise, just must a single call...
    else {
      localNodes = array(scope.querySelectorAll(App.mediaLoader.selector + filter + ', [src]' + filter));

      // Does the scope element itself have a data-src?
      if (scope.getAttribute('data-src')) {
        localNodes.unshift(scope);
      }
    }

    // If there is no defined priority, we exclude every preload element
    if (delayPriority > 0) {
      var defaults = [];
      var priority1 = [];
      var priority2 = [];
      var priority3 = [];
      var priority4 = [];

      // Iterate through each node...
      localNodes.forEach(function(node){
        var itemPriority = parseInt(node.getAttribute('data-delay')) || 0;

        // Exclude items which are higher priority than requested
        // And sort items in order of priority
        if (itemPriority <= delayPriority && (node.getAttribute('data-ignore') === null)) {
          if (itemPriority === 0) { priority1.push(node); }
          else if (itemPriority === 1) { priority1.push(node); }
          else if (itemPriority === 2) { priority2.push(node); }
          else if (itemPriority === 3) { priority3.push(node); }
          else if (itemPriority === 4) { priority3.push(node); }
          else if (itemPriority === 5) { priority3.push(node); }
          else if (itemPriority > 5) { priority4.push(node); }
        }
      });

      localNodes = defaults.concat(priority1, priority2, priority3, priority4);
    }

    // Log the number of nodes...
    if(t.debug && t.verbose){ console.log('App.mediaLoader.waitForAll('+ localNodes.length +')', localNodes); }
    else if (t.debug) { console.log('App.mediaLoader.waitForAll('+ localNodes.length +')'); }

    // If idler is included, block it until everything finishes loading
    if(window.idle){ idle.block(guid); }

    // If this scope does not have any matched nodes, then callback immediatelly
    if (localNodes.length === 0) {
      console.log('%cApp.mediaLoader.waitForAll.done(); No images were found within this selector!', 'color:#68B046;');
      callback();
      if(window.idle){ idle.unblock(guid); }
      return;
    }

    function checkIfAll() {
      if(t.debug && t.verbose){
        console.log('App.mediaLoader.checkIfAll()', nodesLoaded, localNodes.length);
        console.log(localNodes);
      }
      if (nodesLoaded >= localNodes.length) {
        console.log('%cApp.mediaLoader.waitForAll.done('+ localNodes.length +')', 'color:#68B046;');
        setTimeout(function(){
          callback();
          if(window.idle){ idle.unblock(guid); }
        }, 0);
        return;
      }
    }

    // Call every node source
    array(localNodes).forEach(function(node){

      // Create a timeout for this instance
      var timer = setTimeout(function(){
        console.error('App.mediaLoader.waitForAll(); Node timeout after ' + timeoutDuration + 'ms', node);
        nodesLoaded++;
        checkIfAll();
      }, timeoutDuration);

      // Initiate the load
      App.mediaLoader.load(node, function(){
        clearTimeout(timer);
        nodesLoaded++;
        checkIfAll();
      });
    });
  }
};


// Do an initial check
whenReady(function App_mediaLoader_checkOnReady(){
  App.mediaLoader.check();
});


// Check on scroll
queue.globalScroll.push(function App_mediaLoader_checkOnScroll(){
  App.mediaLoader.check();
});


// Check on resize
queue.globalResize.push(function App_mediaLoader_checkOnResize(){
  array(document.querySelectorAll('[loadedOnCurrentSize]')).forEach(function(node){
    node.removeAttribute('loadedOnCurrentSize');
  });
  App.mediaLoader.check();
});


// Check on DOM change
queue.domChange.push(function App_mediaLoader_checkOnDOM(){
  App.mediaLoader.check();
});

;(function(){


  function check() {
    console.log('swapCheck()');
    var currentHosts = document.body.querySelectorAll('.swapActive');

    array(currentHosts).forEach(function(currentHost){
      var swapLink = currentHost.getAttribute('data-swapLink');
      var swapConditions = currentHost.getAttribute('data-swapConditions').split(' ');
      var matchesConditions = App.matchAllConditions(swapConditions);
      console.log(currentHost, swapConditions, matchesConditions);

      // If the current host does not match its own criteria, we try to find a new one
      if (!matchesConditions) {
        var potentialHosts = document.body.querySelectorAll('[data-swapLink="'+swapLink+'"]:not([data-swapActive])');
        var matchingHost = null;

        array(potentialHosts).forEach(function(pHost){
          var pHost_conditions = pHost.getAttribute('data-swapConditions').split(' ');
          console.log(pHost, pHost_conditions, App.matchAllConditions(pHost_conditions));
          if (App.matchAllConditions(pHost_conditions)) {
            matchingHost = pHost;
            return;
          }
        });

        // Swap the content of the two
        if (matchingHost !== null) {
          swapContent(currentHost, matchingHost);
        }
      }
    });
  }


  function swapContent(from, to) {
    console.log('Swapping content...');

    // Swap HTML
    to.innerHTML = from.innerHTML;
    from.innerHTML = '';

    // Update visibility
    from.classList.remove('swapActive');
    to.classList.add('swapActive');
  }


  window.SwapCheck = check; // Export the check function publicly
})(document);


whenReady(function(){
  SwapCheck();
});


queue.globalResize.push(function(){
  SwapCheck();
});

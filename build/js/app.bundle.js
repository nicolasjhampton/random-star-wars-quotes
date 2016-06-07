webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	var _util = __webpack_require__(299);
	
	var util = _interopRequireWildcard(_util);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var random = util.random,
	    template = util.template,
	    getRandomColor = util.getRandomColor,
	    createTags = util.createTags,
	    makeElement = util.makeElement,
	    clearArray = util.clearArray,
	    useQuote = util.useQuote,
	    createQuotebox = util.createQuotebox,
	    hide = util.hide,
	    show = util.show,
	    createNewQuote = util.createNewQuote,
	    changeBackgroundColor = util.changeBackgroundColor,
	    extend = util.extend;
	
	var defaults = {
	  "templates": {
	    "quote": { "begin": "<p class='quote'>", "end": "</p>" },
	    "source": { "begin": "<p class='source'>", "end": "</p>" },
	    "citation": { "begin": "<span class='citation'>", "end": "</span>" },
	    "year": { "begin": "<span class='year'>", "end": "</span>" },
	    "tags": { "begin": "<span class='tags'>Tags: ", "end": "</span>" },
	    "tag": { "begin": "<p class='tag'>", "end": "</p>" },
	    "title": { "begin": "<p class='title'>", "end": "</p>" },
	    "quotebox": { "begin": "<div class='", "end": "'></div>" }
	  },
	  "quoteClass": "quote-box",
	  "title": ""
	};
	
	function Quoter(quoteArray, options) {
	  if (!options) {
	    options = {};
	  }
	  this.config = extend({}, defaults, options);
	  this.quotes = {
	    "new": quoteArray,
	    "used": []
	  };
	};
	
	// returns a random quote object from the quotes array
	Quoter.prototype.randomQuote = function () {
	  var randomIndex = random(0, this.quotes.new.length);
	
	  if (this.quotes.used.length === this.quotes.new.length) {
	    // If all the quotes have been used...
	    clearArray(this.quotes.used);
	  }
	
	  if (!this.quotes.used.includes(randomIndex)) {
	    // If we haven't used this quote before...
	    return useQuote(this.quotes, randomIndex);
	  }
	
	  return this.randomQuote(); // Recursion like woah ;)
	};
	
	Quoter.prototype.printQuote = function () {
	  var that = this;
	  var randQuote = this.randomQuote(); // Get a random quote
	
	  hide(this.quoteBox);
	  this.quoteBox = createNewQuote.call(this.config.templates, this.quoteBox, randQuote);
	  changeBackgroundColor(this.billboard);
	  show(this.quoteBox);
	
	  this.resetTimer();
	};
	
	Quoter.prototype.resetTimer = function () {
	  var that = this;
	  if (that.duration) {
	    if (that.autoPlay) {
	      window.clearTimeout(that.autoPlay);
	    }
	    that.autoPlay = window.setTimeout(that.printQuote.bind(that), that.duration);
	  }
	};
	
	Quoter.prototype.attachTo = function (cssSelector) {
	  this.billboard = document.querySelector(cssSelector);
	  var quoteboxElement = createQuotebox.call(this.config.templates, this.config.quoteClass, this.config.title);
	  this.billboard.insertBefore(quoteboxElement, this.billboard.firstChild);
	  this.quoteBox = document.querySelector(cssSelector + ' .' + this.config.quoteClass);
	  return this;
	};
	
	Quoter.prototype.setButton = function (cssSelector) {
	  var that = this;
	  var targetButton = document.querySelector(cssSelector);
	  targetButton.addEventListener('click', that.printQuote.bind(that));
	  return that;
	};
	
	Quoter.prototype.setAutoplay = function (duration) {
	  var that = this;
	  this.duration = duration;
	  window.setTimeout(that.printQuote.bind(that), duration);
	  return that;
	};
	
	window.Quoter = Quoter;

/***/ },

/***/ 299:
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var template = function template(key, content) {
	  return '' + this[key].begin + content + this[key].end;
	};
	
	// Handles each sub-tag template
	var createTags = function createTags(tagString) {
	  var that = this;
	  return tagString.split(' ').map(function (tag) {
	    return template.call(that, 'tag', tag);
	  }).join('');
	};
	
	// assembles the html string for each element from the template array
	var makeElement = function makeElement(obj, key) {
	  var content = key === 'tags' ? createTags.call(this, obj[key]) : obj[key];
	  return template.call(this, key, content);
	};
	
	var createQuotebox = function createQuotebox(classname, title) {
	  var quotebox = document.createElement('div');
	  quotebox.innerHTML = template.call(this, 'title', title);
	  quotebox.className = classname;
	  return quotebox;
	};
	
	var createNewQuote = function createNewQuote(quoteBox, randQuote) {
	  var that = this;
	  // Get keynames in an array, then map through them
	  quoteBox.innerHTML = '';
	  Object.keys(randQuote).map(function (key, index) {
	    // Append first 2 to the quoteBox, the rest go inside the source element
	    var target = index < 2 ? quoteBox : quoteBox.getElementsByClassName('source')[0];
	
	    target.innerHTML += makeElement.call(that, randQuote, key);
	  });
	  return quoteBox;
	};
	
	// Random integer generator
	var random = function random(min, max) {
	  var low = min < max ? min : max;
	  var high = max > min ? max : min;
	  return Math.floor(Math.random() * (high - low) + low);
	};
	
	// Sets a random color based on the color object
	var getRandomColor = function getRandomColor() {
	  return 'rgba(' + random(0, 256) + ', ' + random(0, 256) + ', ' + random(0, 256) + ', 1.0)';
	};
	
	var clearArray = function clearArray(array) {
	  array.length = 0; // Reset the list of used quotes if we've used them all
	};
	
	var useQuote = function useQuote(quoteObj, index) {
	  quoteObj.used.push(index); // Add it to the list of used quotes
	  return quoteObj.new[index]; // Return the quote
	};
	
	var hide = function hide(element) {
	  element.style.opacity = '0';
	};
	
	var show = function show(element) {
	  element.style.opacity = '1';
	};
	
	var changeBackgroundColor = function changeBackgroundColor(billboard) {
	  billboard.style.backgroundColor = getRandomColor();
	};
	
	// extend code snippet from http://youmightnotneedjquery.com/,
	// https://github.com/HubSpot/YouMightNotNeedjQuery
	
	var extend = function extend(out) {
	  out = out || {};
	
	  for (var i = 1; i < arguments.length; i++) {
	    var obj = arguments[i];
	
	    if (!obj) continue;
	
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        if (_typeof(obj[key]) === 'object') out[key] = extend(out[key], obj[key]);else out[key] = obj[key];
	      }
	    }
	  }
	
	  return out;
	};
	
	module.exports.random = random;
	module.exports.template = template;
	module.exports.getRandomColor = getRandomColor;
	module.exports.createTags = createTags;
	module.exports.makeElement = makeElement;
	module.exports.clearArray = clearArray;
	module.exports.useQuote = useQuote;
	module.exports.createQuotebox = createQuotebox;
	module.exports.hide = hide;
	module.exports.show = show;
	module.exports.createNewQuote = createNewQuote;
	module.exports.changeBackgroundColor = changeBackgroundColor;
	module.exports.extend = extend;

/***/ }

});
//# sourceMappingURL=app.map.js
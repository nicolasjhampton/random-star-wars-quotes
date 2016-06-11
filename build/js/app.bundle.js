webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	//import 'babel-polyfill';
	
	var _util = __webpack_require__(1);
	
	var util = _interopRequireWildcard(_util);
	
	var _template_engine = __webpack_require__(2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
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
	  this.config = util.extend({}, defaults, options);
	  this.tEng = new _template_engine.TemplateEngine(this.config.templates);
	  this.quotes = quoteArray;
	};
	
	Quoter.prototype.createQuotebox = function (classname, title) {
	  var quoteBox = document.createElement('div');
	  quoteBox.innerHTML = this.tEng.makeElement({ "title": title }, 'title');
	  quoteBox.className = classname;
	  return quoteBox;
	};
	
	Quoter.prototype.createNewQuote = function (randQuote) {
	  var _this = this;
	
	  var quoteBox = this.createQuotebox('quote-box', '');
	  Object.keys(randQuote).map(function (key, index) {
	    var target = index < 2 ? quoteBox : quoteBox.getElementsByClassName('source')[0];
	    target.innerHTML += _this.tEng.makeElement(randQuote, key);
	  });
	  return quoteBox;
	};
	
	// returns a random quote object from the quotes array
	Quoter.prototype.randomQuote = function randomQuote() {
	  randomQuote.used = randomQuote.used || []; //self-reference;
	
	  var randomIndex = util.random(0, this.quotes.length);
	
	  if (randomQuote.used.length === this.quotes.length) {
	    // If all the quotes have been used...
	    util.clearArray(randomQuote.used);
	  }
	
	  if (!randomQuote.used.includes(randomIndex)) {
	    randomQuote.used.push(randomIndex);
	    return this.quotes[randomIndex];
	  }
	
	  return this.randomQuote(); // Recursion like woah ;)
	};
	
	Quoter.prototype.printQuote = function () {
	  var that = this;
	  var randQuote = that.randomQuote(); // Get a random quote
	
	  util.hide(this.quoteBox);
	  var newQuoteBox = this.createNewQuote(randQuote);
	  this.billboard.replaceChild(newQuoteBox, this.quoteBox);
	  this.quoteBox = newQuoteBox;
	  util.changeBackgroundColor(this.billboard);
	  util.show(this.quoteBox);
	
	  this.resetTimer();
	};
	
	Quoter.prototype.resetTimer = function () {
	  var that = this;
	  if (this.duration) {
	    if (this.autoPlay) {
	      window.clearTimeout(that.autoPlay);
	    }
	    this.autoPlay = window.setTimeout(that.printQuote.bind(that), this.duration);
	  }
	};
	
	Quoter.prototype.attachTo = function (cssSelector) {
	  this.billboard = document.querySelector(cssSelector);
	  this.quoteBox = this.createQuotebox(this.config.quoteClass, this.config.title);
	  this.billboard.insertBefore(this.quoteBox, this.billboard.firstChild);
	  return this;
	};
	
	Quoter.prototype.setButton = function (cssSelector) {
	  var that = this;
	  var targetButton = document.querySelector(cssSelector);
	  targetButton.addEventListener('click', that.printQuote.bind(that));
	  return this;
	};
	
	Quoter.prototype.setAutoplay = function (duration) {
	  var that = this;
	  this.duration = duration;
	  window.setTimeout(that.printQuote.bind(that), duration);
	  return this;
	};
	
	module.exports.Quoter = Quoter;
	window.Quoter = Quoter;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	// Random integer generator
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
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
	
	var hide = function hide(element) {
	  element.style.opacity = '0';
	};
	
	var show = function show(element) {
	  element.style.opacity = '1';
	};
	
	var changeBackgroundColor = function changeBackgroundColor(billboard) {
	  billboard.style.backgroundColor = getRandomColor();
	};
	
	// extend code snippet modified from YouMightNotNeedjQuery
	// http://youmightnotneedjquery.com/,
	// https://github.com/HubSpot/YouMightNotNeedjQuery
	
	var extend = function extend(out) {
	  out = out || {};
	  [].concat(Array.prototype.slice.call(arguments)).slice(1).map(function (obj) {
	    if (!obj) {
	      return false;
	    }
	    Object.keys(obj).map(function (key) {
	      if (obj.hasOwnProperty(key)) {
	        out[key] = _typeof(obj[key]) === 'object' ? extend(out[key], obj[key]) : obj[key];
	      }
	    });
	  });
	  return out;
	};
	
	module.exports.random = random;
	module.exports.getRandomColor = getRandomColor;
	module.exports.clearArray = clearArray;
	module.exports.hide = hide;
	module.exports.show = show;
	module.exports.changeBackgroundColor = changeBackgroundColor;
	module.exports.extend = extend;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	var TemplateEngine = function TemplateEngine(templateObj) {
	
	  this.layoutFunc = function (key) {
	    return templateObj[key];
	  };
	  this.conditional = checkPlural;
	  this.condOne = plainFormat;
	  this.condTwo = stringSpaceFormat;
	};
	
	function checkPlural(key) {
	  return key.slice(-1) == 's';
	}
	
	var plainFormat = function plainFormat(content, key) {
	  return function () {
	    return content[key];
	  };
	};
	
	var stringSpaceFormat = function stringSpaceFormat(content, key, that) {
	  return function () {
	    return content[key].split(' ').reduce(function (start, next) {
	      return start + that.template(function () {
	        return next;
	      }, key.slice(0, -1));
	    }, '');
	  };
	};
	
	TemplateEngine.prototype.template = function (contentFunc, key) {
	  return '' + this.layoutFunc(key).begin + contentFunc() + this.layoutFunc(key).end;
	};
	
	TemplateEngine.prototype.makeContentFunc = function (content, key) {
	  var formatFunc = this.conditional(key) ? this.condTwo : this.condOne;
	  return formatFunc(content, key, this);
	};
	
	TemplateEngine.prototype.makeElement = function (content, key) {
	  var contentFunc = this.makeContentFunc(content, key);
	  return this.template(contentFunc, key);
	};
	
	module.exports.TemplateEngine = TemplateEngine;
	module.exports.checkPlural = checkPlural;
	module.exports.plainFormat = plainFormat;
	module.exports.stringSpaceFormat = stringSpaceFormat;

/***/ }
]);
//# sourceMappingURL=app.map.js
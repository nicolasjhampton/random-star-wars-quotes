webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	//import 'babel-polyfill';
	
	var _util = __webpack_require__(1);
	
	var util = _interopRequireWildcard(_util);
	
	var _template_engine = __webpack_require__(2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/**
	 * @constant {object}
	 * @namespace defaults
	 * @property {object}  templates              - The default values for each HTML template.
	 * @property {object}  templates.quote        - The default beginning and ending template strings for this element.
	 * @property {object}  templates.source       - The default beginning and ending template strings for this element.
	 * @property {object}  templates.citation     - The default beginning and ending template strings for this element.
	 * @property {object}  templates.year         - The default beginning and ending template strings for this element.
	 * @property {object}  templates.tags         - The default beginning and ending template strings for this element.
	 * @property {object}  templates.tag          - The default beginning and ending template strings for this element.
	 * @property {object}  templates.title        - The default beginning and ending template strings for this element.
	 * @property {object}  templates.quotebox     - The default beginning and ending template strings for this element.
	 * @property {string}  quoteClass             - The default class name for the quote box element.
	 * @property {string}  title                  - The default start title of the quote display.
	 */
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
	
	/**
	 * @summary Creates an object to control the display of a list of quotes
	 * @constructor
	 * @requires module:util
	 * @requires module:template_engine/TemplateEngine
	 * @param {array} quoteArray - The array of quote object to be displayed.
	 * @param {object} options - A configuration object to be optionally passed in.
	 */
	function Quoter(quoteArray, options) {
	  if (!options) {
	    options = {};
	  }
	  this.config = util.extend({}, defaults, options);
	  this.tEng = new _template_engine.TemplateEngine(this.config.templates);
	  this.quotes = quoteArray;
	};
	
	/**
	 * @summary Creates an quoteBox object set to the starting title
	 * @memberof Quoter
	 * @param {string} title - Title text to fill in the title element.
	 *                         Use an empty string if no title is desired.
	 * @returns {HTMLCollection} quoteBox - an element representing
	 *                                              the box the quote will reside in.
	 */
	Quoter.prototype.createQuotebox = function (title) {
	  var quoteBox = document.createElement('div');
	  quoteBox.innerHTML = this.tEng.makeElement({ "title": title }, 'title');
	  quoteBox.className = this.config.quoteClass;
	  return quoteBox;
	};
	
	/**
	 * @summary Creates a quoteBox and attaches a quote to it
	 * @memberof Quoter
	 * @param {object} quote - athe quote object to attach to the quoteBox.
	 * @returns {HTMLCollection} quoteBox - newly created quotebox with a new quote attached.
	 *
	 */
	Quoter.prototype.createNewQuote = function (quote) {
	  var _this = this;
	
	  var quoteBox = this.createQuotebox('');
	  Object.keys(quote).map(function (key, index) {
	    var target = index < 2 ? quoteBox : quoteBox.getElementsByClassName('source')[0];
	    target.innerHTML += _this.tEng.makeElement(quote, key);
	  });
	  return quoteBox;
	};
	
	/**
	 * @summary Gets a random quote from the quoteArray
	 * @memberof Quoter
	 * @returns {object} quote - an object with at least two @prop: quote and source.
	 *
	 */
	Quoter.prototype.randomQuote = function randomQuote() {
	  randomQuote.used = randomQuote.used || [];
	
	  var randomIndex = util.random(0, this.quotes.length);
	
	  if (randomQuote.used.length === this.quotes.length) {
	    randomQuote.used = [];
	  }
	
	  if (!randomQuote.used.includes(randomIndex)) {
	    randomQuote.used.push(randomIndex);
	    return this.quotes[randomIndex];
	  }
	
	  return this.randomQuote(); // Recursion like woah ;)
	};
	
	/**
	 * @summary Displays a new random quote onto the quoteBox
	 * @memberof Quoter
	 *
	 */
	Quoter.prototype.printQuote = function () {
	  var that = this;
	  var randQuote = that.randomQuote();
	
	  util.hide(this.quoteBox);
	  var newQuoteBox = this.createNewQuote(randQuote);
	  this.billboard.replaceChild(newQuoteBox, this.quoteBox);
	  this.quoteBox = newQuoteBox;
	  util.changeBackgroundColor(this.billboard);
	  util.show(this.quoteBox);
	
	  this.resetTimer();
	};
	
	/**
	 * @summary Resets the autoplay timer on the Quoter object.
	 * @memberof Quoter
	 *
	 */
	Quoter.prototype.resetTimer = function () {
	  var that = this;
	  if (this.duration) {
	    if (this.autoPlay) {
	      window.clearTimeout(that.autoPlay);
	    }
	    this.autoPlay = window.setTimeout(that.printQuote.bind(that), this.duration);
	  }
	};
	
	/**
	 * @summary Configuration method for what element the quotebox attaches to.
	 * @memberof Quoter
	 * @param {string} cssSelector - css selector for the background of the quotebox
	 * @returns {object} Quoter object
	 *
	 */
	Quoter.prototype.attachTo = function (cssSelector) {
	  this.billboard = document.querySelector(cssSelector);
	  this.quoteBox = this.createQuotebox(this.config.title);
	  this.billboard.insertBefore(this.quoteBox, this.billboard.firstChild);
	  return this;
	};
	
	/**
	 * @summary Configuration method to set a button to change the quote.
	 * @memberof Quoter
	 * @param {string} cssSelector - css selector for the quote change button
	 * @returns {object} Quoter object
	 *
	 */
	Quoter.prototype.setButton = function (cssSelector) {
	  var that = this;
	  var targetButton = document.querySelector(cssSelector);
	  targetButton.addEventListener('click', that.printQuote.bind(that));
	  return this;
	};
	
	/**
	 * @summary Resets the autoplay timer on the Quoter object.
	 * @memberof Quoter
	 * @param {number} duration - amount of time between quote changes in milliseconds
	 * @returns {object} Quoter object
	 *
	 */
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
	
	var hide = function hide(element) {
	  element.style.opacity = '0';
	};
	
	var show = function show(element) {
	  element.style.opacity = '1';
	};
	
	var changeBackgroundColor = function changeBackgroundColor(element) {
	  element.style.backgroundColor = getRandomColor();
	};
	
	var extend = function extend() /* arguments */{
	  var argsIn = [].concat(Array.prototype.slice.call(arguments)).slice(0);
	  var out = argsIn.reduce(function (obj1, obj2) {
	    for (var key in obj2) {
	      obj1[key] = _typeof(obj2[key]) === 'object' && !Array.isArray(obj2[key]) ? extend(obj2[key]) : obj2[key];
	    }
	    return obj1;
	  }, {});
	  return out;
	};
	
	module.exports.random = random;
	module.exports.getRandomColor = getRandomColor;
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
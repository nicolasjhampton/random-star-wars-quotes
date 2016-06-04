webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	var _jquery = __webpack_require__(299);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _util = __webpack_require__(300);

	var util = _interopRequireWildcard(_util);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var random = util.random,
	    template = util.template,
	    getRandomColor = util.getRandomColor,
	    createTags = util.createTags,
	    makeElement = util.makeElement,
	    clearArray = util.clearArray,
	    useQuote = util.useQuote,
	    createQuotebox = util.createQuotebox,
	    hideOldQuote = util.hideOldQuote,
	    showNewQuote = util.showNewQuote,
	    createNewQuote = util.createNewQuote,
	    changeBackgroundColor = util.changeBackgroundColor;

	var defaults = {
	  "templates": {
	    "quote": { "begin": "<p class='quote'>", "end": "</p>" },
	    "source": { "begin": "<p class='source'>", "end": "</p>" },
	    "citation": { "begin": "<span class='citation'>", "end": "</span>" },
	    "year": { "begin": "<span class='year'>", "end": "</span>" },
	    "tags": { "begin": "<span class='tags'>Tags: ", "end": "</span>" },
	    "tag": { "begin": "<p class='tag'>", "end": "</p>" }
	  },
	  "quoteClass": "quote-box",
	  "title": ""
	};

	function Quoter(quoteArray, options) {
	  if (!options) {
	    options = {};
	  }
	  this.config = _jquery2.default.extend({}, defaults, options);
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

	  hideOldQuote(this.quoteBox);
	  createNewQuote(this.config.templates, this.quoteBox, randQuote);
	  changeBackgroundColor(this.billboard);
	  showNewQuote(this.quoteBox);

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
	  this.billboard = (0, _jquery2.default)(cssSelector);
	  this.billboard.prepend(createQuotebox(this.config.quoteClass, this.config.title));
	  this.quoteBox = (0, _jquery2.default)(cssSelector + ' .' + this.config.quoteClass); // Cache quoteBox
	  return this;
	};

	Quoter.prototype.setButton = function (cssSelector) {
	  var that = this;
	  (0, _jquery2.default)(cssSelector).click(that.printQuote.bind(that));
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

/***/ 300:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(299);

	// Helper function for inserting content into template
	var template = function template(templateObj, key, content) {
	  return '' + templateObj[key].begin + content + templateObj[key].end;
	};

	// Handles each sub-tag template
	var createTags = function createTags(templateObj, tagString) {
	  return tagString.split(' ').map(function (tag) {
	    return template(templateObj, 'tag', tag);
	  }).join('');
	};

	// assembles the html string for each element from the template array
	var makeElement = function makeElement(templateObj, obj, key) {
	  var content = key === 'tags' ? createTags(templateObj, obj[key]) : obj[key];
	  return template(templateObj, key, content);
	};

	var createNewQuote = function createNewQuote(templateObj, quoteBox, randQuote) {
	  // Get keynames in an array, then map through them
	  Object.keys(randQuote).map(function (key, index) {
	    // Append first 2 to the quoteBox, the rest go inside the source element
	    var target = index < 2 ? quoteBox : quoteBox.children('.source');
	    target.append(makeElement(templateObj, randQuote, key));
	  });
	  return quoteBox;
	};

	// Random integer generator
	var random = function random(min, max) {
	  return Math.floor(Math.random() * (max - min) + min);
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

	var createQuotebox = function createQuotebox(classname, title) {
	  var title = $('<p class="title">' + title + '</p>');
	  var quote = $('<div class="' + classname + '"></div>');
	  return quote.append(title);
	};

	var hideOldQuote = function hideOldQuote(quoteBox) {
	  quoteBox.hide(); //  Hide the quoteBox
	  quoteBox.children().remove(); // clear the quoteBox
	};

	var showNewQuote = function showNewQuote(quoteBox) {
	  quoteBox.fadeIn('slow'); // fade in quoteBox
	};

	var changeBackgroundColor = function changeBackgroundColor(billboard) {
	  billboard.css('background-color', getRandomColor());
	};

	module.exports.random = random;
	module.exports.template = template;
	module.exports.getRandomColor = getRandomColor;
	module.exports.createTags = createTags;
	module.exports.makeElement = makeElement;
	module.exports.clearArray = clearArray;
	module.exports.useQuote = useQuote;
	module.exports.createQuotebox = createQuotebox;
	module.exports.hideOldQuote = hideOldQuote;
	module.exports.showNewQuote = showNewQuote;
	module.exports.createNewQuote = createNewQuote;
	module.exports.changeBackgroundColor = changeBackgroundColor;

/***/ }

});
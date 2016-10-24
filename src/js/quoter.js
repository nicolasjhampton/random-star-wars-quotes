'use strict';

//import 'babel-polyfill';
import * as util from './util';
import {TemplateEngine} from './template_engine';

/**
 * @constant {Object}
 * @namespace defaults
 * @property {Object}  templates              - The default values for each HTML template.
 * @property {Object}  templates.quote        - The default beginning and ending template strings for this element.
 * @property {Object}  templates.source       - The default beginning and ending template strings for this element.
 * @property {Object}  templates.citation     - The default beginning and ending template strings for this element.
 * @property {Object}  templates.year         - The default beginning and ending template strings for this element.
 * @property {Object}  templates.tags         - The default beginning and ending template strings for this element.
 * @property {Object}  templates.tag          - The default beginning and ending template strings for this element.
 * @property {Object}  templates.title        - The default beginning and ending template strings for this element.
 * @property {Object}  templates.quotebox     - The default beginning and ending template strings for this element.
 * @property {String}  quoteClass             - The default class name for the quote box element.
 * @property {String}  title                  - The default start title of the quote display.
 */
const defaults = {
  "templates": {
    "quote": { "begin": "<p class='quote'>", "end": "</p>" },
    "source": { "begin": "<p class='source'>", "end": "</p>" },
    "citation": { "begin": "<span class='citation'>", "end": "</span>" },
    "year": { "begin": "<span class='year'>", "end": "</span>" },
    "tags": { "begin": "<span class='tags'>Tags: ", "end": "</span>" },
    "tag": { "begin": "<p class='tag'>", "end": "</p>" },
    "title": {"begin": "<p class='title'>", "end": "</p>" },
    "quotebox": {"begin": "<div class='", "end": "'></div>" }
  },
  "quoteClass": "quote-box",
  "title": ""
};

/**
 * Creates an object to control the display of a list of quotes
 * @constructor
 * @requires module:util
 * @requires module:template_engine/TemplateEngine
 *
 * @param {Array} quoteArray - The array of quote object to be displayed.
 * @param {Object} options - A configuration object to be optionally passed in.
 */
function Quoter(quoteArray, options) {
  if(!options) { options = {}; }
  this.config = util.extend({}, defaults, options);
  this.tEng = new TemplateEngine(this.config.templates);
  this.quotes = quoteArray;
};

/**
 * Creates an quoteBox object set to the starting title
 * @memberof Quoter
 *
 * @param {String} title - Title text to fill in the title element.
 *                         Use an empty string if no title is desired.
 * @returns {HTMLCollection} quoteBox - an element representing
 *                                      the box the quote will reside in.
 */
Quoter.prototype.createQuotebox = function(title) {
  var quoteBox = document.createElement('div');
  quoteBox.innerHTML = this.tEng.makeElement({"title": title}, 'title');
  quoteBox.className = this.config.quoteClass;
  return quoteBox;
};

/**
 * Creates a quoteBox and attaches a quote to it
 * @memberof Quoter
 *
 * @param {Object} quote - athe quote object to attach to the quoteBox.
 * @returns {HTMLCollection} quoteBox - newly created quotebox with a new quote attached.
 *
 */
Quoter.prototype.createNewQuote = function(quote) {
  var quoteBox = this.createQuotebox('');
  Object.keys(quote).map((key, index) => {
    var target = index < 2 ? quoteBox : quoteBox.getElementsByClassName('source')[0];
    target.innerHTML += this.tEng.makeElement(quote, key);
  });
  return quoteBox;
};

/**
 * Gets a random quote from the quoteArray
 * @memberof Quoter
 *
 * @returns {Object} quote - an object with at least two @prop: quote and source.
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
 * Displays a new random quote onto the quoteBox
 * @memberof Quoter
 *
 */
Quoter.prototype.printQuote = function() {
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
 * Resets the autoplay timer on the Quoter object.
 * @memberof Quoter
 *
 */
Quoter.prototype.resetTimer = function() {
  var that = this;
  if(this.duration) {
    if(this.autoPlay) {window.clearTimeout(that.autoPlay);}
    this.autoPlay = window.setTimeout(that.printQuote.bind(that), this.duration);
  }
};

/**
 * Configuration method for what element the quotebox attaches to.
 * @memberof Quoter
 *
 * @param {String} cssSelector - css selector for the background of the quotebox
 * @returns {this} Quoter
 */
Quoter.prototype.attachTo = function(cssSelector) {
  this.billboard = document.querySelector(cssSelector);
  this.quoteBox = this.createQuotebox(this.config.title);
  this.billboard.insertBefore(this.quoteBox, this.billboard.firstChild);
  return this;
};

/**
 * Configuration method to set a button to change the quote.
 * @memberof Quoter
 *
 * @param {String} cssSelector - css selector for the quote change button
 * @returns {this} Quoter
 */
Quoter.prototype.setButton = function(cssSelector) {
  var that = this;
  var targetButton = document.querySelector(cssSelector);
  targetButton.addEventListener('click', that.printQuote.bind(that));
  return this;
};

/**
 * Resets the autoplay timer on the Quoter object.
 * @memberof Quoter
 *
 * @param {Number} duration - amount of time between quote changes in milliseconds
 * @returns {this} Quoter
 */
Quoter.prototype.setAutoplay = function(duration) {
  var that = this;
  this.duration = duration;
  window.setTimeout(that.printQuote.bind(that), duration);
  return this;
};

module.exports.Quoter = Quoter;
window.Quoter = Quoter;

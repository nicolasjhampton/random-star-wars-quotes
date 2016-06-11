'use strict';

//import 'babel-polyfill';
import * as util from './util';
import {TemplateEngine} from './template_engine';

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

function Quoter(quoteArray, options) {
  if(!options) { options = {}; }
  this.config = util.extend({}, defaults, options);
  this.tEng = new TemplateEngine(this.config.templates);
  this.quotes = quoteArray;
};

Quoter.prototype.createQuotebox = function(classname, title) {
  var quoteBox = document.createElement('div');
  quoteBox.innerHTML = this.tEng.makeElement({"title": title}, 'title');
  quoteBox.className = classname;
  return quoteBox;
};

Quoter.prototype.createNewQuote = function(randQuote) {
  var quoteBox = this.createQuotebox('quote-box', '');
  Object.keys(randQuote).map((key, index) => {
    var target = index < 2 ? quoteBox : quoteBox.getElementsByClassName('source')[0];
    target.innerHTML += this.tEng.makeElement(randQuote, key);
  });
  return quoteBox;
};

// returns a random quote object from the quotes array
Quoter.prototype.randomQuote = function randomQuote() {
  randomQuote.used = randomQuote.used || []; //self-reference;

  var randomIndex = util.random(0, this.quotes.length);

  if (randomQuote.used.length === this.quotes.length) { // If all the quotes have been used...
    util.clearArray(randomQuote.used);
  }

  if (!randomQuote.used.includes(randomIndex)) {
    randomQuote.used.push(randomIndex);
    return this.quotes[randomIndex];
  }

  return this.randomQuote(); // Recursion like woah ;)

};

Quoter.prototype.printQuote = function() {
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

Quoter.prototype.resetTimer = function() {
  var that = this;
  if(this.duration) {
    if(this.autoPlay) {window.clearTimeout(that.autoPlay);}
    this.autoPlay = window.setTimeout(that.printQuote.bind(that), this.duration);
  }
};

Quoter.prototype.attachTo = function(cssSelector) {
  this.billboard = document.querySelector(cssSelector);
  this.quoteBox = this.createQuotebox(this.config.quoteClass, this.config.title);
  this.billboard.insertBefore(this.quoteBox, this.billboard.firstChild);
  return this;
};

Quoter.prototype.setButton = function(cssSelector) {
  var that = this;
  var targetButton = document.querySelector(cssSelector);
  targetButton.addEventListener('click', that.printQuote.bind(that));
  return this;
};

Quoter.prototype.setAutoplay = function(duration) {
  var that = this;
  this.duration = duration;
  window.setTimeout(that.printQuote.bind(that), duration);
  return this;
};

module.exports.Quoter = Quoter;
window.Quoter = Quoter;

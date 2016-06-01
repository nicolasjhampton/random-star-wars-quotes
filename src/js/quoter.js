'use strict';

import 'babel-polyfill';
import $ from 'jquery';
import * as util from './util';

const random = util.random,
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

const defaults = {
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
  this.quotes = {
    "new": quoteArray,
    "used": []
  };

  if(!options) { options = {}; }
  this.config = $.extend({}, defaults, options);

};

// returns a random quote object from the quotes array
Quoter.prototype.randomQuote = function() {
  var randomIndex = random(0, this.quotes.new.length);

  if (this.quotes.used.length === this.quotes.new.length) { // If all the quotes have been used...
    clearArray(this.quotes.used);
  }

  if (!this.quotes.used.includes(randomIndex)) { // If we haven't used this quote before...
    return useQuote(this.quotes, randomIndex);
  }

  return this.randomQuote(); // Recursion like woah ;)

};

Quoter.prototype.printQuote = function() {
  var that = this;
  var randQuote = this.randomQuote(); // Get a random quote

  hideOldQuote(this.quoteBox);
  createNewQuote(this.config.templates, this.quoteBox, randQuote);
  changeBackgroundColor(this.billboard);
  showNewQuote(this.quoteBox);

  this.resetTimer();
};

Quoter.prototype.resetTimer = function() {
  var that = this;
  if(that.duration) {
    if(that.autoPlay) {window.clearTimeout(that.autoPlay);}
    that.autoPlay = window.setTimeout(that.printQuote.bind(that), that.duration);
  }
};

Quoter.prototype.attachTo = function(cssSelector) {
  this.billboard = $(cssSelector);
  this.billboard.prepend(createQuotebox(this.config.quoteClass, this.config.title));
  this.quoteBox = $(`${cssSelector} .${this.config.quoteClass}`); // Cache quoteBox
  return this;
};

Quoter.prototype.setButton = function(cssSelector) {
  var that = this;
  $(cssSelector).click(that.printQuote.bind(that));
  return that;
};

Quoter.prototype.setAutoplay = function(duration) {
  var that = this;
  this.duration = duration;
  window.setTimeout(that.printQuote.bind(that), duration);
  return that;
};

window.Quoter = Quoter;

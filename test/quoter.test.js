'use strict';

import {expect} from 'chai';
import $ from 'jquery';
import * as util from '../src/js/util.js';

describe('utilities', function() {

  var templateObj = {
    "quote": { "begin": "<p class='quote'>", "end": "</p>" },
    "source": { "begin": "<p class='source'>", "end": "</p>" },
    "citation": { "begin": "<span class='citation'>", "end": "</span>" },
    "year": { "begin": "<span class='year'>", "end": "</span>" },
    "tags": { "begin": "<span class='tags'>Tags: ", "end": "</span>" },
    "tag": { "begin": "<p class='tag'>", "end": "</p>" },
    "title": {"begin": "<p class='title'>", "end": "</p>" },
    "quotebox": {"begin": "<div class='", "end": "'></div>" }
  };

  describe('template', function() {

    var testString;

    before(function() {
      var key = "quote";
      var content = "This is a quote.";
      testString = util.template(templateObj, key, content);
    });

    it('returns a complete HTML snippet', function() {
      expect(testString).to.match(/^<([\w]+)[\s\w\=\']*>.+<\/\1>$/i);
    });

    it('returns the content string inserted into template', function() {
      expect(testString).to.match(/>(tag:\s)?this is a quote.</i);
    });

  });

  describe('createTags', function() {

    var tagString;

    before(function() {
      tagString = "humor science philosophy";
    });

    it('returns a collection of tag elements', function() {
      var tagsString = util.createTags(templateObj, tagString);
      expect(tagsString).to.match(/^(<p class='tag'>[\w]+<\/p>)+$/i);
    });
  });

  describe('makeElement', function() {

    var obj;

    before(function() {
      obj = {
        "quote": "Of course I love him. He's my brother.",
        "tags": "humor art philosophy"
      };
    });

    it('should create a standard element', function() {
      var elementString = util.makeElement(templateObj, obj, "quote");
      expect(elementString).to.match(/^<([\w]+)[\s\w\=\']*>.+<\/\1>$/i);
    });
    it('should create a tags element when appropriate', function() {
      var elementString = util.makeElement(templateObj, obj, "tags");
      expect(elementString).to.match(/<span class='tags'>Tags:\s(<p class='tag'>[\w]+<\/p>)+<\/span>/i);
    });
  });

  describe('createQuotebox', function() {

    var title;
    var classname;

    before(function() {
      title = 'Star Wars Quotes';
      classname = 'quote-box';
    });

    it('should return a quotebox element', function() {
      var elementText = `<div class="${classname}"><p class="title">${title}</p></div>`;
      var quotebox = util.createQuotebox(templateObj, classname, title);
      expect(quotebox.outerHTML).to.equal(elementText);
    });

  });

  describe('createNewQuote', function() {

    var quoteBox;
    var randQuote;

    before(function() {
      quoteBox = util.createQuotebox(templateObj, 'quote-box', 'Star Wars Quotes');
      randQuote = {
        "quote": "Of course I love him. He's my brother.",
        "source": "Princess Leia",
        "citation": "Return of the Jedi",
        "year": 1984,
        "tags": "humor art"
      };
    });

    it('should return an HTML element that matches the expected format', function() {
      var expectedElement = '<div class="quote-box"><p class="quote">Of course I love him. He\'s my brother.</p><p class="source">Princess Leia<span class="citation">Return of the Jedi</span><span class="year">1984</span><span class="tags">Tags: <p class="tag">humor</p><p class="tag">art</p></span></p></div>';
      var elementProduced = util.createNewQuote(templateObj, quoteBox, randQuote);
      expect(elementProduced.outerHTML).to.equal(expectedElement);
    });

    //it('');

  });


  describe('random', function() {

    var num1;
    var num2;

    before(function() {
      num1 = util.random(20, 24);
      num2 = util.random(30, 24);
    });

    it('should return an integer', function() {
      expect(num1 % 1).to.equal(0);
      expect(num2 % 1).to.equal(0);
    });

    it('should be within expected range', function() {
      expect(num1).to.be.within(20,24);
      expect(num2).to.be.within(24,30);
    });
  });

  describe('getRandomColor', function() {
    it('');
    it('');
  });
  describe('clearArray', function() {
    it('');
    it('');
  });
  describe('useQuote', function() {
    it('');
    it('');
  });

  describe('hideOldQuote', function() {
    it('');
    it('');
  });
  describe('showNewQuote', function() {
    it('');
    it('');
  });
  describe('changeBackgroundColor', function() {
    it('');
    it('');
  });
});

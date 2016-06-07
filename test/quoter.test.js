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
      testString = util.template.call(templateObj, key, content);
    });

    it('should be a method on the template object');

    it('should use *this* and .call() to pull in the templateObj context');

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

    it('should be a method on the template object');

    it('returns a collection of tag elements', function() {
      var tagsString = util.createTags.call(templateObj, tagString);
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

    it('should be a method on the template object');

    it('should create a standard element', function() {
      var elementString = util.makeElement.call(templateObj, obj, "quote");
      expect(elementString).to.match(/^<([\w]+)[\s\w\=\']*>.+<\/\1>$/i);
    });

    it('should create a tags element when appropriate', function() {
      var elementString = util.makeElement.call(templateObj, obj, "tags");
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

    it('should be a method on the template object');

    it('should return a quotebox element', function() {
      var elementText = `<div class="${classname}"><p class="title">${title}</p></div>`;
      var quotebox = util.createQuotebox.call(templateObj, classname, title);
      expect(quotebox.outerHTML).to.equal(elementText);
    });

  });

  describe('createNewQuote', function() {

    var quoteBox;
    var randQuote;

    before(function() {
      quoteBox = util.createQuotebox.call(templateObj, 'quote-box', 'Star Wars Quotes');
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
      var elementProduced = util.createNewQuote.call(templateObj, quoteBox, randQuote);
      expect(elementProduced.outerHTML).to.equal(expectedElement);
    });

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

    it('returns a rbga formatted string', function() {
      var string = util.getRandomColor();
      expect(string).to.match(/^rgba\([0-2]?[0-9]?[0-9]?,\s[0-2]?[0-9]?[0-9]?,\s[0-2]?[0-9]?[0-9]?, 1\.0\)/);
    });
  });

  describe('clearArray', function() {

    var arr;

    before(function() {
      arr = [1,2,3,4,5];
    });

    it('should be a method on a quotes object');

    it('should clear the array its called on', function() {
      util.clearArray(arr);
      expect(arr).to.be.empty;
    });

  });
  describe('useQuote', function() {

    var quotesObject;

    beforeEach(function() {
      quotesObject = {
        "new":[
                {
                  "quote": "You've failed. I am a Jedi, like my father before me.",
                  "source": "Luke Skywalker",
                  "citation": "Return of the Jedi",
                  "year": 1984
                },
                {
                  "quote": "Luke, I am your father.",
                  "source": "Darth Vader",
                  "citation": "The Empire Strikes Back",
                  "tags": "humor science"
                },
                {
                  "quote": "Of course I love him. He's my brother.",
                  "source": "Princess Leia",
                  "citation": "Return of the Jedi",
                  "year": 1984,
                  "tags": "humor art"
                }
              ],
        "used": []
      };
    });

    it('should be a method on a quotesArray object');

    it('should return a quote object at x position', function() {
      var quote = util.useQuote(quotesObject, 1);
      expect(quote).to.deep.equal(quotesObject.new[1]);
    });

    it('should record the use of a quote', function() {
      var quoteIndex = 3;
      var quote = util.useQuote(quotesObject, 3);
      expect(quotesObject.used[0]).to.equal(3);
      expect(quotesObject.used.length).to.equal(1);
    });

  });

  describe('hide', function() {

    var element;

    before(function() {
      element = document.createElement('div');
      document.body.appendChild(element);
    });

    it('should change the opacity of the element to 0', function() {
      util.hide(element);
      var opacity = window.getComputedStyle(element).getPropertyValue("opacity");
      expect(opacity).to.equal('0');
    });

  });

  describe('show', function() {

    var element;

    before(function() {
      element = document.createElement('div');
      document.body.appendChild(element);
    });

    it('should change the opacity of the element to 1', function() {
      util.show(element);
      var opacity = window.getComputedStyle(element).getPropertyValue("opacity");
      expect(opacity).to.equal('1');
    });

  });

  describe('changeBackgroundColor', function() {

    // var changeBackgroundColor = function(billboard) {
    //   billboard.css('background-color', getRandomColor());
    // };

    var element;
    var startColor;

    before(function() {
      element = document.createElement('div');
      document.body.appendChild(element);
      startColor = window.getComputedStyle(element).getPropertyValue("background-color");
    });

    it('should change the original background color', function() {
      util.changeBackgroundColor(element);
      var color = window.getComputedStyle(element).getPropertyValue("background-color");
      expect(color).to.not.equal(startColor);
    });

  });

});

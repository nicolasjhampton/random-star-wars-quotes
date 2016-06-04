'use strict';

import {expect} from 'chai';
import $ from 'jquery';
import * as util from '../src/js/util.js';

describe('utilities', function() {

  describe('template', function() {

    var testString;

    before(function() {
      var templateObj = {"quote": { "begin": "<p class='quote'>", "end": "</p>" }};
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

    var tagsString;

    before(function() {
      var templateObj = {"tag": { "begin": "<p class='tag'>", "end": "</p>" }};
      var tagString = "humor science philosophy";
      tagsString = util.createTags(templateObj, tagString);
    });

    it('returns a collection of tag elements', function() {
      expect(tagsString).to.match(/^(<p class='tag'>[\w]+<\/p>)+$/i);
    });
  });

  describe('makeElement', function() {

    var templateObj;
    var obj;

    before(function() {
      templateObj = {
        "quote": { "begin": "<p class='quote'>", "end": "</p>" },
        "tags": { "begin": "<span class='tags'>Tags: ", "end": "</span>" },
        "tag": { "begin": "<p class='tag'>", "end": "</p>" }
      };
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
    // var createQuotebox = function(classname, title) {
    //   var title = $(`<p class="title">${title}</p>`);
    //   var quote = $(`<div class="${classname}"></div>`);
    //   return quote.append(title);
    // };
    var title;
    var classname;

    before(function() {
      title = 'Star Wars Quotes';
      classname = 'quote-box';
    });

    it('should return a jquery element', function() {
      var quotebox = util.createQuotebox(classname, title);
      expect($(quotebox)).to.have.ownProperty('selector');
    });

    it('');
    it('');
  });

  // describe('createNewQuote', function() {
  //   // var createNewQuote = function(templateObj, quoteBox, randQuote) {
  //   //   // Get keynames in an array, then map through them
  //   //   Object.keys(randQuote).map(function(key, index) {
  //   //     // Append first 2 to the quoteBox, the rest go inside the source element
  //   //     var target = index < 2 ? quoteBox : quoteBox.children('.source');
  //   //     target.append(makeElement(templateObj, randQuote, key));
  //   //   });
  //   //   return quoteBox;
  //   // };
  //   var templateObj;
  //   var quoteBox;
  //
  //   before(function() {
  //     templateObj = {
  //       "quote": { "begin": "<p class='quote'>", "end": "</p>" },
  //       "source": { "begin": "<p class='source'>", "end": "</p>" },
  //       "citation": { "begin": "<span class='citation'>", "end": "</span>" },
  //       "year": { "begin": "<span class='year'>", "end": "</span>" },
  //       "tags": { "begin": "<span class='tags'>Tags: ", "end": "</span>" },
  //       "tag": { "begin": "<p class='tag'>", "end": "</p>" }
  //     };
  //     quoteBox =
  //   });
  //
  //   it('should return a DOM element', function() {
  //
  //   });
  //
  //   it('');
  //
  // });
  describe('random', function() {
    it('');
    it('');
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

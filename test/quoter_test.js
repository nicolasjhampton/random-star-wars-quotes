'use strict';

import {expect} from 'chai';
import * as util from '../src/js/util.js';

describe('utilities', function() {

  describe('template', function() {
    // Helper function for inserting content into template
    // var template = function(templateObj, key, content) {
    //   return `${templateObj[key].begin}${content}${templateObj[key].end}`;
    // };
    var templateObj = {"quote": { "begin": "<p class='quote'>", "end": "</p>" }};
    var key = "quote";
    var content = "This is a quote.";

    it('returns a complete HTML snippet', function() {
      var testString = util.template(templateObj, key, content);
      expect(testString).to.match(/^<([\w]+)[\s\w\=\']*>.+<\/\1>$/i);
    });

    it('returns the content string inside the HTML body', function() {
      var testString = util.template(templateObj, key, content);
      expect(testString).to.match(/>(tag:\s)?this is a quote.</i);
    });

  });
  describe('createTags', function() {
    it('');
    it('');
  });
  describe('makeElement', function() {
    it('');
    it('');
  });
  describe('createNewQuote', function() {
    it('');
    it('');
  });
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
  describe('createQuotebox', function() {
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

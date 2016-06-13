'use strict';

import {expect} from 'chai';
import * as util from '../src/js/util';
import {TemplateEngine, stringSpaceFormat, plainFormat, checkPlural} from '../src/js/template_engine';
import {Quoter} from '../src/js/quoter';

describe('Template Engine', function() {

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

  var tEng;

  before(function() {
    tEng = new TemplateEngine(templateObj);
  });

  describe('TemplateEngine.template', function() {

    var key;
    var content;

    before(function() {
      key = "quote";
      content = "This is a quote.";
    });

    it('returns a complete HTML snippet', function() {
      var testString = tEng.template(() => content, key);
      expect(testString).to.match(/^<([\w]+)[\s\w\=\']*>.+<\/\1>$/i);
    });

    it('returns the content string inserted into template', function() {
      var testString = tEng.template(() => content, key);
      expect(testString).to.match(/>(tag:\s)?this is a quote.</i);
    });

  });

  describe('TemplateEngine.makeContentFunc', function() {

    var content;
    var key;

    before(function() {
      content = {"title": "Star Wars Quotes"};
      key = "title";
    });

    after(function() {
      tEng.conditional = checkPlural;
    });

    it('returns the first formatter on the template object', function() {
      tEng.conditional = () => false;
      var formatter = tEng.makeContentFunc(content, 'title');
      expect(formatter.toString()).to.equal(tEng.condOne().toString());
    });

    it('returns the second formatter on the template object', function() {
      tEng.conditional = () => true;
      var formatter = tEng.makeContentFunc(content, 'title');
      expect(formatter.toString()).to.equal(tEng.condTwo().toString());
    });

  });

  describe('TemplateEngine.makeElement', function() {

    var obj;
    var layoutFunc;

    before(function() {
      obj = {
        "quote": "Of course I love him. He's my brother.",
        "tags": "humor art philosophy"
      };
    });

    it('should create a standard element', function() {
      var elementString = tEng.makeElement(obj, "quote");
      expect(elementString).to.match(/^<([\w]+)[\s\w\=\']*>.+<\/\1>$/i);
    });

    it('should create a tags element when appropriate', function() {
      var elementString = tEng.makeElement(obj, "tags");
      expect(elementString).to.match(/<span class='tags'>Tags:\s(<p class='tag'>[\w]+<\/p>)+<\/span>/i);
    });

  });

  describe('checkPlural', function() {

    it("should return false for keys that don't end in 's'", function() {
      expect(checkPlural('quote')).to.be.false;
    });

    it("should return true for keys that end in 's'", function() {
      expect(checkPlural('quotes')).to.be.true;
    });

  });

  describe('plainFormat', function() {

    var content;

    before(function() {
      content = {"title": "Star Wars Quotes"};
    });

    it('returns a function that returns the value of an objects key', function() {
      var formatter = plainFormat(content, 'title', tEng);
      expect(formatter()).to.match(/^Star Wars Quotes$/i);
    });

  });

  describe('stringSpaceFormat', function() {

    var content;

    before(function() {
      content = {"tags": "humor science philosophy"};
    });

    it('returns a function that returns a collection of tag elements', function() {
      var formatter = stringSpaceFormat(content, 'tags', tEng);
      expect(formatter()).to.match(/^(<p class='tag'>[\w]+<\/p>)+$/i);
    });

  });

});

describe('utilities', function() {

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

  describe('extend', function() {

    var objectOne;
    var objectTwo;
    var objectThree;
    var objectFour;
    var objectFive;
    var objectSix;
    var objectSeven;
    var objectEight;
    var objectNine;

    before(function() {
      objectOne = {"first_property": "value"};
      objectTwo = {"first_property": "something"};
      objectThree = {"second_property": "whatever"};
      objectFour = {"first_property": "something", "second_property": "whatever"};
      objectFive = {"first_property": "something",
       "second_property": {
         "inner_one": "whatever",
         "inner_two": "something else"}
      };
      objectSix = {
        "second_property": {
          "inner_one": "whatever",
          "inner_two": {
            "1": [2, 3],
            "2": {"nums": [93, 6, 2],
                  "sides": {
                            "directions": {"right":"left"},
                            "dimentions": {"fourth": 4, "fifth": 5}
                          }
                  }
          }
        }
      };
      objectSeven = {
        "first_property": "something",
        "second_property": {
          "inner_one": "whatever",
          "inner_two": {
            "1": [2, 3],
            "2": {"nums": [93, 6, 2],
                  "sides": {
                            "directions": {"right":"left"},
                            "dimentions": {"fourth": 4, "fifth": 5}
                          }
                  }
          }
        }
      };
      objectEight = {
        "first_property": "something",
        "second_property": {
          "inner_one": "whatever",
          "inner_two": {
            "1": [2, 3],
            "2": {"nums": [93, 6, {"seven": "7", "eight": [8, 9]}],
                  "sides": {
                            "directions": {"right":"left"},
                            "dimentions": {"fourth": 4, "fifth": 5}
                          }
                  }
          }
        }
      };
      objectNine = {
        "first_property": "value",
        "second_property": {
          "inner_one": "whatever",
          "inner_two": {
            "1": [2, 3],
            "2": {"nums": [93, 6, {"seven": "7", "eight": [8, 9]}],
                  "sides": {
                            "directions": {"right":"left"},
                            "dimentions": {"fourth": 4, "fifth": 5}
                          }
                  }
          }
        }
      };
    });

    it('should return a copy of the object it receives', function() {

      var obj = util.extend(objectOne);
      expect(obj).to.deep.equal(objectOne);

    });

    it('should override a property on first object if present on the second', function() {

      var obj = util.extend(objectOne, objectTwo);
      expect(obj).to.deep.equal(objectTwo);
    });

    it('should combine missing properties from both objects', function() {

      var obj = util.extend(objectTwo, objectThree);

      expect(obj).to.deep.equal(objectFour);
    });

    it('should combine properties deeply from both objects', function() {

      var obj = util.extend(objectFour, objectFive);

      expect(obj).to.deep.equal(objectFive);
    });

    it('should handle complex layers', function() {
      var obj = util.extend(objectFive, objectSix);
      expect(obj).to.deep.equal(objectSeven);
    });

    it('should handle nesting of arrays and multiple objects', function() {
      var obj = util.extend(objectSeven, objectEight, objectOne);
      expect(obj).to.deep.equal(objectNine);
    });


  });

});



describe('Quoter', function() {

  var starWarsQuotes =
    [
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
      },
      {
        "quote": "That's right, R2, we're going to the Dagoba system. To see an old friend...",
        "source": "Luke Skywalker",
        "citation": "Return of the Jedi",
        "year": 1984
      },
      {
        "quote": "You are part of the Rebel Alliance and a traitor!",
        "source": "Darth Vader",
        "citation": "A New Hope",
        "tags": "Supense"
      },
      {
        "quote": "Help us, Obi-Wan Kenobi, you're our only hope.",
        "source": "Princess Leia",
        "citation": "A New Hope",
        "year": 1978,
        "tags": "drama"
      }
    ];

  describe('Quoter.createQuotebox', function() {

    var quoter;
    var title;

    before(function() {
      quoter = new Quoter(starWarsQuotes, {"title": "Random Star Wars Quotes"});
      title = 'Star Wars Quotes';
    });

    it('should return a quotebox element', function() {
      var elementText = `<div class="quote-box"><p class="title">${title}</p></div>`;
      var quoteBox = quoter.createQuotebox(title);
      expect(quoteBox.outerHTML).to.equal(elementText);
    });

  });

  describe('Quoter.createNewQuote', function() {

    var quoter;
    var randQuote;

    before(function() {
      quoter = new Quoter(starWarsQuotes, {"title": "Random Star Wars Quotes"});
      randQuote = {
        "quote": "Of course I love him. He's my brother.",
        "source": "Princess Leia",
        "citation": "Return of the Jedi",
        "year": 1984,
        "tags": "humor art"
      };
    });

    it('should return an HTML element that matches the expected format', function() {
      var expectedElement = '<div class="quote-box"><p class="title"></p><p class="quote">Of course I love him. He\'s my brother.</p><p class="source">Princess Leia<span class="citation">Return of the Jedi</span><span class="year">1984</span><span class="tags">Tags: <p class="tag">humor</p><p class="tag">art</p></span></p></div>';
      var elementProduced = quoter.createNewQuote(randQuote);
      expect(elementProduced.outerHTML).to.equal(expectedElement);
    });

  });

  describe('Quoter.randomQuote', function() {

    var quoter = new Quoter(starWarsQuotes, {"title": "Random Star Wars Quotes"});

    beforeEach(function() {
      quoter.randomQuote.used = [];
    });

    it('should return a quote object', function() {
      var quoteObj = quoter.randomQuote();
      expect(quoteObj).to.have.property('quote');
      expect(quoteObj).to.have.property('source');
    });

    it('shouldnt return the same quote object in a row', function() {
      var Obj1 = quoter.randomQuote();
      var Obj2 = quoter.randomQuote();
      var Obj3 = quoter.randomQuote();
      var Obj4 = quoter.randomQuote();
      var Obj5 = quoter.randomQuote();
      var Obj6 = quoter.randomQuote();

      expect(Obj6).to.not.be.oneOf([Obj1, Obj2, Obj3, Obj4, Obj5]);
    });

    it('should repeat the list after all the quote have been used once', function() {
      var Obj1 = quoter.randomQuote();
      var Obj2 = quoter.randomQuote();
      var Obj3 = quoter.randomQuote();
      var Obj4 = quoter.randomQuote();
      var Obj5 = quoter.randomQuote();
      var Obj6 = quoter.randomQuote();
      var Obj7 = quoter.randomQuote();

      expect(Obj7).to.be.oneOf([Obj1, Obj2, Obj3, Obj4, Obj5, Obj6]);
    });

  });

});

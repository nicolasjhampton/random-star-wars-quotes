var Quoter = (function($) {
  'use strict';

  var autoPlay;
  var usedQuotes = [];

  // Templates for various quote elements
  var templates =
    {
      "quote": {
        "begin": "<p class='quote'>",
        "end": "</p>"
      },
      "source": {
        "begin": "<p class='source'>",
        "end": "</p>"
      },
      "citation": {
        "begin": "<span class='citation'>",
        "end": "</span>"
      },
      "year": {
        "begin": "<span class='year'>",
        "end": "</span>"
      },
      "tags": {
        "begin": "<span class='tags'>Tags: ",
        "end": "</span>"
      },
      "tag": {
        "begin": "<p class='tag'>",
        "end": "</p>"
      }
    };

  // Random integer generator
  var random = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // Helper function for inserting content into template
  var template = function(key, content) {
    return templates[key].begin + content + templates[key].end;
  };

  // assembles the html string for each element from the template array
  var makeElement = function(obj, key) {

    var content;

    if (key === "tags") {
      // Handles each sub-tag template
      content = obj[key].split(' ').map(function(tag) {
        return template('tag', tag);
      }).join('');

    } else {
      content = obj[key];
    }

    return template(key, content);
  };


  function Quoter(quotes, config) {
    if(!config) { config = {}; }
    this.quotes = quotes;
    this.quoteBox = config.quoteBox || $('#quote-box');
    this.body = config.body || $('body');
    this.colors = config.colors || [
      "blue",
      "red",
      "green",
      "purple"
    ];

  }

  Quoter.prototype.printQuote = function() {
    var that = this;
    var quoteHTML = "";
    var sourceHTML = "";
    var randomQuote = that.getRandomQuote(); // Get a random quote
    //  Hide the quoteBox, then clear the inside of it
    that.quoteBox.hide();
    that.quoteBox.children().remove();
    // Get all the keynames in an array, then map through them
    Object.keys(randomQuote).map(function(key, index){
      // Append first 2 to the quoteBox, the rest go inside the source element
      var target = index < 2 ? that.quoteBox : that.quoteBox.children('.source');
      target.append(makeElement(randomQuote, key));
    });
    // Randomly change the color of the screen and fade it in
    that.setRandomColor();
    that.quoteBox.fadeIn('slow');
    // If an autotimer has been set, clear and reset it
    if(this.duration) {
      window.clearTimeout(autoPlay);
      autoPlay = window.setTimeout(that.printQuote.bind(that), this.duration);
    }
  }

  // Sets a random color based on the color object
  Quoter.prototype.setRandomColor = function() {
    var that = this;
    var randomIndex = random(0, that.colors.length);
    this.body.css("background-color", that.colors[randomIndex]);
  };


  // returns a random quote object from the quotes array
  Quoter.prototype.getRandomQuote = function() {
    var randomIndex = random(0, this.quotes.length);
    if (usedQuotes.indexOf(randomIndex) === -1) { // If we haven't used this quote before...
      usedQuotes.push(randomIndex); // Add it to the list of used quotes
      return this.quotes[randomIndex]; // Return the quote
    } else if (usedQuotes.length === this.quotes.length) {
      usedQuotes = []; // Reset the list of used quotes if we've used them all
    }
    //Rerun this function if we used this quote before
    return this.getRandomQuote(); // Recursion like woah ;)
  };

  Quoter.prototype.attachButton = function ($object) {
    var that = this;
    $object.click(that.printQuote.bind(that));
    return that; // Chainable
  }

  Quoter.prototype.setAutoplay = function (duration) {
    var that = this;
    this.duration = duration;
    autoPlay = window.setTimeout(that.printQuote.bind(that), duration);
    return that; // Chainable
  }

  return Quoter;

})(jQuery);

var Quoter = (function($) {
  'use strict';

  var autoPlay;
  var usedQuotes = [];
  var colors;
  var quotes;
  var quoteClass;
  var quoteBox;
  var billboard;
  var title;
  var quoteClassString;

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

  // Sets a random color based on the color object
  var setRandomColor = function() {
    //var that = this;
    var randomIndex = random(0, colors.length);
    billboard.css("background-color", colors[randomIndex]);
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

  // returns a random quote object from the quotes array
  var getRandomQuote = function() {
    var randomIndex = random(0, quotes.length);
    if (usedQuotes.indexOf(randomIndex) === -1) { // If we haven't used this quote before...
      usedQuotes.push(randomIndex); // Add it to the list of used quotes
      return quotes[randomIndex]; // Return the quote
    } else if (usedQuotes.length === quotes.length) {
      usedQuotes = []; // Reset the list of used quotes if we've used them all
    }
    //Rerun this function if we used this quote before
    return getRandomQuote(); // Recursion like woah ;)
  };


  function Quoter(quoteObject, config) {
    if(!config) { config = {}; }
    quotes = quoteObject;
    title = config.title || "";
    quoteClass = config.quoteClass || 'quote-box'
    quoteClassString = '.' + quoteClass;
    colors = config.colors || [
      "blue",
      "red",
      "green",
      "purple"
    ];
  }

  Quoter.prototype.printQuotes = function() {
    var that = this;
    var quoteHTML = "";
    var sourceHTML = "";
    var randomQuote = getRandomQuote(); // Get a random quote
    //  Hide the quoteBox, then clear the inside of it
    quoteBox.hide();
    quoteBox.children().remove();
    // Get all the keynames in an array, then map through them
    Object.keys(randomQuote).map(function(key, index){
      // Append first 2 to the quoteBox, the rest go inside the source element
      var target = index < 2 ? quoteBox : quoteBox.children('.source');
      target.append(makeElement(randomQuote, key));
    });
    // Randomly change the color of the screen and fade it in
    setRandomColor();
    quoteBox.fadeIn('slow');
    // If an autotimer has been set, clear and reset it
    if(this.duration) {
      if(autoPlay) {window.clearTimeout(autoPlay);}
      autoPlay = window.setInterval(that.printQuotes.bind(that), this.duration);
    }
  }

  Quoter.prototype.attachTo = function(cssSelector) {
    var that = this;
    billboard = $(cssSelector);
    billboard.css({
      "position": "absolute",
      "display": "inline-block",
      "height": "100%",
      "width": "100%"
    });
    if (billboard.children('.' + quoteClass).length === 0) {
      var quoteStart = $('<div class="' + quoteClass + '"></div>')
                        .append($('<p class="title">' + title + '</p>'));
      billboard.prepend(quoteStart);

    }
    quoteBox = $(quoteClassString);
    window.setTimeout(that.printQuotes.bind(that), 5000);
    return that; // Chainable
  }

  Quoter.prototype.setButton = function(cssSelector) {
    var that = this;
    $(cssSelector).click(that.printQuotes.bind(that));
    return that; // Chainable
  }

  Quoter.prototype.setAutoplay = function(duration) {
    var that = this;
    this.duration = duration;
    return that; // Chainable
  }

  return Quoter;

})(jQuery);

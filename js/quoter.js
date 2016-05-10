var Quoter = (function($, window, document) {
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
  var fullScreen = {
    "position": "absolute",
    "display": "inline-block",
    "height": "100%",
    "width": "100%"
  };

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

  function Quoter(quoteObject, config) {

    if(!config) { config = {}; }

    quotes = quoteObject;
    title = config.title || "";
    quoteClass = config.quoteClass || 'quote-box';
    quoteClassString = '.' + quoteClass;
    colors = config.colors || [
      "blue",
      "red",
      "green",
      "purple"
    ];
  }

  // Random integer generator
  var random = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  // Helper function for inserting content into template
  var template = function(key, content) {
    return templates[key].begin + content + templates[key].end;
  };

  // Sets a random color based on the color object
  var setRandomColorTo = function($object) {
    //var that = this;
    var randomIndex = random(0, colors.length);
    $object.css("background-color", colors[randomIndex]);
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
    if (!usedQuotes.includes(randomIndex)) { // If we haven't used this quote before...
      usedQuotes.push(randomIndex); // Add it to the list of used quotes
      return quotes[randomIndex]; // Return the quote
    } else if (usedQuotes.length === quotes.length) {
      usedQuotes = []; // Reset the list of used quotes if we've used them all
    }
    //Rerun this function if we used this quote before
    return getRandomQuote(); // Recursion like woah ;)
  };


  Quoter.prototype.printQuotes = function() {
    var that = this;
    var randomQuote = getRandomQuote(); // Get a random quote
    quoteBox.hide(); //  Hide the quoteBox
    quoteBox.children().remove(); // clear the quoteBox
    // Get keynames in an array, then map through them
    Object.keys(randomQuote).map(function(key, index){
      // Append first 2 to the quoteBox, the rest go inside the source element
      var target = index < 2 ? quoteBox : quoteBox.children('.source');
      target.append(makeElement(randomQuote, key));
    });
    setRandomColorTo(billboard); // Randomly change billboard bg color
    quoteBox.fadeIn('slow'); // fade in quoteBox
    if(this.duration) { // If an autotimer has been set
      if(autoPlay) {window.clearTimeout(autoPlay);} // clear and reset autotimer
      autoPlay = window.setInterval(that.printQuotes.bind(that), this.duration);
    }
  };

  Quoter.prototype.attachTo = function(cssSelector) {
    var that = this;
    billboard = $(cssSelector);
    billboard.css(fullScreen);
    if (billboard.children('.' + quoteClass).length === 0) {
      var quoteStart = $('<div class="' + quoteClass + '"></div>')
                        .append($('<p class="title">' + title + '</p>'));
      billboard.prepend(quoteStart);

    }
    quoteBox = $(quoteClassString);
    window.setTimeout(that.printQuotes.bind(that), 5000);
    return that; 
  };

  Quoter.prototype.setButton = function(cssSelector) {
    var that = this;
    $(cssSelector).click(that.printQuotes.bind(that));
    return that;
  };

  Quoter.prototype.setAutoplay = function(duration) {
    var that = this;
    this.duration = duration;
    return that;
  };

  return Quoter;

})(jQuery, window, document);

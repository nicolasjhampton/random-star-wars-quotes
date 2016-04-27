(function($) {
'use strict';

/*  This script uses stock information in quotes.js and templates.js  */

/*
 *  Globals
 */

var autoPlay;

var usedQuotes = [];

var quoteBox = $('#quote-box');

var body = document.getElementsByTagName("body")[0];

/*
 *  Helper functions
 */

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
  var randomIndex = random(0, colors.length);
  body.style.backgroundColor = colors[randomIndex];
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



/*
 *  printQuote function
 */

var printQuote = function() {
  // Reset the recent autoplay timer
  window.clearTimeout(autoPlay);
  quoteBox.hide();

  var quoteHTML = "";
  var sourceHTML = "";
  var randomQuote = getRandomQuote();
  // Get all the keynames in an array, then map through them
  Object.keys(randomQuote).map(function(key, index){
    if(index < 2) {
      // The first two keys are the quote and source
      quoteHTML += makeElement(randomQuote, key);
    } else {
      // The second two keys are children of the source class
      sourceHTML += makeElement(randomQuote, key);
    }
  });

  // Insert the html for the main quote
  quoteBox.html(quoteHTML);
  // quoteBox.innerHTML = quoteHTML;
  // If we have more data, put it in the source element
  if(sourceHTML !== "") {
    $('.source').html(sourceHTML);
  }

  setRandomColor(); // Randomly change the color of the screen
  quoteBox.fadeIn('slow');
  // Set a autoPlay in 10 seconds
  autoPlay = window.setTimeout(printQuote, 10000);
};


// event listener to respond to clicks on the page
// when user clicks anywhere on the page, the "makeQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

// Set an autoplay timer
autoPlay = window.setTimeout(printQuote, 5000);
})($);

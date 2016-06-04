'use strict';

var $ = require('jquery');


// Helper function for inserting content into template
var template = function(templateObj, key, content) {
  return `${templateObj[key].begin}${content}${templateObj[key].end}`;
};

// Handles each sub-tag template
var createTags = function(templateObj, tagString) {
  return tagString.split(' ').map(function (tag) {
    return template(templateObj, 'tag', tag);
  }).join('');
};

// assembles the html string for each element from the template array
var makeElement = function(templateObj, obj, key) {
  var content = (key === 'tags') ? createTags(templateObj, obj[key]) : obj[key];
  return template(templateObj, key, content);
};

var createNewQuote = function(templateObj, quoteBox, randQuote) {
  // Get keynames in an array, then map through them
  Object.keys(randQuote).map(function(key, index) {
    // Append first 2 to the quoteBox, the rest go inside the source element
    var target = index < 2 ? quoteBox : quoteBox.children('.source');
    target.append(makeElement(templateObj, randQuote, key));
  });
  return quoteBox;
};

// Random integer generator
var random = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

// Sets a random color based on the color object
var getRandomColor = function() {
  return `rgba(${random(0, 256)}, ${random(0, 256)}, ${random(0, 256)}, 1.0)`;
};

var clearArray = function(array) {
  array.length = 0; // Reset the list of used quotes if we've used them all
};

var useQuote = function(quoteObj, index) {
  quoteObj.used.push(index); // Add it to the list of used quotes
  return quoteObj.new[index]; // Return the quote
};

var createQuotebox = function(classname, title) {
  var title = $(`<p class="title">${title}</p>`);
  var quote = $(`<div class="${classname}"></div>`);
  return quote.append(title);
};

var hideOldQuote = function(quoteBox) {
  quoteBox.hide(); //  Hide the quoteBox
  quoteBox.children().remove(); // clear the quoteBox
};

var showNewQuote = function(quoteBox) {
  quoteBox.fadeIn('slow'); // fade in quoteBox
};

var changeBackgroundColor = function(billboard) {
  billboard.css('background-color', getRandomColor());
};

module.exports.random = random;
module.exports.template = template;
module.exports.getRandomColor = getRandomColor;
module.exports.createTags = createTags;
module.exports.makeElement = makeElement;
module.exports.clearArray = clearArray;
module.exports.useQuote = useQuote;
module.exports.createQuotebox = createQuotebox;
module.exports.hideOldQuote = hideOldQuote;
module.exports.showNewQuote = showNewQuote;
module.exports.createNewQuote = createNewQuote;
module.exports.changeBackgroundColor = changeBackgroundColor;

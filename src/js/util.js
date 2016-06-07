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

var createQuotebox = function(templateObj, classname, title) {
  var quotebox = document.createElement('div');
  quotebox.innerHTML = template(templateObj, 'title', title);
  quotebox.className = classname;
  return quotebox;
};

var createNewQuote = function(templateObj, quoteBox, randQuote) {
  // Get keynames in an array, then map through them
  quoteBox.innerHTML = '';
  Object.keys(randQuote).map(function(key, index) {
    // Append first 2 to the quoteBox, the rest go inside the source element
    var target = index < 2 ? quoteBox : quoteBox.getElementsByClassName('source')[0];

    target.innerHTML += makeElement(templateObj, randQuote, key);
  });
  return quoteBox;
};

// Random integer generator
var random = function(min, max) {
  var low = (min < max) ? min : max;
  var high = (max > min) ? max : min;
  return Math.floor(Math.random() * (high - low) + low);
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

var hide = function(element) {
  element.style.opacity = '0';
};

var show = function(element) {
  element.style.opacity = '1';
};

var changeBackgroundColor = function(billboard) {
  billboard.style.backgroundColor = getRandomColor();
};

module.exports.random = random;
module.exports.template = template;
module.exports.getRandomColor = getRandomColor;
module.exports.createTags = createTags;
module.exports.makeElement = makeElement;
module.exports.clearArray = clearArray;
module.exports.useQuote = useQuote;
module.exports.createQuotebox = createQuotebox;
module.exports.hide = hide;
module.exports.show = show;
module.exports.createNewQuote = createNewQuote;
module.exports.changeBackgroundColor = changeBackgroundColor;

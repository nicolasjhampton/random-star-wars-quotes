'use strict';

var template = function(key, content) {
  return `${this[key].begin}${content}${this[key].end}`;
};

// Handles each sub-tag template
var createTags = function(tagString) {
  var that = this;
  return tagString.split(' ').map(function (tag) {
    return template.call(that, 'tag', tag);
  }).join('');
};

// assembles the html string for each element from the template array
var makeElement = function(obj, key) {
  var content = (key === 'tags') ? createTags.call(this, obj[key]) : obj[key];
  return template.call(this, key, content);
};

var createQuotebox = function(classname, title) {
  var quotebox = document.createElement('div');
  quotebox.innerHTML = template.call(this, 'title', title);
  quotebox.className = classname;
  return quotebox;
};

var createNewQuote = function(quoteBox, randQuote) {
  var that = this;
  // Get keynames in an array, then map through them
  quoteBox.innerHTML = '';
  Object.keys(randQuote).map(function(key, index) {
    // Append first 2 to the quoteBox, the rest go inside the source element
    var target = index < 2 ? quoteBox : quoteBox.getElementsByClassName('source')[0];

    target.innerHTML += makeElement.call(that, randQuote, key);
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

// extend code snippet from http://youmightnotneedjquery.com/,
// https://github.com/HubSpot/YouMightNotNeedjQuery

var extend = function(out) {
  out = out || {};

  for (var i = 1; i < arguments.length; i++) {
    var obj = arguments[i];

    if (!obj)
      continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'object')
          out[key] = extend(out[key], obj[key]);
        else
          out[key] = obj[key];
      }
    }
  }

  return out;
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
module.exports.extend = extend;

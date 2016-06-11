'use strict';

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

var hide = function(element) {
  element.style.opacity = '0';
};

var show = function(element) {
  element.style.opacity = '1';
};

var changeBackgroundColor = function(billboard) {
  billboard.style.backgroundColor = getRandomColor();
};

// extend code snippet modified from YouMightNotNeedjQuery
// http://youmightnotneedjquery.com/,
// https://github.com/HubSpot/YouMightNotNeedjQuery

var extend = function(out) {
  out = out || {};
  [...arguments].slice(1).map(function(obj) {
    if (!obj) { return false; }
    Object.keys(obj).map((key) => {
      if (obj.hasOwnProperty(key)) {
        out[key] = (typeof obj[key] === 'object') ? extend(out[key], obj[key]) : obj[key];
      }
    });
  });
  return out;
};

module.exports.random = random;
module.exports.getRandomColor = getRandomColor;
module.exports.clearArray = clearArray;
module.exports.hide = hide;
module.exports.show = show;
module.exports.changeBackgroundColor = changeBackgroundColor;
module.exports.extend = extend;

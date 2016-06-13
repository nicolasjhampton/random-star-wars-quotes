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

var hide = function(element) {
  element.style.opacity = '0';
};

var show = function(element) {
  element.style.opacity = '1';
};

var changeBackgroundColor = function(element) {
  element.style.backgroundColor = getRandomColor();
};

var extend = function(/* arguments */) {
  var argsIn = [...arguments].slice(0);
  var out = argsIn.reduce(function(obj1, obj2) {
    for(var key in obj2) {
      obj1[key] = (typeof obj2[key] === 'object' && !(Array.isArray(obj2[key]))) ? extend(obj2[key]) : obj2[key];
    }
    return obj1;
  }, {});
  return out;
};

module.exports.random = random;
module.exports.getRandomColor = getRandomColor;
module.exports.hide = hide;
module.exports.show = show;
module.exports.changeBackgroundColor = changeBackgroundColor;
module.exports.extend = extend;

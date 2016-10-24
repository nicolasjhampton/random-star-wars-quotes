'use strict';

/**
 * Random integer generator. Self corrects if max and min ranges are
 * misordered.
 *
 * @param {Number} min minumum range of random number
 * @param {Number} max maximum range of random number
 * @returns {Number} random random number between the two ranges
 */
function random(min, max) {
  var low = (min < max) ? min : max;
  var high = (max > min) ? max : min;
  return Math.floor(Math.random() * (high - low) + low);
};

/**
 * Creates a random color.
 *
 * @returns {String} rgba random formatted rgba string value
 */
function getRandomColor() {
  return `rgba(${random(0, 256)}, ${random(0, 256)}, ${random(0, 256)}, 1.0)`;
};

/**
 * Hides an HTML element by setting the opacity property to zero.
 *
 * @param {Node} element HTML element
 */
function hide(element) {
  element.style.opacity = '0';
};

/**
 * Shows an HTML element by setting the opacity property to one.
 *
 * @param {Node} element HTML element
 */
function show(element) {
  element.style.opacity = '1';
};

/**
 * Sets the background color of an element to a random color.
 *
 * @param {Node} element HTML element
 */
function changeBackgroundColor(element) {
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

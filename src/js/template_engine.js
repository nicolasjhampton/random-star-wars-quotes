'use strict';

/**
 * Template engine to assemble elements from an object of set tags
 *
 * @param {obj} templateObj
 */
function TemplateEngine(templateObj) {

  this.layoutFunc = (key) => templateObj[key];
  this.conditional = checkPlural;
  this.condOne = plainFormat;
  this.condTwo = stringSpaceFormat;

}

/**
 * Conditionals are used to choose the appropriate formatter callback
 * based on the key used for the tag of the element.
 *
 * @callback conditional
 * @param {String} key
 * @returns {boolean} conditional
 */

/**
 * Conditional used to check plurality of a tag
 *
 * @param {String} key key to be tested for plural
 * @returns {boolean} conditional whether the key indicates the possibility of
 *                                nested tags
 */
function checkPlural(key) {
  return key.slice(-1) == 's';
}

/**
 * These callbacks are used to format the innerHTML of the elements.
 *
 * @callback formatter
 * @param {object} content
 * @param {String} key
 * @param {this} context
 * @returns {function} callback
 */

/**
 * Formatter function to use when checkPlural evaluates false
 * used for formatting the innerHTML of singlar quote elements
 *
 * @param {object} content configured templateObj of the object instance
 * @param {String} key appropriete key for openning and closing tags on templateObj
 * @returns {function} callback callback function to use to format innerHTML
 */
function plainFormat(content, key) {
  return () => content[key];
}

/**
 * Formatter function to use when checkPlural evaluates true
 * used for formatting the innerHTML of multiple tags
 *
 * @param {object} content configured templateObj of the object instance
 * @param {String} key appropriete key for openning and closing tags on templateObj
 * @param {this} context
 * @returns {function} callback function to use to format innerHTML
 */
function stringSpaceFormat(content, key, context) {
  return () => {
    return content[key].split(' ').reduce((start, next) => {
      return start + context.template(() => next, key.slice(0,-1));
    }, '');
  }
}

/**
 * Method for constructing the outer tags of an element
 * @memberof TemplateEngine.prototype
 *
 * @param {formatter} contentFunc function for formatting the innerHTML of the element
 * @param {String} key appropriete key for openning and closing tags on templateObj
 * @returns {String} template html string for complete element
 */
TemplateEngine.prototype.template = function(contentFunc, key) {
  return `${this.layoutFunc(key).begin}${contentFunc()}${this.layoutFunc(key).end}`;
}

/**
 * Method used to determine the proper formatter for inner content of an element
 * @memberof TemplateEngine.prototype
 *
 * @param {Object} content configured templateObj of the object instance
 * @param {String} key appropriete key for openning and closing tags on templateObj
 * @returns {formatter} callback proper formatter function for innerHTML of element
 */
TemplateEngine.prototype.makeContentFunc = function(content, key) {
  var formatFunc = (this.conditional(key)) ? this.condTwo : this.condOne;
  return formatFunc(content, key, this);
}

/**
 * Method for making a single element with innerHTML
 * @memberof TemplateEngine.prototype
 *
 * @param {Object} content configured templateObj of the object instance
 * @param {String} key appropriete key for openning and closing tags on templateObj
 * @returns {String} template html string for complete element
 */
TemplateEngine.prototype.makeElement = function(content, key) {
  var contentFunc = this.makeContentFunc(content, key);
  return this.template(contentFunc, key);
}

module.exports.TemplateEngine = TemplateEngine;
module.exports.checkPlural = checkPlural;
module.exports.plainFormat = plainFormat;
module.exports.stringSpaceFormat = stringSpaceFormat;

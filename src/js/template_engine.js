'use strict';

var TemplateEngine = function(templateObj) {

  this.layoutFunc = (key) => templateObj[key];
  this.conditional = checkPlural;
  this.condOne = plainFormat;
  this.condTwo = stringSpaceFormat;

}

function checkPlural(key) {
  return key.slice(-1) == 's';
}

var plainFormat = (content, key) => {
  return () => {
    return content[key];
  }
}

var stringSpaceFormat = (content, key, that) => {
  return () => {
    return content[key].split(' ').reduce((start, next) => {
      return start + that.template(() => next, key.slice(0,-1));
    }, '');
  }
}

TemplateEngine.prototype.template = function(contentFunc, key) {
  return `${this.layoutFunc(key).begin}${contentFunc()}${this.layoutFunc(key).end}`;
}

TemplateEngine.prototype.makeContentFunc = function(content, key) {
  var formatFunc = (this.conditional(key)) ? this.condTwo : this.condOne;
  return formatFunc(content, key, this);
}

TemplateEngine.prototype.makeElement = function(content, key) {
  var contentFunc = this.makeContentFunc(content, key);
  return this.template(contentFunc, key);
}

module.exports.TemplateEngine = TemplateEngine;
module.exports.checkPlural = checkPlural;
module.exports.plainFormat = plainFormat;
module.exports.stringSpaceFormat = stringSpaceFormat;

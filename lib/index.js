var dulcimer = require('dulcimer');
var VeryType = require('verymodel').VeryType;

module.exports = function (options) {

  options.name = options.name || "circles";
  
  var Circle = new dulcimer.Model({
    id: {
      derive: function () { return this.key; },
      save: false,
    },
    description: {
      type: "string",
    },
    image: {
      type: new VeryType().isUrl(),
    },
    member: {
      foreignCollection: 'people',
    },
    name: {
      type: "string",
    },
  }, options);

  Circle.context = require('./context');
  Circle.type = require('./type');

  return Circle;
}


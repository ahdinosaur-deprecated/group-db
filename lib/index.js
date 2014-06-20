var dulcimer = require('dulcimer');
var VeryType = require('verymodel').VeryType;

module.exports = function (options) {

  options.name = options.name || "circles";
  
  var Circle = new dulcimer.Model({
    id: {
      derive: function () { return this.key; },
      required: true,
      save: false,
    },
    type: {
      default: function () { return "Circle" },
      required: true,
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


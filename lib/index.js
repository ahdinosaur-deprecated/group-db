var dulcimer = require('dulcimer');
var validator = require('validator');

module.exports = function (options) {

  options.savePrivate = true;

  var Circle = new dulcimer.Model({
    description: {
      type: "string",
    },
    image: {
      type: "string",
      validation: function (value) {
        return validator.isURL(value);
      },
    },
    member: {
      foreignCollection: 'person',
    },
    name: {
      type: "string",
    },
  }, options);

  Circle.context = require('./context');
  Circle.type = require('./type');

  return Circle;
}


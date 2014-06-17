var dulcimer = require('dulcimer');
var validator = require('validator');

module.exports = function (options) {

  options.savePrivate = true;

  return new dulcimer.Model({
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
}

module.exports.context = require('./context');

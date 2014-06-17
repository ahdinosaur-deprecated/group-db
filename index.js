var dulcimer = require('dulcimer');
var validator = require('validator');

module.exports = function (options) {

  options.savePrivate = true;

  return new dulcimer.Model({
    name: {
      type: "string",
    },
    description: {
      type: "string",
    },
    members: {
      foreignCollection: 'person',
    },
  }, options);
}

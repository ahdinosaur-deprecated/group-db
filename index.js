var uuid = require('node-uuid');
var _ = require('lodash');

module.exports = function (Bookshelf) {

  Bookshelf.plugin('registry');

  var Member = Bookshelf.model('Member', {
    tableName: 'members',
    member: function () {
      return this.morphTo('member', 'Person', 'Group')
    },
    memberOf: function () {
      return this.belongsTo('Group');
    },
    toJSON: function (options) {
      if (options && options.related) {
        return this.related(options.related).toJSON();
      }
    },
  });

  var Members = Bookshelf.collection('Members', {
    model: Member,
  })

  return Bookshelf.model('Group', {
    tableName: 'groups',
    defaults: function () {
      return {
        id: uuid(),
        type: "Group",
      };
    },
    memberOf: function () {
      return this.morphMany('Member', 'member');
    },
    member: function () {
      return this.hasMany('Member');
    },
    toJSON: function (options) {
      options = options || {};
      var json = Bookshelf.Model.prototype.toJSON.call(this, options);
      if (!options.shallow && this.relations.member) {
        json.member = this.related('member').models.map(function (member) {
          return member.toJSON({ related: 'member' });
        });
      }
      return json;
    },
  }, { Member: Member, Members: Members });
};

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
    add: function (member) {
      return Member.forge().save({
        member_id: member.id,
        member_type: member.tableName,
        group_id: this.relatedData.parentId,
      });
    },
  });

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
      var members = this.hasMany('Member');
      members.add = Members.prototype.add;
      return members;
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

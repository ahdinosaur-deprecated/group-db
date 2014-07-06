var expect = require('chai').expect;
var _ = require('lodash');
var Promise = require('bluebird');

var bob = {
  name: "Bob Loblaw",
  email: "bobloblaw@bobloblawslawblog.com",
};

var law = {
  name: "Law Firm",
};

var boblaw = _.extend(_.clone(law), {
  member: [bob],
});

var checkGroup = function (actual, expected) {
  expect(actual.id).to.exist;
  expect(actual.type).to.equal("Group");
  _.each(expected.member, function (expectedMember) {
    var actualMember = _.find(actual.member, expectedMember);
    _.each(expectedMember, function (value, key) {
      expect(actualMember).to.have.property(key, value);
    });
  })
  _.each(expected, function (value, key) {
    if (key === 'member') { return; }
    expect(actual).to.have.property(key, value);
  });
};

describe("#Group", function () {

  var knex = require('knex')(require('../knexfile').test);
  var bookshelf = require('bookshelf')(knex);
  var Person = require('oa-person-db')(bookshelf);
  var Group;

  beforeEach(function () {
    return Promise.all([
      knex('groups').del(),
      knex('members').del(),
      knex('people').del(),
    ]);
  });

  it("should load group model", function () {
    Group = require('../')(bookshelf);
  });

  it("should create group", function () {
    // save person
    return Person.forge().save(bob)
    .bind({})
    .then(function (savedPerson) {
      this.person = savedPerson;
    })
    .then(function () {
      // save group
      return Group.forge().save(law);
    })
    .then(function (savedGroup) {
      this.group = savedGroup;
      // save person-group membership
      return Group.Member.forge().save({
        member_id: this.person.id,
        member_type: "people",
        group_id: this.group.id,
      });
    })
    .then(function (savedMember) {
      // load group members
      return this.group.load(["member.member"]);
    })
    .then(function (group) {
      checkGroup(group.toJSON(), boblaw);
      // load person memberOfs
      return this.person.load(['memberOf.memberOf'])
    })
    .then(function (person) {
      console.log(person.toJSON());
    })
    /*
    var fixture = _.clone(boblaw);
    // create 
    var person = db.Person(_.clone(bob));
    var circle = db.Circle(_.clone(law));
    circle.member.add(person)
    expect(circle.name).to.equal(fixture.name);
    expect(toArray(circle.member)).to.deep.equal(fixture.member);
    expect(circle.object.master.constructor)
      .to.equal(db.Circle);
    var id = circle.__id__;
    expect(id).to.exist;
    // get
    var got = db.objects.getById(id);
    expect(got.name).to.equal(fixture.name);
    expect(toArray(got.member)).to.deep.equal(fixture.member);
    expect(got.object.master.constructor)
      .to.equal(db.Circle);
    // update
    circle.name = fixture.name = "Legal"
    expect(circle.name).to.equal(fixture.name);
    expect(toArray(circle.member)).to.deep.equal(fixture.member);
    // get
    var got2 = db.objects.getById(id);
    expect(got2.name).to.equal(fixture.name);
    expect(toArray(got2.member)).to.deep.equal(fixture.member);
    expect(got2.object.master.constructor)
      .to.equal(db.Circle);
    // delete
    db.objects.delete(circle)
    // get
    expect(db.objects.getById(id))
      .to.be.empty;
    */
  });
});


var expect = require('chai').expect;
var DB = require('dbjs');
var _ = require('lodash');
var toArray = require('es5-ext/array/to-array');

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

describe("#Circle", function () {
  var db;

  beforeEach(function () {
    db = DB();

    require('open-app-person-db')({
      db: db,
    });
    require('../')({
      db: db,
    });
  });

  it("should CRUD circle", function () {
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
  });
});


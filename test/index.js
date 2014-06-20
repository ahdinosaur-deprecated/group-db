var expect = require('chai').expect;
var level = require('level');
var db = level('testdb', {valueEncoding: 'json'});
var _ = require('lodash');

var Person = require('open-app-person-domain')({
  db: db,
})

var Circle = require('../')({
  db: db,
});

describe("#Circle", function () {
  it("should CRUD circle model", function (done) {
    var member = Person.create({
      name: "Bob Loblaw",
      email: "bobloblaw@bobloblawslawblog.com",
    });
    member.save(function (err) {
      expect(err).to.not.exist;
      var newCircle = Circle.create({
        name: "Law Firm",
        member: [member],
      });
      newCircle.save(function (err) {
        expect(err).to.not.exist;
        var id = newCircle.id;
        expect(id).to.exist;
        expect(newCircle).to.have.property("type", "Circle");
        Circle.get(id, function (err, getCircle) {
          expect(err).to.not.exist;
          expect(getCircle).to.have.property('id');
          expect(getCircle.toJSON()).to.deep.equal(newCircle.toJSON());
          var updates = { member: [] };
          Circle.update(id, updates, function (err, updateCircle) {
            expect(err).to.not.exist;
            expect(updateCircle.toJSON())
            .to.deep.equal(_.extend(newCircle.toJSON(), updates))
            done();
          });
        });
      });
    });
  });
  
  afterEach(function (done) {
    // del all objects in db
    db.createKeyStream()
    .on('data', function (k) {
      db.del(k);
    })
    .on('close', function () {
      done();
    });
  });
});


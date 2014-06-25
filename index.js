module.exports = function (options) {
  var db = options.db;
  // TODO error on missing db
  
  return db.Object.extend("Circle", {
    context: "schema:Organization",
    id: {
      type: db.String,
      value: function () {
        return this.__valueId__;
      },
      context: "@id",
    },
    type: {
      type: db.String,
      value: function () {
        return "Circle";
      },
      context: "@type",
    },
    name: {
      type: db.String,
      required: true,
      context: "schema:name",
    },
    description: {
      type: db.String,
      required: true,
      context: "schema:description"
    },
    member: {
    //  nested: true,
      type: db.Person,
      multiple: true,
      unique: true,
      context: "schema:member"
    },
  });
};

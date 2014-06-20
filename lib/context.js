module.exports = {
  id: "@id",
  type: "@type",

  // prefixes
  schema: "https://schema.org/",
  dc: "http://purl.org/dc/terms/",
  identity: "https://w3id.org/identity#",
  rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  rdfs: "http://www.w3.org/2000/01/rdf-schema#",
  schema: "http://schema.org/",
  xsd: "http://www.w3.org/2001/XMLSchema#",

  // Classes
  Person: "schema:Person",
  Circle: "schema:Organization",

  // properties
  created: {
    "@id": "dc:created",
    "@type": "xsd:dateTime",
  },
  description: "schema:description",
  image: {
    "@id": "schema:image",
    "@type": "@id",
  },
  modified: {
    "@id": "dc:modified",
    "@type": "xsd:dateTime",
  },
  name: "schema:name",

  // relations
  member: "schema:member",
  memberOf: "schema:memberOf",
};

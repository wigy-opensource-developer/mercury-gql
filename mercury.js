const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');

const typeDefs = importSchema('./mercury.graphql');

class HomeNode {
    constructor(id, ipv4) {
      this.id = id
      this.pk = "PUBKEY"
      this.ipv4 = ipv4
    }
  
    endpoints() {
      return [ {network: "IPV4", address: this.ipv4} ];
    }
  }
  
  class Persona {
    constructor(id, home) {
      this.id = id;
      this.pk = "PUBKEY"
      this.home = home
    }
  
    homes() {
      return [ this.home.id ];
    }
  }
  
  var home1 = new HomeNode("h1", "127.0.0.1")
  var home2 = new HomeNode("h2", "127.0.0.2")
  
  const allProfiles = [
    home1,
    home2,
    new Persona("p1", home1),
    new Persona("p2", home2),
    new Persona("p3", home2),
  ];
  
const resolvers = {
    Query: {
        profiles: (obj, args, context, info) => {
        console.log('context: ' + context.fieldName)
        return allProfiles;
        }
    },
    IProfile: {
        __resolveType: profile => {
        if (profile.home) {
            return "Persona";
        }
        if (profile.ipv4) {
            return "HomeNode";
        }
        return "Application";
        }
    }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = schema;
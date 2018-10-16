
const {GraphQLServer} = require("graphql-yoga");
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const db = require("./db");

// Create the GraphQL Yoga server

function createServer(){
    // it will ingest a schema.graphql and match up everything in the schema with either a mutation or a query resolver
    return new GraphQLServer({
        typeDefs: "src/schema.graphql",
        resolvers: {
            Mutation,
            Query,
        },
        resolverValidationOptions: {
            requireResolversForResolveType: false
        },
        context: req=> ({...req, db }),
    });
}

module.exports = createServer;
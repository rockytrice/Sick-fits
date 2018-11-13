
const {GraphQLServer} = require("graphql-yoga");
// resolvers answers the question "where does this data come from or what does this data do in the database"
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");
const db = require("./db");

// Create the GraphQL Yoga server
// this is what we will be interfacing with our GraphQL
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
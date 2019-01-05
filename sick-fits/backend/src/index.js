// start up node servers
require("dotenv").config({
    path: "variables.env"
});
const createServer = require("./createSever");
const db = require("./db");

// spin up version of the server
const server = createServer();

// TODOS use express middleware to handle cookies (JWT)
// TODOS use express middleware to populate current user

server.start({
        cors: {
            credentials: true,
            origin: process.env.FRONTEND_URL,
        },
    },
    deets => {
        console.log(`Server is now running on http://localhost:${deets.port}`);
    }
);
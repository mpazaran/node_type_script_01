require('dotenv').config();

//import Server from "./src/core/server"
const Server = require("./src/core/server")

const server = new Server()

server.up()

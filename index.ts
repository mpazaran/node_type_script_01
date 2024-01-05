import * as dotenv from "dotenv";
dotenv.config();

import Server from "./src/core/server"

const server = new Server()

server.up()

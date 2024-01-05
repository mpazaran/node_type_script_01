import express from "express"
// @ts-ignore
import {Express, Request, Response} from "express-serve-static-core"
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";
import MainDB from "../source/MainDB"

export interface APIResponseInterface {
    ok: boolean
    data?: any | object | undefined
}

export interface APIErrorInterface extends APIResponseInterface {
    message: string
    errorInfo?: object
}

class Server {
    private app: Express;

    // noinspection TypeScriptFieldCanBeMadeReadonly
    private port: number;

    constructor() {
        this.app  = express()
        this.port = parseInt(process.env.PORT as string)
        this.middleWares()
        this.routes()
    }

    middleWares() {
        this.app.use(cors())
        this.app.use(express.json())
        /**
         * DEFINE STATIC CONTENT DIR
         */
        this.app.use(express.static("public"))
        /**
         * API ENDPOINTS
         */
        this.app.get('/', function (request: Request, response: Response) {
            response.send('Hello World')
        })

        let connection = MainDB.getInstance(process.env.MONGO_CONNECTION as string)

    }

    /**
     * Generate app routes
     */
    routes() {
        let directoryPath = `${__dirname}/../modules/`
        fs.readdirSync(directoryPath)
          .forEach(async subdirectory => {
              const routerPath = path.join(directoryPath, subdirectory, "/routes");
              try {
                  const {router} = await import(routerPath)
                  this.app.use(`/api/${router.path}`, router.router)
              } catch (e) {
                  //SILENT
                  console.log(e)
              }
          });
    }

    /**
     * START PROCESS
     */
    up() {
        this.app.listen(this.port, () => {
            console.log(`Listening on port: ${this.port}`)
        })
    }
}

export default Server;

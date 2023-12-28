import express, {Express, Request, Response} from "express"
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";

export interface APIResponseInterface {
    ok: boolean
    data?: any | object | undefined
}

export interface APIErrorInterface extends APIResponseInterface {
    message: string
}

class Server {
    private app: Express;

    // noinspection TypeScriptFieldCanBeMadeReadonly
    private port: number;

    constructor() {
        this.app = express()
        dotenv.config()
        this.port = parseInt(process.env.PORT as string)
        this.middleWares()
        this.routes()
    }

    middleWares() {
        // @ts-ignore
        this.app.use(cors())

        this.app.use(express.json())
        /**
         * DEFINE STATIC CONTENT DIR
         */
        // @ts-ignore
        this.app.use(express.static("public"))
        /**
         * API ENDPOINTS
         */
        // @ts-ignore
        this.app.get('/', function (request: Request, response: Response) {
            response.send('Hello World')
        })

    }

    /**
     * Generate app routes
     */
    routes() {
        let directoryPath = `${__dirname}/../modules/`
        fs.readdirSync(directoryPath)
          .forEach(async subdirectory => {
              const routerPath = path.join(directoryPath, subdirectory, "/routes.ts");
              if (fs.statSync(routerPath)
                    .isFile()
              ) {
                  const controllerPath = path.join(directoryPath, subdirectory, "/controllers");
                  const {router} = await import(routerPath)
                  this.app.use(`/api/${router.path}`, router.router)
              }
          });
    }

    /**
     * START PROCESS
     */
    up() {
        // @ts-ignore
        this.app.listen(this.port, () => {
            console.log(`Listening on port: ${this.port}`)
        })
    }
}

export default Server;

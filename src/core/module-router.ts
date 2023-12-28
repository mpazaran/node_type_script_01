import {Request, Response, Router} from "express"
import {APIErrorInterface, APIResponseInterface} from "./server";

type methods = "post" | "put" | "get" | "delete"

class ModuleRouter {
    path: string
    router: Router;

    constructor(name: string) {
        this.path   = name
        this.router = Router()
    }

    expose(method: methods, path: string,    controllerImport: string) {
        // @ts-ignore
        this.router[method](path, async (request: Request, response: Response<APIResponseInterface | APIErrorInterface>) => {
            const controllerClass = await import(`../modules/${controllerImport}`)
            const controller = new controllerClass.default(request, response)
            controller.execute()
        })
    }
}

export default ModuleRouter

import {Request, Response, Router} from "express"
import {APIErrorInterface, APIResponseInterface} from "./server";
import {validationResult} from "express-validator";
import ApiController from "./api-controller";

type methods =
    "post"
    | "put"
    | "get"
    | "delete"

class ModuleRouter {
    path: string
    router: Router;

    constructor(name: string) {
        this.path   = name
        this.router = Router()
    }

    async expose(method: methods, path: string, controllerImport: string, middleware: string = "") {
        let definedMiddlewares = []
        if (middleware !== "") {
            const middlewareImport = await import(`../modules/${middleware}`)
            definedMiddlewares     = middlewareImport.default
        }
        // @ts-ignore
        this.router[method](
            path,
            definedMiddlewares,
            async (request: Request, response: Response<APIResponseInterface | APIErrorInterface>) => {

                const errors                    = validationResult(request)
                const controllerClass           = await import(`../modules/${controllerImport}`)
                const controller: ApiController = new controllerClass.default(request, response)

                if (errors.isEmpty()) {
                    controller.execute()
                } else {
                    controller.error("INPUT_ERROR", errors)
                }
            }
        )
    }
}

export default ModuleRouter

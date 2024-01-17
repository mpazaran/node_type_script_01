import {Request, Response, Router} from "express"
import {APIErrorInterface, APIResponseInterface} from "./server";
import {validationResult} from "express-validator";
import ApiController from "./controllers/api-controller";
import protectedController from "../core/middlewares/protected-controller"

export type RouteMethods =
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

    expose(method: RouteMethods, path: string, ControllerClass: any, middlewares: any[] = []) {
        // @ts-ignore
        this.router[method](
            path,
            middlewares,
            async (request: Request, response: Response<APIResponseInterface | APIErrorInterface>) => {
                const controller: ApiController = new ControllerClass(request, response)
                const errors                    = validationResult(request)
                if (errors.isEmpty()) {
                    controller.execute()
                } else {
                    controller.error("INPUT_ERROR", errors)
                }
            }
        )
    }

    exposeProtected(method: RouteMethods, path: string, ControllerClass: any, middlewares: any[] = []) {
        // @ts-ignore
        this.expose(method, path, ControllerClass, [
                protectedController,
                ...middlewares
            ]
        )
    }
}

export default ModuleRouter

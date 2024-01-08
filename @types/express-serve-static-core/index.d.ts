import {UserPayload} from "../../src/modules/user/controllers/user/login";

// to make the file a module and avoid the TypeScript error
export {}

declare module "express-serve-static-core" {


    interface Request {
        user: UserPayload;
    }
}

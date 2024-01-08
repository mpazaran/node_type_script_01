import {UserInterface} from "../../src/modules/user/schema/user";

// to make the file a module and avoid the TypeScript error
export {}

declare module "express-serve-static-core" {


    interface Request {
        user?: UserInterface | null;
        uuid: string
    }
}

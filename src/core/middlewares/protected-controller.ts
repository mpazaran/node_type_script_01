import {Request, Response, NextFunction} from "express";
import {APIErrorInterface, APIResponseInterface} from "../server";
import jwt from "jsonwebtoken";

const protectedController = (
    request: Request,
    response: Response<APIResponseInterface | APIErrorInterface>,
    next: NextFunction) => {
    const token = request.header(process.env.JWT_HEADER as string) as string

    try {
        const payload = jwt.verify(token as string, process.env.JWT_SECRET as string)
        /*if (payload.hasOwnProperty("uuid")) {
         controller.request.user = {
             uid       : payload.uid,
             email     : payload.email,
             first_name: payload.first_name,
             last_name : payload.last_name,
             role      : payload.role
         }
     }*/
        console.log(payload)
        next()
    } catch (e) {
        console.log(e)
        response
            .status(404)
            .json(
                {
                    ok     : false,
                    message: "PROTECTED_AREA"
                }
            )
    }

}

export default protectedController

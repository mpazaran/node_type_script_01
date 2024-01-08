import {Request, Response, NextFunction} from "express";
import {APIErrorInterface, APIResponseInterface} from "../server";
import jwt from "jsonwebtoken";
import User, {UserStatus} from "../../modules/user/schema/user"

/**
 *
 * @param request
 * @param response
 * @param next
 */
const protectedController = async (
    request: Request,
    response: Response<APIResponseInterface | APIErrorInterface>,
    next: NextFunction) => {
    const token = request.header(process.env.JWT_HEADER as string) as string

    try {
        const payload = <jwt.JwtPayloadWithUserData>jwt.verify(token as string, process.env.JWT_SECRET as string)

        if (payload.hasOwnProperty("uuid")) {
            request.uuid = payload.uuid
            request.user = await User.findOne({
                _id   : payload.uuid,
                status: UserStatus.CONFIRMED
            })

            if (request.user) {
                return next()
            }
        }

    } catch (e) {
        console.log(e)
    }

    response
        .status(404)
        .json(
            {
                ok     : false,
                message: "PROTECTED_AREA"
            }
        )

}

export default protectedController

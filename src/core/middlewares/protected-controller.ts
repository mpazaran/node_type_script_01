import {Request, Response, NextFunction} from "express";
import {APIErrorInterface, APIResponseInterface} from "../server";
import jwt from "jsonwebtoken";
import User, {UserStatus} from "../../modules/user/schema/user"
import Role from "../../modules/role/schema/role"

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

                if (request.user.role != process.env.JWT_SUPER_ADMIN_ROLE) {
                    return next()
                }

                const actionAllowed = await Role.findOne({
                    "code"   : request.user.role,
                    "actions": {
                        "$elemMatch": {
                            "method": request.method.toLowerCase(),
                            "path"  : request.baseUrl + request.route.path
                        }
                    }
                })

                if (actionAllowed) {
                    return next()
                } else {
                    console.warn({
                        "error" : "ACTION_NOT_ALLOWED",
                        "role"  : request.user.role,
                        "action": {
                            "method": request.method.toLowerCase(),
                            "path"  : request.baseUrl + request.route.path
                        }
                    })
                }
            } else {
                console.warn({
                    "error": "USER_NOT_FUND_OR_NOT_CONFIRMED",
                    "user" : request.uuid
                })
            }
        } else {
            console.info({
                "error": "NO_UUID_ON_JWT_TOKEN_PAYLOAD"
            })
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

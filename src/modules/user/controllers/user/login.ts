import ApiController from "../../../../core/api-controller"
import User, {UserLoginInterface, UserInterface, UserSource, UserStatus} from "../../schema/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface UserPayload {
    uuid: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
}

class Login extends ApiController<never, never, UserLoginInterface> {
    async execute() {

        const data = this.request.body

        try {

            const user = await User.findOne({
                email : data.email,
                status: UserStatus.CONFIRMED
            })

            if (user) {
                if (bcrypt.compareSync(data.password, user.password)) {

                    const token: string = await this.createJwt(user)
                    const {
                              _id: uuid,
                              email,
                              first_name,
                              last_name,
                              role
                          }             = user
                    return this.success(
                        {
                            user: {
                                uuid,
                                email,
                                first_name,
                                last_name,
                                role
                            },
                            token
                        })
                }
            }

            this.error("INVALID_USER_OR_PASSWORD")

        } catch (e) {
            this.exception(e)
        }

    }

    createJwt(user: UserInterface): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(
                {
                    uuid      : user._id/*,
                    email     : user.email,
                    first_name: user.first_name,
                    last_name : user.last_name,
                    role      : user.role*/
                },
                process.env.JWT_SECRET as string,
                {
                    expiresIn: process.env.JWT_LIFE_TIME
                }, (
                    error: Error | null,
                    encoded: string | undefined,
                ) => {
                    if (error) {
                        reject(error as Error)
                    } else {
                        resolve(encoded as string)
                    }

                }
            )
        })
    }
}

export default Login

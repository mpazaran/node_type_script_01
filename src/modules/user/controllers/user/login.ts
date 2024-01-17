import ApiController from "../../../../core/controllers/api-controller"
import User, {UserLoginRequestInterface, UserInterface, UserSource, UserStatus} from "../../schema/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


class Login<LoginRequestBodyType = UserLoginRequestInterface> extends ApiController<never, never, LoginRequestBodyType> {
    async execute() {

        const data = this.request.body as UserLoginRequestInterface

        try {

            const user = await User.findOne({
                email : data.email,
                status: UserStatus.CONFIRMED
            })

            if (user) {
                if (bcrypt.compareSync(data.password, user.password)) {
                    return this.successToken(user)
                }
            }

            this.error("INVALID_USER_OR_PASSWORD")

        } catch (e) {
            this.exception(e)
        }

    }

    async successToken(user: UserInterface) {
        const token: string = await this.createJwt(user)
        const {
                  _id: uuid,
                  email,
                  firstName,
                  lastName,
                  role,
                  image
              }             = user
        this.success(
            {
                user: {
                    uuid      : user._id,
                    email     : user.email,
                    first_name: user.firstName,
                    last_name : user.lastName,
                    role      : user.role,
                    image     : user.image,
                },
                token
            })
    }

    createJwt(user: UserInterface): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(
                {
                    uuid: user._id/*,
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

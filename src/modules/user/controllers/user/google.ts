import ApiController from "../../../../core/api-controller"
import User, {UserLoginInterface, UserInterface, UserSource, UserStatus} from "../../schema/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface GoogleParamsInterface {
    token: string;
}

class Google extends ApiController<never, never, GoogleParamsInterface> {
    async execute() {

        const data = this.request.body

        try {

            console.log(data.token)
            const googleData = jwt.decode(data.token);
            console.log(googleData)
            return this.success(googleData)
            /*
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
            }*/

            this.error("INVALID_USER_OR_PASSWORD")

        } catch (e) {
            this.exception(e)
        }

    }

}

export default Google

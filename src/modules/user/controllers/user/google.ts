import ApiController from "../../../../core/api-controller"
import User, {UserLoginRequestInterface, UserInterface, UserSource, UserStatus} from "../../schema/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Login from "./login";
import {OAuth2Client} from "google-auth-library"

export interface GoogleParamsInterface {
    token: string;
}

export interface GooglePayloadInterface {
    iss: string;
    azp: string;
    aud: string;
    sub: string;
    email: string;
    email_verified: boolean;
    nbf: number,
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    locale: string;
    iat: number,
    exp: number,
    jti: string;
}


class Google extends Login<GoogleParamsInterface> {

    async execute() {

        const data = this.request.body


        try {

            const client             = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
            const verifiedToken: any = await client.verifyIdToken({
                idToken : data.token as string,
                audience: process.env.GOOGLE_CLIENT_ID as string
            })

            const googleData: GooglePayloadInterface = verifiedToken.payload

            let user = await User.findOne(
                {
                    email: googleData.email
                }
            ) as UserInterface | null

            if (user && user.status != UserStatus.CONFIRMED) {
                return this.error("INVALID_USER")
            } else {
                if (!user) {
                    const newUser = new User({
                        first_name: googleData.name,
                        last_name : googleData.family_name,
                        email     : googleData.email,
                        role      : "customer",
                        image     : googleData.picture,
                        status    : googleData.email_verified ? UserStatus.CONFIRMED : UserStatus.PENDING,
                        source    : UserSource.GOOGLE,
                    })
                    user          = await newUser.save()
                }
            }
            return this.successToken(user)

        } catch (e) {
            console.log(e)
            this.exception("INVALID_TOKEN")
        }

    }

}

export default Google

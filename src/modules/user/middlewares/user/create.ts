import {check} from "express-validator"
import User from "../../schema/user";
import commonValidators from "./create_update";

const validators: any[] = [
    ...commonValidators,
    check("password", "PASSWORD_EMPTY")
        .not()
        .isEmpty(),
    check("email", "USER_EMAIL_INVALID")
        .custom(async (email) => {
            const exists = await User.findOne({email})
            if (exists) {
                throw new Error(`USER_EMAIL_IS_IN_USE`)
            }
        }),
]


export default validators

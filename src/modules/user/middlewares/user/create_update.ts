import {check} from "express-validator"
import Role from "../../../role/schema/role";
import bcrypt from "bcryptjs";

const validators: any[] = [
    check("first_name", "FIRST_NAME_EMPTY")
        .trim()
        .not()
        .isEmpty(), // string
    check("last_name", "LAST_NAME_EMPTY")
        .trim()
        .not()
        .isEmpty(), // string
    check("email", "EMAIL_EMPTY")
        .trim()
        .not()
        .isEmpty(),
    check("email", "EMAIL_INVALID")
        .isEmail(),
    check("role", "ROLE_EMPTY")
        .trim()
        .not()
        .isEmpty()
        .custom(async (role) => {
            const exists = await Role.findOne({code: role})
            if (!exists) {
                throw new Error(`ROL_NOT_EXISTS`)
            }
        }),
    check("password")
        .trim()
        .customSanitizer((password:string) => {
            if(password) {
                const salt = bcrypt.genSaltSync()
                return bcrypt.hashSync(password, salt)
            }
            return undefined
        }),
    check("image")
        .trim()
]

export default validators

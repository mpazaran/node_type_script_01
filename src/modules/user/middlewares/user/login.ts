import {check} from "express-validator"
import bcrypt from "bcryptjs";

const validators: any[] = [
    check("email", "EMAIL_EMPTY")
        .trim()
        .not()
        .isEmpty(),
    check("password", "PASSWORD_EMPTY")
        .trim()
        .not()
        .isEmpty()
]

export default validators

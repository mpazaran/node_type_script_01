import {check} from "express-validator"
import bcrypt from "bcryptjs";

const validators: any[] = [
    check("token", "TOKEN_EMPTY")
        .trim()
        .not()
        .isEmpty()
]

export default validators

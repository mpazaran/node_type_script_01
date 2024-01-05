import {check} from "express-validator"
import Role from "../schema/role";

const validators: any[] = [
    check("code")
        .trim()
        .not()
        .isEmpty().custom(async (code) => {
        const exists = await Role.findOne({code})
        if (exists) {
            throw new Error(`ROL_CODE_EXISTS`)
        }
    }),
    check("name")
        .trim()
        .not()
        .isEmpty(),
    check("description", "ROL_DESCRIPTION")
        .trim()
]

export default validators

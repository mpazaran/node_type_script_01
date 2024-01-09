import {check} from "express-validator"
import Role, {RoleActionInterface} from "../schema/role";

const validators: any[] = [
    check("code")
        .trim()
        .not()
        .isEmpty()
        .custom(async (code) => {
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
        .trim(),
    check("actions", "IS_NOT_AN_ARRAY")
        .isArray()
        .custom(async (options: RoleActionInterface[]) => {
            const unique: { [key: string]: string } = {}
            for (let i = 0; i < options.length; i++) {
                let option = options[i]
                if (unique.hasOwnProperty(option.path) && unique[option.path] == option.method) {
                    throw new Error("NON_UNIQUE_VALUES")
                }
                unique[option.path] = option.method
            }
        })
]

export default validators

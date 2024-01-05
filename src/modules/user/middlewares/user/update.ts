import commonValidators from "./create_update";
import {check, Meta} from "express-validator";
import User from "../../schema/user";

const validators: any[] = [
    check("id", "INVALID_ID")
        .trim()
        .not()
        .isEmpty()
        .isMongoId()
        .custom(async (id: string) => {
            let catalog = await User.findOne({_id: id})
            if (!catalog) {
                throw new Error("NONEXISTENT_USER")
            }
        }),
    check("email")
        .custom(async (email: string, meta: Meta) => {
            const exists = await User.findOne({email})
            if (exists && exists?.id !== meta.req.params?.id) {
                throw new Error(`EMAIL_IS_IN_USE`)
            }
        }),
    ...commonValidators,
]

export default validators

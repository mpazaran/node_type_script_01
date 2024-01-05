import {check, Meta} from "express-validator";
import User from "../../schema/user";

const validators: any[] = [
    check("id", "INVALID_ID")
        .trim()
        .not()
        .isEmpty()
        .isMongoId()
        .custom(async (id: string) => {
            let catalog = await User.findOne({
                _id   : id,
                status: {
                    $ne: "d"
                }
            })
            if (!catalog) {
                throw new Error("NONEXISTENT_USER")
            }
        })
]

export default validators

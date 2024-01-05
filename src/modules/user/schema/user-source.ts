import {Schema, model} from "mongoose"

const UserSourceSchema = new Schema({
    code       : {
        type    : "string",
        required: [
            true,
            `CODE_REQUIRED:`
        ],
        unique  : true
    },
    name       : {
        type    : "string",
        required: [
            true,
            `NAME_REQUIRED:`
        ]
    },
    description: {
        type    : "string"
    }
})

UserSourceSchema.methods.toJSON = function () {
    const {__v, password, _id, ...data} = this.toObject()
    return {
        id: _id,
        ...data
    }
}

export default model("UserSource", UserSourceSchema)

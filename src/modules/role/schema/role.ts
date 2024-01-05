import {Schema, model} from "mongoose"

const RoleSchema = new Schema({
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

RoleSchema.methods.toJSON = function () {
    const {__v, _id, ...data} = this.toObject()
    return {
        id: _id,
        ...data
    }
}


export default model("Role", RoleSchema)

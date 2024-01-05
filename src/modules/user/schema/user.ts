import {Schema, model} from "mongoose"

export enum UserSource {
    API    = "a",
    GOOGLE = "g",
}


export enum UserStatus {
    PENDING   = "p",
    CONFIRMED = "c",
    DELETED   = "d",
    BANNED    = "b",
    SUSPENDED = "s",
}

export enum UserRol {
    ADMIN = "a",
    CMS   = "c",
}

const UserSchema = new Schema({
    first_name: {
        type    : "string",
        required: [
            true,
            `STRINGS_USER_NAME_REQUIRED:`
        ]
    },
    last_name : {
        type    : "string",
        required: [
            true,
            `STRINGS_USER_NAME_REQUIRED:`
        ]
    },
    email     : {
        type    : "string",
        required: [
            true,
            `STRINGS_USER_EMAIL_REQUIRED:`
        ],
        unique  : true
    },
    password  : {
        type    : "string",
        required: [
            true,
            `STRINGS_USER_PASSWORD_REQUIRED:`
        ]
    },
    source    : {
        type    : "string",
        required: [
            true,
            `STRINGS_USER_SOURCE_REQUIRED:`
        ],
        enum    : UserSource
    },
    role      : {
        type    : "string",
        required: [
            true,
            `STRINGS_USER_ROLE_REQUIRED:`
        ],
    },
    image     : {
        type: "string",
    },
    status    : {
        type    : "string",
        required: [
            true,
            `STRINGS_USER_STATE_REQUIRED:`
        ]

    },
})

UserSchema.methods.toJSON = function () {
    const {__v, password, _id, ...data} = this.toObject()
    return {
        id: _id,
        ...data
    }
}

export default model("User", UserSchema)

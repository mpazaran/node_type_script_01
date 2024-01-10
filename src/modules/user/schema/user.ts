import {Schema, model, Types} from "mongoose"

//import Role from "../../role/schema/role"

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

export interface UserInterface {
    _id?: Types.ObjectId
    firstName: string
    lastName: string
    email: string
    password: string
    role: string
    image: string
    status: UserStatus,
    source: UserSource
}

export interface UserLoginRequestInterface {
    email: string
    password: string
}

const UserSchema = new Schema<UserInterface>({
    firstName: {
        type    : "string",
        required: [
            true,
            `USER_NAME_REQUIRED`
        ]
    },
    lastName: {
        type    : "string",
        required: [
            true,
            `USER_NAME_REQUIRED`
        ]
    },
    email     : {
        type    : "string",
        required: [
            true,
            `USER_EMAIL_REQUIRED`
        ],
        unique  : true
    },
    password  : {
        type    : "string",
        required: [
            function () {
                return this.source !== UserSource.GOOGLE;
            },
            `USER_PASSWORD_REQUIRED`
        ]
    },
    source    : {
        type    : "string",
        required: [
            true,
            `USER_SOURCE_REQUIRED`
        ],
        enum    : UserSource
    },
    role      : {
        type    : "string",
        required: [
            true,
            `USER_ROLE_REQUIRED`
        ],
    },
    image     : {
        type: "string",
    },
    status    : {
        type    : "string",
        required: [
            true,
            `USER_STATE_REQUIRED`
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

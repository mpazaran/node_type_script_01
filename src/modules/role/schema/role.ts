import {Schema, model, Types, Model} from "mongoose"
import {RouteMethods} from "../../../core/module-router";

export interface RoleActionInterface {
    _id?: Types.ObjectId
    method: RouteMethods
    path: string
    label: string
}

const RoleActionSchema = new Schema<RoleActionInterface>({
    method: {
        type    : String,
        required: [
            true,
            `VALUE_REQUIRED`
        ]
    },
    path: {
        type    : String,
        required: [
            true,
            `VALUE_REQUIRED`
        ]
    },
    label: {
        type    : String,
        required: [
            true,
            `LABEL_REQUIRED`
        ]
    }
})

export interface RoleInterface {
    _id?: Types.ObjectId
    code: "string"
    name: "string"
    description: "string"
    actions: RoleActionInterface[]
}

type RoleProps = {
    actions: Types.DocumentArray<RoleActionInterface>;
};

type RoleModelType = Model<RoleInterface, {}, RoleProps>;

const RoleSchema = new Schema<RoleInterface, RoleModelType>({
    code       : {
        type    : "string",
        required: [
            true,
            `CODE_REQUIRED`
        ],
        unique  : true
    },
    name       : {
        type    : "string",
        required: [
            true,
            `NAME_REQUIRED`
        ]
    },
    description: {
        type: "string"
    },
    actions    : [RoleActionSchema]
})

RoleSchema.methods.toJSON = function () {
    const {__v, _id, ...data} = this.toObject()
    return {
        id: _id,
        ...data
    }
}


RoleActionSchema.methods.toJSON = function () {
    const {__v, ...data} = this.toObject()
    return {
        ...data
    }
}

RoleSchema.methods.toJSON = function () {
    const {__v, ...data} = this.toObject()
    data.actions              = data.actions.map((value: RoleActionInterface) => {
            const {
                      _id,
                      ...roleActionValue
                  } = value
            return roleActionValue
        }
    )
    return {
        ...data
    }
}

export default model("Role", RoleSchema)

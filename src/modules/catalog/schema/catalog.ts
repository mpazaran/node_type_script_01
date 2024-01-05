import {Schema, model} from "mongoose"

export enum CatalogType {
    COLOR = "c",
    IMAGE = "i",
    TEXT  = "t"
}

export enum CatalogVisibility {
    PUBLIC    = "public",
    PROTECTED = "protected",
    PRIVATE   = "private"
}

export interface CatalogValueSchemaInterface {
    _id?: string
    value: string
    label: string
}

const CatalogValueSchema = new Schema<CatalogValueSchemaInterface>({
    value: {
        type    : "string",
        required: [
            true,
            `CODE_REQUIRED:`
        ],
        unique  : true,
        index   : {
            unique: false,
            sparse: false
        }
    },
    label: {
        type    : "string",
        required: [
            true,
            `NAME_REQUIRED:`
        ]
    }
})

const CatalogSchema = new Schema({
    code       : {
        type    : "string",
        required: [
            true,
            `CODE_REQUIRED:`
        ],
        unique  : true,
        index   : {
            unique: false,
            sparse: true
        }
    },
    name       : {
        type    : "string",
        required: [
            true,
            `NAME_REQUIRED:`
        ]
    },
    icon       : {
        type: "string"
    },
    description: {
        type: "string"
    },
    type       : {
        type: "string",
        enum: CatalogType
    },
    visibility       : {
        type: "string",
        enum: CatalogVisibility
    },
    options    : {
        type: [CatalogValueSchema],
    }
})


CatalogValueSchema.methods.toJSON = function () {
    const {__v, _id, ...data} = this.toObject()
    return {
        id: _id,
        ...data
    }
}

CatalogSchema.methods.toJSON = function () {
    const {__v, _id, ...data} = this.toObject()
    data.options              = data.options.map((value: CatalogValueSchemaInterface) => {
            const {
                      _id,
                      ...catalogOptionValue
                  } = value
            return catalogOptionValue
        }
    )
    return {
        id: _id,
        ...data
    }
}

export default model("Catalog", CatalogSchema)

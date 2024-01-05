import {Schema, Types, model, Model} from 'mongoose';

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

export interface CatalogValueInterface {
    _id?: Types.ObjectId
    value: string
    label: string
}

const CatalogValueSchema = new Schema<CatalogValueInterface>({
    value: {
        type    : String,
        required: [
            true,
            `VALUE_REQUIRED:`
        ],
        unique  : true,
        index   : {
            unique: false,
            sparse: false
        }
    },
    label: {
        type    : String,
        required: [
            true,
            `LABEL_REQUIRED:`
        ]
    }
})

export interface CatalogInterface {
    _id?: Types.ObjectId
    code: "string"
    name: "string"
    icon?: "string"
    description?: "string"
    type: CatalogType
    visibility: CatalogVisibility
    options: CatalogValueInterface[]
}


type CatalogProps = {
    options: Types.DocumentArray<CatalogValueInterface>;
};

type CatalogModelType = Model<CatalogInterface, {}, CatalogProps>;

const CatalogSchema = new Schema<CatalogInterface, CatalogModelType>({
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
    visibility : {
        type: "string",
        enum: CatalogVisibility
    },
    options    : [CatalogValueSchema]
})


CatalogValueSchema.methods.toJSON = function () {
    const {__v, ...data} = this.toObject()
    return {
        ...data
    }
}

CatalogSchema.methods.toJSON = function () {
    const {__v, ...data} = this.toObject()
    data.options              = data.options.map((value: CatalogValueInterface) => {
            const {
                      _id,
                      ...catalogOptionValue
                  } = value
            return catalogOptionValue
        }
    )
    return {
        ...data
    }
}

export default model<CatalogInterface, CatalogModelType>("Catalog", CatalogSchema)

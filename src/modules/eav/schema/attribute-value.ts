import {Schema, Types} from "mongoose";

export interface AttributeValueInterface {
    _id?: Types.ObjectId
    code: string,
    value: any
}

const AttributeValueSchema = new Schema<AttributeValueInterface>({
    code: {
        type    : String,
        ref     : 'attributes.code',
        required: [
            true,
            `PRODUCT_ATTRIBUTE_CODE_REQUIRED`
        ]
    },
    value    : {
        type    : Schema.Types.Mixed,
        required: [
            true,
            `PRODUCT_ATTRIBUTE_VALUE_REQUIRED`
        ],
        index   : {
            unique: false,
            sparse: false
        }
    }
})


export {
    AttributeValueSchema,
}

import {model, Model, Schema, Types} from "mongoose";
import {UploadedFileInterface, UploadedFileSchema} from "../../media/schema/uploaded-file"
import {ProductAttributeTreeInterface, ProductAttributeTreeSchema} from "./attribute-tree";

import {AttributeValueInterface, AttributeValueSchema} from "../../eav/schema/attribute-value"
import Entity, {EntityInstanceInterface} from "../../eav/schema/entity";

export interface ProductInterface extends EntityInstanceInterface {
    _id?: Types.ObjectId
    sku: "string"
    name: "string"
    shortDescription?: "string"
    description?: "string"
    enabled: boolean
    price?: number
    images?: UploadedFileInterface[]
    videos?: UploadedFileInterface[]
    audios?: UploadedFileInterface[]
    files?: UploadedFileInterface[]
    attributeTree?: ProductAttributeTreeInterface,
    childProducts?: Types.ObjectId[]
}

export type ProductProps = {
    attributes: Types.DocumentArray<AttributeValueInterface>;
    images: Types.DocumentArray<UploadedFileInterface>;
    videos: Types.DocumentArray<UploadedFileInterface>;
    audios: Types.DocumentArray<UploadedFileInterface>;
    files: Types.DocumentArray<UploadedFileInterface>;
    attributeTree: Types.DocumentArray<ProductAttributeTreeInterface>;
};

export type ProductModelType = Model<ProductInterface, {}, ProductProps>;

const ProductSchema = new Schema<ProductInterface, ProductModelType>({
    entityCode      : {
        type    : String,
        required: [
            true,
            `PRODUCT_ENTITY_REQUIRED`
        ]
    },
    sku             : {
        type    : "string",
        required: [
            true,
            `PRODUCT_CODE_REQUIRED`
        ],
        unique  : true,
        index   : {
            unique: false,
            sparse: true
        }
    },
    name            : {
        type    : "string",
        required: [
            true,
            `PRODUCT_NAME_REQUIRED`
        ]
    },
    shortDescription: {
        type: "string"
    },
    description     : {
        type: "string"
    },
    enabled         : {
        type: Boolean
    },
    attributes      : [AttributeValueSchema],
    images          : [UploadedFileSchema],
    videos          : [UploadedFileSchema],
    audios          : [UploadedFileSchema],
    files           : [UploadedFileSchema],
    price           : {
        type      : Number,
        validation: [
            (value: number) => {
                return value >= 0
            },
            "PRODUCT_PRICE_INVALID"
        ],
        required  : [
            true,
            `NUMBER_REQUIRED`
        ]
    },
    attributeTree   : ProductAttributeTreeSchema,
    childProducts   : [
        {
            type: [Schema.Types.ObjectId],
            ref : 'product'
        }
    ]
})

ProductSchema.pre('save', async function (next) {
    const product = this
    try {
        await Entity.validateInstance(product)
        next()
    } catch (e) {
        console.log(e)
        next(e as Error);
    }
});

export {ProductSchema}

const Product = model<ProductInterface, ProductModelType>("product", ProductSchema)
export default Product

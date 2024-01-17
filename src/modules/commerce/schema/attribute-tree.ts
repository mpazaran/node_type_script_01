import {Schema, Types, model, Model} from 'mongoose';

export interface ProductAttributeTreeInterface {
    _id?: Types.ObjectId
    attributeCode: string
    next?: ProductAttributeTreeInterface
}

export type ProductAttributeTreeProps = {
    next: ProductAttributeTreeInterface;
};

export type ProductAttributeTreeModelType = Model<ProductAttributeTreeInterface, {}, ProductAttributeTreeProps>;

const ProductAttributeTreeSchema = new Schema<ProductAttributeTreeInterface, ProductAttributeTreeModelType>({
    attributeCode: {
        type    : String,
        required: [
            true,
            `PRODUCT_ATTRIBUTE_CODE_REQUIRED`
        ],
        index   : {
            unique: false,
            sparse: false
        }
    },
})

/**
 * Recursive Schema
 */
ProductAttributeTreeSchema.add({
    next: ProductAttributeTreeSchema
})

export {ProductAttributeTreeSchema}

export default model<ProductAttributeTreeInterface, ProductAttributeTreeModelType>("product_attribute_value_tree", ProductAttributeTreeSchema)

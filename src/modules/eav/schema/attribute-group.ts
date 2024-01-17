import mongoose from 'mongoose';

const {Schema} = mongoose;

export interface AttributeGroupInterface {
    name: string
    attributes: string[]
}

const AttributeGroupSchema = new Schema<AttributeGroupInterface>({
    name      : {
        type    : String,
        required: true
    },
    attributes: {
        type    : [String],
        required: true
    },
});


export {AttributeGroupSchema}

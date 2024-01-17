import {Schema} from "mongoose";

export interface AttributeOptionInterface {
    value: string
    label: string
}

const AttributeOptionSchema = new Schema<AttributeOptionInterface>({
    value: {
        type    : String,
        required: [
            true,
            "ATTRIBUTE_OPTION_VALUE_REQUIRED"
        ]
    },
    label: {
        type    : String,
        required: [
            true,
            "ATTRIBUTE_OPTION_LABEL_REQUIRED"
        ]
    }
});

export {AttributeOptionSchema}

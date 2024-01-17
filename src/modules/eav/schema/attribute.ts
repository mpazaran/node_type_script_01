import mongoose, {Document, Model, Schema, Types} from "mongoose";
import {AttributeOptionInterface, AttributeOptionSchema} from "./attribute_option";
import {AttributeValueInterface} from "./attribute-value";

export enum AttributeDataType {
    STRING,
    NUMERIC,
    DATE,
    FILE,
    OBJECT_ID,
}

export enum AttributeOptionsSource {
    NONE    = "none",
    ENTITY  = "entity",
    CATALOG = "catalog",
    OPTIONS = "options",
}

export enum AttributeFrontRenders {
    INPUT         = "INPUT",
    DATETIME      = "DATETIME",
    TIME          = "TIME",
    DATE          = "DATE",
    EDITOR        = "EDITOR",
    DROP_DOWN     = "DROP_DOWN",
    CHECKBOX      = "CHECKBOX",
    CHECKBOX_LIST = "CHECKBOX_LIST",
    RADIO         = "RADIO",
    PICKER_FILE   = "PICKER_FILE",
    PICKER_COLOR  = "PICKER_COLOR",
    PICKER_IMAGE  = "PICKER_IMAGE",
    PICKER_TEXT   = "PICKER_TEXT",
    CUSTOM        = "CUSTOM",
}

export interface AttributeInterface {
    _id?: Types.ObjectId
    code: string
    name: string
    isRequired: boolean
    dataType: AttributeDataType
    options?: AttributeOptionInterface[]
    optionsSource: AttributeOptionsSource
    frontRenderer: AttributeFrontRenders
    backRenderer: string,
    defaultValue: string
}

export interface AttributeVictualsInterface {
    errors: string[]
}

export interface AttributeMethodsInterface extends Document<AttributeInterface> {
    /**
     * Model instance mmthods
     */
    validateValue(attributeValue: AttributeValueInterface): Promise<boolean>;
}

type AttributeModelType = Model<AttributeInterface, {}, AttributeMethodsInterface>

interface AttributeProps {
    options: Types.DocumentArray<AttributeOptionInterface>;
}
/**
export class Schema<
    EnforcedDocType = any,
    TModelType = Model<EnforcedDocType, any, any, any>,
    TInstanceMethods = {},
    TQueryHelpers = {},
    TVirtuals = {},
    TStaticMethods = {},
    TSchemaOptions = DefaultSchemaOptions,
    DocType extends ApplySchemaOptions<
      ObtainDocumentType<DocType, EnforcedDocType, ResolveSchemaOptions<TSchemaOptions>>,
      ResolveSchemaOptions<TSchemaOptions>
    > = ApplySchemaOptions<
      ObtainDocumentType<any, EnforcedDocType, ResolveSchemaOptions<TSchemaOptions>>,
      ResolveSchemaOptions<TSchemaOptions>
    >,
    THydratedDocumentType = HydratedDocument<FlatRecord<DocType>, TVirtuals & TInstanceMethods>
  >

 */
const AttributeSchema = new Schema<AttributeInterface, AttributeModelType, AttributeMethodsInterface, {}, AttributeVictualsInterface>({
    code         : {
        type    : String,
        required: [
            true,
            'ATTRIBUTE_CODE_REQUIRED'
        ],
        unique  : true,
        index   : {
            unique: false,
            sparse: true
        }
    },
    name         : {
        type    : String,
        required: true
    },
    dataType     : {
        type    : Number,
        enum    : AttributeDataType,
        required: true
    },
    isRequired   : {
        type    : Boolean,
        required: true,
        default : true
    },
    optionsSource: {
        type    : String,
        enum    : AttributeOptionsSource,
        required: true
    },
    options      : [AttributeOptionSchema],
    frontRenderer: {
        type    : String,
        enum    : AttributeFrontRenders,
        required: true,
    },
    backRenderer : {type: String},
    defaultValue : {type: Schema.Types.Mixed}
});

AttributeSchema.method("validateValue", function (attributeValue: AttributeValueInterface): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        switch (this.dataType) {
            case AttributeDataType.NUMERIC:
                resolve(!isNaN(attributeValue.value))
            case AttributeDataType.STRING:
                if (this.optionsSource == AttributeOptionsSource.OPTIONS) {
                    if (this.options) {
                        const exists = this.options.findIndex(value => value.value == attributeValue.value)
                        if (exists < 0) {
                            this.errors.push(`NONEXISTENT_OPTION_VALUE: ${attributeValue.code} = ${attributeValue.value}`)
                            return resolve(false)
                        }
                        return resolve(true)
                    }
                    return resolve(false)
                }
            //resolve(true)
            case AttributeDataType.DATE:
            //resolve(true)
            case AttributeDataType.OBJECT_ID:
            //resolve(true)
            default:
                resolve(false)
        }
    })
})

export {AttributeSchema}

const Attribute = mongoose.model<AttributeInterface, AttributeModelType>('attribute', AttributeSchema);

export default Attribute

import mongoose, {Model, Schema, Types} from "mongoose";
import {AttributeGroupInterface, AttributeGroupSchema} from "./attribute-group";
import Attribute, {AttributeInterface, AttributeSchema, AttributeDataType} from "./attribute";
import {AttributeValueInterface} from "./attribute-value";

export interface EntityInterface {
    _id?: Types.ObjectId,
    code: string,
    name: string,
    groups: AttributeGroupInterface[]
    attributes: AttributeInterface[]
}

type EntityProps = {
    groups: Types.DocumentArray<AttributeGroupInterface>
    attributes: Types.DocumentArray<AttributeInterface>
}

export interface EntityInstanceInterface {
    entityCode: string
    attributes: AttributeValueInterface[]
}

interface EntityModelInterface extends Model<EntityInterface, {}, EntityProps> {
    validateInstance(entityInstance: EntityInstanceInterface): Promise<boolean>;
}

const EntitySchema = new Schema<EntityInterface, EntityModelInterface>({
    code      : {
        type    : String,
        required: [
            true,
            'ENTITY_CODE_REQUIRED'
        ],
        unique  : true,
        index   : {
            unique: false,
            sparse: true
        }
    },
    name      : {
        type    : String,
        required: [
            true,
            "ENTITY_NAME_REQUIRED"
        ]
    },
    groups    : [AttributeGroupSchema],
    attributes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'attribute'
        }
    ]
});

EntitySchema.statics.validateInstance = function (entityInstance: EntityInstanceInterface): Promise<boolean> {

    /**|
     * Get the entity definition
     */
    /*const entity = await this.findOne({
        code: entityInstance.entityCode
    }) as EntityInterface*/

    //if (entity) {

    //  return false
    //}
    return new Promise<boolean>(async (resolve, reject): Promise<boolean> => {
        const entity = await this.findOne({
            code: entityInstance.entityCode
        }) as EntityInterface
        if (entity) {
            let error = false
            for (let i = 0; i < entity.attributes.length; i++) {
                const attribute = await Attribute.findById(entity.attributes[i])
                if (attribute) {
                    const attributeValue = entityInstance.attributes?.find((attributeValue: AttributeValueInterface) => attributeValue.code === attribute.code)
                    if(attributeValue) {
                        const isValidValue = await attribute.validateValue(attributeValue)
                        console.log("VALIDATION RESULT")
                    } else {
                        if(attribute.isRequired) {
                            error = error || true
                            console.log(`REQUIRED_ATTRIBUTE: ${attribute.code}`)
                        }
                    }
                } else {
                    console.log(`UNDEFINED_ATTRIBUTE_ID: ${entity.attributes[i]}`)
                    error = error || true
                }
            }
            return !error
        }
        return false
    })
}

const Entity = mongoose.model<EntityInterface, EntityModelInterface>('entity', EntitySchema);

export default Entity;

import Attribute from "./Attribute";
import AttributeValueException from "./AttributeException";

class AttributeInteger extends Attribute<number> {

    minValue: number = Number.MIN_SAFE_INTEGER
    maxValue: number = Number.MAX_SAFE_INTEGER

    set value(value: number) {
        const parsed =  Math.floor(value)

        if(parsed != value) {
            throw new AttributeValueException(`${value} is not an integer`)
        }

        if (parsed < this.minValue && parsed > this.maxValue) {
            throw new AttributeValueException(`${value} out of range`)
        }

        this._value = Math.floor(value);
    }
}

export default AttributeInteger

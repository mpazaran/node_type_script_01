import Attribute from "./Attribute";

class AttributeText extends Attribute {

    minLength: number = 0
    maxLength: number = 10240

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }
}

export default AttributeInteger

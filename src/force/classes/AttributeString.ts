import Attribute from "./Attribute";

class AttributeString extends Attribute {

    minLength: number = 0
    maxLength: number = 250

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = value;
    }
}

export default AttributeInteger

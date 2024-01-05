import AttributeEntity from "./AttributeEntity";

class Attribute<T> {
    public id: number
    public code: string
    public attributeEntity: AttributeEntity
    protected _value: T | null | undefined

    constructor(
        attributeEntity: AttributeEntity,
        id: number,
        code: string,
        value: T | null | undefined) {
        this.attributeEntity = attributeEntity
        this.id              = id
        this.code            = code
        this.value           = value
    }

    get value(): T | null | undefined {
        return this._value;
    }

    set value(value: T | null | undefined) {
        this._value = value;
    }
}


export default Attribute

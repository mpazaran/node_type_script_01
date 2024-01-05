import AttributeInteger from "./AttributeInteger";

class AttributeFloat extends AttributeInteger {

    decimals: number = 2
    minValue: number = Number.MIN_VALUE
    maxValue: number = Number.MAX_VALUE

    set value(value: number) {
        super.value = Number(this.decimals.toFixed(this.decimals));
    }
}

export default AttributeFloat

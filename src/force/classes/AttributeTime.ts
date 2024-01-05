import Attribute from "./Attribute";
import AttributeValueException from "./AttributeException";

class AttributeTime extends Attribute {

    private _minute: number = 0
    private _hour: number   = 0
    private _second: number = 0

    private pad(value: number): string {
        return value < 10 ? `0${value}` : value.toString();
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        const parts = value
            .split(":")
            .map(value => parseInt(value)) as number[]
        this.hour   = parts[0] || 0
        this.minute = parts[1] || 0
        this.second = parts[2] || 0
        this._value = value;
    }

    get minute(): number {
        return this._minute;
    }

    set minute(value: number) {
        if (value < 0 || value > 60) {
            throw new AttributeValueException(`"${value}" is an invalid value for minute`)
        }
        this._minute = value;
        this._value  = this.pad(this._hour) + ":" + this.pad(this._minute) + ":" + this.pad(this._second)
    }

    get hour(): number {
        return this._hour;
    }

    set hour(value: number) {
        if (value < 0 || value > 23) {
            throw new AttributeValueException(`"${value}" is an invalid value for hour`)
        }
        this._hour  = value;
        this._value = this.pad(this._hour) + ":" + this.pad(this._minute) + ":" + this.pad(this._second)
    }

    get second(): number {
        return this._second;
    }

    set second(value: number) {
        if (value < 0 || value > 60) {
            throw new AttributeValueException(`"${value}" is an invalid value for second`)
        }
        this._second = value;
        this._value  = this.pad(this._hour) + ":" + this.pad(this._minute) + ":" + this.pad(this._second)
    }
}

export default AttributeInteger

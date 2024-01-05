class AttributeValueException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AttributeValueException"; // Set your error name
        Object.setPrototypeOf(this, new.target.prototype); // Maintain proper stack trace
    }
}

export default AttributeValueException

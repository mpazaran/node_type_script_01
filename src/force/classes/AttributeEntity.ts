export class AttributeRule {
    mess
}

class AttributeEntity {

    public code: string
    public singular: string
    public plural: string
    public pronoun: string
    public type: string
    public scenarios: string[] = []
    public rules: string[] = []

    constructor(
        code: string,
        singular: string,
        plural: string,
        pronoun: string,
        type: string
    ) {
        this.code     = code
        this.singular = singular
        this.plural   = plural
        this.pronoun  = pronoun
        this.type     = type
    }

}


export default AttributeEntity

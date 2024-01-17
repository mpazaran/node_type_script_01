export interface CatalogOption {
    value: any
    label: string
}

export interface AbstractSource {
    getOptions(): CatalogOption[]

    getDefaultOption(): CatalogOption

    isValid(value: any): boolean
}
/*
export abstract class AbstractCatalog {
    source: AbstractSource
    public code: string = ""
    required: tru
}*/

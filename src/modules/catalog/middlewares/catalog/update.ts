import {check, Meta} from "express-validator"
import Catalog, {CatalogType, CatalogValueSchemaInterface, CatalogVisibility} from "../../schema/catalog";

const validators: any[] = [
    check("id", "INVALID_ID")
        .trim()
        .not()
        .isEmpty()
        .isMongoId()
        .custom(async (id: string) => {
            let catalog = await Catalog.findOne({_id: id})
            if (!catalog) {
                throw new Error("NONEXISTENT_CATALOG")
            }
        }),
    check("code")
        .trim()
        .not()
        .isEmpty()
        .custom(async (code: string, meta: Meta) => {
            const exists = await Catalog.findOne({code})
            if (exists && exists.id !== meta.req.params?.id) {
                throw new Error(`CATALOG_CODE_EXISTS`)
            }
        }),
    check("name", "NAME_IS_REQUIRED")
        .trim()
        .not()
        .isEmpty(),
    check("icon")
        .trim(),
    check("description")
        .trim(),
    check("type", "CATALOG_TYPE")
        .trim()
        .not()
        .isEmpty()
        .isIn(Object.values(CatalogType)),
    check("visibility", "INVALID_VISIBILITY_TYPE")
        .not()
        .isEmpty()
        .isIn(Object.values(CatalogVisibility)),
    check("options", "IS_NOT_AN_ARRAY")
        .isArray()
        .custom(async (options: CatalogValueSchemaInterface[]) => {
            const unique: { [key: string]: boolean } = {}
            for (let i = 0; i < options.length; i++) {
                let option = options[i]
                if (unique.hasOwnProperty(option.value)) {
                    throw new Error("NON_UNIQUE_VALUES")
                }
                unique[option.value] = true
            }
        })
]

export default validators

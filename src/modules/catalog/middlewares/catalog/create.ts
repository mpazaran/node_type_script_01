import {check} from "express-validator"
import Catalog, {CatalogType, CatalogValueInterface, CatalogVisibility} from "../../schema/catalog";

const validators: any[] = [
    check("code")
        .trim()
        .not()
        .isEmpty()
        .custom(async (code) => {
            const exists = await Catalog.findOne({code})
            if (exists) {
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
        .custom(async (options: CatalogValueInterface[]) => {
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

import {check} from "express-validator";
import {SearchFilterInterface} from "../../../../core/api-controller";

import Search from "../../controllers/user/search";

const getFilter = (condition: string, value: any): any => {

    switch (condition) {
        case "":
            return value
        case ">":
        case "gt":
            return {"$gt": value}
        case "<":
        case "lt":
            return {"$lt": value}
        case ">>":
        case "gte":
            return {"$gte": value}
        case "<<":
        case "lte":
            return {"$lte": value}
        case "!":
        case "ne":
            return {"$ne": value}
        case "in":
            return {"$in": value.split(".")}
        case "nin":
            return {"$nin": value.split(",")}
        case "^":
        case "starts":
            return {
                "$regex"  : `^${value}`,
                "$options": "i"
            }
        case "$":
        case "ends":
            return {
                "$regex"  : `${value}$`,
                "$options": "i"
            }
        case "~":
        case "contain":
            return {
                "$regex"  : `.*${value}.*`,
                "$options": "i"
            }
        case "><":
        case "between":
            const between = value.split(",")
            return {
                "$gte": between[0],
                "$lte": between[1] || undefined
            }
        case "e":
        case "exists":
            return {"$exists": true}
        case "r":
        case "regexCaseSensitive":
            return {"$regex": `${value}`}
        case "m":
        case "elemMatch":
            return {"$elemMatch": {subField: value}}
        case "al":
        case "arrayLength":
            return {"$size": value}
        case "!>":
        case "!gt":
            return {"$not": {"$gt": value}}
        case "!<":
        case "!lt":
            return {"$not": {"$lt": value}}
        case "!<<":
        case "!gte":
            return {"$not": {"$gte": value}}
        case "!>>":
        case "!lte":
            return {"$not": {"$lte": value}}
        case "!in":
            return {"$not": {"$in": value}}
        case "!nin":
            return {"$not": {"$nin": value}}
        case "!^":
        case "!starts":
            return {
                "$not": {
                    "$regex"  : `^${value}`,
                    "$options": "i"
                }
            }
        case "!$":
        case "!ends":
            return {
                "$not": {
                    "$regex"  : `${value}$`,
                    "$options": "i"
                }
            }
        case "!~":
        case "!contain":
            return {
                "$not": {
                    "$regex"  : `.*${value}.*`,
                    "$options": "i"
                }
            }
        case "!e":
        case "!exists":
            return {"$not": {"$exists": value}}
        case "!><":
        case "!between":
            const notBetween = value.split(",")
            return {
                "$lt": notBetween[0],
                "$gt": notBetween[1] || undefined
            }
        case "!r":
        case "!regexCaseSensitive":
            return {"$not": {"$regex": `${value}`}}
        case "!m":
        case "!elemMatch":
            return {"$not": {"$elemMatch": {subField: value}}}
        case "!al":
        case "!arrayLength":
            return {"$not": {"$size": value}}
    }
}

const validators: any[] = [
    check("f")
        .trim()
        .customSanitizer((filtersQuery: string) => {
            try {
                if (filtersQuery) {
                    const filters      = (filtersQuery || "").split(";")
                    const query: any[] = []
                    for (let i = 0; i < filters.length; i++) {
                        let parts                     = filters[i].split(":");
                        let [field, condition, value] = parts
                        if (parts.length == 2) {
                            value     = condition
                            condition = ""
                        } else {
                            if (parts.length < 2) {
                                value     = ""
                                condition = ""
                            }
                        }
                        query.push({[field]: getFilter(condition, value)})
                    }
                    return {
                        "$and": query
                    }
                }
                return undefined
            } catch (e) {
                console.log(e)
                return {}
            }
        })
]

export default validators

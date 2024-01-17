import Attribute, {AttributeInterface, AttributeDataType} from "../modules/eav/schema/attribute";

import * as dotenv from "dotenv";

dotenv.config();

import MainDB from "../source/MainDB";
import Entity from "../modules/eav/schema/entity";

let connection = MainDB.getInstance(process.env.MONGO_CONNECTION as string)

const test = async () => {

    await Entity.deleteMany({})
    const attributeList = await Attribute.find({
        code: {
            $in: [
                "size",
                "color",
                "expirationDate",
                "manual",
                "weight"
            ]
        }
    })

    const attributeIds: string[] = []
    for (let i = 0; i < attributeList.length; i++) {
        const attribute = attributeList[i]
        attributeIds.push(attribute.id)
    }

    const entity = new Entity({
        code      : "product",
        name      : "Product",
        groups    : [],
        attributes: attributeIds
    })

    await entity.save()

    console.log("READY!!!")

}
test()

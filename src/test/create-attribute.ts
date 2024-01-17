import Attribute, {
    AttributeInterface,
    AttributeDataType,
    AttributeOptionsSource, AttributeFrontRenders
} from "../modules/eav/schema/attribute";

import * as dotenv from "dotenv";

dotenv.config();

import MainDB from "../source/MainDB";

let connection = MainDB.getInstance(process.env.MONGO_CONNECTION as string)

const test = async () => {
    await Attribute.deleteMany({})
    const sizeAttribute = new Attribute({
        code         : "size",
        name         : "Size",
        dataType     : AttributeDataType.STRING,
        options      : [],
        frontRenderer: AttributeFrontRenders.PICKER_TEXT,
        backRenderer : "",
        defaultValue : "",
        optionsSource: AttributeOptionsSource.OPTIONS,
    })
    sizeAttribute.options?.push(
        {
            value: "sm",
            label: "Small"
        })
    sizeAttribute.options?.push({
        value: "md",
        label: "Medium"
    })
    sizeAttribute.options?.push({
        value: "large",
        label: "Large"
    })
    sizeAttribute.options?.push({
        value: "xl",
        label: "Extra Large"
    })
    await sizeAttribute.save()

    const colorAttribute = new Attribute({
        code         : "color",
        name         : "Color",
        dataType     : AttributeDataType.STRING,
        options      : [],
        frontRenderer: AttributeFrontRenders.PICKER_COLOR,
        backRenderer : "",
        defaultValue : "",
        optionsSource: AttributeOptionsSource.OPTIONS,
    })
    colorAttribute.options?.push(
        {
            value: "white",
            label: "White"
        })
    colorAttribute.options?.push({
        value: "red",
        label: "Red"
    })
    colorAttribute.options?.push({
        value: "black",
        label: "Black"
    })
    colorAttribute.options?.push({
        value: "blue",
        label: "Blue"
    })
    await colorAttribute.save()

    const expirationDateAttribute = new Attribute({
        code         : "expirationDate",
        name         : "Expiration Date",
        dataType     : AttributeDataType.DATE,
        frontRenderer: AttributeFrontRenders.DATE,
        backRenderer : "",
        defaultValue : "",
        optionsSource: AttributeOptionsSource.NONE,
    })
    await expirationDateAttribute.save()

    const manualAttribute = new Attribute({
        code         : "manual",
        name         : "Manual",
        dataType     : AttributeDataType.FILE,
        frontRenderer: AttributeFrontRenders.PICKER_FILE,
        backRenderer : "",
        defaultValue : "",
        optionsSource: AttributeOptionsSource.NONE,
    })
    await manualAttribute.save()


    const weightAttribute = new Attribute({
        code         : "weight",
        name         : "Weight",
        dataType     : AttributeDataType.NUMERIC,
        frontRenderer: AttributeFrontRenders.INPUT,
        backRenderer : "",
        defaultValue : "",
        optionsSource: AttributeOptionsSource.NONE,
    })
    await weightAttribute.save()

    console.log("READY!!!")
}

test()

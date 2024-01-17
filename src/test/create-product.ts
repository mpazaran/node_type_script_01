import Attribute, {AttributeInterface, AttributeDataType} from "../modules/eav/schema/attribute";

import * as dotenv from "dotenv";

dotenv.config();

import MainDB from "../source/MainDB";
import Entity from "../modules/eav/schema/entity";

let connection = MainDB.getInstance(process.env.MONGO_CONNECTION as string)

const test = async () => {

}

test()

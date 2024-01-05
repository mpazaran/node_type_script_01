import mongoose, {Mongoose} from "mongoose";

class MainDB {

    private static connection: Mongoose | undefined

    public static async getInstance(connectionString: string) {
        if (MainDB.connection === undefined) {
            try {
                MainDB.connection = await mongoose.connect(
                    connectionString,
                    {}
                )

            } catch (e) {
                console.log(e)
                throw new Error("Can't connect to mongo")
            }
        }
        return MainDB.connection
    }

}

export default MainDB

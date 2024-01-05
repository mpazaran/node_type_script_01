import ApiController, {GetIdParamInterface, SearchQueryInterface} from "../../../../core/api-controller"
import User from "../../schema/user"


class Search extends ApiController<GetIdParamInterface, SearchQueryInterface> {
    async execute() {

        const page: number                  = this.request.query.p || 0
        const pageSize: number              = this.request.query.ps || 20
        //const query: { [key: string]: any } = this.request.query.f || {}
        //const query: { [key: string]: any } = this.request.query.f ? {} : this.request.query?.f as { [key: string]: any }
        const query: { [key: string]: any } = this.request.query?.f as { [key: string]: any }

        console.log(this.request.query.f)

        /*if (query.hasOwnProperty("status")) {
            let newAnd = [
                typeof query.status == "object" ? query.status : {status: query.status},
                {
                    status: {"$ne": "d"}
                }
            ]

            delete query.status

            if (query.hasOwnProperty("$and")) {
                query["$and"].push(newAnd[0])
                query["$and"].push(newAnd[1])
            } else {
                query["$and"] = newAnd
            }

        } else {
            query.status = {
                status: {"$ne": "d"}
            }
        }*/

        const totalPromise = User.countDocuments(query)
        const usersPromise = User
            .find(query)
            .skip(page * pageSize)
            .limit(pageSize)

        const [total, list] = await Promise.all([
            totalPromise,
            usersPromise
        ])

        this.success({
            total,
            list
        })
    }
}

export default Search

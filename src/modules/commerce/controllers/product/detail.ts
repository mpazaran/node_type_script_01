import ApiController, {GetIdParamInterface, SearchQueryInterface} from "../../../../core/controllers/api-controller"
import User from "../../schema/user"


class Detail extends ApiController<never, any, any> {
    async execute() {

        const page: number     = this.request.query.p || 0
        const pageSize: number = this.request.query.ps || 20
        let query: any         = this.getQuery(true)

        const totalPromise = User.countDocuments(query as { [key: string]: any })
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

export default Detail

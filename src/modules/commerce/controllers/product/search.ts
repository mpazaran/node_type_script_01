import ApiController, {GetIdParamInterface, SearchQueryInterface} from "../../../../core/controllers/api-controller"
import User from "../../schema/user"
import {ProductStatus} from "../../../user/schema/user";


class Search extends ApiController<GetIdParamInterface, never, never> {
    async execute() {

        const id = this.request.params.id

        const usersPromise = User
            .findOne({
                _id: id,
                status: ProductStatus.
            })

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

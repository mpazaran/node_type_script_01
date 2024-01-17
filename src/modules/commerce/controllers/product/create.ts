import ApiController from "../../../../core/controllers/api-controller"
import User, {UserInterface, UserSource, ProductStatus} from "../../schema/user";

class Create extends ApiController<never, never, UserInterface> {

    async execute() {

        const data = this.request.body

        data.status = ProductStatus.PENDING
        data.source = UserSource.API

        const newItem = new User(data)

        try {
            let result = await newItem.save()
            this.success(result)
        } catch (e) {
            this.exception(e)
        }

    }
}

export default Create

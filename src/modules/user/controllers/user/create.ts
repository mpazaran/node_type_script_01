import ApiController from "../../../../core/api-controller"
import User, {UserInterface, UserRol, UserSource, UserStatus} from "../../schema/user";

class Create extends ApiController<never, never, UserInterface> {

    async execute() {

        const data = this.request.body

        data.status = UserStatus.PENDING
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

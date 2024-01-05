import ApiController from "../../../../core/api-controller"
import User, {UserRol, UserSource, UserStatus} from "../../schema/user";

interface UserCreate {
    first_name: string
    last_name: string
    email: string
    password: string
    role: UserRol
    image: string
    status: UserStatus,
    source: UserSource
}

class Create extends ApiController<never, never, UserCreate> {
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

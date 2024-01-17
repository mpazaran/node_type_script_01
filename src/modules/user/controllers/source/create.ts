import ApiController from "../../../../core/controllers/api-controller"
import UserSource from "../../schema/user-source";

interface UserSourceCreate {
    code: string
    name: string
    description?: string
}

class Create extends ApiController<never, never, UserSourceCreate> {
    async execute() {

        const data = this.request.body

        const newItem = new UserSource(data)

        try {
            let result = await newItem.save()
            this.success(result)
        } catch (e) {
            console.log(e)
            this.error("Fail")
        }

    }
}

export default Create

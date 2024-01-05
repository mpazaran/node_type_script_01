import ApiController from "../../../core/api-controller"
import Role from "../schema/role";

interface RolCreate {
    code: string
    name: string
    description?: string
}

class Create extends ApiController<never, never, RolCreate> {
    async execute() {

        const data = this.request.body

        const newItem = new Role(data)

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

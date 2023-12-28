import ApiController from "../../../core/api-controller"

interface UserCreate {
    firstName: string,
    lastName: string
}

class Create extends ApiController<never, never, UserCreate> {
    execute() {
        console.log(this.request.body.firstName)
        this.success({
            "name": this.request.body.firstName
        })
    }
}

export default Create

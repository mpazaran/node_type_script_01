import ApiController, {GetIdParamInterface} from "../../../core/api-controller"


class Get extends ApiController<GetIdParamInterface, never, never> {
    execute() {

        console.log(this.request.params.id)


        this.success({
            "id": "sad"
        })
    }
}

export default Get

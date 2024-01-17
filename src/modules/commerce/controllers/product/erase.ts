import ApiController, {GetIdParamInterface} from "../../../../core/controllers/api-controller"
import User from "../../schema/user";

class Erase extends ApiController<GetIdParamInterface, never, never> {

    async execute() {

        try {
            const id = this.request.params.id
            await User.findByIdAndUpdate(id, {
                status: "d"
            })
            const deleted = await User.findOne({_id: id})
            this.success(deleted)
        } catch (e) {
            this.exception(e)
        }

    }
}

export default Erase

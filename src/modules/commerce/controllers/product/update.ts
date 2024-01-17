import ApiController, {GetIdParamInterface} from "../../../../core/controllers/api-controller"
import User from "../../schema/user";
import {UserSource, ProductStatus} from "../../schema/user";


interface UserUpdate {
  first_name: string
  last_name: string
  email: string
  password?: string
  role: string
  image: string
  status: ProductStatus,
  source: UserSource
}

class Update extends ApiController<GetIdParamInterface, never, UserUpdate> {

  async execute() {

    try {
      const data = this.request.body
      const id   = this.request.params.id
      await User.findByIdAndUpdate(id, data)
      const updated = await User.findOne({_id: id})
      this.success(updated)
    } catch (e) {
      this.exception(e)
    }

  }
}

export default Update

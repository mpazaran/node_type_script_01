import ApiController, {GetIdParamInterface} from "../../../../core/controllers/api-controller"
import Catalog, {CatalogInterface} from "../../schema/catalog";


class Update extends ApiController<GetIdParamInterface, never, CatalogInterface> {
    async execute() {

        try {
            const data = this.request.body
            const id   = this.request.params.id
            await Catalog.findByIdAndUpdate(id, data)
            const updated = await Catalog.findOne({_id: id})
            this.success(updated)
        } catch (e) {
            this.exception(e)
        }

    }
}

export default Update

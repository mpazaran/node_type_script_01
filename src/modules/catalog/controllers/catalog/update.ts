import ApiController from "../../../../core/api-controller"
import Catalog from "../../schema/catalog";

interface CatalogUpdateParams {
    id: string
}

interface CatalogUpdate {
    code: string
    name: string
    icon?: string
    description?: string
}

class Update extends ApiController<CatalogUpdateParams, never, CatalogUpdate> {
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

import ApiController from "../../../../core/api-controller"
import Catalog from "../../schema/catalog";

interface CatalogCreate {
    code: string
    name: string
    icon?: string
    description?: string
}

class Create extends ApiController<never, never, CatalogCreate> {
    async execute() {

        const data = this.request.body

        const newItem = new Catalog(data)

        try {
            let result = await newItem.save()
            this.success(result)
        } catch (e) {
            this.exception(e)
        }

    }
}

export default Create

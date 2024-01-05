import ApiController from "../../../../core/api-controller"
import Catalog, {CatalogInterface} from "../../schema/catalog";

class Create extends ApiController<never, never, CatalogInterface> {
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

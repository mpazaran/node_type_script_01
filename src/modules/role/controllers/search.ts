import ApiController from "../../../core/controllers/api-controller"

interface UserQueryParams {
    name: string,
    age: number
}

class Search extends ApiController<never, UserQueryParams> {
    execute() {
        console.log(this)
        this.success({
            "controller": "search"
        })
    }
}

export default Search

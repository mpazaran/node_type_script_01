import ModuleRouter from "../../core/module-router";

import {
    middlewaresCreate,
    middlewaresUpdate,
    middlewaresSearch,
    middlewaresDelete,
    middlewaresLogin,
    middlewaresGoogle
} from "./middlewares/user/index"

import {
    Create,
    Update,
    Search,
    Erase,
    Login,
    Google
} from "./controllers/user/index"

const router = new ModuleRouter("user")

router.exposeProtected("post", "/", Create, middlewaresCreate)
router.exposeProtected("put", "/:id", Update, middlewaresUpdate)
router.exposeProtected("post", "/search", Search, middlewaresSearch)
router.exposeProtected("delete", "/:id", Erase, middlewaresDelete)
router.expose("post", "/login", Login, middlewaresLogin)
router.expose("post", "/google", Google, middlewaresGoogle)

export {router}

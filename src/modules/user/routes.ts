import ModuleRouter from "../../core/module-router";

import middlewaresCreate from "./middlewares/user/create"
import middlewaresUpdate from "./middlewares/user/update"
import middlewaresSearch from "./middlewares/user/search"
import middlewaresDelete from "./middlewares/user/delete"
import middlewaresLogin from "./middlewares/user/login"

import Create from "./controllers/user/create"
import Update from "./controllers/user/update"
import Search from "./controllers/user/search"
import Erase from "./controllers/user/erase"
import Login from "./controllers/user/login"

const router = new ModuleRouter("user")

router.exposeProtected("post", "/", Create, middlewaresCreate)
router.exposeProtected("put", "/:id", Update, middlewaresUpdate)
router.exposeProtected("post", "/search", Search, middlewaresSearch)
router.exposeProtected("delete", "/:id", Erase, middlewaresDelete)
router.expose("post", "/login", Login, middlewaresLogin)

export {router}

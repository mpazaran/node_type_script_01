import ModuleRouter from "../../core/module-router";
import Create from "./controllers/create"
import Update from "./controllers/update"
import Get from "./controllers/get"
import Search from "./controllers/search"
import Erase from "./controllers/erase"
import middlewaresCreate from "./middlewares/create"

const router = new ModuleRouter("rol")

router.expose("post", "/", Create, middlewaresCreate);
router.expose("put", "/", Update);
router.expose("get", "/:id", Get);
router.expose("get", "/", Search);
router.expose("delete", "/:id", Erase);

export {router}

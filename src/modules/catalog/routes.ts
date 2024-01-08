import ModuleRouter from "../../core/module-router";

import middlewaresCatalogCreate from "./middlewares/catalog/create"
import middlewaresCatalogUpdate from "./middlewares/catalog/update"

import Create from "./controllers/catalog/create"
import Update from "./controllers/catalog/update"

const router = new ModuleRouter("catalog")

router.expose("post", "/", Create, middlewaresCatalogCreate);
router.expose("put", "/:id", Update, middlewaresCatalogUpdate);

export {router}

import ModuleRouter from "../../core/module-router";

const router = new ModuleRouter("catalog")

router.expose("post", "/", "catalog/controllers/catalog/create", "catalog/middlewares/catalog/create");
router.expose("put", "/:id", "catalog/controllers/catalog/update", "catalog/middlewares/catalog/update");

export {router}

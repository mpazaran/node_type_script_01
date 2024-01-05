import ModuleRouter from "../../core/module-router";

const router = new ModuleRouter("rol")

router.expose("post", "/", "role/controllers/create", "role/middlewares/create");
router.expose("put", "/", "role/controllers/update");
router.expose("get", "/:id", "role/controllers/get");
router.expose("get", "/", "role/controllers/search");
router.expose("delete", "/:id", "role/controllers/erase");

export {router}

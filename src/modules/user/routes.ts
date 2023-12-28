import ModuleRouter from "../../core/module-router";

const router = new ModuleRouter("user")

router.expose("post", "/", "user/controllers/create");
router.expose("put", "/", "user/controllers/update");
router.expose("get", "/:id", "user/controllers/get");
router.expose("get", "/", "user/controllers/search");
router.expose("delete", "/:id", "user/controllers/erase");

export {router}

import ModuleRouter from "../../core/module-router";

const router = new ModuleRouter("user")

router.expose("post", "/", "user/controllers/user/create", "user/middlewares/user/create");
router.expose("put", "/:id", "user/controllers/user/update", "user/middlewares/user/update");
router.expose("get", "/", "user/controllers/user/search", "user/middlewares/user/search");
router.expose("delete", "/:id", "user/controllers/user/erase");

export {router}

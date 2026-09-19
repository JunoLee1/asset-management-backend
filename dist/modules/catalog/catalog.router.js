"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogRouter = void 0;
const express_1 = require("express");
const catalog_controller_1 = require("./catalog.controller");
const authenticate_1 = require("../../middlewares/authenticate");
const router = (0, express_1.Router)();
exports.catalogRouter = router;
router.use(authenticate_1.authenticate);
router.get('/', catalog_controller_1.catalogController.list);
router.get('/:id', catalog_controller_1.catalogController.getById);
router.post('/', catalog_controller_1.catalogController.create);
router.patch('/:id', catalog_controller_1.catalogController.update);
router.delete('/:id', catalog_controller_1.catalogController.remove);
//# sourceMappingURL=catalog.router.js.map
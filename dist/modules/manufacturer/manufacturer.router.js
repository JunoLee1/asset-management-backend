"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manufacturerRouter = void 0;
const express_1 = require("express");
const manufacturer_controller_1 = require("./manufacturer.controller");
const authenticate_1 = require("../../middlewares/authenticate");
const router = (0, express_1.Router)();
exports.manufacturerRouter = router;
router.use(authenticate_1.authenticate);
router.get('/', manufacturer_controller_1.manufacturerController.list);
router.get('/:id', manufacturer_controller_1.manufacturerController.getById);
router.post('/', manufacturer_controller_1.manufacturerController.create);
router.patch('/:id', manufacturer_controller_1.manufacturerController.update);
router.delete('/:id', manufacturer_controller_1.manufacturerController.remove);
//# sourceMappingURL=manufacturer.router.js.map
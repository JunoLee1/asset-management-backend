"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.licenseRouter = void 0;
const express_1 = require("express");
const license_controller_1 = require("./license.controller");
const authenticate_1 = require("../../middlewares/authenticate");
const router = (0, express_1.Router)();
exports.licenseRouter = router;
router.use(authenticate_1.authenticate);
router.get('/', license_controller_1.licenseController.list);
router.get('/:id', license_controller_1.licenseController.getById);
router.post('/', license_controller_1.licenseController.create);
router.patch('/:id', license_controller_1.licenseController.update);
router.delete('/:id', license_controller_1.licenseController.remove);
router.post('/:id/assign', license_controller_1.licenseController.assign);
router.post('/:id/assignments/:assignmentId/unassign', license_controller_1.licenseController.unassign);
//# sourceMappingURL=license.router.js.map
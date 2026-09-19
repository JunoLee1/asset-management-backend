"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.softwareRouter = void 0;
const express_1 = require("express");
const software_controller_1 = require("./software.controller");
const authenticate_1 = require("../../../middlewares/authenticate");
const router = (0, express_1.Router)();
exports.softwareRouter = router;
router.use(authenticate_1.authenticate);
// 인벤토리 CRUD
router.get('/', software_controller_1.softwareController.list);
router.post('/', software_controller_1.softwareController.create);
router.get('/:id', software_controller_1.softwareController.getById);
router.patch('/:id', software_controller_1.softwareController.update);
router.delete('/:id', software_controller_1.softwareController.remove);
// 허가유무 변경 (ADR 0002 결정 2 — SECURITY_OFFICER 별 라우트)
router.patch('/:id/permission', software_controller_1.softwareController.updatePermission);
// Ingest — endpoint agent push (ADR 0002 Stage 0)
router.post('/ingest', software_controller_1.softwareController.ingest);
//# sourceMappingURL=software.router.js.map
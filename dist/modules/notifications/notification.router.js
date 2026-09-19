"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRouter = void 0;
const express_1 = require("express");
const notification_controller_1 = require("./notification.controller");
const authenticate_1 = require("../../middlewares/authenticate");
const router = (0, express_1.Router)();
exports.notificationRouter = router;
router.use(authenticate_1.authenticate);
router.get('/my', notification_controller_1.notificationController.my);
router.post('/:id/read', notification_controller_1.notificationController.markRead);
router.post('/process-outbox', notification_controller_1.notificationController.processOutbox); // ADMIN manual trigger
router.post('/run-termination-check', notification_controller_1.notificationController.runTerminationCheck); // ADMIN manual trigger
router.post('/run-compliance-check', notification_controller_1.notificationController.runComplianceCheck); // ADMIN manual trigger
//# sourceMappingURL=notification.router.js.map
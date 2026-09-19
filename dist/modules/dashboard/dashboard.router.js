"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRouter = void 0;
const express_1 = require("express");
const dashboard_controller_1 = require("./dashboard.controller");
const authenticate_1 = require("../../middlewares/authenticate");
const router = (0, express_1.Router)();
exports.dashboardRouter = router;
router.use(authenticate_1.authenticate);
router.get('/', dashboard_controller_1.dashboardController.getDashboard);
//# sourceMappingURL=dashboard.router.js.map
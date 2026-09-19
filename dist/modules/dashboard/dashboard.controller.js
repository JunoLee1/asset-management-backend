"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = void 0;
const dashboard_service_1 = require("./dashboard.service");
const getDashboard = async (req, res) => {
    const data = await dashboard_service_1.dashboardService.getDashboard(req.user);
    res.json(data);
};
exports.dashboardController = { getDashboard };
//# sourceMappingURL=dashboard.controller.js.map
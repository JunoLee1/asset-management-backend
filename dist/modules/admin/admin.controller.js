"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const admin_service_1 = require("./admin.service");
const inviteUser = async (req, res) => {
    const result = await admin_service_1.adminService.inviteUser(req.body);
    res.status(201).json(result);
};
exports.adminController = { inviteUser };
//관리자 핵심가치를 관리를 편하게 잘볼수있는 ux/ui 디자인
//일반 유저는 무엇을 대여중인지 알수있어야한다...
//# sourceMappingURL=admin.controller.js.map
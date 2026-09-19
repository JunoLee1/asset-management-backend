"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationController = void 0;
const notification_service_1 = require("./notification.service");
const requestHelpers_1 = require("../../lib/requestHelpers");
const AppError_1 = require("../../lib/AppError");
const my = async (req, res) => {
    const result = await notification_service_1.notificationService.listMy((0, requestHelpers_1.getRequester)(req).id);
    res.json(result);
};
const markRead = async (req, res) => {
    await notification_service_1.notificationService.markRead((0, requestHelpers_1.requireId)(req), (0, requestHelpers_1.getRequester)(req).id);
    res.status(204).end();
};
// ADMIN 전용 manual trigger (cron 또는 외부 scheduler 가 호출 가능)
const processOutbox = async (req, res) => {
    const requester = (0, requestHelpers_1.getRequester)(req);
    if (requester.role !== 'ADMIN') {
        throw new AppError_1.AppError(403, '관리자 권한이 필요합니다.');
    }
    const result = await notification_service_1.notificationService.processOutbox();
    res.json(result);
};
// ADMIN 전용 — 퇴사 알람 트리거 (외부 scheduler 또는 수동 호출)
const runTerminationCheck = async (req, res) => {
    const requester = (0, requestHelpers_1.getRequester)(req);
    if (requester.role !== 'ADMIN') {
        throw new AppError_1.AppError(403, '관리자 권한이 필요합니다.');
    }
    const result = await notification_service_1.notificationService.runTerminationCheck();
    res.json(result);
};
// ADMIN 전용 — 컴플라이언스 알람 트리거
const runComplianceCheck = async (req, res) => {
    const requester = (0, requestHelpers_1.getRequester)(req);
    if (requester.role !== 'ADMIN') {
        throw new AppError_1.AppError(403, '관리자 권한이 필요합니다.');
    }
    const result = await notification_service_1.notificationService.runComplianceCheck();
    res.json(result);
};
exports.notificationController = {
    my,
    markRead,
    processOutbox,
    runTerminationCheck,
    runComplianceCheck,
};
//# sourceMappingURL=notification.controller.js.map
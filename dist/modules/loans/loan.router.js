"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanRouter = void 0;
const express_1 = require("express");
const loan_controller_1 = require("./loan.controller");
const authenticate_1 = require("../../middlewares/authenticate");
const router = (0, express_1.Router)();
exports.loanRouter = router;
router.use(authenticate_1.authenticate);
// 정적 path 가 :id 보다 먼저 와야 함 (express 매칭 순서)
router.get('/overdue', loan_controller_1.loanController.overdue);
router.get('/my', loan_controller_1.loanController.my);
router.get('/lookup', loan_controller_1.loanController.lookup); // QR 디코드 후 호출
router.get('/', loan_controller_1.loanController.list);
router.get('/:id', loan_controller_1.loanController.getById);
router.post('/', loan_controller_1.loanController.create);
// 프론트 호환: 상태에 따라 approve-manager / approve-admin 자동 분기
router.post('/:id/approve', loan_controller_1.loanController.approve);
// S1: 4개 endpoint 분리 (의도 명확화) + ADR 0003: 부서장 단계 추가
router.post('/:id/approve-manager', loan_controller_1.loanController.approveManager); // 대여 1차 (팀장)
router.post('/:id/approve-dept', loan_controller_1.loanController.approveDept); // 대여 2차 (부서장 — ADR 0003)
router.post('/:id/approve-admin', loan_controller_1.loanController.approveAdmin); // 대여 최종 (관리자)
router.post('/:id/approve-return-manager', loan_controller_1.loanController.approveReturnManager); // 반납 1차
router.post('/:id/finalize-return', loan_controller_1.loanController.finalizeReturn); // 반납 최종
router.post('/:id/checkout', loan_controller_1.loanController.checkout);
router.post('/:id/receive', loan_controller_1.loanController.receive); // 사원 수령 확정 (R-1)
router.post('/:id/reject', loan_controller_1.loanController.reject);
router.post('/:id/cancel', loan_controller_1.loanController.cancel);
router.post('/:id/recall', loan_controller_1.loanController.recall);
router.post('/:id/return', loan_controller_1.loanController.returnLoan);
router.post('/:id/inspect', loan_controller_1.loanController.inspect);
// 대여 연장 흐름
router.post('/:id/extend', loan_controller_1.loanController.requestExtension); // 신청자 연장 요청
router.post('/extensions/:id/approve-manager', loan_controller_1.loanController.approveExtensionManager); // 팀장 1차 승인
router.post('/extensions/:id/approve-admin', loan_controller_1.loanController.approveExtensionAdmin); // 관리자 2차 승인
router.post('/extensions/:id/reject', loan_controller_1.loanController.rejectExtension); // 반려
//# sourceMappingURL=loan.router.js.map
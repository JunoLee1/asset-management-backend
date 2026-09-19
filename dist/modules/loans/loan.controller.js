"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanController = void 0;
const loan_service_1 = require("./loan.service");
const loan_schema_1 = require("../../schemas/loan.schema");
const requestHelpers_1 = require("../../lib/requestHelpers");
const list = async (req, res) => {
    const query = loan_schema_1.listLoansQuerySchema.parse(req.query);
    const result = await loan_service_1.loanService.list(query, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const getById = async (req, res) => {
    const result = await loan_service_1.loanService.getById((0, requestHelpers_1.requireId)(req), (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const my = async (req, res) => {
    const result = await loan_service_1.loanService.my((0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const overdue = async (req, res) => {
    const result = await loan_service_1.loanService.overdue((0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const lookup = async (req, res) => {
    const query = loan_schema_1.lookupLoanQuerySchema.parse(req.query);
    const result = await loan_service_1.loanService.lookup(query.assetCode, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const create = async (req, res) => {
    const body = loan_schema_1.createLoanSchema.parse(req.body);
    const result = await loan_service_1.loanService.create(body, (0, requestHelpers_1.getRequester)(req));
    res.status(201).json(result);
};
const approveManager = async (req, res) => {
    const body = loan_schema_1.approveLoanSchema.parse(req.body);
    const result = await loan_service_1.loanService.approveManager((0, requestHelpers_1.requireId)(req), body, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const approveDept = async (req, res) => {
    const body = loan_schema_1.approveLoanSchema.parse(req.body);
    const result = await loan_service_1.loanService.approveDept((0, requestHelpers_1.requireId)(req), body, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const approveAdmin = async (req, res) => {
    const body = loan_schema_1.approveLoanSchema.parse(req.body);
    const result = await loan_service_1.loanService.approveAdmin((0, requestHelpers_1.requireId)(req), body, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
// 프론트 호환: 대여 상태에 따라 단계별 service 자동 분기 (ADR 0003: PENDING_DEPT 포함)
const approve = async (req, res) => {
    const id = (0, requestHelpers_1.requireId)(req);
    const body = loan_schema_1.approveLoanSchema.parse(req.body);
    const requester = (0, requestHelpers_1.getRequester)(req);
    const loan = await loan_service_1.loanService.getById(id, requester);
    if (loan.status === 'PENDING_MANAGER') {
        const result = await loan_service_1.loanService.approveManager(id, body, requester);
        res.json(result);
    }
    else if (loan.status === 'PENDING_DEPT') {
        const result = await loan_service_1.loanService.approveDept(id, body, requester);
        res.json(result);
    }
    else if (loan.status === 'PENDING_ADMIN') {
        const result = await loan_service_1.loanService.approveAdmin(id, body, requester);
        res.json(result);
    }
    else {
        res.status(400).json({ message: `현재 상태(${loan.status})에서는 승인할 수 없습니다.` });
    }
};
const approveReturnManager = async (req, res) => {
    const result = await loan_service_1.loanService.approveReturnManager((0, requestHelpers_1.requireId)(req), (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const finalizeReturn = async (req, res) => {
    const result = await loan_service_1.loanService.finalizeReturn((0, requestHelpers_1.requireId)(req), (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const checkout = async (req, res) => {
    const body = loan_schema_1.approveLoanSchema.parse(req.body);
    const result = await loan_service_1.loanService.checkout((0, requestHelpers_1.requireId)(req), body, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const receive = async (req, res) => {
    const result = await loan_service_1.loanService.receive((0, requestHelpers_1.requireId)(req), (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const reject = async (req, res) => {
    const body = loan_schema_1.rejectLoanSchema.parse(req.body);
    const result = await loan_service_1.loanService.reject((0, requestHelpers_1.requireId)(req), body, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const cancel = async (req, res) => {
    const result = await loan_service_1.loanService.cancel((0, requestHelpers_1.requireId)(req), (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const recall = async (req, res) => {
    const body = loan_schema_1.recallLoanSchema.parse(req.body);
    const result = await loan_service_1.loanService.recall((0, requestHelpers_1.requireId)(req), body, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
// FE 호환: body 받아도 ignore — 검수 단계에서 ASSET_MANAGER 가 다시 입력
const returnLoan = async (req, res) => {
    loan_schema_1.returnLoanSchema.parse(req.body);
    const result = await loan_service_1.loanService.requestReturn((0, requestHelpers_1.requireId)(req), (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const inspect = async (req, res) => {
    const body = loan_schema_1.inspectLoanSchema.parse(req.body);
    const result = await loan_service_1.loanService.inspect((0, requestHelpers_1.requireId)(req), body, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const requestExtension = async (req, res) => {
    const id = (0, requestHelpers_1.requireId)(req);
    const { days } = req.body;
    const result = await loan_service_1.loanService.requestExtension(id, days, (0, requestHelpers_1.getRequester)(req));
    res.status(201).json(result);
};
const approveExtensionManager = async (req, res) => {
    const extensionId = (0, requestHelpers_1.requireId)(req);
    const result = await loan_service_1.loanService.approveExtensionManager(extensionId, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const approveExtensionAdmin = async (req, res) => {
    const extensionId = (0, requestHelpers_1.requireId)(req);
    const result = await loan_service_1.loanService.approveExtensionAdmin(extensionId, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const rejectExtension = async (req, res) => {
    const extensionId = (0, requestHelpers_1.requireId)(req);
    const { reason } = req.body;
    const result = await loan_service_1.loanService.rejectExtension(extensionId, reason ?? '', (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
exports.loanController = {
    list,
    getById,
    my,
    overdue,
    lookup,
    create,
    approve,
    approveManager,
    approveDept,
    approveAdmin,
    approveReturnManager,
    finalizeReturn,
    checkout,
    receive,
    reject,
    cancel,
    recall,
    returnLoan,
    inspect,
    requestExtension,
    approveExtensionManager,
    approveExtensionAdmin,
    rejectExtension,
};
//# sourceMappingURL=loan.controller.js.map
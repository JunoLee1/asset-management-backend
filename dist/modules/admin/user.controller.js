"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const user_schema_1 = require("../../schemas/user.schema");
const requestHelpers_1 = require("../../lib/requestHelpers");
const list = async (req, res) => {
    const query = user_schema_1.listUsersQuerySchema.parse(req.query);
    const requester = (0, requestHelpers_1.getRequester)(req);
    res.json(await user_service_1.userService.list(query, requester));
};
const getById = async (req, res) => {
    res.json(await user_service_1.userService.getById((0, requestHelpers_1.requireId)(req)));
};
const update = async (req, res) => {
    res.json(await user_service_1.userService.update((0, requestHelpers_1.requireId)(req), req.body, (0, requestHelpers_1.getRequester)(req), (0, requestHelpers_1.getAuditContext)(req)));
};
const deactivate = async (req, res) => {
    res.json(await user_service_1.userService.deactivate((0, requestHelpers_1.requireId)(req), req.body, (0, requestHelpers_1.getRequester)(req), (0, requestHelpers_1.getAuditContext)(req)));
};
const activate = async (req, res) => {
    res.json(await user_service_1.userService.activate((0, requestHelpers_1.requireId)(req), req.body, (0, requestHelpers_1.getRequester)(req), (0, requestHelpers_1.getAuditContext)(req)));
};
const reinvite = async (req, res) => {
    res
        .status(201)
        .json(await user_service_1.userService.reinvite((0, requestHelpers_1.requireId)(req), req.body, (0, requestHelpers_1.getRequester)(req), (0, requestHelpers_1.getAuditContext)(req)));
};
const listHistory = async (req, res) => {
    const query = user_schema_1.listUserHistoryQuerySchema.parse(req.query);
    res.json(await user_service_1.userService.listHistory((0, requestHelpers_1.requireId)(req), query));
};
exports.userController = {
    list,
    getById,
    update,
    deactivate,
    activate,
    reinvite,
    listHistory,
};
//# sourceMappingURL=user.controller.js.map
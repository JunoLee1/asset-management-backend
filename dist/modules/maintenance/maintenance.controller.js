"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maintenanceController = void 0;
const maintenance_service_1 = require("./maintenance.service");
const maintenance_schema_1 = require("../../schemas/maintenance.schema");
const requestHelpers_1 = require("../../lib/requestHelpers");
const list = async (req, res) => {
    const query = maintenance_schema_1.listMaintenancesQuerySchema.parse(req.query);
    const result = await maintenance_service_1.maintenanceService.list(query, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const getById = async (req, res) => {
    const result = await maintenance_service_1.maintenanceService.getById((0, requestHelpers_1.requireId)(req), (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const create = async (req, res) => {
    const body = maintenance_schema_1.createMaintenanceSchema.parse(req.body);
    const result = await maintenance_service_1.maintenanceService.create({ ...body, scheduledAt: new Date(body.scheduledAt) }, (0, requestHelpers_1.getRequester)(req));
    res.status(201).json(result);
};
const update = async (req, res) => {
    const body = maintenance_schema_1.updateMaintenanceSchema.parse(req.body);
    const result = await maintenance_service_1.maintenanceService.update((0, requestHelpers_1.requireId)(req), {
        ...body,
        scheduledAt: body.scheduledAt ? new Date(body.scheduledAt) : undefined,
    }, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const approve = async (req, res) => {
    const body = maintenance_schema_1.approveMaintenanceSchema.parse(req.body ?? {});
    const result = await maintenance_service_1.maintenanceService.approve((0, requestHelpers_1.requireId)(req), (0, requestHelpers_1.getRequester)(req), body);
    res.json(result);
};
const reject = async (req, res) => {
    const body = maintenance_schema_1.rejectMaintenanceSchema.parse(req.body);
    const result = await maintenance_service_1.maintenanceService.reject((0, requestHelpers_1.requireId)(req), body, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const cancel = async (req, res) => {
    const result = await maintenance_service_1.maintenanceService.cancel((0, requestHelpers_1.requireId)(req), (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const assign = async (req, res) => {
    const body = maintenance_schema_1.assignMaintenanceSchema.parse(req.body);
    const result = await maintenance_service_1.maintenanceService.assign((0, requestHelpers_1.requireId)(req), body, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
exports.maintenanceController = {
    list,
    getById,
    create,
    update,
    approve,
    reject,
    cancel,
    assign,
};
//# sourceMappingURL=maintenance.controller.js.map
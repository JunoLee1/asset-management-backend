"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.licenseController = void 0;
const license_service_1 = require("./license.service");
const license_schema_1 = require("../../schemas/license.schema");
const requestHelpers_1 = require("../../lib/requestHelpers");
const list = async (req, res) => {
    const query = license_schema_1.listLicensesQuerySchema.parse(req.query);
    const result = await license_service_1.licenseService.list(query, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const getById = async (req, res) => {
    const result = await license_service_1.licenseService.getById((0, requestHelpers_1.requireId)(req), (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const create = async (req, res) => {
    const body = license_schema_1.createLicenseSchema.parse(req.body);
    const result = await license_service_1.licenseService.create({
        ...body,
        purchaseDate: new Date(body.purchaseDate),
        expiryDate: body.expiryDate ? new Date(body.expiryDate) : undefined,
    }, (0, requestHelpers_1.getRequester)(req));
    res.status(201).json(result);
};
const update = async (req, res) => {
    const body = license_schema_1.updateLicenseSchema.parse(req.body);
    const expiry = body.expiryDate === null ? null : body.expiryDate ? new Date(body.expiryDate) : undefined;
    const result = await license_service_1.licenseService.update((0, requestHelpers_1.requireId)(req), {
        ...body,
        purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : undefined,
        expiryDate: expiry,
    }, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const remove = async (req, res) => {
    await license_service_1.licenseService.remove((0, requestHelpers_1.requireId)(req), (0, requestHelpers_1.getRequester)(req));
    res.status(204).send();
};
const assign = async (req, res) => {
    const body = license_schema_1.assignLicenseSchema.parse(req.body);
    const result = await license_service_1.licenseService.assign((0, requestHelpers_1.requireId)(req), body, (0, requestHelpers_1.getRequester)(req));
    res.status(201).json(result);
};
const unassign = async (req, res) => {
    const licenseId = (0, requestHelpers_1.requireId)(req);
    const assignmentId = (0, requestHelpers_1.requireId)(req, 'assignmentId');
    const result = await license_service_1.licenseService.unassign(licenseId, assignmentId, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
exports.licenseController = { list, getById, create, update, remove, assign, unassign };
//# sourceMappingURL=license.controller.js.map
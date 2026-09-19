"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.softwareController = void 0;
const software_service_1 = require("./software.service");
const software_schema_1 = require("../../../schemas/software.schema");
const requestHelpers_1 = require("../../../lib/requestHelpers");
const list = async (req, res) => {
    const query = software_schema_1.listSoftwareQuerySchema.parse(req.query);
    const result = await software_service_1.softwareService.list(query, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const getById = async (req, res) => {
    const result = await software_service_1.softwareService.getById((0, requestHelpers_1.requireId)(req), (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const create = async (req, res) => {
    const body = software_schema_1.createSoftwareSchema.parse(req.body);
    const result = await software_service_1.softwareService.create(body, (0, requestHelpers_1.getRequester)(req));
    res.status(201).json(result);
};
const update = async (req, res) => {
    const body = software_schema_1.updateSoftwareSchema.parse(req.body);
    const result = await software_service_1.softwareService.update((0, requestHelpers_1.requireId)(req), body, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const updatePermission = async (req, res) => {
    const body = software_schema_1.updatePermissionSchema.parse(req.body);
    const result = await software_service_1.softwareService.updatePermission((0, requestHelpers_1.requireId)(req), body, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const remove = async (req, res) => {
    await software_service_1.softwareService.remove((0, requestHelpers_1.requireId)(req), (0, requestHelpers_1.getRequester)(req));
    res.status(204).send();
};
const ingest = async (req, res) => {
    const body = software_schema_1.ingestPayloadSchema.parse(req.body);
    const result = await software_service_1.softwareService.ingest(body, (0, requestHelpers_1.getRequester)(req));
    res.status(201).json(result);
};
exports.softwareController = {
    list,
    getById,
    create,
    update,
    updatePermission,
    remove,
    ingest,
};
//# sourceMappingURL=software.controller.js.map
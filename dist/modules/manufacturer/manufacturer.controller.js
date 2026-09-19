"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manufacturerController = void 0;
const manufacturer_service_1 = require("./manufacturer.service");
const manufacturer_schema_1 = require("../../schemas/manufacturer.schema");
const requestHelpers_1 = require("../../lib/requestHelpers");
const list = async (req, res) => {
    const query = manufacturer_schema_1.listManufacturerQuerySchema.parse(req.query);
    const result = await manufacturer_service_1.manufacturerService.list(query, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const getById = async (req, res) => {
    const result = await manufacturer_service_1.manufacturerService.getById((0, requestHelpers_1.requireId)(req), (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const create = async (req, res) => {
    const body = manufacturer_schema_1.createManufacturerSchema.parse(req.body);
    const result = await manufacturer_service_1.manufacturerService.create(body, (0, requestHelpers_1.getRequester)(req));
    res.status(201).json(result);
};
const update = async (req, res) => {
    const body = manufacturer_schema_1.updateManufacturerSchema.parse(req.body);
    const result = await manufacturer_service_1.manufacturerService.update((0, requestHelpers_1.requireId)(req), body, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const remove = async (req, res) => {
    await manufacturer_service_1.manufacturerService.remove((0, requestHelpers_1.requireId)(req), (0, requestHelpers_1.getRequester)(req));
    res.status(204).send();
};
exports.manufacturerController = { list, getById, create, update, remove };
//# sourceMappingURL=manufacturer.controller.js.map
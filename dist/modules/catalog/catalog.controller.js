"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogController = void 0;
const catalog_service_1 = require("./catalog.service");
const catalog_schema_1 = require("../../schemas/catalog.schema");
const requestHelpers_1 = require("../../lib/requestHelpers");
const list = async (req, res) => {
    const query = catalog_schema_1.listCatalogQuerySchema.parse(req.query);
    const result = await catalog_service_1.catalogService.list(query, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const getById = async (req, res) => {
    const result = await catalog_service_1.catalogService.getById((0, requestHelpers_1.requireId)(req), (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const create = async (req, res) => {
    const body = catalog_schema_1.createCatalogSchema.parse(req.body);
    const result = await catalog_service_1.catalogService.create(body, (0, requestHelpers_1.getRequester)(req));
    res.status(201).json(result);
};
const update = async (req, res) => {
    const body = catalog_schema_1.updateCatalogSchema.parse(req.body);
    const result = await catalog_service_1.catalogService.update((0, requestHelpers_1.requireId)(req), body, (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const remove = async (req, res) => {
    await catalog_service_1.catalogService.remove((0, requestHelpers_1.requireId)(req), (0, requestHelpers_1.getRequester)(req));
    res.status(204).send();
};
exports.catalogController = { list, getById, create, update, remove };
//# sourceMappingURL=catalog.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depreciationController = void 0;
const depreciation_service_1 = require("./depreciation.service");
const depreciation_schema_1 = require("../../schemas/depreciation.schema");
const requestHelpers_1 = require("../../lib/requestHelpers");
const getByAssetId = async (req, res) => {
    const result = await depreciation_service_1.depreciationService.getByAssetId((0, requestHelpers_1.requireId)(req, 'assetId'), (0, requestHelpers_1.getRequester)(req));
    res.json(result);
};
const upsert = async (req, res) => {
    const body = depreciation_schema_1.upsertDepreciationSchema.parse(req.body);
    const result = await depreciation_service_1.depreciationService.upsert({ ...body, assetId: (0, requestHelpers_1.requireId)(req, 'assetId') }, (0, requestHelpers_1.getRequester)(req));
    res.status(201).json(result);
};
const remove = async (req, res) => {
    await depreciation_service_1.depreciationService.remove((0, requestHelpers_1.requireId)(req, 'assetId'), (0, requestHelpers_1.getRequester)(req));
    res.status(204).send();
};
exports.depreciationController = { getByAssetId, upsert, remove };
//# sourceMappingURL=depreciation.controller.js.map
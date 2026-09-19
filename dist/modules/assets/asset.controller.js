"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetController = void 0;
const asset_service_1 = require("./asset.service");
const logger_1 = require("../../lib/logger");
const AppError_1 = require("../../lib/AppError");
const cloudinary_1 = require("../../lib/cloudinary");
const asset_schema_1 = require("../../schemas/asset.schema");
const requestHelpers_1 = require("../../lib/requestHelpers");
const create = async (req, res) => {
    const requester = (0, requestHelpers_1.getRequester)(req);
    logger_1.logger.info("자산 등록 컨트롤러 진입");
    const result = await asset_service_1.assetService.create(req.body, requester.id);
    logger_1.logger.info(result);
    res.status(201).json(result);
};
const list = async (req, res) => {
    const requester = (0, requestHelpers_1.getRequester)(req);
    // 쿼리스트링은 모두 문자열이라 zod transform/coerce를 거쳐야 함
    const query = asset_schema_1.listAssetsQuerySchema.parse(req.query);
    const result = await asset_service_1.assetService.list(query, requester);
    res.json(result);
};
const getById = async (req, res) => {
    const requester = (0, requestHelpers_1.getRequester)(req);
    const result = await asset_service_1.assetService.getById((0, requestHelpers_1.requireId)(req), requester);
    res.json(result);
};
const update = async (req, res) => {
    const requester = (0, requestHelpers_1.getRequester)(req);
    const result = await asset_service_1.assetService.update((0, requestHelpers_1.requireId)(req), req.body, requester.id);
    res.json(result);
};
const retire = async (req, res) => {
    const requester = (0, requestHelpers_1.getRequester)(req);
    const { reason } = req.body ?? {};
    const result = await asset_service_1.assetService.retire((0, requestHelpers_1.requireId)(req), requester, reason);
    res.json(result);
};
// 이미지 업로드 — multer.single('image') 미들웨어가 req.file 채움
const uploadImage = async (req, res) => {
    const requester = (0, requestHelpers_1.getRequester)(req);
    if (!(0, cloudinary_1.isCloudinaryConfigured)()) {
        throw new AppError_1.AppError(503, 'Cloudinary 가 설정되지 않았습니다. (.env CLOUDINARY_* 확인)');
    }
    const file = req.file;
    if (!file)
        throw new AppError_1.AppError(400, '파일이 업로드되지 않았습니다.');
    const id = (0, requestHelpers_1.requireId)(req);
    // multer-storage-cloudinary 가 업로드 후 file.path 에 secure_url 을 넣음
    const url = file.path;
    // 기존 이미지 있으면 삭제 (오너십)
    const existing = await asset_service_1.assetService.getById(id, requester);
    if (existing.imageUrl) {
        (0, cloudinary_1.deleteImage)(existing.imageUrl).catch(() => { });
    }
    const result = await asset_service_1.assetService.update(id, { imageUrl: url }, requester.id);
    logger_1.logger.info({ event: 'asset_image_uploaded', assetId: id, url }, '자산 이미지 업로드');
    res.status(201).json(result);
};
const removeImage = async (req, res) => {
    const requester = (0, requestHelpers_1.getRequester)(req);
    const id = (0, requestHelpers_1.requireId)(req);
    const existing = await asset_service_1.assetService.getById(id, requester);
    if (existing.imageUrl) {
        (0, cloudinary_1.deleteImage)(existing.imageUrl).catch(() => { });
    }
    const result = await asset_service_1.assetService.update(id, { imageUrl: null }, requester.id);
    res.json(result);
};
const getHistory = async (req, res) => {
    const requester = (0, requestHelpers_1.getRequester)(req);
    const page = Math.max(1, Number(req.query.page) || 1);
    const result = await asset_service_1.assetService.getHistory((0, requestHelpers_1.requireId)(req), page, requester);
    res.json(result);
};
exports.assetController = { create, list, getById, update, retire, uploadImage, removeImage, getHistory };
//# sourceMappingURL=asset.controller.js.map
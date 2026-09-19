"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBrnHandler = exports.uploadVendorDocumentHandler = exports.getVendorDocuments = exports.blacklistVendor = exports.rejectVendor = exports.submitVendor = exports.inactivateVendor = exports.approveVendor = exports.createVendorDraft = exports.assetCategoryHandlers = exports.vendorHandlers = exports.locationHandlers = exports.teamHandlers = exports.departmentHandlers = void 0;
const AppError_1 = require("../../lib/AppError");
const requestHelpers_1 = require("../../lib/requestHelpers");
const department_service_1 = require("./department.service");
const team_service_1 = require("./team.service");
const location_service_1 = require("./location.service");
const vendor_service_1 = require("./vendor.service");
const assetCategory_service_1 = require("./assetCategory.service");
const cloudinary_1 = require("../../lib/cloudinary");
const ntsBusinessApi_1 = require("../../lib/ntsBusinessApi");
function getId(req) {
    const id = req.params['id'];
    if (typeof id !== 'string' || !id)
        throw new AppError_1.AppError(400, '식별자가 필요합니다.');
    return id;
}
function makeHandlers(service) {
    return {
        list: async (req, res) => {
            const includeDeleted = req.query['includeDeleted'] === 'true';
            const status = req.query['status'];
            res.json(await service.list({ includeDeleted, ...(status ? { status } : {}) }));
        },
        getById: async (req, res) => {
            res.json(await service.getById(getId(req)));
        },
        create: async (req, res) => {
            res.status(201).json(await service.create(req.body));
        },
        update: async (req, res) => {
            res.json(await service.update(getId(req), req.body));
        },
        remove: async (req, res) => {
            res.json(await service.softDelete(getId(req)));
        },
        restore: async (req, res) => {
            res.json(await service.restore(getId(req)));
        },
    };
}
exports.departmentHandlers = makeHandlers(department_service_1.departmentService);
exports.teamHandlers = makeHandlers(team_service_1.teamService);
exports.locationHandlers = makeHandlers(location_service_1.locationService);
exports.vendorHandlers = makeHandlers(vendor_service_1.vendorService);
exports.assetCategoryHandlers = makeHandlers(assetCategory_service_1.assetCategoryService);
const createVendorDraft = async (req, res, next) => {
    try {
        const { id: createdById } = (0, requestHelpers_1.getRequester)(req);
        const result = await vendor_service_1.vendorService.createDraft(req.body, createdById);
        res.status(201).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.createVendorDraft = createVendorDraft;
const approveVendor = async (req, res, next) => {
    try {
        const id = (0, requestHelpers_1.requireId)(req);
        const { id: adminId } = (0, requestHelpers_1.getRequester)(req);
        const result = await vendor_service_1.vendorService.approve(id, adminId);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.approveVendor = approveVendor;
const inactivateVendor = async (req, res, next) => {
    try {
        const id = (0, requestHelpers_1.requireId)(req);
        const result = await vendor_service_1.vendorService.inactivate(id);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.inactivateVendor = inactivateVendor;
const submitVendor = async (req, res, next) => {
    try {
        const id = (0, requestHelpers_1.requireId)(req);
        const result = await vendor_service_1.vendorService.submit(id);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.submitVendor = submitVendor;
const rejectVendor = async (req, res, next) => {
    try {
        const id = (0, requestHelpers_1.requireId)(req);
        const { id: adminId } = (0, requestHelpers_1.getRequester)(req);
        const { reason } = req.body;
        const result = await vendor_service_1.vendorService.reject(id, adminId, reason);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.rejectVendor = rejectVendor;
const blacklistVendor = async (req, res, next) => {
    try {
        const id = (0, requestHelpers_1.requireId)(req);
        const { id: adminId } = (0, requestHelpers_1.getRequester)(req);
        const { reason } = req.body;
        const result = await vendor_service_1.vendorService.blacklist(id, adminId, reason);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.blacklistVendor = blacklistVendor;
const getVendorDocuments = async (req, res, next) => {
    try {
        const id = (0, requestHelpers_1.requireId)(req);
        const result = await vendor_service_1.vendorService.getDocuments(id);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.getVendorDocuments = getVendorDocuments;
const uploadVendorDocumentHandler = async (req, res, next) => {
    try {
        if (!(0, cloudinary_1.isCloudinaryConfigured)()) {
            throw new AppError_1.AppError(503, 'Cloudinary 가 설정되지 않았습니다. (.env CLOUDINARY_* 확인)');
        }
        const vendorId = (0, requestHelpers_1.requireId)(req);
        const { id: uploaderId } = (0, requestHelpers_1.getRequester)(req);
        const file = req.file;
        if (!file)
            throw new AppError_1.AppError(400, '파일이 업로드되지 않았습니다.');
        const { documentType } = req.body;
        if (!documentType)
            throw new AppError_1.AppError(400, 'documentType 이 필요합니다.');
        // multer-storage-cloudinary: file.path = secure_url, file.filename = public_id
        const multerFile = file;
        const result = await vendor_service_1.vendorService.saveDocument(vendorId, uploaderId, {
            documentType,
            publicId: multerFile.filename,
            secureUrl: multerFile.path,
            originalName: file.originalname,
            mimeType: file.mimetype,
            sizeBytes: file.size,
        });
        res.status(201).json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.uploadVendorDocumentHandler = uploadVendorDocumentHandler;
// ── 사업자등록번호 실시간 검증 (국세청 API 프록시) ─────────────────────────────
const validateBrnHandler = async (req, res, next) => {
    try {
        const { brn } = req.body;
        if (!brn || typeof brn !== 'string')
            throw new AppError_1.AppError(400, '사업자등록번호(brn)가 필요합니다.');
        const result = await (0, ntsBusinessApi_1.validateBrn)(brn);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.validateBrnHandler = validateBrnHandler;
//# sourceMappingURL=master.controller.js.map
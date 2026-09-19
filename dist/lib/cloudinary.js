"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinary = exports.deleteImage = exports.extractPublicId = exports.uploadVendorDocument = exports.uploadAssetImage = exports.isCloudinaryConfigured = void 0;
const cloudinary_1 = require("cloudinary");
Object.defineProperty(exports, "cloudinary", { enumerable: true, get: function () { return cloudinary_1.v2; } });
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const multer_1 = __importDefault(require("multer"));
const CLOUD_NAME = process.env['CLOUDINARY_CLOUD_NAME'] ?? '';
const API_KEY = process.env['CLOUDINARY_API_KEY'] ?? '';
const API_SECRET = process.env['CLOUDINARY_API_SECRET'] ?? '';
const isCloudinaryConfigured = () => Boolean(CLOUD_NAME && API_KEY && API_SECRET);
exports.isCloudinaryConfigured = isCloudinaryConfigured;
if ((0, exports.isCloudinaryConfigured)()) {
    cloudinary_1.v2.config({
        cloud_name: CLOUD_NAME,
        api_key: API_KEY,
        api_secret: API_SECRET,
        secure: true,
    });
}
// 자산 이미지 전용 storage (asset_erp/assets 폴더)
const storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: async () => ({
        folder: 'asset_erp/assets',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto' }],
    }),
});
exports.uploadAssetImage = (0, multer_1.default)({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});
// 업체 서류 전용 storage (asset_erp/vendor_documents 폴더, 20 MB)
const vendorDocStorage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: async (_req, file) => ({
        folder: 'asset_erp/vendor_documents',
        allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
        resource_type: file.mimetype === 'application/pdf' ? 'raw' : 'image',
        use_filename: true,
        unique_filename: true,
    }),
});
exports.uploadVendorDocument = (0, multer_1.default)({
    storage: vendorDocStorage,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
});
// URL 에서 public_id 추출 (삭제용)
const extractPublicId = (url) => {
    const match = url.match(/\/asset_erp\/[^.]+/);
    return match ? match[0].slice(1) : null;
};
exports.extractPublicId = extractPublicId;
const deleteImage = async (url) => {
    if (!(0, exports.isCloudinaryConfigured)())
        return;
    const publicId = (0, exports.extractPublicId)(url);
    if (!publicId)
        return;
    await cloudinary_1.v2.uploader.destroy(publicId);
};
exports.deleteImage = deleteImage;
//# sourceMappingURL=cloudinary.js.map
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
export declare const isCloudinaryConfigured: () => boolean;
export declare const uploadAssetImage: multer.Multer;
export declare const uploadVendorDocument: multer.Multer;
export declare const extractPublicId: (url: string) => string | null;
export declare const deleteImage: (url: string) => Promise<void>;
export { cloudinary };
//# sourceMappingURL=cloudinary.d.ts.map
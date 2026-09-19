import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

const CLOUD_NAME = process.env['CLOUDINARY_CLOUD_NAME'] ?? ''
const API_KEY = process.env['CLOUDINARY_API_KEY'] ?? ''
const API_SECRET = process.env['CLOUDINARY_API_SECRET'] ?? ''

export const isCloudinaryConfigured = (): boolean =>
  Boolean(CLOUD_NAME && API_KEY && API_SECRET)

if (isCloudinaryConfigured()) {
  cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET,
    secure: true,
  })
}

// 자산 이미지 전용 storage (asset_erp/assets 폴더)
const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    folder: 'asset_erp/assets',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto' }],
  }),
})

export const uploadAssetImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
})

// 업체 서류 전용 storage (asset_erp/vendor_documents 폴더, 20 MB)
const vendorDocStorage = new CloudinaryStorage({
  cloudinary,
  params: async (_req: Express.Request, file: Express.Multer.File) => ({
    folder: 'asset_erp/vendor_documents',
    allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
    resource_type: file.mimetype === 'application/pdf' ? 'raw' : 'image',
    use_filename: true,
    unique_filename: true,
  }),
})

export const uploadVendorDocument = multer({
  storage: vendorDocStorage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
})

// URL 에서 public_id 추출 (삭제용)
export const extractPublicId = (url: string): string | null => {
  const match = url.match(/\/asset_erp\/[^.]+/)
  return match ? match[0].slice(1) : null
}

export const deleteImage = async (url: string): Promise<void> => {
  if (!isCloudinaryConfigured()) return
  const publicId = extractPublicId(url)
  if (!publicId) return
  await cloudinary.uploader.destroy(publicId)
}

export { cloudinary }

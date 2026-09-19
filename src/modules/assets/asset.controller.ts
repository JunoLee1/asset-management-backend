import type { Request, Response } from 'express'
import { assetService } from './asset.service'
import { logger } from '../../lib/logger'
import { AppError } from '../../lib/AppError'
import { isCloudinaryConfigured, deleteImage } from '../../lib/cloudinary'
import type { CreateAssetInput, UpdateAssetInput } from '../../schemas/asset.schema'
import { listAssetsQuerySchema } from '../../schemas/asset.schema'
import { getRequester, requireId } from '../../lib/requestHelpers'

const create = async (req: Request, res: Response): Promise<void> => {
  const requester = getRequester(req)
  logger.info("자산 등록 컨트롤러 진입")
  const result = await assetService.create(req.body as CreateAssetInput, requester.id)
  logger.info(result)
  res.status(201).json(result)
}

const list = async (req: Request, res: Response): Promise<void> => {
  const requester = getRequester(req)
  // 쿼리스트링은 모두 문자열이라 zod transform/coerce를 거쳐야 함
  const query = listAssetsQuerySchema.parse(req.query)
  const result = await assetService.list(query, requester)
  res.json(result)
}

const getById = async (req: Request, res: Response): Promise<void> => {
  const requester = getRequester(req)
  const result = await assetService.getById(requireId(req), requester)
  res.json(result)
}

const update = async (req: Request, res: Response): Promise<void> => {
  const requester = getRequester(req)
  const result = await assetService.update(requireId(req), req.body as UpdateAssetInput, requester.id)
  res.json(result)
}

// 이미지 업로드 — multer.single('image') 미들웨어가 req.file 채움
const uploadImage = async (req: Request, res: Response): Promise<void> => {
  const requester = getRequester(req)
  if (!isCloudinaryConfigured()) {
    throw new AppError(503, 'Cloudinary 가 설정되지 않았습니다. (.env CLOUDINARY_* 확인)')
  }
  const file = (req as Request & { file?: Express.Multer.File }).file
  if (!file) throw new AppError(400, '파일이 업로드되지 않았습니다.')

  const id = requireId(req)
  // multer-storage-cloudinary 가 업로드 후 file.path 에 secure_url 을 넣음
  const url = (file as unknown as { path: string }).path

  // 기존 이미지 있으면 삭제 (오너십)
  const existing = await assetService.getById(id, requester)
  if (existing.imageUrl) {
    deleteImage(existing.imageUrl).catch(() => {})
  }

  const result = await assetService.update(id, { imageUrl: url } as UpdateAssetInput, requester.id)
  logger.info({ event: 'asset_image_uploaded', assetId: id, url }, '자산 이미지 업로드')
  res.status(201).json(result)
}

const removeImage = async (req: Request, res: Response): Promise<void> => {
  const requester = getRequester(req)
  const id = requireId(req)
  const existing = await assetService.getById(id, requester)
  if (existing.imageUrl) {
    deleteImage(existing.imageUrl).catch(() => {})
  }
  const result = await assetService.update(id, { imageUrl: null } as UpdateAssetInput, requester.id)
  res.json(result)
}

const getHistory = async (req: Request, res: Response): Promise<void> => {
  const requester = getRequester(req)
  const page = Math.max(1, Number(req.query.page) || 1)
  const result = await assetService.getHistory(requireId(req), page, requester)
  res.json(result)
}

const statsByModel = async (req: Request, res: Response): Promise<void> => {
  const includeZero = req.query.includeZero === 'true'
  const result = await assetService.statsByModel(includeZero)
  res.json(result)
}

const listCatalogs = async (req: Request, res: Response): Promise<void> => {
  const categoryId = typeof req.query.categoryId === 'string' ? req.query.categoryId : undefined
  const result = await assetService.listCatalogs({ categoryId })
  res.json(result)
}

export const assetController = { create, list, getById, update, uploadImage, removeImage, getHistory, statsByModel, listCatalogs }

// ADR 0011/0012 — Agent controller

import type { Request, Response } from 'express'
import { agentService } from './agent.service'
import { collectPayloadSchema, blockEventPayloadSchema } from './agent.schema'
import { getRequester } from '../../lib/requestHelpers'

const getBlockList = async (_req: Request, res: Response): Promise<void> => {
  const result = await agentService.getBlockList()
  res.json(result)
}

const reportBlockEvent = async (req: Request, res: Response): Promise<void> => {
  const body = blockEventPayloadSchema.parse(req.body)
  await agentService.reportBlockEvent(body)
  res.status(204).end()
}

const collect = async (req: Request, res: Response): Promise<void> => {
  const body = collectPayloadSchema.parse(req.body)
  const requester = getRequester(req)
  const result = await agentService.collect(body, requester)
  res.json(result)
}

const ingest = async (req: Request, res: Response): Promise<void> => {
  const body = collectPayloadSchema.parse(req.body)
  const requester = getRequester(req)
  const result = await agentService.ingest(body, requester)
  res.json(result)
}

export const agentController = {
  getBlockList,
  reportBlockEvent,
  collect,
  ingest,
}

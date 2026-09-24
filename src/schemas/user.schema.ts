import { z } from 'zod'
import { Role, JobType } from '../generated/prisma/enums'

const roleEnum = z.nativeEnum(Role)

const numericString = z
  .union([z.string(), z.number()])
  .transform((v) => (typeof v === 'string' ? parseInt(v, 10) : v))
  .pipe(z.number().int())

export const listUsersQuerySchema = z.object({
  page: numericString.pipe(z.number().int().positive()).default(1),
  pageSize: numericString.pipe(z.number().int().positive().max(100)).default(20),
  role: roleEnum.optional(),
  isActive: z
    .union([z.string(), z.boolean()])
    .transform((v) => (typeof v === 'boolean' ? v : v === 'true'))
    .optional(),
  teamId: z.string().optional(),
  q: z.string().optional(),
})

// audit 정책: role 변경 / 활성-비활성 시 reason 필수 (회사 정책)
export const updateUserSchema = z
  .object({
    name: z.string().min(1).optional(),
    role: roleEnum.optional(),
    teamId: z.string().nullable().optional(),
    jobType: z.nativeEnum(JobType).nullable().optional(),
    reason: z.string().min(1, 'reason 은 비어있을 수 없습니다.').max(500).optional(),
  })
  .strict()
  .refine(
    (d) => {
      const { reason: _r, ...changes } = d
      return Object.keys(changes).length > 0
    },
    { message: '수정할 필드가 최소 1개 필요합니다.' },
  )
  .refine((d) => !d.role || (d.reason && d.reason.trim().length > 0), {
    message: 'role 변경 시 reason 은 필수입니다.',
    path: ['reason'],
  })

// deactivate / activate 전용 입력 (reason 필수)
export const deactivateUserSchema = z
  .object({
    reason: z.string().min(1, 'reason 은 필수입니다.').max(500),
  })
  .strict()

export const activateUserSchema = z
  .object({
    reason: z.string().min(1, 'reason 은 필수입니다.').max(500),
  })
  .strict()

// reinvite 는 reason 선택 (단순 재발송 케이스 포함)
export const reinviteUserSchema = z
  .object({
    reason: z.string().min(1).max(500).optional(),
  })
  .strict()

// 이력 조회 페이지네이션
export const listUserHistoryQuerySchema = z.object({
  page: numericString.pipe(z.number().int().positive()).default(1),
  pageSize: numericString.pipe(z.number().int().positive().max(100)).default(20),
})

export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type DeactivateUserInput = z.infer<typeof deactivateUserSchema>
export type ActivateUserInput = z.infer<typeof activateUserSchema>
export type ReinviteUserInput = z.infer<typeof reinviteUserSchema>
export type ListUserHistoryQuery = z.infer<typeof listUserHistoryQuerySchema>

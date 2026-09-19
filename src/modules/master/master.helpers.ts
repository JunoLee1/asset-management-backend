import { AppError } from '../../lib/AppError'

export interface ListOptions {
  includeDeleted?: boolean
}

export function buildSoftDeleteWhere(options?: ListOptions): { deletedAt?: null } {
  return options?.includeDeleted ? {} : { deletedAt: null }
}

export interface ReferenceCheck {
  label: string
  countLabel: string
  count: number
}

export function ensureNoReferences(checks: ReferenceCheck[]): void {
  const blocker = checks.find((c) => c.count > 0)
  if (blocker) {
    throw new AppError(
      409,
      `이 ${blocker.label}에 ${blocker.countLabel} ${blocker.count}${blocker.countLabel.endsWith('명') ? '' : '건'}이 있어 삭제할 수 없습니다.`,
    )
  }
}

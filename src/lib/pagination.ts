// 공통 페이지네이션 타입 + 헬퍼
// 각 module 의 list 응답이 같은 shape 사용 — 중복 제거 + 보일러플레이트 통합

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export const paginate = <T>(
  items: T[],
  total: number,
  page: number,
  pageSize: number,
): PaginatedResult<T> => ({
  items,
  total,
  page,
  pageSize,
  totalPages: Math.max(1, Math.ceil(total / pageSize)),
})

// DB findMany + count 를 병렬 실행하는 헬퍼
export async function fetchPage<T>(
  findMany: () => Promise<T[]>,
  count: () => Promise<number>,
): Promise<{ rows: T[]; total: number }> {
  const [rows, total] = await Promise.all([findMany(), count()])
  return { rows, total }
}

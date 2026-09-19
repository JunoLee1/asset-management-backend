import type { AssetClass } from '../../generated/prisma/enums'
import type { PrismaClient } from '../../generated/prisma/client'

const PREFIX: Record<AssetClass, string> = {
  IT_ASSET: 'IT',
  OFFICE_ASSET: 'OFF',
  FACILITY_ASSET: 'FAC',
  NETWORK_ASSET: 'NET',
}

const PAD_LENGTH = 4

// 트랜잭션 클라이언트 또는 prisma 인스턴스를 받을 수 있게 최소 인터페이스만 요구
type CounterTx = Pick<PrismaClient, 'assetCodeCounter'>

/**
 * Class별 독립 카운터에서 자산 코드를 atomic하게 발급한다.
 *
 * - `upsert`로 단일 SQL 실행 → 동시성 안전 (PostgreSQL row-level lock)
 * - 반환된 `nextNumber`는 "다음번에 발급할 번호" → 발급 = nextNumber - 1
 *   - create 분기: nextNumber=2가 저장됨 → 발급 1
 *   - update 분기: 기존값 +1이 저장됨 → 발급 = 기존값 = nextNumber - 1
 *
 * 4자리 미만은 0패딩, 초과는 그대로 (예: 12 → 0012, 12345 → 12345)
 */
export async function generateAssetCode(
  tx: CounterTx,
  assetClass: AssetClass,
): Promise<string> {
  const counter = await tx.assetCodeCounter.upsert({
    where: { class: assetClass }, // class는 자산 관리 타입의 대분류 
    create: { class: assetClass, nextNumber: 2 },
    update: { nextNumber: { increment: 1 } },
  })

  const issued = counter.nextNumber - 1 // 발급 번호
  const padded = String(issued).padStart(PAD_LENGTH, '0')//최대 N개 까지 운영
  return `${PREFIX[assetClass]}-${padded}`
}

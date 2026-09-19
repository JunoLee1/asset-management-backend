import type { AssetClass } from '../../generated/prisma/enums';
import type { PrismaClient } from '../../generated/prisma/client';
type CounterTx = Pick<PrismaClient, 'assetCodeCounter'>;
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
export declare function generateAssetCode(tx: CounterTx, assetClass: AssetClass): Promise<string>;
export {};
//# sourceMappingURL=assetCodeGenerator.d.ts.map
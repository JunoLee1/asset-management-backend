// ADR 0005/0006 — legacy retire 흔적(AssetHistory.action='RETIRED') 을
// Disposal record (status=COMPLETED) 로 backfill.
//
// 옛 `POST /assets/:id/retire` (PR ② 에서 제거됨) 가 Asset.status='RETIRED' +
// AssetHistory(action='RETIRED') 만 남기고 Disposal record 는 생성하지 않았던
// 버그의 데이터 보정용.
//
// 실행:
//   npx ts-node --transpile-only -r dotenv/config scripts/backfill-disposal-from-retire.ts          # dry-run (기본)
//   npx ts-node --transpile-only -r dotenv/config scripts/backfill-disposal-from-retire.ts --apply  # 실제 INSERT
//
// 멱등성: assetId 별로 진행/완료 Disposal 이 이미 있으면 skip.

import 'dotenv/config'
import { prisma } from '../src/lib/prisma'

const APPLY = process.argv.includes('--apply')

async function main(): Promise<void> {
  console.log(`\n[backfill-disposal-from-retire] mode=${APPLY ? 'APPLY (write)' : 'DRY-RUN (no write)'}\n`)

  const histories = await prisma.assetHistory.findMany({
    where: { action: 'RETIRED' },
    include: {
      asset: { select: { id: true, assetCode: true, name: true, status: true } },
      performedBy: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: 'asc' },
  })

  console.log(`[scan] AssetHistory(action='RETIRED') = ${histories.length}건`)

  if (histories.length === 0) {
    console.log('[done] legacy retire 흔적 없음.')
    return
  }

  let toCreate = 0
  let skippedExisting = 0
  let skippedAssetGone = 0

  for (const h of histories) {
    if (!h.asset) {
      console.log(`  · history#${h.id} → asset 없음(삭제됨?). skip`)
      skippedAssetGone++
      continue
    }

    const existing = await prisma.disposal.findFirst({
      where: {
        assetId: h.assetId,
        status: { in: ['PENDING', 'PENDING_MANAGER', 'PENDING_ADMIN', 'APPROVED', 'COMPLETED'] },
      },
      select: { id: true, status: true },
    })
    if (existing) {
      console.log(`  · ${h.asset.assetCode} (${h.asset.name}) → 이미 Disposal(${existing.status}) 존재. skip`)
      skippedExisting++
      continue
    }

    console.log(
      `  + ${h.asset.assetCode} (${h.asset.name}) ← 신청자/완료자=${h.performedBy?.name ?? '?'}, retiredAt=${h.createdAt.toISOString()}`,
    )
    toCreate++

    if (APPLY) {
      await prisma.disposal.create({
        data: {
          assetId: h.assetId,
          reason: 'SCRAP', // legacy 는 분류 불명 → SCRAP(일반 폐기) 기본
          note: `[legacy retire backfill] ${h.description ?? ''}`.trim(),
          previousStatus: 'IDLE', // legacy 는 직전 상태 추적 불가 → IDLE 안전 기본
          requestedById: h.performedById,
          status: 'COMPLETED',
          managerApprovedAt: h.createdAt,
          managerApprovedById: h.performedById,
          approvedAt: h.createdAt,
          approvedById: h.performedById,
          completedAt: h.createdAt,
          // criteria(ADR 0006) 는 PR ⑤ 머지 후 schema 컬럼 추가됨. legacy 데이터는 null 유지.
          journalEntryNumber: null,
          createdAt: h.createdAt,
          updatedAt: h.createdAt,
        },
      })
    }
  }

  console.log('\n[summary]')
  console.log(`  scanned         : ${histories.length}`)
  console.log(`  ${APPLY ? 'created' : 'would create'} : ${toCreate}`)
  console.log(`  skipped (exist) : ${skippedExisting}`)
  console.log(`  skipped (gone)  : ${skippedAssetGone}`)
  if (!APPLY) {
    console.log('\n  → 실제 적용하려면 --apply 플래그로 재실행')
  }
}

main()
  .catch((err) => {
    console.error('[fatal]', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

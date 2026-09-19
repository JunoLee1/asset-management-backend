// 인터랙티브 catalog 매핑 — 모든 자산 대상.
// 자산별로 현재 매핑 표시 + 후보 catalog 노출 + 변경/유지 선택.
// 실행: npx ts-node --transpile-only scripts/backfill-asset-catalog.ts

import 'dotenv/config'
import { prisma } from '../src/lib/prisma'
import * as readline from 'readline/promises'

async function main(): Promise<void> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  const assets = await prisma.asset.findMany({
    select: {
      id: true,
      assetCode: true,
      name: true,
      class: true,
      categoryId: true,
      catalogId: true,
      category: { select: { name: true } },
      catalog: { select: { name: true, modelCode: true } },
      hardware: { select: { serialNo: true, cpu: true, ramGb: true, storageGb: true } },
      office: { select: { modelName: true } },
    },
    orderBy: { assetCode: 'asc' },
  })

  console.log(`\n[backfill] 전체 자산: ${assets.length}건 (s=현재 유지, q=종료, c=카테고리 무관 모든 catalog)\n`)
  if (assets.length === 0) {
    rl.close()
    return
  }

  let mapped = 0
  let remapped = 0
  let skipped = 0
  let i = 0
  for (const a of assets) {
    i++
    let candidates = await prisma.assetCatalog.findMany({
      where: { categoryId: a.categoryId, isActive: true },
      select: { id: true, name: true, modelCode: true, manufacturer: true },
      orderBy: { name: 'asc' },
    })

    console.log(`\n[${i}/${assets.length}] ${a.assetCode} — ${a.name}`)
    console.log(`  카테고리: ${a.category.name}`)
    if (a.hardware?.cpu) {
      const hwParts = [
        a.hardware.cpu,
        a.hardware.ramGb ? `${a.hardware.ramGb}GB` : null,
        a.hardware.storageGb ? `${a.hardware.storageGb}GB SSD` : null,
      ].filter(Boolean).join(' / ')
      console.log(`  HW: ${hwParts}`)
    }
    if (a.office?.modelName) console.log(`  모델명: ${a.office.modelName}`)
    console.log(`  현재 매핑: ${a.catalog?.name ?? '(없음)'}`)

    let showAllCatalogs = false
    let printedCandidates = candidates
    function printCandidates(list: typeof candidates): void {
      if (list.length === 0) {
        console.log('  후보 catalog 없음')
        return
      }
      console.log('  후보:')
      list.forEach((c, idx) => {
        const tag = [
          c.modelCode ? `(${c.modelCode})` : '',
          c.manufacturer ? `[${c.manufacturer}]` : '',
        ].filter(Boolean).join(' ')
        console.log(`    [${idx + 1}] ${c.name}${tag ? ' ' + tag : ''}`)
      })
    }
    printCandidates(printedCandidates)
    console.log(`    [s] 현재 유지 · [c] 카테고리 무관 모든 catalog 보기 · [q] 종료`)

    let ans = (await rl.question('  선택: ')).trim().toLowerCase()
    if (ans === 'q') {
      console.log('[backfill] 종료')
      break
    }
    if (ans === 'c') {
      const all = await prisma.assetCatalog.findMany({
        where: { isActive: true },
        select: { id: true, name: true, modelCode: true, manufacturer: true },
        orderBy: { name: 'asc' },
      })
      candidates = all
      printedCandidates = all
      showAllCatalogs = true
      printCandidates(printedCandidates)
      console.log(`    [s] 현재 유지 · [q] 종료`)
      ans = (await rl.question('  선택: ')).trim().toLowerCase()
      if (ans === 'q') break
    }
    if (ans === '' || ans === 's') {
      skipped++
      continue
    }
    const choiceIdx = Number.parseInt(ans, 10) - 1
    if (Number.isNaN(choiceIdx) || choiceIdx < 0 || choiceIdx >= printedCandidates.length) {
      console.log('  잘못된 입력 — 현재 유지')
      skipped++
      continue
    }

    const picked = printedCandidates[choiceIdx]
    if (!picked || picked.id === a.catalogId) {
      skipped++
      continue
    }
    await prisma.asset.update({ where: { id: a.id }, data: { catalogId: picked.id } })
    if (a.catalogId === null) mapped++
    else remapped++
    console.log(`  → ${picked.name} 으로 ${a.catalogId === null ? '매핑' : '재매핑'} (${showAllCatalogs ? '카테고리 무관' : '카테고리 일치'})`)
  }

  console.log(`\n[backfill] 완료: 신규 ${mapped}건 / 재매핑 ${remapped}건 / 유지 ${skipped}건 / 검토 ${i}건`)
  rl.close()
}

main()
  .catch((err) => {
    console.error('[backfill] 에러:', err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())

import ExcelJS from 'exceljs'
import JSZip from 'jszip'
import puppeteer from 'puppeteer'
import { analyticsService } from './analytics.service'

// ─────────────────────────────────────────
// 공통 헬퍼
// ─────────────────────────────────────────

function fmtKRW(v: number): string {
  return v.toLocaleString('ko-KR') + '원'
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' })
}

interface ExportContext {
  companyName: string
  departmentName: string
  authorName: string
  generatedAt: string
}

// ─────────────────────────────────────────
// 1. CSV
// ─────────────────────────────────────────

export async function exportCsv(ctx: ExportContext): Promise<Buffer> {
  const [dist, util, dept, maint, comp] = await Promise.all([
    analyticsService.getDistribution(),
    analyticsService.getUtilization(),
    analyticsService.getDepartmentValue(),
    analyticsService.getMaintenanceCost(),
    analyticsService.getComplianceExpiry(),
  ])

  const rows: string[][] = []
  const header = `# ${ctx.companyName} 운영 분석 보고서 / 생성일시: ${ctx.generatedAt} / 담당자: ${ctx.authorName} (${ctx.departmentName})`

  rows.push([header])
  rows.push([])

  rows.push(['[상태별 분포]'])
  rows.push(['상태', '자산 수'])
  dist.byStatus.forEach((d) => rows.push([d.name, String(d.count)]))
  rows.push([])

  rows.push(['[컨디션별 분포]'])
  rows.push(['컨디션', '자산 수'])
  dist.byCondition.forEach((d) => rows.push([d.name, String(d.count)]))
  rows.push([])

  rows.push(['[자산 분류별 분포]'])
  rows.push(['분류', '자산 수'])
  dist.byClass.forEach((d) => rows.push([d.name, String(d.count)]))
  rows.push([])

  rows.push(['[자산 가동률 — 유휴 자산 TOP 10]'])
  rows.push(['자산코드', '자산명', '카테고리', '가동률(%)', '마지막 사용일', '유휴 여부'])
  util.assets.filter((a) => a.isIdle).slice(0, 10).forEach((a) =>
    rows.push([
      a.assetCode, a.name, a.categoryName, String(a.utilizationPct),
      a.lastUsedAt ? fmtDate(a.lastUsedAt) : '없음',
      a.isIdle ? '유휴' : '사용 중',
    ]),
  )
  rows.push([`평균 가동률`, `${util.avgUtilizationPct}%`, `유휴 자산 수`, String(util.idleCount)])
  rows.push([])

  rows.push(['[부서별 자산 가치]'])
  rows.push(['부서명', '자산 수', '총 가치(원)', '인원 수', '인당 가치(원)'])
  dept.departments.forEach((d) =>
    rows.push([d.name, String(d.assetCount), String(d.totalValue), String(d.memberCount), String(d.valuePerMember)]),
  )
  rows.push(['합계', '', String(dept.totalValue), '', ''])
  rows.push([])

  rows.push(['[정비 비용 — TOP 20]'])
  rows.push(['자산코드', '자산명', '구매가(원)', '누적 정비비(원)', '구매가 대비(%)', '정비 횟수'])
  maint.topAssets.forEach((a) =>
    rows.push([a.assetCode, a.name, String(a.purchasePrice), String(a.totalCost), String(a.costRatio), String(a.maintenanceCount)]),
  )
  rows.push(['정비비 합계', '', '', String(maint.totalCost), '', ''])
  rows.push([])

  rows.push(['[컴플라이언스 — 보증 만료 임박]'])
  rows.push(['자산코드', '자산명', '만료일', '잔여일'])
  comp.warrantyExpiry.forEach((w) => rows.push([w.assetCode, w.name, fmtDate(w.warrantyEnd), `D-${w.daysLeft}`]))
  rows.push([])

  rows.push(['[컴플라이언스 — 라이선스 만료 임박]'])
  rows.push(['라이선스명', '만료일', '잔여일', '계약 시트', '사용 시트'])
  comp.licenseExpiry.forEach((l) =>
    rows.push([l.name, fmtDate(l.expiryDate), `D-${l.daysLeft}`, String(l.seatsTotal), String(l.seatsUsed)]),
  )
  rows.push([])

  if (comp.overseated.length > 0) {
    rows.push(['[컴플라이언스 위반 — 시트 초과]'])
    rows.push(['라이선스명', '계약 시트', '사용 시트', '초과 수'])
    comp.overseated.forEach((o) =>
      rows.push([o.name, String(o.seatsTotal), String(o.seatsUsed), String(o.seatsUsed - o.seatsTotal)]),
    )
  }

  const csv = '﻿' + rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(',')).join('\r\n')
  return Buffer.from(csv, 'utf-8')
}

// ─────────────────────────────────────────
// 2. Excel (.xlsx)
// ─────────────────────────────────────────

export async function exportExcel(ctx: ExportContext): Promise<Buffer> {
  const [dist, util, dept, maint, comp] = await Promise.all([
    analyticsService.getDistribution(),
    analyticsService.getUtilization(),
    analyticsService.getDepartmentValue(),
    analyticsService.getMaintenanceCost(),
    analyticsService.getComplianceExpiry(),
  ])

  const wb = new ExcelJS.Workbook()
  wb.creator = ctx.authorName

  const HEADER_FILL: ExcelJS.Fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E40AF' } }
  const HEADER_FONT: Partial<ExcelJS.Font> = { color: { argb: 'FFFFFFFF' }, bold: true }
  const CURRENCY_FMT = '#,##0"원"'
  const WARN_FILL: ExcelJS.Fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEE2E2' } }

  function addSheet(name: string) {
    const ws = wb.addWorksheet(name)
    ws.addRow([`${ctx.companyName} — ${name}`]).font = { bold: true, size: 13 }
    ws.addRow([`생성일시: ${ctx.generatedAt}  담당자: ${ctx.authorName} (${ctx.departmentName})`]).font = { size: 10, color: { argb: 'FF6B7280' } }
    ws.addRow([])
    return ws
  }

  function styleHeader(_ws: ExcelJS.Worksheet, row: ExcelJS.Row) {
    row.eachCell((cell) => {
      cell.fill = HEADER_FILL
      cell.font = HEADER_FONT
      cell.alignment = { horizontal: 'center' }
    })
  }

  // 시트 1: 분포
  {
    const ws = addSheet('기초 분포')
    ws.columns = [{ width: 20 }, { width: 10 }, { width: 4 }, { width: 20 }, { width: 10 }, { width: 4 }, { width: 20 }, { width: 10 }]
    styleHeader(ws, ws.addRow(['상태', '자산 수', '', '컨디션', '자산 수', '', '분류', '자산 수']))
    const maxLen = Math.max(dist.byStatus.length, dist.byCondition.length, dist.byClass.length)
    for (let i = 0; i < maxLen; i++) {
      ws.addRow([
        dist.byStatus[i]?.name ?? '', dist.byStatus[i]?.count ?? '',
        '',
        dist.byCondition[i]?.name ?? '', dist.byCondition[i]?.count ?? '',
        '',
        dist.byClass[i]?.name ?? '', dist.byClass[i]?.count ?? '',
      ])
    }
  }

  // 시트 2: 가동률
  {
    const ws = addSheet('자산 가동률')
    ws.addRow([`평균 가동률: ${util.avgUtilizationPct}%   유휴 자산: ${util.idleCount}개`]).font = { bold: true }
    ws.addRow([])
    ws.columns = [{ width: 14 }, { width: 30 }, { width: 16 }, { width: 12 }, { width: 16 }, { width: 10 }]
    styleHeader(ws, ws.addRow(['자산코드', '자산명', '카테고리', '가동률(%)', '마지막 사용일', '유휴 여부']))
    util.assets.forEach((a) => {
      const row = ws.addRow([
        a.assetCode, a.name, a.categoryName, a.utilizationPct,
        a.lastUsedAt ? new Date(a.lastUsedAt).toLocaleDateString('ko-KR') : '없음',
        a.isIdle ? '유휴' : '사용 중',
      ])
      if (a.isIdle) row.getCell(6).fill = WARN_FILL
    })
  }

  // 시트 3: 부서 가치
  {
    const ws = addSheet('부서별 자산 가치')
    ws.addRow([`전체 자산 가치 합계: ${fmtKRW(dept.totalValue)}`]).font = { bold: true }
    ws.addRow([])
    ws.columns = [{ width: 20 }, { width: 10 }, { width: 18 }, { width: 10 }, { width: 18 }]
    styleHeader(ws, ws.addRow(['부서명', '자산 수', '총 가치(원)', '인원 수', '인당 가치(원)']))
    dept.departments.forEach((d) => {
      const row = ws.addRow([d.name, d.assetCount, d.totalValue, d.memberCount, d.valuePerMember])
      row.getCell(3).numFmt = CURRENCY_FMT
      row.getCell(5).numFmt = CURRENCY_FMT
    })
    const total = ws.addRow(['합계', dept.departments.reduce((s, d) => s + d.assetCount, 0), dept.totalValue, '', ''])
    total.font = { bold: true }
    total.getCell(3).numFmt = CURRENCY_FMT
  }

  // 시트 4: 정비비
  {
    const ws = addSheet('정비 비용')
    ws.addRow([`누적 정비비 합계: ${fmtKRW(maint.totalCost)}`]).font = { bold: true }
    ws.addRow([])
    ws.columns = [{ width: 14 }, { width: 30 }, { width: 16 }, { width: 16 }, { width: 16 }, { width: 10 }]
    styleHeader(ws, ws.addRow(['자산코드', '자산명', '구매가(원)', '누적 정비비(원)', '구매가 대비(%)', '정비 횟수']))
    maint.topAssets.forEach((a) => {
      const row = ws.addRow([a.assetCode, a.name, a.purchasePrice, a.totalCost, a.costRatio, a.maintenanceCount])
      row.getCell(3).numFmt = CURRENCY_FMT
      row.getCell(4).numFmt = CURRENCY_FMT
      if (a.costRatio >= 50) {
        row.getCell(5).fill = WARN_FILL
        row.getCell(5).font = { bold: true }
      }
    })
    ws.addRow([])
    styleHeader(ws, ws.addRow(['월', '정비비(원)']))
    maint.trend.forEach((t) => {
      const row = ws.addRow([t.month, t.totalCost])
      row.getCell(2).numFmt = CURRENCY_FMT
    })
  }

  // 시트 5: 컴플라이언스
  {
    const ws = addSheet('컴플라이언스')
    ws.columns = [{ width: 14 }, { width: 30 }, { width: 16 }, { width: 10 }]

    ws.addRow(['▶ 보증 만료 임박 (30일 이내)']).font = { bold: true }
    styleHeader(ws, ws.addRow(['자산코드', '자산명', '만료일', '잔여일']))
    comp.warrantyExpiry.forEach((w) => {
      const row = ws.addRow([w.assetCode, w.name, fmtDate(w.warrantyEnd), `D-${w.daysLeft}`])
      if (w.daysLeft <= 7) row.eachCell((c) => { c.fill = WARN_FILL })
    })
    ws.addRow([])

    ws.addRow(['▶ 라이선스 만료 임박 (30일 이내)']).font = { bold: true }
    ws.columns = [{ width: 30 }, { width: 16 }, { width: 10 }, { width: 12 }, { width: 12 }]
    styleHeader(ws, ws.addRow(['라이선스명', '만료일', '잔여일', '계약 시트', '사용 시트']))
    comp.licenseExpiry.forEach((l) => {
      const row = ws.addRow([l.name, fmtDate(l.expiryDate), `D-${l.daysLeft}`, l.seatsTotal, l.seatsUsed])
      if (l.daysLeft <= 7) row.eachCell((c) => { c.fill = WARN_FILL })
    })
    ws.addRow([])

    if (comp.overseated.length > 0) {
      ws.addRow(['▶ 시트 초과 (컴플라이언스 위반)']).font = { bold: true, color: { argb: 'FFDC2626' } }
      styleHeader(ws, ws.addRow(['라이선스명', '계약 시트', '사용 시트', '초과 수']))
      comp.overseated.forEach((o) => {
        const row = ws.addRow([o.name, o.seatsTotal, o.seatsUsed, o.seatsUsed - o.seatsTotal])
        row.eachCell((c) => { c.fill = WARN_FILL; c.font = { bold: true } })
      })
    }
  }

  const buf = await wb.xlsx.writeBuffer()
  return Buffer.from(buf)
}

// ─────────────────────────────────────────
// 3. PDF (puppeteer)
// ─────────────────────────────────────────

export async function exportPdf(ctx: ExportContext): Promise<Buffer> {
  const [dist, util, dept, maint, comp] = await Promise.all([
    analyticsService.getDistribution(),
    analyticsService.getUtilization(),
    analyticsService.getDepartmentValue(),
    analyticsService.getMaintenanceCost(),
    analyticsService.getComplianceExpiry(),
  ])

  const STATUS_LABEL: Record<string, string> = {
    OPERATING: '운영중', IDLE: '유휴', STANDBY: '예비', REPAIR: '장애/수리', PENDING_DISPOSAL: '폐기 대기', UNDER_CONSTRUCTION: '구축 중', RETIRED: '폐기',
  }
  const CONDITION_LABEL: Record<string, string> = {
    EXCELLENT: '최상', GOOD: '양호', FAIR: '보통', POOR: '불량', DAMAGED: '손상', LOST: '분실',
  }
  const CLASS_LABEL: Record<string, string> = {
    HARDWARE: '하드웨어', SOFTWARE: '소프트웨어', PERIPHERAL: '주변기기',
  }

  function tableRows(rows: string[][]): string {
    return rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')
  }

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<style>
  * { font-family: 'Malgun Gothic', '맑은 고딕', 'Apple SD Gothic Neo', sans-serif; box-sizing: border-box; }
  body { margin: 0; padding: 24px; font-size: 10pt; color: #111; }
  h1 { font-size: 16pt; margin-bottom: 4px; }
  .meta { font-size: 9pt; color: #555; margin-bottom: 16px; }
  /* 결재칸 */
  .approval { display: flex; gap: 0; margin-bottom: 24px; width: 240px; float: right; border: 1px solid #333; }
  .approval-cell { flex: 1; text-align: center; border-right: 1px solid #333; }
  .approval-cell:last-child { border-right: none; }
  .approval-label { font-size: 8pt; background: #1e40af; color: #fff; padding: 2px 0; }
  .approval-sign { height: 36px; }
  .clearfix::after { content: ''; display: block; clear: both; }
  h2 { font-size: 11pt; background: #1e40af; color: #fff; padding: 4px 8px; margin-top: 24px; page-break-before: auto; }
  table { width: 100%; border-collapse: collapse; margin-top: 4px; font-size: 9pt; }
  th { background: #1e40af; color: #fff; padding: 4px 6px; text-align: center; }
  td { border: 1px solid #ddd; padding: 3px 6px; }
  tr:nth-child(even) td { background: #f8faff; }
  .warn { background: #fee2e2 !important; font-weight: bold; }
  .num { text-align: right; }
  .kpi-grid { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; }
  .kpi { border: 1px solid #ddd; border-radius: 4px; padding: 8px 12px; min-width: 120px; }
  .kpi-label { font-size: 8pt; color: #555; }
  .kpi-value { font-size: 14pt; font-weight: bold; color: #1e40af; }
  @page { margin: 15mm 12mm; }
</style>
</head>
<body>
<div class="clearfix">
  <div class="approval">
    ${['기안', '검토', '승인'].map((l) => `<div class="approval-cell"><div class="approval-label">${l}</div><div class="approval-sign"></div></div>`).join('')}
  </div>
  <h1>${ctx.companyName} 운영 분석 보고서</h1>
  <div class="meta">생성일시: ${ctx.generatedAt}&nbsp;&nbsp;|&nbsp;&nbsp;작성부서: ${ctx.departmentName}&nbsp;&nbsp;|&nbsp;&nbsp;담당자: ${ctx.authorName}</div>
</div>

<h2>1. 기초 분포</h2>
<table>
  <tr>
    <th colspan="2">상태별</th><th></th>
    <th colspan="2">컨디션별</th><th></th>
    <th colspan="2">자산 분류</th>
  </tr>
  ${(() => {
    const maxLen = Math.max(dist.byStatus.length, dist.byCondition.length, dist.byClass.length)
    return Array.from({ length: maxLen }, (_, i) => `
      <tr>
        <td>${STATUS_LABEL[dist.byStatus[i]?.name ?? ''] ?? dist.byStatus[i]?.name ?? ''}</td>
        <td class="num">${dist.byStatus[i]?.count ?? ''}</td>
        <td></td>
        <td>${CONDITION_LABEL[dist.byCondition[i]?.name ?? ''] ?? dist.byCondition[i]?.name ?? ''}</td>
        <td class="num">${dist.byCondition[i]?.count ?? ''}</td>
        <td></td>
        <td>${CLASS_LABEL[dist.byClass[i]?.name ?? ''] ?? dist.byClass[i]?.name ?? ''}</td>
        <td class="num">${dist.byClass[i]?.count ?? ''}</td>
      </tr>`).join('')
  })()}
</table>

<h2>2. 자산 가동률</h2>
<div class="kpi-grid">
  <div class="kpi"><div class="kpi-label">평균 가동률</div><div class="kpi-value">${util.avgUtilizationPct}%</div></div>
  <div class="kpi"><div class="kpi-label">유휴 자산</div><div class="kpi-value">${util.idleCount}개</div></div>
</div>
<table>
  <tr><th>자산코드</th><th>자산명</th><th>카테고리</th><th>가동률(%)</th><th>마지막 사용일</th></tr>
  ${tableRows(util.assets.filter((a) => a.isIdle).slice(0, 10).map((a) => [
    a.assetCode, a.name, a.categoryName, `${a.utilizationPct}%`,
    a.lastUsedAt ? fmtDate(a.lastUsedAt) : '없음',
  ]))}
</table>

<h2>3. 부서별 자산 가치</h2>
<table>
  <tr><th>부서명</th><th>자산 수</th><th>총 가치</th><th>인원 수</th><th>인당 가치</th></tr>
  ${tableRows(dept.departments.map((d) => [
    d.name, String(d.assetCount), fmtKRW(d.totalValue), String(d.memberCount),
    d.memberCount > 0 ? fmtKRW(d.valuePerMember) : '–',
  ]))}
  <tr><td><b>합계</b></td><td></td><td><b>${fmtKRW(dept.totalValue)}</b></td><td></td><td></td></tr>
</table>

<h2>4. 정비 비용 분석</h2>
<table>
  <tr><th>자산코드</th><th>자산명</th><th>구매가</th><th>누적 정비비</th><th>구매가 대비</th><th>정비 횟수</th></tr>
  ${maint.topAssets.slice(0, 15).map((a) => `
    <tr class="${a.costRatio >= 50 ? 'warn' : ''}">
      <td>${a.assetCode}</td><td>${a.name}</td>
      <td class="num">${fmtKRW(a.purchasePrice)}</td>
      <td class="num">${fmtKRW(a.totalCost)}</td>
      <td class="num">${a.costRatio}%</td>
      <td class="num">${a.maintenanceCount}</td>
    </tr>`).join('')}
  <tr><td colspan="3"><b>합계</b></td><td class="num"><b>${fmtKRW(maint.totalCost)}</b></td><td></td><td></td></tr>
</table>

<h2>5. 컴플라이언스 임박</h2>
${comp.warrantyExpiry.length > 0 ? `
<p><b>보증 만료 임박</b></p>
<table>
  <tr><th>자산코드</th><th>자산명</th><th>만료일</th><th>잔여일</th></tr>
  ${tableRows(comp.warrantyExpiry.map((w) => [w.assetCode, w.name, fmtDate(w.warrantyEnd), `D-${w.daysLeft}`]))}
</table>` : ''}
${comp.licenseExpiry.length > 0 ? `
<p><b>라이선스 만료 임박</b></p>
<table>
  <tr><th>라이선스명</th><th>만료일</th><th>잔여일</th><th>계약 시트</th><th>사용 시트</th></tr>
  ${tableRows(comp.licenseExpiry.map((l) => [l.name, fmtDate(l.expiryDate), `D-${l.daysLeft}`, String(l.seatsTotal), String(l.seatsUsed)]))}
</table>` : ''}
${comp.overseated.length > 0 ? `
<p><b>시트 초과 (컴플라이언스 위반)</b></p>
<table>
  <tr><th>라이선스명</th><th>계약 시트</th><th>사용 시트</th><th>초과 수</th></tr>
  ${tableRows(comp.overseated.map((o) => [o.name, String(o.seatsTotal), String(o.seatsUsed), String(o.seatsUsed - o.seatsTotal)]))}
</table>` : '<p>만료 임박 항목 없음</p>'}

</body></html>`

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  try {
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'domcontentloaded' })
    const pdf = await page.pdf({ format: 'A4', printBackground: true })
    return Buffer.from(pdf)
  } finally {
    await browser.close()
  }
}

// ─────────────────────────────────────────
// 4. HWPX (HWPML XML → ZIP)
// ─────────────────────────────────────────

export async function exportHwpx(ctx: ExportContext): Promise<Buffer> {
  const [dist, util, dept, maint, comp] = await Promise.all([
    analyticsService.getDistribution(),
    analyticsService.getUtilization(),
    analyticsService.getDepartmentValue(),
    analyticsService.getMaintenanceCost(),
    analyticsService.getComplianceExpiry(),
  ])

  const STATUS_LABEL: Record<string, string> = {
    OPERATING: '운영중', IDLE: '유휴', STANDBY: '예비', REPAIR: '장애/수리', PENDING_DISPOSAL: '폐기 대기', UNDER_CONSTRUCTION: '구축 중', RETIRED: '폐기',
  }
  const CONDITION_LABEL: Record<string, string> = {
    EXCELLENT: '최상', GOOD: '양호', FAIR: '보통', POOR: '불량', DAMAGED: '손상', LOST: '분실',
  }
  const CLASS_LABEL: Record<string, string> = {
    HARDWARE: '하드웨어', SOFTWARE: '소프트웨어', PERIPHERAL: '주변기기',
  }

  // ── HWPML 빌더 헬퍼 ──
  let paraId = 1000
  function p(text: string, style = 'Normal'): string {
    return `<hp:p paraPrIDRef="${style === 'Heading1' ? '2' : '1'}" styleIDRef="${style === 'Heading1' ? '2' : '0'}" instId="${paraId++}">
  <hp:run><hp:t>${escXml(text)}</hp:t></hp:run>
</hp:p>`
  }

  function escXml(s: string): string {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  }

  function tbl(headers: string[], rows: string[][]): string {
    const colCount = headers.length
    const colWidth = Math.floor(42000 / colCount)

    function cell(text: string, isHeader = false): string {
      return `<hp:tc>
  <hp:tcPr><hp:tcBdr><hp:left type="solid" width="12" color="333333"/><hp:right type="solid" width="12" color="333333"/><hp:top type="solid" width="12" color="333333"/><hp:bottom type="solid" width="12" color="333333"/></hp:tcBdr><hp:tcSz width="${colWidth}" height="600"/></hp:tcPr>
  <hp:p paraPrIDRef="1" instId="${paraId++}"><hp:run><hp:charPr bold="${isHeader}"/><hp:t>${escXml(text)}</hp:t></hp:run></hp:p>
</hp:tc>`
    }

    const headerRow = `<hp:tr><hp:trPr><hp:trHeight val="600"/></hp:trPr>${headers.map((h) => cell(h, true)).join('')}</hp:tr>`
    const dataRows = rows.map((row) => `<hp:tr><hp:trPr><hp:trHeight val="500"/></hp:trPr>${row.map((c) => cell(c)).join('')}</hp:tr>`).join('')

    return `<hp:tbl><hp:tblPr><hp:tblSz width="42000"/><hp:tblBorderFill><hp:insideH type="solid" width="8" color="CCCCCC"/><hp:insideV type="solid" width="8" color="CCCCCC"/></hp:tblBorderFill></hp:tblPr><hp:tblBody>${headerRow}${dataRows}</hp:tblBody></hp:tbl>`
  }

  // 결재칸 (3열 테이블)
  const approvalTable = tbl(['기안', '검토', '승인'], [['', '', '']])

  const sections = [
    p(`${ctx.companyName} 운영 분석 보고서`, 'Heading1'),
    p(`생성일시: ${ctx.generatedAt}  |  작성부서: ${ctx.departmentName}  |  담당자: ${ctx.authorName}`),
    p(''),
    approvalTable,
    p(''),

    p('1. 기초 분포', 'Heading1'),
    p('▶ 상태별 분포'),
    tbl(['상태', '자산 수'], dist.byStatus.map((d) => [STATUS_LABEL[d.name] ?? d.name, String(d.count)])),
    p(''),
    p('▶ 컨디션별 분포'),
    tbl(['컨디션', '자산 수'], dist.byCondition.map((d) => [CONDITION_LABEL[d.name] ?? d.name, String(d.count)])),
    p(''),
    p('▶ 자산 분류'),
    tbl(['분류', '자산 수'], dist.byClass.map((d) => [CLASS_LABEL[d.name] ?? d.name, String(d.count)])),
    p(''),

    p('2. 자산 가동률', 'Heading1'),
    p(`평균 가동률: ${util.avgUtilizationPct}%  |  유휴 자산: ${util.idleCount}개`),
    p('▶ 유휴 자산 TOP 10 (30일 이상 미사용)'),
    tbl(
      ['자산코드', '자산명', '카테고리', '가동률(%)', '마지막 사용일'],
      util.assets.filter((a) => a.isIdle).slice(0, 10).map((a) => [
        a.assetCode, a.name, a.categoryName, `${a.utilizationPct}%`,
        a.lastUsedAt ? fmtDate(a.lastUsedAt) : '없음',
      ]),
    ),
    p(''),

    p('3. 부서별 자산 가치', 'Heading1'),
    p(`전체 합계: ${fmtKRW(dept.totalValue)}`),
    tbl(
      ['부서명', '자산 수', '총 가치(원)', '인원 수', '인당 가치(원)'],
      dept.departments.map((d) => [
        d.name, String(d.assetCount), fmtKRW(d.totalValue), String(d.memberCount),
        d.memberCount > 0 ? fmtKRW(d.valuePerMember) : '–',
      ]),
    ),
    p(''),

    p('4. 정비 비용 분석', 'Heading1'),
    p(`누적 정비비 합계: ${fmtKRW(maint.totalCost)}`),
    tbl(
      ['자산코드', '자산명', '구매가(원)', '누적 정비비(원)', '구매가 대비(%)', '정비 횟수'],
      maint.topAssets.slice(0, 15).map((a) => [
        a.assetCode, a.name, fmtKRW(a.purchasePrice), fmtKRW(a.totalCost), `${a.costRatio}%`, String(a.maintenanceCount),
      ]),
    ),
    p(''),

    p('5. 컴플라이언스 임박', 'Heading1'),
    comp.warrantyExpiry.length > 0
      ? [p('▶ 보증 만료 임박'), tbl(['자산코드', '자산명', '만료일', '잔여일'], comp.warrantyExpiry.map((w) => [w.assetCode, w.name, fmtDate(w.warrantyEnd), `D-${w.daysLeft}`]))].join('\n')
      : p('▶ 보증 만료 임박: 없음'),
    p(''),
    comp.licenseExpiry.length > 0
      ? [p('▶ 라이선스 만료 임박'), tbl(['라이선스명', '만료일', '잔여일', '계약 시트', '사용 시트'], comp.licenseExpiry.map((l) => [l.name, fmtDate(l.expiryDate), `D-${l.daysLeft}`, String(l.seatsTotal), String(l.seatsUsed)]))].join('\n')
      : p('▶ 라이선스 만료 임박: 없음'),
    p(''),
    comp.overseated.length > 0
      ? [p('▶ 시트 초과 라이선스 (컴플라이언스 위반)'), tbl(['라이선스명', '계약 시트', '사용 시트', '초과 수'], comp.overseated.map((o) => [o.name, String(o.seatsTotal), String(o.seatsUsed), String(o.seatsUsed - o.seatsTotal)]))].join('\n')
      : '',
  ].join('\n')

  const sectionXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<hp:sec xmlns:hp="urn:schemas-microsoft-com:office:hwpml:2010"
        xmlns:hhs="urn:schemas-microsoft-com:office:hwpml:headshape:2010">
  <hp:secPr>
    <hp:pagePr width="59528" height="84188" orientation="portrait"/>
    <hp:marginPr left="2835" right="2835" top="2835" bottom="2835" header="1701" footer="1701" gutter="0"/>
  </hp:secPr>
  ${sections}
</hp:sec>`

  const contentHpf = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<hpf:HWPFDocument xmlns:hpf="urn:schemas-microsoft-com:office:hwpml:document:2010">
  <hpf:head>
    <hpf:docsummary>
      <hpf:title>${escXml(ctx.companyName)} 운영 분석 보고서</hpf:title>
      <hpf:author>${escXml(ctx.authorName)}</hpf:author>
      <hpf:date>${ctx.generatedAt}</hpf:date>
    </hpf:docsummary>
  </hpf:head>
  <hpf:body><hpf:sectionList><hpf:section src="Contents/section1.xml"/></hpf:sectionList></hpf:body>
</hpf:HWPFDocument>`

  const containerXml = `<?xml version="1.0" encoding="UTF-8"?>
<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles><rootfile full-path="Contents/content.hpf" media-type="application/hwpml+xml"/></rootfiles>
</container>`

  const zip = new JSZip()
  zip.file('mimetype', 'application/hwpml+zip')
  zip.file('META-INF/container.xml', containerXml)
  zip.file('Contents/content.hpf', contentHpf)
  zip.file('Contents/section1.xml', sectionXml)

  const buf = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' })
  return buf
}

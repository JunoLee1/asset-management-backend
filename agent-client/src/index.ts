// ADR 0011/0012 — Endpoint Agent 메인 진입점
//
// 실행 순서:
//   1. config 로드
//   2. 로그인 (JWT 매번 갱신 — 서버 설정에 따라 단명)
//   3. 설치 소프트웨어 스캔
//   4. block-list 조회 (인증 불필요이나 로그인 후 일괄 처리)
//   5. 실행 중 프로세스 vs block-list 교차 → block event 보고
//   6. POST /agent/ingest (전체 설치 목록)

import { hostname } from 'os'
import { loadConfig } from './config'
import { AgentApiClient } from './api'
import { scanInstalledSoftware, getRunningProcessNames } from './scanner'

async function main() {
  const config = loadConfig()
  const client = new AgentApiClient(config.apiUrl)

  console.log(`[agent] 로그인: ${config.email}`)
  await client.login(config.email, config.password)

  // 설치 소프트웨어 스캔
  console.log('[agent] 소프트웨어 스캔 중...')
  const scanned = scanInstalledSoftware()
  console.log(`[agent] 탐지된 소프트웨어: ${scanned.length}개`)

  // 차단 목록 + 실행 중 프로세스
  const [blockListResult, runningProcs] = await Promise.all([
    client.getBlockList(),
    Promise.resolve(getRunningProcessNames()),
  ])
  const blockedSet = new Set(blockListResult.blockedProcessNames)
  console.log(`[agent] 차단 대상 프로세스: ${blockedSet.size}개`)

  // 실행 중인 차단 프로세스 보고
  if (config.userId) {
    const blockedRunning = runningProcs.filter((name) => blockedSet.has(name))
    if (blockedRunning.length > 0) {
      console.log(`[agent] 실행 중 차단 프로세스 발견: ${blockedRunning.join(', ')}`)

      // ingest 먼저 실행해 deviceId 확보 후 block event 보고
      const collectItems = client.scannedToCollectItems(scanned)
      const ingestResult = await client.ingest({
        hostname: hostname(),
        userId: config.userId,
        items: collectItems,
      })
      console.log(
        `[agent] ingest 완료 — deviceId: ${ingestResult.deviceId}, matched: ${ingestResult.matched}, created: ${ingestResult.created}, updated: ${ingestResult.updated}, skipped: ${ingestResult.skipped}`,
      )

      const occurredAt = new Date().toISOString()
      for (const processName of blockedRunning) {
        // softwareId 는 block-list 엔드포인트가 processName 만 반환하므로
        // 여기서는 서버에 processName 으로 조회를 위임 — 향후 API 확장 시 softwareId 직접 수신 가능
        console.warn(
          `[agent] 차단 이벤트: processName=${processName} (softwareId 조회는 서버 위임 — /agent/block-events 확장 필요)`,
        )
        // 현재 block-events endpoint 는 softwareId 필수 → 서버가 processName 수신 지원 시 활성화
        // await client.reportBlockEvent({ userId: config.userId, softwareId: '...', deviceId: ingestResult.deviceId, processName, occurredAt })
        void occurredAt
      }
    } else {
      // 차단 프로세스 없음 — 일반 ingest
      const collectItems = client.scannedToCollectItems(scanned)
      const ingestResult = await client.ingest({
        hostname: hostname(),
        userId: config.userId,
        items: collectItems,
      })
      console.log(
        `[agent] ingest 완료 — deviceId: ${ingestResult.deviceId}, matched: ${ingestResult.matched}, created: ${ingestResult.created}, updated: ${ingestResult.updated}, skipped: ${ingestResult.skipped}`,
      )
    }
  } else {
    // userId 없을 때 — 익명 디바이스 ingest
    const collectItems = client.scannedToCollectItems(scanned)
    const ingestResult = await client.ingest({
      hostname: hostname(),
      items: collectItems,
    })
    console.log(
      `[agent] ingest 완료 (userId 없음) — deviceId: ${ingestResult.deviceId}, created: ${ingestResult.created}`,
    )
  }
}

main().catch((err) => {
  console.error('[agent] 오류:', err instanceof Error ? err.message : err)
  process.exit(1)
})

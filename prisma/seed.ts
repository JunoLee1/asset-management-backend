/**
 * dev 시드 — 자산 카탈로그(가짜 제조사 데이터)
 *
 * 자산 등록 폼의 제조사/모델 콤보박스가 빈 상태로 보이지 않도록
 * 대표 제조사 + 모델 몇 가지를 채워둠.
 *
 * 실행: `npx prisma db seed` (package.json prisma.seed 설정)
 */
import bcrypt from 'bcrypt'
import { AssetClass, VendorType } from '../src/generated/prisma/enums'
import { prisma } from '../src/lib/prisma'

const SALT_ROUNDS = 12

const catalogs = [
  // ── HARDWARE ────────────────────────────────────
  {
    manufacturer: 'Apple',
    name: 'MacBook Pro 14" M3',
    modelCode: 'MK1H3KH/A',
    class: 'IT_ASSET' as const,
    specs: { cpu: 'Apple M3 Pro', ramGb: 18, storageGb: 512 },
  },
  {
    manufacturer: 'Apple',
    name: 'MacBook Pro 16" M3',
    modelCode: 'MRW13KH/A',
    class: 'IT_ASSET' as const,
    specs: { cpu: 'Apple M3 Max', ramGb: 36, storageGb: 1024 },
  },
  {
    manufacturer: 'Samsung',
    name: 'Galaxy Book4 Pro 14',
    modelCode: 'NT940XGK',
    class: 'IT_ASSET' as const,
    specs: { cpu: 'Intel Core Ultra 7', ramGb: 16, storageGb: 512 },
  },
  {
    manufacturer: 'Samsung',
    name: 'Odyssey G7 27" Monitor',
    modelCode: 'LS27BG700E',
    class: 'IT_ASSET' as const,
    specs: { inches: 27, resolution: '2560x1440' },
  },
  {
    manufacturer: 'LG',
    name: 'LG Gram 17',
    modelCode: '17Z90R-G.AA75K',
    class: 'IT_ASSET' as const,
    specs: { cpu: 'Intel Core i7-1360P', ramGb: 16, storageGb: 512 },
  },
  {
    manufacturer: 'LG',
    name: 'UltraFine 27" 4K',
    modelCode: '27UQ850V',
    class: 'IT_ASSET' as const,
    specs: { inches: 27, resolution: '3840x2160' },
  },
  {
    manufacturer: 'Dell',
    name: 'XPS 15 9530',
    modelCode: 'XPS9530-7965BLK',
    class: 'IT_ASSET' as const,
    specs: { cpu: 'Intel Core i7-13700H', ramGb: 32, storageGb: 1024 },
  },
  {
    manufacturer: 'Dell',
    name: 'U2723QE 27" 4K',
    modelCode: 'U2723QE',
    class: 'IT_ASSET' as const,
    specs: { inches: 27, resolution: '3840x2160' },
  },
  {
    manufacturer: 'HP',
    name: 'EliteBook 850 G10',
    modelCode: '8A4A1EA',
    class: 'IT_ASSET' as const,
    specs: { cpu: 'Intel Core i7-1355U', ramGb: 16, storageGb: 512 },
  },

  // ── SMARTPHONE / TABLET ─────────────────────────
  {
    manufacturer: 'Apple',
    name: 'iPhone 15 Pro',
    modelCode: 'A3101',
    class: 'IT_ASSET' as const,
    specs: { storageGb: 256, color: '내추럴 티타늄' },
  },
  {
    manufacturer: 'Apple',
    name: 'iPhone 14 Pro',
    modelCode: 'A2890',
    class: 'IT_ASSET' as const,
    specs: { storageGb: 128, color: '딥 퍼플' },
  },
  {
    manufacturer: 'Samsung',
    name: 'Galaxy S24 Ultra',
    modelCode: 'SM-S928N',
    class: 'IT_ASSET' as const,
    specs: { storageGb: 512, color: '티타늄 그레이' },
  },
  {
    manufacturer: 'Samsung',
    name: 'Galaxy S24',
    modelCode: 'SM-S921N',
    class: 'IT_ASSET' as const,
    specs: { storageGb: 256, color: '오닉스 블랙' },
  },
  {
    manufacturer: 'Google',
    name: 'Pixel 8 Pro',
    modelCode: 'GE9DP',
    class: 'IT_ASSET' as const,
    specs: { storageGb: 256 },
  },
  {
    manufacturer: 'Apple',
    name: 'iPad Pro 12.9 (M2)',
    modelCode: 'MNXF3KH/A',
    class: 'IT_ASSET' as const,
    specs: { storageGb: 256 },
  },
  {
    manufacturer: 'Samsung',
    name: 'Galaxy Tab S9 Ultra',
    modelCode: 'SM-X910',
    class: 'IT_ASSET' as const,
    specs: { storageGb: 256 },
  },

  // ── SOFTWARE ────────────────────────────────────
  {
    manufacturer: 'Microsoft',
    name: 'Office 365 E3',
    modelCode: 'O365-E3',
    class: 'IT_ASSET' as const,
    specs: { type: 'subscription' },
  },
  {
    manufacturer: 'Microsoft',
    name: 'Windows 11 Pro',
    modelCode: 'WIN11-PRO',
    class: 'IT_ASSET' as const,
    specs: { type: 'perpetual' },
  },
  {
    manufacturer: 'Adobe',
    name: 'Creative Cloud All Apps',
    modelCode: 'CC-ALL',
    class: 'IT_ASSET' as const,
    specs: { type: 'subscription' },
  },
  {
    manufacturer: 'JetBrains',
    name: 'IntelliJ IDEA Ultimate',
    modelCode: 'IDEA-U',
    class: 'IT_ASSET' as const,
    specs: { type: 'subscription' },
  },
  {
    manufacturer: 'Atlassian',
    name: 'Jira Standard',
    modelCode: 'JIRA-STD',
    class: 'IT_ASSET' as const,
    specs: { type: 'subscription' },
  },

  // ── PERIPHERAL ──────────────────────────────────
  {
    manufacturer: 'Logitech',
    name: 'MX Master 3S',
    modelCode: '910-006556',
    class: 'IT_ASSET' as const,
    specs: { type: 'mouse' },
  },
  {
    manufacturer: 'Logitech',
    name: 'MX Keys S',
    modelCode: '920-011577',
    class: 'IT_ASSET' as const,
    specs: { type: 'keyboard' },
  },
  {
    manufacturer: 'Apple',
    name: 'Magic Mouse',
    modelCode: 'MK2E3KH/A',
    class: 'IT_ASSET' as const,
    specs: { type: 'mouse' },
  },
  {
    manufacturer: 'Apple',
    name: 'Magic Keyboard',
    modelCode: 'MK2A3KH/A',
    class: 'IT_ASSET' as const,
    specs: { type: 'keyboard' },
  },
  {
    manufacturer: 'Anker',
    name: 'USB-C Hub 8-in-1',
    modelCode: 'A8380',
    class: 'IT_ASSET' as const,
    specs: { type: 'hub', ports: 8 },
  },

  // ── OFFICE — 가구 (책상·의자·캐비닛) ─────────────────
  {
    manufacturer: 'Herman Miller',
    name: 'Aeron Size B',
    modelCode: 'AER1B23DW',
    class: 'OFFICE_ASSET' as const,
    specs: { type: 'chair', material: 'mesh' },
  },
  {
    manufacturer: 'Herman Miller',
    name: 'Embody',
    modelCode: 'CN122AWAA',
    class: 'OFFICE_ASSET' as const,
    specs: { type: 'chair', material: 'mesh' },
  },
  {
    manufacturer: '시디즈',
    name: 'T50',
    modelCode: 'T503HLDA',
    class: 'OFFICE_ASSET' as const,
    specs: { type: 'chair', material: 'mesh' },
  },
  {
    manufacturer: '일룸',
    name: '데스크 1800x800',
    modelCode: 'ILD-1800',
    class: 'OFFICE_ASSET' as const,
    specs: { type: 'desk', size: '1800x800' },
  },
  {
    manufacturer: '퍼시스',
    name: '4단 캐비닛',
    modelCode: 'FCM-4',
    class: 'OFFICE_ASSET' as const,
    specs: { type: 'cabinet', tiers: 4 },
  },
  {
    manufacturer: '퍼시스',
    name: '회의용 테이블 W2400',
    modelCode: 'FCT-2400',
    class: 'OFFICE_ASSET' as const,
    specs: { type: 'conference_table', size: '2400x1000' },
  },

  // ── OFFICE — 기기 (복합기·프린터·프로젝터) ─────────
  {
    manufacturer: 'Canon',
    name: 'imageRUNNER ADV C5535',
    modelCode: 'iR-ADV-C5535',
    class: 'OFFICE_ASSET' as const,
    specs: { type: 'copier', color: true, ppm: 35 },
  },
  {
    manufacturer: 'HP',
    name: 'LaserJet Pro M404n',
    modelCode: 'W1A52A',
    class: 'OFFICE_ASSET' as const,
    specs: { type: 'printer', color: false, ppm: 40 },
  },
  {
    manufacturer: '신도리코',
    name: 'D440',
    modelCode: 'D440',
    class: 'OFFICE_ASSET' as const,
    specs: { type: 'copier', color: true, ppm: 40 },
  },
  {
    manufacturer: 'Epson',
    name: 'EB-2247U',
    modelCode: 'EB-2247U',
    class: 'OFFICE_ASSET' as const,
    specs: { type: 'projector', lumens: 4200 },
  },
  {
    manufacturer: 'Epson',
    name: 'EcoTank L3250',
    modelCode: 'L3250',
    class: 'OFFICE_ASSET' as const,
    specs: { type: 'printer', color: true },
  },

  // ── FACILITY — 공조 (에어컨·난방·환기) ─────────────
  {
    manufacturer: 'LG전자',
    name: '휘센 시스템에어컨 10kW',
    modelCode: 'PRNB100T1B',
    class: 'FACILITY_ASSET' as const,
    specs: { type: 'aircon', capacityKW: 10 },
  },
  {
    manufacturer: '삼성전자',
    name: '시스템에어컨 천장형 14kW',
    modelCode: 'AC140NN4SKH',
    class: 'FACILITY_ASSET' as const,
    specs: { type: 'aircon', capacityKW: 14 },
  },
  {
    manufacturer: '캐리어',
    name: '대형 천장형 공조 20kW',
    modelCode: '40LM-200',
    class: 'FACILITY_ASSET' as const,
    specs: { type: 'aircon', capacityKW: 20 },
  },
  {
    manufacturer: '경동나비엔',
    name: 'NCB790',
    modelCode: 'NCB790',
    class: 'FACILITY_ASSET' as const,
    specs: { type: 'boiler', capacityKW: 24 },
  },

  // ── FACILITY — 안전/보안 (CCTV·소방·출입통제) ─────
  {
    manufacturer: '한화테크윈',
    name: 'Wisenet PNV-A9081R',
    modelCode: 'PNV-A9081R',
    class: 'FACILITY_ASSET' as const,
    specs: { type: 'cctv', resolution: '4K' },
  },
  {
    manufacturer: '아이디스',
    name: 'DC-D4536WRX',
    modelCode: 'DC-D4536WRX',
    class: 'FACILITY_ASSET' as const,
    specs: { type: 'cctv', resolution: '5MP' },
  },
  {
    manufacturer: '슈프리마',
    name: 'BioStation 3',
    modelCode: 'BS3',
    class: 'FACILITY_ASSET' as const,
    specs: { type: 'access_control', biometric: true },
  },
  {
    manufacturer: '한국소방안전',
    name: '스프링클러 시스템',
    modelCode: 'KFS-SP',
    class: 'FACILITY_ASSET' as const,
    specs: { type: 'fire_safety' },
  },

  // ── FACILITY — 시설 (엘리베이터·전기·급수) ────────
  {
    manufacturer: '현대엘리베이터',
    name: 'YZER-1700',
    modelCode: 'YZER-1700',
    class: 'FACILITY_ASSET' as const,
    specs: { type: 'elevator', capacityKg: 1700 },
  },
  {
    manufacturer: '오티스',
    name: 'GeN2-Switch',
    modelCode: 'GEN2-S',
    class: 'FACILITY_ASSET' as const,
    specs: { type: 'elevator', capacityKg: 1150 },
  },
  {
    manufacturer: 'LS일렉트릭',
    name: '저압 분전반 LB100',
    modelCode: 'LB100',
    class: 'FACILITY_ASSET' as const,
    specs: { type: 'electrical_panel', capacityA: 100 },
  },
]

// AssetCategory에 한국 법인세법 기준 GL 코드 + 감가상각 기본값 시드.
// 자산 등록 시 카테고리 선택만으로 자동 매핑됨.
async function seedAccountingCategories() {
  console.log('[seed] AssetCategory 회계/감가상각 시드 시작...')

  // IT_DEFAULT (legacy) 자체에도 fallback 값 채워서 기존 흐름 보장
  const itParent = await prisma.assetCategory.upsert({
    where: { code: 'IT_DEFAULT' },
    create: {
      code: 'IT_DEFAULT',
      name: 'IT 기기',
      class: 'IT_ASSET',
      subType: 'HARDWARE',
      glAccountCode: '1052',
      glAccountName: '공구기구비품',
      defaultDepreciationMethod: 'DECLINING_BALANCE',
      defaultUsefulLifeYears: 4,
      defaultSalvageValueRatio: 0,
    },
    update: {
      glAccountCode: '1052',
      glAccountName: '공구기구비품',
      defaultDepreciationMethod: 'DECLINING_BALANCE',
      defaultUsefulLifeYears: 4,
      defaultSalvageValueRatio: 0,
    },
  })

  // [code, name, parentCode|null, class, subType|null, glCode, glName, method, life, salvageRatio]
  const defs = [
    // ── IT 자산 (IT_DEFAULT 하위) ─────────────────────────────
    [
      'LAPTOP',
      '노트북',
      'IT_DEFAULT',
      'IT_ASSET',
      'HARDWARE',
      '1052',
      '공구기구비품',
      'DECLINING_BALANCE',
      4,
      0,
    ],
    [
      'DESKTOP',
      '데스크탑',
      'IT_DEFAULT',
      'IT_ASSET',
      'HARDWARE',
      '1052',
      '공구기구비품',
      'DECLINING_BALANCE',
      4,
      0,
    ],
    [
      'SMARTPHONE',
      '스마트폰',
      'IT_DEFAULT',
      'IT_ASSET',
      'HARDWARE',
      '1052',
      '공구기구비품',
      'DECLINING_BALANCE',
      4,
      0,
    ],
    [
      'TABLET',
      '태블릿',
      'IT_DEFAULT',
      'IT_ASSET',
      'HARDWARE',
      '1052',
      '공구기구비품',
      'DECLINING_BALANCE',
      4,
      0,
    ],
    [
      'MONITOR',
      '모니터',
      'IT_DEFAULT',
      'IT_ASSET',
      'HARDWARE',
      '1052',
      '공구기구비품',
      'DECLINING_BALANCE',
      4,
      0,
    ],
    [
      'SERVER',
      '서버',
      'IT_DEFAULT',
      'IT_ASSET',
      'HARDWARE',
      '1052',
      '공구기구비품',
      'DECLINING_BALANCE',
      5,
      0,
    ],
    [
      'NETWORK_EQUIPMENT',
      '네트워크 장비',
      'IT_DEFAULT',
      'IT_ASSET',
      'HARDWARE',
      '1052',
      '공구기구비품',
      'DECLINING_BALANCE',
      5,
      0,
    ],
    [
      'SOFTWARE',
      '소프트웨어/라이선스',
      null,
      'IT_ASSET',
      'SOFTWARE',
      '1054',
      '소프트웨어(무형자산)',
      'STRAIGHT_LINE',
      5,
      0,
    ],

    // ── 사무 자산 상위 (대분류) ───────────────────────────────
    [
      'OFFICE_FURNITURE',
      '사무용 비품',
      null,
      'OFFICE_ASSET',
      null,
      '1053',
      '비품',
      'STRAIGHT_LINE',
      8,
      0,
    ],
    [
      'OFFICE_EQUIPMENT',
      '사무용 기기',
      null,
      'OFFICE_ASSET',
      null,
      '1053',
      '비품',
      'DECLINING_BALANCE',
      5,
      0,
    ],

    // ── 사무 자산 — OFFICE_FURNITURE 하위 (책상·의자 등 가구) ──
    [
      'DESK',
      '책상',
      'OFFICE_FURNITURE',
      'OFFICE_ASSET',
      null,
      '1053',
      '비품',
      'STRAIGHT_LINE',
      8,
      0,
    ],
    [
      'CHAIR',
      '의자',
      'OFFICE_FURNITURE',
      'OFFICE_ASSET',
      null,
      '1053',
      '비품',
      'STRAIGHT_LINE',
      8,
      0,
    ],
    [
      'CABINET',
      '캐비닛/사물함',
      'OFFICE_FURNITURE',
      'OFFICE_ASSET',
      null,
      '1053',
      '비품',
      'STRAIGHT_LINE',
      10,
      0,
    ],
    [
      'SHELF',
      '책장/선반',
      'OFFICE_FURNITURE',
      'OFFICE_ASSET',
      null,
      '1053',
      '비품',
      'STRAIGHT_LINE',
      10,
      0,
    ],
    [
      'CONFERENCE_TABLE',
      '회의용 테이블',
      'OFFICE_FURNITURE',
      'OFFICE_ASSET',
      null,
      '1053',
      '비품',
      'STRAIGHT_LINE',
      8,
      0,
    ],

    // ── 사무 자산 — OFFICE_EQUIPMENT 하위 (프린터·복합기 등 기기) ──
    [
      'PRINTER',
      '프린터',
      'OFFICE_EQUIPMENT',
      'OFFICE_ASSET',
      null,
      '1053',
      '비품',
      'DECLINING_BALANCE',
      5,
      0,
    ],
    [
      'COPIER',
      '복합기',
      'OFFICE_EQUIPMENT',
      'OFFICE_ASSET',
      null,
      '1053',
      '비품',
      'DECLINING_BALANCE',
      5,
      0,
    ],
    [
      'SCANNER',
      '스캐너',
      'OFFICE_EQUIPMENT',
      'OFFICE_ASSET',
      null,
      '1053',
      '비품',
      'DECLINING_BALANCE',
      5,
      0,
    ],
    [
      'PROJECTOR',
      '프로젝터',
      'OFFICE_EQUIPMENT',
      'OFFICE_ASSET',
      null,
      '1053',
      '비품',
      'DECLINING_BALANCE',
      5,
      0,
    ],
    [
      'SHREDDER',
      '문서 파쇄기',
      'OFFICE_EQUIPMENT',
      'OFFICE_ASSET',
      null,
      '1053',
      '비품',
      'DECLINING_BALANCE',
      5,
      0,
    ],
    [
      'WHITEBOARD',
      '화이트보드',
      'OFFICE_EQUIPMENT',
      'OFFICE_ASSET',
      null,
      '1053',
      '비품',
      'STRAIGHT_LINE',
      8,
      0,
    ],

    // ── 시설 자산 상위 (대분류) ───────────────────────────────
    ['HVAC', '공조 설비', null, 'FACILITY_ASSET', null, '1055', '시설장치', 'STRAIGHT_LINE', 8, 0],
    [
      'FACILITY',
      '시설/설비',
      null,
      'FACILITY_ASSET',
      null,
      '1055',
      '시설장치',
      'STRAIGHT_LINE',
      20,
      0,
    ],
    [
      'SAFETY_FACILITY',
      '안전/보안 설비',
      null,
      'FACILITY_ASSET',
      null,
      '1055',
      '시설장치',
      'STRAIGHT_LINE',
      10,
      0,
    ],

    // ── 시설 자산 — HVAC 하위 (공조) ──────────────────────────
    ['AIRCON', '에어컨', 'HVAC', 'FACILITY_ASSET', null, '1055', '시설장치', 'STRAIGHT_LINE', 8, 0],
    [
      'HEATER',
      '난방기/보일러',
      'HVAC',
      'FACILITY_ASSET',
      null,
      '1055',
      '시설장치',
      'STRAIGHT_LINE',
      8,
      0,
    ],
    [
      'VENTILATION',
      '환기 설비',
      'HVAC',
      'FACILITY_ASSET',
      null,
      '1055',
      '시설장치',
      'STRAIGHT_LINE',
      8,
      0,
    ],

    // ── 시설 자산 — FACILITY 하위 (구조물·설비) ───────────────
    [
      'ELEVATOR',
      '엘리베이터',
      'FACILITY',
      'FACILITY_ASSET',
      null,
      '1055',
      '시설장치',
      'STRAIGHT_LINE',
      20,
      0,
    ],
    [
      'ELECTRICAL_PANEL',
      '전기 분전반',
      'FACILITY',
      'FACILITY_ASSET',
      null,
      '1055',
      '시설장치',
      'STRAIGHT_LINE',
      15,
      0,
    ],
    [
      'WATER_TANK',
      '저수조/급수 설비',
      'FACILITY',
      'FACILITY_ASSET',
      null,
      '1055',
      '시설장치',
      'STRAIGHT_LINE',
      20,
      0,
    ],

    // ── 시설 자산 — SAFETY_FACILITY 하위 (소방·보안, 법정 점검) ──
    [
      'FIRE_SAFETY',
      '소방 시설',
      'SAFETY_FACILITY',
      'FACILITY_ASSET',
      null,
      '1055',
      '시설장치',
      'STRAIGHT_LINE',
      10,
      0,
    ],
    [
      'CCTV',
      'CCTV',
      'SAFETY_FACILITY',
      'FACILITY_ASSET',
      null,
      '1055',
      '시설장치',
      'STRAIGHT_LINE',
      6,
      0,
    ],
    [
      'ACCESS_CONTROL',
      '출입 통제 시스템',
      'SAFETY_FACILITY',
      'FACILITY_ASSET',
      null,
      '1055',
      '시설장치',
      'STRAIGHT_LINE',
      8,
      0,
    ],
    [
      'EMERGENCY_LIGHT',
      '비상 조명',
      'SAFETY_FACILITY',
      'FACILITY_ASSET',
      null,
      '1055',
      '시설장치',
      'STRAIGHT_LINE',
      10,
      0,
    ],
  ] as const

  // 2-pass: 자식이 부모를 참조하려면 부모가 먼저 존재해야 함
  // Pass 1: parentCode === null 인 최상위 카테고리만 upsert
  // Pass 2: parentCode !== null 인 카테고리를 parent id 조회 후 upsert
  const codeToId: Record<string, string> = { IT_DEFAULT: itParent.id }

  for (const pass of [1, 2] as const) {
    for (const [
      code,
      name,
      parentCode,
      klass,
      subType,
      glCode,
      glName,
      method,
      life,
      salvage,
    ] of defs) {
      const isRoot = parentCode === null
      if (pass === 1 && !isRoot) continue
      if (pass === 2 && isRoot) continue

      const parentId =
        parentCode === null
          ? null
          : (codeToId[parentCode] ??
            (await prisma.assetCategory.findUnique({ where: { code: parentCode } }))?.id ??
            null)

      const result = await prisma.assetCategory.upsert({
        where: { code },
        create: {
          code,
          name,
          class: klass,
          subType: subType ?? null,
          parentId,
          glAccountCode: glCode,
          glAccountName: glName,
          defaultDepreciationMethod: method,
          defaultUsefulLifeYears: life,
          defaultSalvageValueRatio: salvage,
        },
        update: {
          name,
          class: klass,
          subType: subType ?? null,
          parentId,
          glAccountCode: glCode,
          glAccountName: glName,
          defaultDepreciationMethod: method,
          defaultUsefulLifeYears: life,
          defaultSalvageValueRatio: salvage,
        },
      })
      codeToId[code] = result.id
    }
  }

  console.log(`[seed] AssetCategory: ${defs.length + 1}개 (회계 기본값 포함) 준비 완료`)
}

// ─────────────────────────────────────────
// 사무 자산 + 시설 자산 인스턴스 시드 (전용 테이블 OfficeAsset / FacilityAsset 포함)
// idempotent — assetCode unique 기준으로 중복 시 skip
// ─────────────────────────────────────────
async function seedOfficeAndFacilityAssets() {
  // 부서 + 위치 기준 데이터 확보 (시드 어디서 만들어두든 동일하게 동작)
  const dept = await prisma.department.findFirst({ where: { code: 'IT-DEPT' } })
  const location = await prisma.location.findFirst({ where: { name: '본사 1층' } })
  if (!dept || !location) {
    console.log('[seed] 사무/시설 자산 시드 skip — 부서/위치 미준비')
    return
  }

  type SeedOffice = {
    assetCode: string
    name: string
    categoryCode: string
    purchasePrice: number
    purchaseDate: Date
    modelName: string
  }
  type SeedFacility = {
    assetCode: string
    name: string
    categoryCode: string
    purchasePrice: number
    purchaseDate: Date
    installLocationDetail: string
    installDate: Date
    inspectionCycleMonths: number
    nextInspectionDate: Date
  }

  const days = (offset: number) => {
    const d = new Date()
    d.setDate(d.getDate() + offset)
    return d
  }

  const officeAssets: SeedOffice[] = [
    {
      assetCode: 'OFF-SEED-0001',
      name: '회의실 책상',
      categoryCode: 'DESK',
      purchasePrice: 350_000,
      purchaseDate: new Date('2024-03-15'),
      modelName: '일룸 데스크 1800x800',
    },
    {
      assetCode: 'OFF-SEED-0002',
      name: '인체공학 의자 (개발팀)',
      categoryCode: 'CHAIR',
      purchasePrice: 580_000,
      purchaseDate: new Date('2024-05-20'),
      modelName: 'Herman Miller Aeron Size B',
    },
    {
      assetCode: 'OFF-SEED-0003',
      name: '복합기 1층',
      categoryCode: 'COPIER',
      purchasePrice: 1_800_000,
      purchaseDate: new Date('2023-11-01'),
      modelName: 'Canon imageRUNNER ADV C5535',
    },
    {
      assetCode: 'OFF-SEED-0004',
      name: '회의실 프로젝터',
      categoryCode: 'PROJECTOR',
      purchasePrice: 1_200_000,
      purchaseDate: new Date('2024-01-10'),
      modelName: 'Epson EB-2247U',
    },
    {
      assetCode: 'OFF-SEED-0005',
      name: '캐비닛 (총무팀)',
      categoryCode: 'CABINET',
      purchasePrice: 220_000,
      purchaseDate: new Date('2023-08-01'),
      modelName: '퍼시스 4단 캐비닛',
    },
  ]

  const facilityAssets: SeedFacility[] = [
    {
      assetCode: 'FAC-SEED-0001',
      name: '1층 에어컨',
      categoryCode: 'AIRCON',
      purchasePrice: 3_500_000,
      purchaseDate: new Date('2022-06-10'),
      installLocationDetail: '본사 1층 사무실 동쪽 벽면',
      installDate: new Date('2022-06-15'),
      inspectionCycleMonths: 6,
      nextInspectionDate: days(30),
    },
    {
      assetCode: 'FAC-SEED-0002',
      name: '1층 CCTV',
      categoryCode: 'CCTV',
      purchasePrice: 850_000,
      purchaseDate: new Date('2023-04-20'),
      installLocationDetail: '본사 1층 로비 천장',
      installDate: new Date('2023-04-25'),
      inspectionCycleMonths: 12,
      nextInspectionDate: days(120),
    },
    {
      assetCode: 'FAC-SEED-0003',
      name: '소방 시설 (1층)',
      categoryCode: 'FIRE_SAFETY',
      purchasePrice: 5_200_000,
      purchaseDate: new Date('2021-01-05'),
      installLocationDetail: '본사 1층 비상구·천장 스프링클러',
      installDate: new Date('2021-01-10'),
      inspectionCycleMonths: 6,
      nextInspectionDate: days(7), // 곧 점검 필요 — 알림 테스트용
    },
    {
      assetCode: 'FAC-SEED-0004',
      name: '엘리베이터',
      categoryCode: 'ELEVATOR',
      purchasePrice: 45_000_000,
      purchaseDate: new Date('2018-03-01'),
      installLocationDetail: '본사 중앙 엘리베이터홀',
      installDate: new Date('2018-03-10'),
      inspectionCycleMonths: 1, // 매월 점검 (법정)
      nextInspectionDate: days(15),
    },
  ]

  let createdOffice = 0
  let skipOfficeExisting = 0
  let skipOfficeNoCategory = 0
  for (const a of officeAssets) {
    const existing = await prisma.asset.findUnique({ where: { assetCode: a.assetCode } })
    if (existing) {
      skipOfficeExisting++
      continue
    }
    const category = await prisma.assetCategory.findUnique({ where: { code: a.categoryCode } })
    if (!category) {
      skipOfficeNoCategory++
      console.log(`[seed] 사무 자산 ${a.assetCode} skip — 카테고리 ${a.categoryCode} 없음`)
      continue
    }

    await prisma.asset.create({
      data: {
        assetCode: a.assetCode,
        name: a.name,
        class: 'OFFICE_ASSET',
        status: 'IDLE',
        condition: 'GOOD',
        purchaseDate: a.purchaseDate,
        purchasePrice: a.purchasePrice,
        categoryId: category.id,
        departmentId: dept.id,
        locationId: location.id,
        office: { create: { modelName: a.modelName } },
      },
    })
    createdOffice++
  }

  let createdFacility = 0
  for (const a of facilityAssets) {
    const existing = await prisma.asset.findUnique({ where: { assetCode: a.assetCode } })
    if (existing) continue
    const category = await prisma.assetCategory.findUnique({ where: { code: a.categoryCode } })
    if (!category) continue

    await prisma.asset.create({
      data: {
        assetCode: a.assetCode,
        name: a.name,
        class: 'FACILITY_ASSET',
        status: 'IDLE',
        condition: 'GOOD',
        purchaseDate: a.purchaseDate,
        purchasePrice: a.purchasePrice,
        categoryId: category.id,
        departmentId: dept.id,
        locationId: location.id,
        facility: {
          create: {
            installLocationDetail: a.installLocationDetail,
            installDate: a.installDate,
            inspectionCycleMonths: a.inspectionCycleMonths,
            nextInspectionDate: a.nextInspectionDate,
          },
        },
      },
    })
    createdFacility++
  }

  console.log(
    `[seed] 사무 자산 ${createdOffice}개, 시설 자산 ${createdFacility}개 시드 완료 ` +
      `(office skip: existing=${skipOfficeExisting} noCat=${skipOfficeNoCategory})`,
  )
}

async function seedDepartmentsAndTeams() {
  console.log('[seed] 부서/팀 가짜데이터 시드 시작...')

  const depts = [
    { code: 'MGMT-DEPT', name: '경영지원본부' },
    { code: 'SALES-DEPT', name: '영업본부' },
    { code: 'TECH-DEPT', name: '기술본부' },
    { code: 'CS-DEPT', name: '고객지원본부' },
  ]
  const deptIds: Record<string, string> = {}
  for (const d of depts) {
    const r = await prisma.department.upsert({
      where: { code: d.code },
      create: { code: d.code, name: d.name },
      update: {},
    })
    deptIds[d.code] = r.id
  }

  // 기존 부서 ID 조회 (추가 팀 시드용)
  const devDept = await prisma.department.findUnique({ where: { code: 'DEV-DEPT' } })
  const designDept = await prisma.department.findUnique({ where: { code: 'DESIGN-DEPT' } })
  if (devDept) deptIds['DEV-DEPT'] = devDept.id
  if (designDept) deptIds['DESIGN-DEPT'] = designDept.id

  const teams = [
    // 경영지원본부
    { code: 'ADMIN-TEAM', name: '총무팀', deptCode: 'MGMT-DEPT' },
    { code: 'HR-TEAM', name: '인사팀', deptCode: 'MGMT-DEPT' },
    { code: 'FINANCE-TEAM', name: '재무팀', deptCode: 'MGMT-DEPT' },
    // 영업본부
    { code: 'DOMESTIC-SALES', name: '국내영업팀', deptCode: 'SALES-DEPT' },
    { code: 'GLOBAL-SALES', name: '해외영업팀', deptCode: 'SALES-DEPT' },
    { code: 'MARKETING', name: '마케팅팀', deptCode: 'SALES-DEPT' },
    // 기술본부
    { code: 'BACKEND', name: '백엔드팀', deptCode: 'TECH-DEPT' },
    { code: 'FRONTEND', name: '프론트엔드팀', deptCode: 'TECH-DEPT' },
    { code: 'INFRA', name: '인프라팀', deptCode: 'TECH-DEPT' },
    // 고객지원본부
    { code: 'CS-TEAM', name: '고객서비스팀', deptCode: 'CS-DEPT' },
    { code: 'QA-TEAM', name: 'QA팀', deptCode: 'CS-DEPT' },
    // 기존 개발본부에 팀 추가
    { code: 'DEV2', name: '개발2팀', deptCode: 'DEV-DEPT' },
    // 기존 디자인본부에 팀 추가
    { code: 'UX', name: 'UX팀', deptCode: 'DESIGN-DEPT' },
  ]

  let created = 0
  for (const t of teams) {
    const deptId = deptIds[t.deptCode]
    if (!deptId) continue
    await prisma.team.upsert({
      where: { code: t.code },
      create: { code: t.code, name: t.name, departmentId: deptId },
      update: {},
    })
    created++
  }

  console.log(`[seed] 부서 ${depts.length}개, 팀 ${created}개 완료`)
}

async function main() {
  await seedAccountingCategories()

  console.log('[seed] Manufacturer 시드 시작...')

  // 1. Manufacturer 마스터 생성
  const manufacturerNames = [...new Set(catalogs.map((c) => c.manufacturer))]
  const manufacturerMap: Record<string, string> = {}
  for (const name of manufacturerNames) {
    const m = await prisma.manufacturer.upsert({
      where: { name },
      create: { name },
      update: {},
    })
    manufacturerMap[name] = m.id
  }
  console.log(`[seed] Manufacturer: ${manufacturerNames.length}개 준비 완료`)

  // 2. Vendor(공급업체) + 수리업체 목업
  const vendors = [
    // ── 기존 공급업체 (구매용, PENDING 상태) ─────────────────
    {
      name: '(주)한국 Apple 공식 리셀러',
      contactName: '김영업',
      email: 'sales@kr-apple.example',
      status: 'PENDING' as const,
    },
    {
      name: 'MS 코리아 공식 파트너',
      contactName: '이파트너',
      email: 'ms@partner.example',
      status: 'PENDING' as const,
    },
    {
      name: '이와이드 디지털',
      contactName: '박구매',
      email: 'buy@ewide.example',
      status: 'PENDING' as const,
    },

    // ── 수리업체 목업 (APPROVED — 정비 배정 가능) ──────────────
    {
      name: '(주)KT CS 서비스',
      status: 'APPROVED' as const,
      contactName: '오수리',
      email: 'repair@ktcs.example',
      phone: '02-1234-5678',
      businessRegistrationNumber: '123-45-67890',
      ceoName: '정대표',
      businessType: '서비스업',
      businessItem: 'IT기기 수리',
      addressHeadOffice: '서울특별시 서초구 강남대로 123',
      supportedClasses: ['IT_ASSET', 'FACILITY_ASSET'] as AssetClass[],
      serviceRegion: '서울, 경기, 인천',
      canVisitOnSite: true,
      canReceiveDevice: true,
      operatingHoursStart: '09:00',
      operatingHoursEnd: '18:00',
      operatesOnWeekend: false,
      canHandleUrgent: true,
      urgentConditionNote: '긴급 출장 시 추가 비용 발생, 사전 협의 필요',
      brandModelNote: 'Dell, HP, Lenovo 노트북/데스크톱 전문',
      slaHours: 4,
      slaCompletionDays: 5,
      contractStartDate: new Date('2026-01-01'),
      contractEndDate: new Date('2026-12-31'),
      penaltyTerms: 'SLA 초과 1일당 계약금액의 0.5%',
      repairWarrantyDays: 30,
      bankName: '국민은행',
      bankAccountHolder: '주식회사 KT CS 서비스',
      paymentTerms: 'MONTH_END' as const,
      taxInvoiceMethod: 'EMAIL' as const,
      taxInvoiceEmail: 'tax@ktcs.example',
      isVatIncluded: true,
      isWithholdingTax: false,
    },
    {
      name: '(주)삼성전자서비스',
      status: 'APPROVED' as const,
      contactName: '나담당',
      email: 'service@sec-repair.example',
      phone: '1588-3366',
      businessRegistrationNumber: '234-56-78901',
      ceoName: '이센터',
      businessType: '서비스업',
      businessItem: '전자제품 수리',
      addressHeadOffice: '경기도 수원시 영통구 삼성로 129',
      supportedClasses: ['IT_ASSET', 'OFFICE_ASSET', 'FACILITY_ASSET'] as AssetClass[],
      serviceRegion: '전국',
      canVisitOnSite: true,
      canReceiveDevice: true,
      operatingHoursStart: '09:00',
      operatingHoursEnd: '17:00',
      operatesOnWeekend: true,
      canHandleUrgent: false,
      brandModelNote: '삼성 전 제품 공식 수리 파트너',
      slaHours: 8,
      slaCompletionDays: 7,
      contractStartDate: new Date('2026-03-01'),
      contractEndDate: new Date('2027-02-28'),
      repairWarrantyDays: 90,
      bankName: '신한은행',
      bankAccountHolder: '주식회사 삼성전자서비스',
      paymentTerms: 'DAYS_AFTER' as const,
      paymentDaysAfter: 30,
      taxInvoiceMethod: 'EMAIL' as const,
      taxInvoiceEmail: 'einvoice@sec-repair.example',
      isVatIncluded: true,
      isWithholdingTax: false,
    },
    {
      name: '개인사업자 이기술 수리',
      status: 'PENDING' as const,
      contactName: '이기술',
      email: 'tech@itechrepair.example',
      phone: '010-9876-5432',
      businessRegistrationNumber: '345-67-89012',
      ceoName: '이기술',
      businessType: '서비스업',
      businessItem: '컴퓨터 수리',
      supportedClasses: ['IT_ASSET'] as AssetClass[],
      serviceRegion: '서울 강남구, 서초구',
      canVisitOnSite: true,
      canReceiveDevice: false,
      slaHours: 24,
      bankName: '카카오뱅크',
      bankAccountHolder: '이기술',
      paymentTerms: 'PER_CASE' as const,
      taxInvoiceMethod: 'EMAIL' as const,
      taxInvoiceEmail: 'tech@itechrepair.example',
      isVatIncluded: false,
      isWithholdingTax: true,
    },

    // ── 소프트웨어 공급업체 (SOFTWARE type) ───────────────────
    {
      name: '마이크로소프트 코리아',
      type: VendorType.SOFTWARE,
      status: 'APPROVED' as const,
      contactName: '박라이선스',
      email: 'license@microsoft.example',
      phone: '02-733-8000',
      businessRegistrationNumber: '110-81-11122',
      ceoName: '이지역',
      businessType: '소프트웨어업',
      businessItem: '소프트웨어 및 클라우드 서비스',
      addressHeadOffice: '서울특별시 중구 을지로 100',
      addressBusiness: '서울특별시 중구 을지로 100',
      softwareDomain: '패키지, SaaS, 클라우드',
      productListNote: 'Microsoft 365 E3/E5, Windows 11 Pro, Azure, Dynamics 365',
      skuNote: 'AAA-12345 (M365 E3), AAA-67890 (M365 E5)',
      deliveryNote: '라이선스 키 이메일 즉시 발급, 볼륨 구매 시 EA 계약',
      maintenancePolicyNote: '월간 보안 패치, 연 2회 메이저 업데이트, 24/7 기술지원',
      techStaffCount: 120,
      certificationNote: 'ISO 27001, ISO 9001, Microsoft Gold Partner',
      financialNote: '연 매출 1조 8,000억 원, 소프트웨어 매출 비중 85%',
      canDemo: true,
      demoNote: '최대 25석 E3 30일 평가판 제공, MS 테크니컬 세일즈 지원',
      contractStartDate: new Date('2026-01-01'),
      contractEndDate: new Date('2026-12-31'),
      bankName: '하나은행',
      bankAccountHolder: '한국마이크로소프트 유한회사',
      paymentTerms: 'MONTH_END' as const,
      taxInvoiceMethod: 'EMAIL' as const,
      taxInvoiceEmail: 'tax@microsoft.example',
      isVatIncluded: true,
      isWithholdingTax: false,
      approvedAt: new Date('2026-01-15').toISOString(),
    },
    {
      name: '(주)더존비즈온',
      type: VendorType.SOFTWARE,
      status: 'APPROVED' as const,
      contactName: '최ERP',
      email: 'erp@douzone.example',
      phone: '02-3299-7000',
      businessRegistrationNumber: '220-81-34567',
      ceoName: '김영우',
      businessType: '소프트웨어업',
      businessItem: 'ERP / 그룹웨어 / 전자세금계산서',
      addressHeadOffice: '강원특별자치도 춘천시 신동면 증리 1',
      addressBusiness: '서울특별시 구로구 디지털로 306',
      softwareDomain: '패키지, SaaS',
      productListNote: 'iCUBE ERP, i-ERP, 위하고(WEHAGO) 그룹웨어, 전자세금계산서',
      skuNote: 'DZ-ERP-SMB (중소기업형), DZ-ERP-ENT (엔터프라이즈)',
      deliveryNote: '초기 설치 3~4주 (설치형), SaaS는 계약 후 즉시 사용',
      maintenancePolicyNote: '분기별 법인세법·부가세법 반영 업데이트, 전용 고객지원 채널',
      techStaffCount: 350,
      certificationNote: 'GS인증 1등급, ISO 27001, 조달청 혁신제품',
      financialNote: '연 매출 3,200억 원, 소프트웨어 매출 비중 90%',
      canDemo: true,
      demoNote: '원격 시연 가능 (1시간), 현장 POC 요청 시 별도 협의',
      contractStartDate: new Date('2026-02-01'),
      contractEndDate: new Date('2027-01-31'),
      bankName: '우리은행',
      bankAccountHolder: '주식회사 더존비즈온',
      paymentTerms: 'MONTH_END' as const,
      taxInvoiceMethod: 'EMAIL' as const,
      taxInvoiceEmail: 'invoice@douzone.example',
      isVatIncluded: true,
      isWithholdingTax: false,
      approvedAt: new Date('2026-02-10').toISOString(),
    },
    {
      name: '(주)NHN클라우드',
      type: VendorType.SOFTWARE,
      status: 'APPROVED' as const,
      contactName: '정클라우드',
      email: 'cloud@nhncloud.example',
      phone: '1588-7011',
      businessRegistrationNumber: '331-81-45678',
      ceoName: '김동훈',
      businessType: '클라우드서비스업',
      businessItem: 'IaaS / PaaS / SaaS / 보안 솔루션',
      addressHeadOffice: '경기도 성남시 분당구 대왕판교로 645번길 16',
      addressBusiness: '경기도 성남시 분당구 대왕판교로 645번길 16',
      softwareDomain: 'SaaS, 클라우드',
      productListNote: 'NHN Cloud IaaS (서버·스토리지), Dooray! 그룹웨어, AI 문서 OCR, 보안 WAF',
      skuNote: 'NHN-CLOUD-STD, NHN-DOORAY-PRO',
      deliveryNote: '계약 익일 클라우드 콘솔 계정 발급, 기술지원팀 온보딩',
      maintenancePolicyNote: '월간 패치 배포, 99.9% SLA 보장, 장애 발생 시 1시간 내 통보',
      techStaffCount: 85,
      certificationNote: 'ISO 27001, CSAP(클라우드 서비스 보안인증) 표준등급, CC인증',
      financialNote: '연 매출 약 1,400억 원, 클라우드 부문 100%',
      canDemo: true,
      demoNote: '30일 무료 트라이얼 제공 (크레딧 20만 원), 전담 SE 지원',
      contractStartDate: new Date('2026-03-01'),
      contractEndDate: new Date('2027-02-28'),
      bankName: '기업은행',
      bankAccountHolder: '주식회사 NHN클라우드',
      paymentTerms: 'MONTH_END' as const,
      taxInvoiceMethod: 'EMAIL' as const,
      taxInvoiceEmail: 'tax@nhncloud.example',
      isVatIncluded: true,
      isWithholdingTax: false,
      approvedAt: new Date('2026-03-05').toISOString(),
    },
    {
      name: '(주)스마트인사이트',
      type: VendorType.SOFTWARE,
      status: 'PENDING' as const,
      contactName: '한보안',
      email: 'sales@smart-insight.example',
      phone: '02-6919-0000',
      businessRegistrationNumber: '120-81-56789',
      ceoName: '이보안',
      businessType: '소프트웨어업',
      businessItem: '정보보안 솔루션 / DLP / SIEM',
      addressHeadOffice: '서울특별시 강남구 테헤란로 521',
      addressBusiness: '서울특별시 강남구 테헤란로 521',
      softwareDomain: '패키지, 보안 솔루션',
      productListNote: 'DLP Pro (내부정보유출방지), SIEM-X (통합로그분석), EDR Agent',
      skuNote: 'SI-DLP-100 (100 PC), SI-SIEM-ENT',
      deliveryNote: '설치 지원 포함, 초기 세팅 2주 소요',
      maintenancePolicyNote: '월 1회 패턴 업데이트, 보안 긴급패치 24시간 내 배포',
      techStaffCount: 42,
      certificationNote: 'CC인증(EAL4), ISMS 인증, 조달청 등록',
      financialNote: '연 매출 약 280억 원, 보안 솔루션 매출 100%',
      canDemo: true,
      demoNote: 'PoC 환경 제공 가능 (2주), 원격 또는 현장 방문 택1',
      bankName: '신한은행',
      bankAccountHolder: '주식회사 스마트인사이트',
      paymentTerms: 'PER_CASE' as const,
      taxInvoiceMethod: 'EMAIL' as const,
      taxInvoiceEmail: 'tax@smart-insight.example',
      isVatIncluded: true,
      isWithholdingTax: false,
    },
    {
      name: '토스페이먼츠 SaaS',
      type: VendorType.SOFTWARE,
      status: 'DRAFT' as const,
      contactName: '오결제',
      email: 'b2b@tosspayments.example',
      phone: '1899-4549',
      businessRegistrationNumber: '556-86-00427',
      businessType: '소프트웨어업',
      businessItem: '전자결제 SaaS / 핀테크',
      softwareDomain: 'SaaS, 핀테크',
      productListNote: '토스페이먼츠 PG, 빌링키 정기결제, 브랜드페이',
      skuNote: 'TOSS-PG-STD, TOSS-BILLING',
      deliveryNote: 'API 키 발급 즉시, SDK 문서 제공',
      maintenancePolicyNote: '99.99% 가동률 SLA, 장애 시 SMS 즉시 알림',
      techStaffCount: 15,
      canDemo: false,
      bankName: '하나은행',
      bankAccountHolder: '주식회사 토스페이먼츠',
      paymentTerms: 'MONTH_END' as const,
      taxInvoiceMethod: 'EMAIL' as const,
      isVatIncluded: true,
      isWithholdingTax: false,
    },
  ]
  for (const v of vendors) {
    const existing = await prisma.vendor.findFirst({ where: { name: v.name } })
    if (!existing) await prisma.vendor.create({ data: v })
  }
  console.log(`[seed] Vendor/수리업체: ${vendors.length}개 준비 완료`)

  console.log('[seed] AssetCatalog 시드 시작...')

  // 3-0. 카탈로그 연결용 기본 카테고리 확보 (매핑 실패 시 fallback)
  const defaultCategory = await prisma.assetCategory.upsert({
    where: { code: 'IT_DEFAULT' },
    update: {},
    create: { code: 'IT_DEFAULT', name: 'IT 기기', class: 'IT_ASSET', subType: 'HARDWARE' },
  })

  // catalog name 키워드 기반 카테고리 자동 분류. 매칭 안 되면 IT_DEFAULT fallback.
  function inferCategoryCode(name: string): string {
    if (/iPad|Galaxy Tab/i.test(name)) return 'TABLET'
    if (/iPhone|Galaxy S\b|Pixel/i.test(name)) return 'SMARTPHONE'
    if (/MacBook|Gram|XPS|EliteBook|Galaxy Book/i.test(name)) return 'LAPTOP'
    if (/Odyssey|UltraFine|Monitor|U2723QE/i.test(name)) return 'MONITOR'
    if (/Office 365|Windows 11|Creative Cloud|IntelliJ|Jira/i.test(name)) return 'SOFTWARE'
    if (/Aeron|Embody|T50/i.test(name)) return 'CHAIR'
    if (/데스크|회의용/i.test(name)) return 'DESK'
    if (/캐비닛/i.test(name)) return 'CABINET'
    if (/imageRUNNER|LaserJet|D440|EcoTank|복합기/i.test(name)) return 'COPIER'
    if (/EB-2247U|projector|프로젝터/i.test(name)) return 'PROJECTOR'
    if (/에어컨|공조/i.test(name)) return 'AIRCON'
    if (/Wisenet|DC-D|CCTV/i.test(name)) return 'CCTV'
    if (/스프링클러|소방/i.test(name)) return 'FIRE_SAFETY'
    if (/YZER|GeN2|elevator|승강기|엘리베이터/i.test(name)) return 'ELEVATOR'
    return 'IT_DEFAULT'
  }

  // 카테고리 코드 → id 캐시 (반복 lookup 회피)
  const categoryIdByCode = new Map<string, string>()
  async function getCategoryId(code: string): Promise<string> {
    const cached = categoryIdByCode.get(code)
    if (cached) return cached
    const cat = await prisma.assetCategory.findUnique({ where: { code } })
    const id = cat?.id ?? defaultCategory.id
    categoryIdByCode.set(code, id)
    return id
  }

  // 3. 카탈로그 생성 — manufacturerId + categoryId 연결. 기존 catalog 도 categoryId 보정.
  let created = 0
  let skipped = 0
  let recategorized = 0
  for (const c of catalogs) {
    const inferredCode = inferCategoryCode(c.name)
    const inferredCategoryId = await getCategoryId(inferredCode)

    const existing = await prisma.assetCatalog.findFirst({
      where: { name: c.name, manufacturer: c.manufacturer },
    })
    if (existing) {
      const updates: Record<string, unknown> = {}
      if (!existing.manufacturerId && manufacturerMap[c.manufacturer]) {
        updates.manufacturerId = manufacturerMap[c.manufacturer]
      }
      // categoryId 가 기본값(IT_DEFAULT) 이거나 추론값과 다르면 갱신
      if (existing.categoryId !== inferredCategoryId) {
        updates.categoryId = inferredCategoryId
        recategorized++
      }
      if (Object.keys(updates).length > 0) {
        await prisma.assetCatalog.update({ where: { id: existing.id }, data: updates })
      }
      skipped++
      continue
    }
    await prisma.assetCatalog.create({
      data: {
        ...c,
        manufacturerId: manufacturerMap[c.manufacturer] ?? null,
        categoryId: inferredCategoryId,
      },
    })
    created++
  }

  console.log(
    `[seed] AssetCatalog: ${created} 생성, ${skipped} 스킵 (이미 존재), ${recategorized} 카테고리 재분류`,
  )

  // ── Admin 계정 시드 (.env 의 ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD)
  const adminEmail = process.env.ADMIN_SEED_EMAIL
  const adminPassword = process.env.ADMIN_SEED_PASSWORD
  const adminName = process.env.ADMIN_SEED_NAME ?? '관리자'

  if (adminEmail && adminPassword) {
    const existing = await prisma.user.findUnique({ where: { email: adminEmail } })
    if (existing) {
      console.log(`[seed] Admin (${adminEmail}) 이미 존재 — 스킵`)
    } else {
      const hashed = await bcrypt.hash(adminPassword, SALT_ROUNDS)
      await prisma.user.create({
        data: {
          email: adminEmail,
          name: adminName,
          role: 'ADMIN',
          isActive: true,
          password: hashed,
          hireDate: new Date('2020-01-01'),
        },
      })
      console.log(`[seed] Admin (${adminEmail}) 생성 완료 (role=ADMIN, isActive=true)`)
    }
  } else {
    console.log(
      '[seed] Admin 시드 스킵 — .env 에 ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD 설정 시 자동 생성',
    )
  }

  // ── Security Officer 계정 시드 (.env 의 SECURITY_OFFICER_SEED_EMAIL / PASSWORD)
  const secOfficerEmail = process.env.SECURITY_OFFICER_SEED_EMAIL ?? 'sec-officer@verify.local'
  const secOfficerPassword = process.env.SECURITY_OFFICER_SEED_PASSWORD ?? 'test1234!'
  const secOfficerName = process.env.SECURITY_OFFICER_SEED_NAME ?? '보안담당자'

  const existingSec = await prisma.user.findUnique({ where: { email: secOfficerEmail } })
  if (existingSec) {
    console.log(`[seed] Security Officer (${secOfficerEmail}) 이미 존재 — 스킵`)
  } else {
    const hashed = await bcrypt.hash(secOfficerPassword, SALT_ROUNDS)
    await prisma.user.create({
      data: {
        email: secOfficerEmail,
        name: secOfficerName,
        role: 'SECURITY_OFFICER',
        isActive: true,
        password: hashed,
        hireDate: new Date('2020-01-01'),
      },
    })
    console.log(`[seed] Security Officer (${secOfficerEmail}) 생성 완료 (role=SECURITY_OFFICER, isActive=true)`)
  }

  // ── 부서/팀 가짜데이터 시드
  await seedDepartmentsAndTeams()

  // ── 검증 케이스 시드 (Department / Location / Category / 7명 user / 3+ asset / 1 maintenance)
  await seedVerifyData()

  // ── 사무/시설 자산 인스턴스 시드 (전용 테이블 포함)
  await seedOfficeAndFacilityAssets()
}

// ─────────────────────────────────────────
// 검증 케이스 시드 (docs/loan-be-verification-cases.md 의 시드 데이터)
// 모든 검증 user 의 비밀번호 = 'test1234!' (dev only)
// idempotent — 중복 실행 safe
// ─────────────────────────────────────────

const VERIFY_PASSWORD = 'test1234!'
const today = (offsetDays = 0) => {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return d
}

async function seedVerifyData() {
  console.log('[seed] 검증 케이스 시드 시작...')

  // 1. Department(부서) → Team(팀) 두 레벨 생성
  const dept = await prisma.department.upsert({
    where: { code: 'IT-DEPT' },
    create: { code: 'IT-DEPT', name: 'IT본부' },
    update: {},
  })
  const team = await prisma.team.upsert({
    where: { code: 'IT' },
    create: { code: 'IT', name: 'IT팀', departmentId: dept.id },
    update: {},
  })

  // 2. Location
  const location = await prisma.location.findFirst({
    where: { name: '본사 1층' },
  })
  const locId =
    location?.id ??
    (await prisma.location.create({ data: { name: '본사 1층', building: '본사' } })).id

  // 3. AssetCategory (Laptop)
  const category = await prisma.assetCategory.upsert({
    where: { code: 'LAPTOP' },
    create: { code: 'LAPTOP', name: '노트북', class: 'IT_ASSET' },
    update: {},
  })

  // 4. 7명 user
  const hashedPw = await bcrypt.hash(VERIFY_PASSWORD, SALT_ROUNDS)
  const usersSeed = [
    // ── 기존 역할 ────────────────────────────────────────────
    { email: 'admin-1@verify.local', name: 'admin-1', role: 'ADMIN' as const },
    { email: 'manager-1@verify.local', name: 'manager-1', role: 'TEAM_LEAD' as const },
    { email: 'manager-2@verify.local', name: 'manager-2', role: 'TEAM_LEAD' as const },
    { email: 'asset-mgr-1@verify.local', name: 'asset-mgr-1', role: 'ASSET_MANAGER' as const },
    {
      email: 'user-newbie@verify.local',
      name: 'user-newbie',
      role: 'USER' as const,
      hireDate: today(-15),
    },
    {
      email: 'user-normal@verify.local',
      name: 'user-normal',
      role: 'USER' as const,
      hireDate: today(-200),
    },
    {
      email: 'user-leaving@verify.local',
      name: 'user-leaving',
      role: 'USER' as const,
      hireDate: today(-100),
      terminationDate: today(3),
    },

    // ── 조직 결재 (ADR 0003) ───────────────────────────────────
    // 부서장: 본인 부서의 2차 대여 승인, 부서 전체 자산 가시성
    { email: 'dept-lead-1@verify.local', name: 'dept-lead-1', role: 'DEPT_LEAD' as const },

    // ── 신규 운영 역할 ─────────────────────────────────────────
    // 수리담당자: 수리접수·배정·상태관리, 수리업체 관리
    { email: 'repair-owner-1@verify.local', name: 'repair-owner-1', role: 'REPAIR_OWNER' as const },
    // 수리기술자: 수리진행·작업로그·부품 사용 기록
    { email: 'repair-tech-1@verify.local', name: 'repair-tech-1', role: 'REPAIR_TECH' as const },
    { email: 'repair-tech-2@verify.local', name: 'repair-tech-2', role: 'REPAIR_TECH' as const },
    // 정산자: 정산정보·세금계산서·AP 전표·지급
    { email: 'ap-user-1@verify.local', name: 'ap-user-1', role: 'AP_USER' as const },
    // 승인자: 수리비·폐기·자산이관 승인
    { email: 'approver-1@verify.local', name: 'approver-1', role: 'APPROVER' as const },

    // ── 정보보안 (ADR 0002) ────────────────────────────────────
    // 정보보안담당자: SW 허가유무 최종 판정, Shadow IT 감독
    {
      email: 'sec-officer-1@verify.local',
      name: 'sec-officer-1',
      role: 'SECURITY_OFFICER' as const,
    },
  ]
  const users: Record<string, string> = {}
  for (const u of usersSeed) {
    const existing = await prisma.user.findUnique({ where: { email: u.email } })
    if (existing) {
      users[u.name] = existing.id
      continue
    }
    const created = await prisma.user.create({
      data: {
        email: u.email,
        name: u.name,
        role: u.role,
        password: hashedPw,
        isActive: true,
        teamId: team.id,
        hireDate: 'hireDate' in u ? u.hireDate : new Date('2020-01-01'),
        terminationDate: 'terminationDate' in u ? u.terminationDate : null,
      },
    })
    users[u.name] = created.id
  }
  console.log(`[seed] 검증 user ${Object.keys(users).length}명 준비 완료`)

  // ADR 0003 — IT본부의 부서장(DEPT_LEAD) 매핑
  if (users['dept-lead-1']) {
    await prisma.department.update({
      where: { id: dept.id },
      data: { leaderId: users['dept-lead-1'] },
    })
    console.log('[seed] IT본부 부서장 = dept-lead-1 매핑 완료')
  }

  // 5. Asset 3개 (HAR-0001, HAR-0002, HAR-0003)
  const assetsSeed = [
    { code: 'HAR-VRF-0001', name: 'Verify Laptop 1', status: 'IDLE' as const },
    { code: 'HAR-VRF-0002', name: 'Verify Laptop 2', status: 'IDLE' as const },
    {
      code: 'HAR-VRF-0003',
      name: 'Verify Laptop 3',
      status: 'REPAIR' as const,
      assignedTo: 'user-newbie',
    },
  ]
  const assets: Record<string, string> = {}
  for (const a of assetsSeed) {
    const existing = await prisma.asset.findUnique({ where: { assetCode: a.code } })
    if (existing) {
      assets[a.code] = existing.id
      continue
    }
    const created = await prisma.asset.create({
      data: {
        assetCode: a.code,
        name: a.name,
        class: 'IT_ASSET',
        status: a.status,
        condition: 'GOOD',
        purchaseDate: today(-365),
        purchasePrice: 2_500_000,
        categoryId: category.id,
        departmentId: dept.id,
        locationId: locId,
        assignedUserId: 'assignedTo' in a ? users[a.assignedTo as string] : null,
      },
    })
    await prisma.assetHistory.create({
      data: {
        assetId: created.id,
        action: 'CREATED',
        description: `자산 등록: ${created.assetCode} (${created.name})`,
        performedById: users['admin-1']!,
      },
    })
    assets[a.code] = created.id
  }
  console.log(`[seed] 검증 asset ${Object.keys(assets).length}개 준비 완료`)

  // 6. Maintenance — HAR-VRF-0003 IN_PROGRESS + ETA (EDF W3 테스트용)
  const existingMaint = await prisma.maintenance.findFirst({
    where: { assetId: assets['HAR-VRF-0003'], status: 'IN_PROGRESS' },
  })
  if (!existingMaint) {
    await prisma.maintenance.create({
      data: {
        assetId: assets['HAR-VRF-0003']!,
        title: '키보드 수리',
        description: '키보드 일부 키 입력 불가 — EDF W3 테스트용 IN_PROGRESS',
        status: 'IN_PROGRESS',
        scheduledAt: today(-1),
        estimatedCompletionDate: today(5),
        managerId: users['admin-1']!,
        adminApprovedAt: today(-2),
        adminApprovedById: users['admin-1']!,
        managerApprovedAt: today(-2),
        managerApprovedById: users['admin-1']!,
      },
    })
    console.log('[seed] 검증 maintenance 1개 생성 (HAR-VRF-0003 IN_PROGRESS, ETA=오늘+5일)')
  } else {
    console.log('[seed] 검증 maintenance 이미 존재 — 스킵')
  }

  // 7. 두 팀 구조 — 개발팀 / 디자인팀 (팀장 1명 + 사원 2명)
  const devDept = await prisma.department.upsert({
    where: { code: 'DEV-DEPT' },
    create: { code: 'DEV-DEPT', name: '개발본부' },
    update: {},
  })
  const designDept = await prisma.department.upsert({
    where: { code: 'DESIGN-DEPT' },
    create: { code: 'DESIGN-DEPT', name: '디자인본부' },
    update: {},
  })

  const devTeam = await prisma.team.upsert({
    where: { code: 'DEV' },
    create: { code: 'DEV', name: '개발팀', departmentId: devDept.id },
    update: {},
  })
  const designTeam = await prisma.team.upsert({
    where: { code: 'DESIGN' },
    create: { code: 'DESIGN', name: '디자인팀', departmentId: designDept.id },
    update: {},
  })

  // 팀장 + 사원 시드
  const teamUsers = [
    {
      email: 'lead-dev@verify.local',
      name: 'lead-dev',
      role: 'TEAM_LEAD' as const,
      teamId: devTeam.id,
    },
    {
      email: 'lead-design@verify.local',
      name: 'lead-design',
      role: 'TEAM_LEAD' as const,
      teamId: designTeam.id,
    },
    {
      email: 'user-dev-1@verify.local',
      name: 'user-dev-1',
      role: 'USER' as const,
      teamId: devTeam.id,
    },
    {
      email: 'user-dev-2@verify.local',
      name: 'user-dev-2',
      role: 'USER' as const,
      teamId: devTeam.id,
    },
    {
      email: 'user-design-1@verify.local',
      name: 'user-design-1',
      role: 'USER' as const,
      teamId: designTeam.id,
    },
    {
      email: 'user-design-2@verify.local',
      name: 'user-design-2',
      role: 'USER' as const,
      teamId: designTeam.id,
    },
  ]
  const teamUserIds: Record<string, string> = {}
  for (const u of teamUsers) {
    const existing = await prisma.user.findUnique({ where: { email: u.email } })
    if (existing) {
      teamUserIds[u.name] = existing.id
      continue
    }
    const created = await prisma.user.create({
      data: {
        email: u.email,
        name: u.name,
        role: u.role,
        password: hashedPw,
        isActive: true,
        teamId: u.teamId,
        hireDate: new Date('2021-01-01'),
      },
    })
    teamUserIds[u.name] = created.id
  }

  // 팀장 ID를 각 팀에 연결
  await prisma.team.update({
    where: { id: devTeam.id },
    data: { teamLeadId: teamUserIds['lead-dev'] },
  })
  await prisma.team.update({
    where: { id: designTeam.id },
    data: { teamLeadId: teamUserIds['lead-design'] },
  })

  console.log('[seed] 두 팀 구조 시드 완료: 개발팀(팀장1+사원2) / 디자인팀(팀장1+사원2)')

  // CONTEXT.md L84 — 6개 본부 DEPT_LEAD 매핑 (미배정 시 대여 PENDING_DEPT 자동 스킵 → 팀장→ADMIN 직행 현상 해소)
  const deptLeadAssignments = [
    { deptCode: 'MGMT-DEPT', email: 'dept-lead-mgmt@verify.local', name: 'dept-lead-mgmt' },
    { deptCode: 'SALES-DEPT', email: 'dept-lead-sales@verify.local', name: 'dept-lead-sales' },
    { deptCode: 'TECH-DEPT', email: 'dept-lead-tech@verify.local', name: 'dept-lead-tech' },
    { deptCode: 'CS-DEPT', email: 'dept-lead-cs@verify.local', name: 'dept-lead-cs' },
    { deptCode: 'DEV-DEPT', email: 'dept-lead-dev@verify.local', name: 'dept-lead-dev' },
    { deptCode: 'DESIGN-DEPT', email: 'dept-lead-design@verify.local', name: 'dept-lead-design' },
  ]
  for (const a of deptLeadAssignments) {
    const targetDept = await prisma.department.findUnique({ where: { code: a.deptCode } })
    if (!targetDept) continue
    // teamId = null — CONTEXT.md L22 "DEPT_LEAD 는 어느 팀에도 소속되지 않는다"
    const leader = await prisma.user.upsert({
      where: { email: a.email },
      create: {
        email: a.email,
        name: a.name,
        role: 'DEPT_LEAD',
        password: hashedPw,
        isActive: true,
        teamId: null,
        hireDate: new Date('2020-01-01'),
      },
      update: {},
    })
    if (targetDept.leaderId !== leader.id) {
      await prisma.department.update({
        where: { id: targetDept.id },
        data: { leaderId: leader.id },
      })
    }
  }
  console.log('[seed] 6개 본부 부서장 매핑 완료 (MGMT/SALES/TECH/CS/DEV/DESIGN)')

  // ── 임시 Hardware / Software 자산 시드 ─────────────────────────────
  await seedDeviceAssets({
    dept,
    devDept,
    designDept,
    locId,
    users,
    teamUserIds,
    category,
  })

  // 이력이 없는 기존 자산 소급 백필 (시드 재실행 시 안전하게 스킵)
  const assetsWithoutHistory = await prisma.asset.findMany({
    where: { histories: { none: {} } },
    select: { id: true, assetCode: true, name: true, createdAt: true },
  })
  if (assetsWithoutHistory.length > 0) {
    const adminId = users['admin-1']!
    await prisma.assetHistory.createMany({
      data: assetsWithoutHistory.map((a) => ({
        assetId: a.id,
        action: 'CREATED' as const,
        description: `자산 등록: ${a.assetCode} (${a.name})`,
        performedById: adminId,
        createdAt: a.createdAt,
      })),
    })
    console.log(`[seed] 이력 백필: ${assetsWithoutHistory.length}개 자산에 CREATED 이력 추가`)
  }

  console.log(`[seed] 검증 시드 완료. 모든 검증 user 비밀번호: '${VERIFY_PASSWORD}' (dev only)`)
}

async function seedDeviceAssets({
  dept,
  devDept,
  designDept,
  locId,
  users: _users,
  teamUserIds,
  category,
}: {
  dept: { id: string }
  devDept: { id: string }
  designDept: { id: string }
  locId: string
  users: Record<string, string>
  teamUserIds: Record<string, string>
  category: { id: string }
}) {
  // 카테고리 추가
  const catMonitor = await prisma.assetCategory.upsert({
    where: { code: 'MONITOR' },
    create: { code: 'MONITOR', name: '모니터', class: 'IT_ASSET' },
    update: {},
  })
  const catSoftware = await prisma.assetCategory.upsert({
    where: { code: 'SOFTWARE' },
    create: { code: 'SOFTWARE', name: '소프트웨어', class: 'IT_ASSET' },
    update: {},
  })

  // ── Hardware 자산 ──────────────────────────────────────────────────
  const hwSeed = [
    // 개발팀 노트북
    {
      assetCode: 'HW-DEV-0001',
      name: 'MacBook Pro 14 (개발1)',
      departmentId: devDept.id,
      assignedUserId: teamUserIds['user-dev-1'] ?? null,
      status: 'OPERATING' as const,
      hw: {
        serialNo: 'SN-DEV-001',
        cpu: 'Apple M3 Pro',
        ramGb: 18,
        storageGb: 512,
        warrantyEnd: today(365),
      },
    },
    {
      assetCode: 'HW-DEV-0002',
      name: 'MacBook Pro 14 (개발2)',
      departmentId: devDept.id,
      assignedUserId: teamUserIds['user-dev-2'] ?? null,
      status: 'OPERATING' as const,
      hw: {
        serialNo: 'SN-DEV-002',
        cpu: 'Apple M3 Pro',
        ramGb: 18,
        storageGb: 512,
        warrantyEnd: today(300),
      },
    },
    {
      assetCode: 'HW-DEV-0003',
      name: 'Dell XPS 15 (개발팀장)',
      departmentId: devDept.id,
      assignedUserId: teamUserIds['lead-dev'] ?? null,
      status: 'OPERATING' as const,
      hw: {
        serialNo: 'SN-DEV-003',
        cpu: 'Intel Core i7-13700H',
        ramGb: 32,
        storageGb: 1024,
        warrantyEnd: today(500),
      },
    },
    {
      assetCode: 'HW-DEV-0004',
      name: 'Dell U2723QE 모니터',
      departmentId: devDept.id,
      assignedUserId: null,
      status: 'IDLE' as const,
      categoryId: catMonitor.id,
      hw: { serialNo: 'SN-DEV-004', warrantyEnd: today(700) },
    },
    // 디자인팀 노트북
    {
      assetCode: 'HW-DSN-0001',
      name: 'MacBook Pro 16 (디자인1)',
      departmentId: designDept.id,
      assignedUserId: teamUserIds['user-design-1'] ?? null,
      status: 'OPERATING' as const,
      hw: {
        serialNo: 'SN-DSN-001',
        cpu: 'Apple M3 Max',
        ramGb: 36,
        storageGb: 1024,
        warrantyEnd: today(400),
      },
    },
    {
      assetCode: 'HW-DSN-0002',
      name: 'MacBook Pro 16 (디자인팀장)',
      departmentId: designDept.id,
      assignedUserId: teamUserIds['lead-design'] ?? null,
      status: 'OPERATING' as const,
      hw: {
        serialNo: 'SN-DSN-002',
        cpu: 'Apple M3 Max',
        ramGb: 36,
        storageGb: 1024,
        warrantyEnd: today(450),
      },
    },
    {
      assetCode: 'HW-DSN-0003',
      name: 'LG UltraFine 27" 4K',
      departmentId: designDept.id,
      assignedUserId: null,
      status: 'IDLE' as const,
      categoryId: catMonitor.id,
      hw: { serialNo: 'SN-DSN-003', warrantyEnd: today(600) },
    },
    // IT본부 공용
    {
      assetCode: 'HW-IT-0001',
      name: 'LG Gram 17 (공용)',
      departmentId: dept.id,
      assignedUserId: null,
      status: 'IDLE' as const,
      hw: {
        serialNo: 'SN-IT-001',
        cpu: 'Intel Core i7-1360P',
        ramGb: 16,
        storageGb: 512,
        warrantyEnd: today(200),
      },
    },
    {
      assetCode: 'HW-IT-0002',
      name: 'HP EliteBook 850 (점검중)',
      departmentId: dept.id,
      assignedUserId: null,
      status: 'REPAIR' as const,
      hw: {
        serialNo: 'SN-IT-002',
        cpu: 'Intel Core i7-1355U',
        ramGb: 16,
        storageGb: 512,
        warrantyEnd: today(100),
      },
    },
  ]

  let hwCreated = 0
  for (const a of hwSeed) {
    const existing = await prisma.asset.findUnique({ where: { assetCode: a.assetCode } })
    if (existing) continue
    const asset = await prisma.asset.create({
      data: {
        assetCode: a.assetCode,
        name: a.name,
        class: 'IT_ASSET',
        status: a.status,
        condition: 'GOOD',
        purchaseDate: today(-180),
        purchasePrice: 2_000_000,
        categoryId: a.categoryId ?? category.id,
        departmentId: a.departmentId,
        locationId: locId,
        assignedUserId: a.assignedUserId,
      },
    })
    await prisma.hardwareAsset.create({
      data: { assetId: asset.id, ...a.hw },
    })
    await prisma.assetHistory.create({
      data: {
        assetId: asset.id,
        action: 'CREATED',
        description: `자산 등록: ${asset.assetCode} (${asset.name})`,
        performedById: _users['admin-1']!,
      },
    })
    hwCreated++
  }
  console.log(`[seed] HardwareAsset: ${hwCreated}개 생성`)

  // ── OPERATING 자산에 대한 RECEIVED 대여 레코드 시드 ─────────────────────
  const adminId = _users['admin-1']!
  const assetMgrId = _users['asset-mgr-1'] ?? adminId
  let loanCreated = 0
  for (const a of hwSeed) {
    if (a.status !== 'OPERATING' || !a.assignedUserId) continue
    const asset = await prisma.asset.findUnique({ where: { assetCode: a.assetCode } })
    if (!asset) continue
    const alreadyExists = await prisma.loan.findFirst({
      where: { assetId: asset.id, status: 'RECEIVED' },
    })
    if (alreadyExists) continue
    const managerId =
      a.departmentId === designDept.id
        ? (teamUserIds['lead-design'] ?? adminId)
        : (teamUserIds['lead-dev'] ?? adminId)
    await prisma.loan.create({
      data: {
        assetId: asset.id,
        userId: a.assignedUserId,
        status: 'RECEIVED',
        purpose: '업무용 기기 배정',
        dueDate: today(305),
        managerApprovedAt: today(-59),
        managerApprovedById: managerId,
        adminApprovedAt: today(-58),
        adminApprovedById: assetMgrId,
        checkedOutAt: today(-57),
        checkedOutById: assetMgrId,
        receivedAt: today(-57),
        receivedById: a.assignedUserId,
        createdAt: today(-60),
      },
    })
    loanCreated++
  }
  console.log(`[seed] RECEIVED 대여 레코드: ${loanCreated}개 생성`)

  // ── Software 자산 ──────────────────────────────────────────────────
  const swSeed = [
    {
      assetCode: 'SW-0001',
      name: 'Office 365 E3 (전사)',
      departmentId: dept.id,
      sw: {
        licenseKey: 'O365-E3-XXXX-0001',
        licenseSeats: 50,
        installedCount: 12,
        version: '365',
        expiryDate: today(365),
      },
    },
    {
      assetCode: 'SW-0002',
      name: 'Windows 11 Pro (개발팀)',
      departmentId: devDept.id,
      sw: {
        licenseKey: 'WIN11-PRO-DEV-0001',
        licenseSeats: 10,
        installedCount: 3,
        version: '11 Pro',
      },
    },
    {
      assetCode: 'SW-0003',
      name: 'Adobe Creative Cloud (디자인팀)',
      departmentId: designDept.id,
      sw: {
        licenseKey: 'CC-ALL-DSN-0001',
        licenseSeats: 5,
        installedCount: 3,
        version: '2024',
        expiryDate: today(180),
      },
    },
    {
      assetCode: 'SW-0004',
      name: 'IntelliJ IDEA Ultimate (개발팀)',
      departmentId: devDept.id,
      sw: {
        licenseKey: 'IDEA-U-DEV-0001',
        licenseSeats: 5,
        installedCount: 3,
        version: '2024.1',
        expiryDate: today(270),
      },
    },
  ]

  let swCreated = 0
  for (const a of swSeed) {
    const existing = await prisma.asset.findUnique({ where: { assetCode: a.assetCode } })
    if (existing) continue
    const asset = await prisma.asset.create({
      data: {
        assetCode: a.assetCode,
        name: a.name,
        class: 'IT_ASSET',
        status: 'OPERATING',
        condition: 'GOOD',
        purchaseDate: today(-90),
        purchasePrice: 500_000,
        categoryId: catSoftware.id,
        departmentId: a.departmentId,
        locationId: locId,
      },
    })
    await prisma.softwareAsset.create({
      data: { assetId: asset.id, ...a.sw },
    })
    await prisma.assetHistory.create({
      data: {
        assetId: asset.id,
        action: 'CREATED',
        description: `자산 등록: ${asset.assetCode} (${asset.name})`,
        performedById: _users['admin-1']!,
      },
    })
    swCreated++
  }
  console.log(`[seed] SoftwareAsset: ${swCreated}개 생성`)

  // ── 컴플라이언스 시드: 보증 만료/임박 HW + License 만료/시트초과 ────────
  await seedComplianceData({ ..._users, ...teamUserIds })
}

// ─────────────────────────────────────────────────────────────────────
// 컴플라이언스(보증·라이선스) 시드 — 분석 대시보드 검증용
// - HW 일부의 warrantyEnd 를 만료/임박 값으로 덮어쓰기
// - License 4건: 만료 경과, 만료 임박(<7일), 만료 임박(<30일), 시트초과
// ─────────────────────────────────────────────────────────────────────
async function seedComplianceData(users: Record<string, string>) {
  // 1) HW warrantyEnd 보정 — 기존 자산의 warrantyEnd 값을 컴플라이언스 케이스로 덮어씀
  const warrantyOverrides: Array<{ assetCode: string; daysOffset: number }> = [
    { assetCode: 'HW-IT-0001', daysOffset: -15 }, // 만료 15일 경과
    { assetCode: 'HW-IT-0002', daysOffset: 5 }, // D-5 (destructive)
    { assetCode: 'HW-DEV-0002', daysOffset: 12 }, // D-12 (secondary)
    { assetCode: 'HW-DSN-0001', daysOffset: 25 }, // D-25 (outline)
  ]
  let warrantyUpdated = 0
  for (const { assetCode, daysOffset } of warrantyOverrides) {
    const asset = await prisma.asset.findUnique({ where: { assetCode } })
    if (!asset) continue
    await prisma.hardwareAsset.update({
      where: { assetId: asset.id },
      data: { warrantyEnd: today(daysOffset) },
    })
    warrantyUpdated++
  }
  console.log(`[seed] HW warrantyEnd 보정: ${warrantyUpdated}개`)

  // 2) License 시드
  const licenseSeeds: Array<{
    name: string
    seatsTotal: number
    purchaseDays: number
    expiryDays: number
    assigneeKeys: string[] // 시트 초과 케이스용 — keys.length 가 assignments.count
  }> = [
    {
      name: 'Adobe Photoshop 2023 (만료 경과)',
      seatsTotal: 10,
      purchaseDays: -400,
      expiryDays: -30,
      assigneeKeys: ['user-dev-1', 'user-design-1', 'user-design-2'],
    },
    {
      name: 'MS Visio Pro (임박)',
      seatsTotal: 5,
      purchaseDays: -300,
      expiryDays: 3,
      assigneeKeys: ['user-newbie', 'user-normal'],
    },
    {
      name: 'Slack Business+ (한 달 내 만료)',
      seatsTotal: 50,
      purchaseDays: -200,
      expiryDays: 20,
      assigneeKeys: ['admin-1', 'lead-dev', 'lead-design', 'user-dev-1', 'user-dev-2'],
    },
    {
      name: 'Microsoft 365 Business Standard',
      seatsTotal: 10,
      purchaseDays: -200,
      expiryDays: 165,
      assigneeKeys: ['lead-dev', 'lead-design', 'user-dev-1', 'user-dev-2', 'user-design-1'],
    },
    {
      name: 'Adobe Creative Cloud',
      seatsTotal: 2,
      purchaseDays: -50,
      expiryDays: 315,
      assigneeKeys: ['lead-design', 'user-design-1'], // 2/2 -> Full
    },
    {
      name: 'Slack Pro (Legacy)',
      seatsTotal: 50,
      purchaseDays: -300,
      expiryDays: -5, // Expired
      assigneeKeys: ['lead-dev', 'user-dev-1'],
    },
    {
      name: 'Zoom Pro (시트 초과)',
      seatsTotal: 3,
      purchaseDays: -100,
      expiryDays: 400,
      assigneeKeys: [
        'admin-1',
        'lead-dev',
        'lead-design',
        'user-dev-1',
        'user-dev-2',
        'user-design-1',
      ], // 6명 > seatsTotal 3 (overseated +3)
    },
  ]

  let licenseCreated = 0
  for (const seed of licenseSeeds) {
    const existing = await prisma.license.findFirst({ where: { name: seed.name } })
    if (existing) continue
    const license = await prisma.license.create({
      data: {
        name: seed.name,
        seatsTotal: seed.seatsTotal,
        purchaseDate: today(seed.purchaseDays),
        expiryDate: today(seed.expiryDays),
      },
    })
    for (const key of seed.assigneeKeys) {
      const userId = users[key]
      if (!userId) continue
      await prisma.licenseAssignment.create({
        data: { licenseId: license.id, userId },
      })
    }
    licenseCreated++
  }
  console.log(`[seed] License: ${licenseCreated}개 생성 (만료 경과/임박/시트초과 포함)`)

  // Asset → AssetCatalog 매핑 정책 (idempotent, 매번 재평가):
  //   1) 같은 categoryId 의 isActive AssetCatalog 중 자산명에 catalog.name 4글자+ 키워드가
  //      포함되는 것을 우선 매칭 (예: "LG Gram 17" 자산 → "LG Gram 17" catalog)
  //   2) 매칭 실패 시 같은 categoryId 의 name asc 첫 catalog 로 fallback
  // 이전 단순 카테고리 첫 catalog 정책이 한 catalog 에 자산이 몰리는 문제 해소.
  const allAssets = await prisma.asset.findMany({
    select: { id: true, name: true, categoryId: true, catalogId: true },
  })
  const catalogsByCategory = new Map<string, Array<{ id: string; name: string }>>()
  async function loadCategoryCatalogs(
    catId: string,
  ): Promise<Array<{ id: string; name: string }>> {
    const cached = catalogsByCategory.get(catId)
    if (cached) return cached
    const list = await prisma.assetCatalog.findMany({
      where: { categoryId: catId, isActive: true },
      orderBy: { name: 'asc' },
      select: { id: true, name: true },
    })
    catalogsByCategory.set(catId, list)
    return list
  }
  let catalogMapped = 0
  let catalogRemapped = 0
  let catalogSkipped = 0
  for (const a of allAssets) {
    const candidates = await loadCategoryCatalogs(a.categoryId)
    if (candidates.length === 0) {
      catalogSkipped++
      continue
    }
    const assetNameLower = a.name.toLowerCase()
    // 점수 기반: catalog name 의 키워드 (2글자+, "14"/"16"/"M3"/"Pro" 같은 짧은 식별자 포함)
    // 중 자산명에 포함된 개수가 가장 많은 catalog 선택. 동점 시 name asc 순.
    // 단순 first-match 가 catalog '14"' vs '16"' 모두 'macbook' 키워드 가져
    // 같은 첫 catalog 로 몰아 16" 자산도 14" catalog 에 잘못 매핑되던 문제 해소.
    const scored = candidates.map((c) => {
      const keywords = c.name
        .toLowerCase()
        .split(/[\s\-_'"()]+/)
        .filter((k) => k.length >= 2)
      const score = keywords.filter((k) => assetNameLower.includes(k)).length
      return { catalog: c, score }
    })
    scored.sort((x, y) => y.score - x.score)
    const best = scored[0]
    const target = best && best.score > 0 ? best.catalog : candidates[0]
    if (!target || a.catalogId === target.id) continue
    await prisma.asset.update({ where: { id: a.id }, data: { catalogId: target.id } })
    if (a.catalogId === null) catalogMapped++
    else catalogRemapped++
  }
  console.log(
    `[seed] catalogId 매핑: 신규 ${catalogMapped}건 / 재매핑 ${catalogRemapped}건 / skip ${catalogSkipped}건 (자산명 키워드 매칭 우선)`,
  )
}

main()
  .catch((e) => {
    console.error('[seed] 실패:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

/**
 * 국세청 사업자등록 상태조회 API 래퍼
 * API: https://api.odcloud.kr/api/nts-businessman/v1/status
 * 문서: https://www.data.go.kr/data/15081808/openapi.do
 */
export type BrnStatus = 'ACTIVE' | 'SUSPENDED' | 'CLOSED' | 'UNKNOWN' | 'API_KEY_MISSING' | 'ERROR';
export interface BrnValidationResult {
    status: BrnStatus;
    /** 국세청 원문 상태명 (예: "계속사업자", "휴업자", "폐업자") */
    statusLabel: string;
    /** 사업자 유형 (예: "부가가치세 일반과세자") */
    taxType: string | null;
    /** 조회된 사업자번호 */
    bNo: string;
}
/** 하이픈 제거 후 10자리 숫자 여부 검증 */
export declare function normalizeBrn(raw: string): string | null;
export declare function validateBrn(bNo: string): Promise<BrnValidationResult>;
//# sourceMappingURL=ntsBusinessApi.d.ts.map
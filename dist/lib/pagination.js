"use strict";
// 공통 페이지네이션 타입 + 헬퍼
// 각 module 의 list 응답이 같은 shape 사용 — 중복 제거 + 보일러플레이트 통합
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginate = void 0;
exports.fetchPage = fetchPage;
const paginate = (items, total, page, pageSize) => ({
    items,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
});
exports.paginate = paginate;
// DB findMany + count 를 병렬 실행하는 헬퍼
async function fetchPage(findMany, count) {
    const [rows, total] = await Promise.all([findMany(), count()]);
    return { rows, total };
}
//# sourceMappingURL=pagination.js.map
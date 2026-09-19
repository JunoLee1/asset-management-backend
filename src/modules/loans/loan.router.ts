import { Router } from 'express'
import { loanController } from './loan.controller'
import { authenticate } from '../../middlewares/authenticate'

const router:Router = Router()

router.use(authenticate)

// 정적 path 가 :id 보다 먼저 와야 함 (express 매칭 순서)
router.get('/overdue', loanController.overdue)
router.get('/my', loanController.my)
router.get('/lookup', loanController.lookup) // QR 디코드 후 호출

router.get('/', loanController.list)
router.get('/:id', loanController.getById)
router.post('/', loanController.create)

// 프론트 호환: 상태에 따라 approve-manager / approve-admin 자동 분기
router.post('/:id/approve', loanController.approve)

// S1: 4개 endpoint 분리 (의도 명확화) + ADR 0003: 부서장 단계 추가
router.post('/:id/approve-manager', loanController.approveManager) // 대여 1차 (팀장)
router.post('/:id/approve-dept', loanController.approveDept) // 대여 2차 (부서장 — ADR 0003)
router.post('/:id/approve-admin', loanController.approveAdmin) // 대여 최종 (관리자)
router.post('/:id/approve-return-manager', loanController.approveReturnManager) // 반납 1차
router.post('/:id/approve-return-dept', loanController.approveReturnDept) // 반납 부서장 확인 — ADR 0003
router.post('/:id/finalize-return', loanController.finalizeReturn) // 반납 최종
router.post('/:id/checkout', loanController.checkout)
router.post('/:id/receive', loanController.receive) // 사원 수령 확정 (R-1)
router.post('/:id/reject', loanController.reject)
router.post('/:id/cancel', loanController.cancel)
router.post('/:id/recall', loanController.recall)
router.post('/:id/return', loanController.returnLoan)
router.post('/:id/inspect', loanController.inspect)

// 대여 연장 흐름
router.post('/:id/extend', loanController.requestExtension)                               // 신청자 연장 요청
router.post('/extensions/:id/approve-manager', loanController.approveExtensionManager)   // 팀장 1차 승인
router.post('/extensions/:id/approve-admin', loanController.approveExtensionAdmin)       // 관리자 2차 승인
router.post('/extensions/:id/reject', loanController.rejectExtension)                    // 반려

export { router as loanRouter }

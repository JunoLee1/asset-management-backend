-- NotificationType: 수리업체 메일 발송 실패 알림용 enum 추가
ALTER TYPE "NotificationType" ADD VALUE IF NOT EXISTS 'MAINTENANCE_VENDOR_NOTIFY_FAILED';

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inviteEmailTemplate = inviteEmailTemplate;
function inviteEmailTemplate(name, inviteUrl) {
    return {
        subject: '[자산관리 ERP] 계정 초대 안내',
        html: `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#f9f9f9;">
  <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:480px;margin:32px auto;padding:32px;background:#fff;border-radius:8px;color:#111;">
    <h2 style="margin:0 0 16px;font-size:20px;font-weight:600;">안녕하세요, ${name}님!</h2>
    <p style="margin:0 0 12px;line-height:1.6;color:#444;">
      자산관리 ERP 시스템에 초대되었습니다.<br>
      아래 버튼을 클릭해 비밀번호를 설정하고 계정을 활성화해 주세요.
    </p>
    <p style="margin:0 0 24px;font-size:13px;color:#888;">
      초대 링크는 발송 후 <strong>48시간</strong> 동안 유효합니다.
    </p>
    <a href="${inviteUrl}"
       style="display:inline-block;padding:12px 28px;background:#111;color:#fff;border-radius:6px;text-decoration:none;font-size:14px;font-weight:500;">
      계정 활성화하기
    </a>
    <p style="margin:28px 0 0;font-size:12px;color:#aaa;line-height:1.6;">
      버튼이 동작하지 않으면 아래 링크를 브라우저에 붙여넣으세요.<br>
      <a href="${inviteUrl}" style="color:#555;word-break:break-all;">${inviteUrl}</a>
    </p>
  </div>
</body>
</html>`,
    };
}
//# sourceMappingURL=emailTemplates.js.map
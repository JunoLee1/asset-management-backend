import nodemailer from 'nodemailer';

try {
  const testAccount = await nodemailer.createTestAccount();
  console.log('\n=== Ethereal Email Test Account ===\n');
  console.log('SMTP_HOST=' + testAccount.smtp.host);
  console.log('SMTP_PORT=' + testAccount.smtp.port);
  console.log('SMTP_USER=' + testAccount.user);
  console.log('SMTP_PASS=' + testAccount.pass);
  console.log('SMTP_FROM="자산관리 ERP <' + testAccount.user + '>"');
  console.log('\n📧 테스트 이메일 수신: https://ethereal.email/messages');
} catch (err) {
  console.error('Error:', err.message);
}

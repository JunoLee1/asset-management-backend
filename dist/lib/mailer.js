"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = sendMail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
const logger_1 = require("./logger");
let transporter = null;
async function getTransporter() {
    if (transporter)
        return transporter;
    if (env_1.env.nodeEnv === 'production') {
        transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: env_1.env.smtp.gmailUser,
                pass: env_1.env.smtp.gmailAppPassword,
            },
        });
        logger_1.logger.info('[Mailer] Gmail SMTP 트랜스포터 초기화');
    }
    else {
        // 개발환경: Ethereal 임시 계정 자동 생성
        const testAccount = await nodemailer_1.default.createTestAccount();
        transporter = nodemailer_1.default.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: { user: testAccount.user, pass: testAccount.pass },
        });
        logger_1.logger.info({ user: testAccount.user }, '[Mailer] Ethereal 테스트 계정 생성 완료');
    }
    return transporter;
}
async function sendMail(options) {
    const transport = await getTransporter();
    logger_1.logger.debug({ to: options.to, subject: options.subject }, '[Mailer] 메일 발송 시작');
    const info = await transport.sendMail({
        from: env_1.env.smtp.from,
        ...options,
    });
    if (env_1.env.nodeEnv !== 'production') {
        const previewUrl = nodemailer_1.default.getTestMessageUrl(info);
        logger_1.logger.info({ to: options.to, previewUrl }, '[Mailer] 발송 완료 — 미리보기 URL');
    }
    else {
        logger_1.logger.info({ to: options.to, messageId: info.messageId }, '[Mailer] 발송 완료');
    }
}
//# sourceMappingURL=mailer.js.map
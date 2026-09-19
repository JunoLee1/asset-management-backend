"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const prisma_1 = require("../../lib/prisma");
const AppError_1 = require("../../lib/AppError");
const logger_1 = require("../../lib/logger");
const mailer_1 = require("../../lib/mailer");
const emailTemplates_1 = require("../../lib/emailTemplates");
const phoneEncryption_1 = require("../../lib/phoneEncryption");
const env_1 = require("../../config/env");
const INVITE_EXPIRES_HOURS = 48; // 이메일 초대 코드 발송 직후 만료 시간 
const inviteUser = async (dto) => {
    if (!dto.hireDate)
        throw new AppError_1.AppError(400, '입사일은 필수입니다.');
    const existing = await prisma_1.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing?.isActive)
        throw new AppError_1.AppError(409, '이미 등록된 이메일입니다.');
    if (existing?.inviteToken)
        throw new AppError_1.AppError(409, '이미 초대가 발송된 이메일입니다.');
    // 전화번호 중복 체크 + 암호화
    let phoneNumber = null;
    let phoneNumberHash = null;
    if (dto.phoneNumber) {
        const hash = (0, phoneEncryption_1.hashPhone)(dto.phoneNumber);
        logger_1.logger.debug({ masked: (0, phoneEncryption_1.maskPhone)(dto.phoneNumber) }, '[PhoneEncryption] 중복 조회 시작');
        const duplicate = await prisma_1.prisma.user.findFirst({ where: { phoneNumberHash: hash } });
        if (duplicate)
            throw new AppError_1.AppError(409, '이미 등록된 전화번호입니다.');
        phoneNumber = (0, phoneEncryption_1.encryptPhone)(dto.phoneNumber);
        phoneNumberHash = hash;
        logger_1.logger.info({ masked: (0, phoneEncryption_1.maskPhone)(dto.phoneNumber), hash: hash.slice(0, 8) + '...' }, '[PhoneEncryption] 암호화 완료 → DB 저장');
    }
    const inviteToken = crypto_1.default.randomBytes(32).toString('hex'); // 랜덤 난수 생성
    const inviteTokenExpiresAt = new Date(Date.now() + INVITE_EXPIRES_HOURS * 60 * 60 * 1000);
    await prisma_1.prisma.user.create({
        data: {
            email: dto.email,
            name: dto.name,
            role: dto.role ?? 'USER',
            teamId: dto.teamId ?? null,
            isActive: false,
            hireDate: dto.hireDate,
            phoneNumber,
            phoneNumberHash,
            inviteToken,
            inviteTokenExpiresAt,
        },
    });
    const inviteUrl = `${env_1.env.frontendUrl}/accept-invite?token=${inviteToken}`;
    const { subject, html } = (0, emailTemplates_1.inviteEmailTemplate)(dto.name, inviteUrl);
    await (0, mailer_1.sendMail)({ to: dto.email, subject, html });
    return { inviteToken, email: dto.email, name: dto.name };
};
exports.adminService = { inviteUser };
//# sourceMappingURL=admin.service.js.map
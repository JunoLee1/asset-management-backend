import crypto from "crypto";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../lib/AppError";
import { logger } from "../../lib/logger";
import { sendMail } from "../../lib/mailer";
import { inviteEmailTemplate } from "../../lib/emailTemplates";
import { encryptPhone, hashPhone, maskPhone } from "../../lib/phoneEncryption";
import { env } from "../../config/env";
import { logSensitiveAction } from "../../lib/sensitiveAuditLog";
import type { InviteUserResult } from "./admin.types";
import type { InviteUserInput } from "../../schemas/auth.schema";
import type { RequesterContext } from "../../lib/requestHelpers";

const INVITE_EXPIRES_HOURS = 48; // 이메일 초대 코드 발송 직후 만료 시간

const inviteUser = async (
  dto: InviteUserInput,
  requester: RequesterContext,
): Promise<InviteUserResult> => {
  if (!dto.hireDate) throw new AppError(400, '입사일(hireDate)은 필수입니다.')

  const existing = await prisma.user.findUnique({
    where: { email: dto.email },
  });

  if (existing?.isActive) throw new AppError(409, "이미 등록된 이메일입니다.");
  if (existing?.inviteToken)
    throw new AppError(409, "이미 초대가 발송된 이메일입니다.");

  // 전화번호 중복 체크 + 암호화
  let phoneNumber: string | null = null;
  let phoneNumberHash: string | null = null;

  if (dto.phoneNumber) {
    const hash = hashPhone(dto.phoneNumber);

    logger.debug(
      { masked: maskPhone(dto.phoneNumber) },
      "[PhoneEncryption] 중복 조회 시작",
    );

    const duplicate = await prisma.user.findFirst({
      where: { phoneNumberHash: hash },
    });
    if (duplicate) throw new AppError(409, "이미 등록된 전화번호입니다.");

    phoneNumber = encryptPhone(dto.phoneNumber);
    phoneNumberHash = hash;

    logger.info(
      { masked: maskPhone(dto.phoneNumber), hash: hash.slice(0, 8) + "..." },
      "[PhoneEncryption] 암호화 완료 → DB 저장",
    );
  }

  const inviteToken = crypto.randomBytes(32).toString("hex"); // 랜덤 난수 생성
  const inviteTokenExpiresAt = new Date(
    Date.now() + INVITE_EXPIRES_HOURS * 60 * 60 * 1000,
  );

  const created = await prisma.user.create({
    data: {
      email: dto.email,
      name: dto.name,
      role: dto.role ?? "USER",
      teamId: dto.teamId ?? null,
      isActive: false,
      hireDate: dto.hireDate,
      phoneNumber,
      phoneNumberHash,
      inviteToken,
      inviteTokenExpiresAt,
    },
  });

  logSensitiveAction({
    action: 'USER_INVITE',
    performedById: requester.id,
    performedByRole: requester.role,
    targetId: created.id,
    targetType: 'User',
    detail: `email=${dto.email}, role=${dto.role ?? 'USER'}`,
    timestamp: new Date().toISOString(),
  });

  const inviteUrl = `${env.frontendUrl}/accept-invite?token=${inviteToken}`;
  const { subject, html } = inviteEmailTemplate(dto.name, inviteUrl);
  // fire-and-forget — SMTP 지연/실패가 응답 시간에 영향을 주지 않도록 응답을 기다리지 않음
  sendMail({ to: dto.email, subject, html }).catch((err) => {
    logger.error({ err }, '[Invite] 메일 발송 실패');
  });

  return { inviteToken, email: dto.email, name: dto.name };
};

export const adminService = { inviteUser };

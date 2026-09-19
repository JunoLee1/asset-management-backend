import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../lib/AppError";
import { env } from "../../config/env";
import { logger } from "../../lib/logger";
import { SmsService } from "../../services/sms.service";
import type {
  LoginDto,
  TokenPair,
  UserDto,
  AuthResponse,
  JwtPayload,
  OAuthProfile,
  OAuthProvider,
  AcceptInviteDto,
  RequestPasswordResetDto,
} from "./auth.types";
import type { Role, UserHistoryAction } from "../../generated/prisma/enums";
import type {
  ChangePasswordInput,
  VerifyResetCodeInput,
} from "../../schemas/auth.schema";

const SALT_ROUNDS = 12;

// 민감한 필드 리턴 차단 (inviteToken, phoneNumber, password)
// team include 가 있으면 부서 정보까지 펼침 — 부서 단위 자동 필터링(예: TEAM_LEAD 의 "내 부서") 용
type UserWithOrg = {
  id: string;
  email: string;
  name: string;
  role: Role;
  isOutOfOffice: boolean;
  teamId?: string | null;
  team?: {
    id: string;
    name: string;
    departmentId: string;
    department: { id: string; name: string };
  } | null;
};

const toUserDto = (user: UserWithOrg): UserDto => ({
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.role,
  isOutOfOffice: user.isOutOfOffice,
  teamId: user.team?.id ?? null,
  teamName: user.team?.name ?? null,
  departmentId: user.team?.department.id ?? null,
  departmentName: user.team?.department.name ?? null,
});

// Refresh token 은 평문이 아닌 SHA-256 해시로 DB에 저장 (DB 유출 대비)
const hashToken = (token: string): string =>
  crypto.createHash("sha256").update(token).digest("hex");

export interface IssueTokenMeta {
  userAgent?: string | null;
  ipAddress?: string | null;
}

// 단일 세션 정책: 새 로그인 시 해당 user의 기존 활성 RT를 모두 revoke
// → 이전 기기/브라우저는 다음 refresh 시점에 401, 자동 로그아웃됨
const revokeAllUserSessions = async (userId: string): Promise<number> => {
  const result = await prisma.refreshToken.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
  if (result.count > 0) {
    logger.info(
      { event: "session_replaced", userId, revokedCount: result.count },
      "신규 로그인으로 기존 세션 종료",
    );
  }
  return result.count;
};

const issueTokenPair = async (
  payload: Omit<JwtPayload, "iat" | "exp">,
  meta: IssueTokenMeta = {},
): Promise<TokenPair> => {
  // 단일 세션 강제: 기존 활성 RT 먼저 revoke
  await revokeAllUserSessions(payload.sub);

  const accessToken = jwt.sign(payload, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn,
  } as jwt.SignOptions);
  // jti: HMAC 서명은 결정적이고 iat는 초 단위라, 같은 초에 발급된 동일 사용자의
  // refresh token은 jti 없이는 바이트 단위로 동일해져 tokenHash unique 제약과 충돌함
  const refreshToken = jwt.sign(
    { sub: payload.sub, jti: crypto.randomUUID() },
    env.jwt.refreshSecret,
    { expiresIn: env.jwt.refreshExpiresIn } as jwt.SignOptions,
  );

  const decoded = jwt.decode(refreshToken) as { exp: number } | null;
  if (!decoded?.exp)
    throw new AppError(500, "토큰 발급 중 오류가 발생했습니다.");

  await prisma.refreshToken.create({
    data: {
      tokenHash: hashToken(refreshToken),
      userId: payload.sub,
      userAgent: meta.userAgent ?? null,
      ipAddress: meta.ipAddress ?? null,
      expiresAt: new Date(decoded.exp * 1000),
    },
  });

  return { accessToken, refreshToken };
};

const login = async (
  dto: LoginDto,
  meta: IssueTokenMeta = {},
): Promise<AuthResponse> => {
  const user = await prisma.user.findUnique({
    where: { email: dto.email },
    include: { team: { include: { department: true } } },
  });
  if (!user?.password)
    throw new AppError(401, "이메일 또는 비밀번호가 올바르지 않습니다.");

  const valid = await bcrypt.compare(dto.password, user.password);
  if (!valid)
    throw new AppError(401, "이메일 또는 비밀번호가 올바르지 않습니다.");
  if (!user.isActive) throw new AppError(403, "비활성화된 계정입니다.");

  const tokens = await issueTokenPair(
    { sub: user.id, email: user.email, role: user.role },
    meta,
  );
  return { user: toUserDto(user), tokens };
};

const acceptInvite = async (
  dto: AcceptInviteDto,
  meta: IssueTokenMeta = {},
): Promise<AuthResponse> => {
  const user = await prisma.user.findUnique({
    where: { inviteToken: dto.token },
  });
  if (!user) throw new AppError(400, "유효하지 않은 초대 링크입니다.");
  if (user.isActive) throw new AppError(400, "이미 활성화된 계정입니다.");
  if (!user.inviteTokenExpiresAt || user.inviteTokenExpiresAt < new Date()) {
    throw new AppError(400, "초대 링크가 만료되었습니다.");
  }

  const hashed = await bcrypt.hash(dto.password, SALT_ROUNDS);
  const activated = await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashed,
      isActive: true,
      inviteToken: null,
      inviteTokenExpiresAt: null,
    },
  });

  const tokens = await issueTokenPair(
    { sub: activated.id, email: activated.email, role: activated.role },
    meta,
  );
  return { user: toUserDto(activated), tokens };
};

const changePassword = async (
  userId: string,
  dto: ChangePasswordInput,
  meta: IssueTokenMeta = {},
): Promise<void> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError(404, "사용자를 찾을 수 없습니다.");
  if (!user.password) {
    throw new AppError(
      400,
      "소셜 로그인 계정은 비밀번호 변경을 사용할 수 없습니다.",
    );
  }

  const validCurrent = await bcrypt.compare(dto.currentPassword, user.password);
  if (!validCurrent)
    throw new AppError(401, "현재 비밀번호가 일치하지 않습니다.");

  // 6개월 내 사용 이력 확인 (마이그레이션 시 user.password → password_histories 백필됨)
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const recentHistories = await prisma.passwordHistory.findMany({
    where: { userId, createdAt: { gte: sixMonthsAgo } },
    select: { passwordHash: true },
  });
  for (const h of recentHistories) {
    const reused = await bcrypt.compare(dto.newPassword, h.passwordHash);
    if (reused) {
      throw new AppError(
        400,
        "최근 6개월 내 사용한 비밀번호는 다시 사용할 수 없습니다.",
      );
    }
  }

  const newHash = await bcrypt.hash(dto.newPassword, SALT_ROUNDS);
  const action: UserHistoryAction = "PROFILE_UPDATED";

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: { password: newHash },
    });
    await tx.passwordHistory.create({
      data: { userId, passwordHash: newHash },
    });
    await tx.userHistory.create({
      data: {
        userId,
        performedById: userId,
        action,
        reason: "본인 비밀번호 변경",
        ipAddress: meta.ipAddress ?? null,
        userAgent: meta.userAgent ?? null,
      },
    });
  });

  logger.info(
    { event: "password_changed", userId, ipAddress: meta.ipAddress },
    "비밀번호 변경 완료",
  );
};

// refresh: 새 access token 만 발급. refresh token 자체는 그대로 유지 (rotation X)
const refresh = async (token: string): Promise<TokenPair> => {
  let payload: jwt.JwtPayload;
  try {
    payload = jwt.verify(token, env.jwt.refreshSecret) as jwt.JwtPayload;
  } catch {
    throw new AppError(401, "유효하지 않은 리프레시 토큰입니다.");
  }

  const userId = payload["sub"];
  if (typeof userId !== "string")
    throw new AppError(401, "유효하지 않은 리프레시 토큰입니다.");

  // DB에서 RT 검증
  const stored = await prisma.refreshToken.findUnique({
    where: { tokenHash: hashToken(token) },
  });
  if (!stored) throw new AppError(401, "유효하지 않은 리프레시 토큰입니다.");
  if (stored.revokedAt) throw new AppError(401, "폐기된 리프레시 토큰입니다.");
  if (stored.expiresAt < new Date())
    throw new AppError(401, "만료된 리프레시 토큰입니다.");

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user?.isActive) throw new AppError(401, "사용자를 찾을 수 없습니다.");

  const accessToken = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn } as jwt.SignOptions,
  );
  return { accessToken, refreshToken: token };
};

// 단일 기기 로그아웃: 해당 refresh token만 revoke (멱등)
const logout = async (
  token: string,
  meta: IssueTokenMeta = {},
): Promise<void> => {
  const tokenHash = hashToken(token);
  const stored = await prisma.refreshToken.findUnique({ where: { tokenHash } });
  if (!stored || stored.revokedAt) return;
  await prisma.refreshToken.update({
    where: { tokenHash },
    data: { revokedAt: new Date() },
  });
  logger.info(
    {
      event: "logout",
      userId: stored.userId,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    },
    "사용자 로그아웃",
  );
};

// 전체 기기 로그아웃: 해당 user의 모든 활성 refresh token revoke
const logoutAll = async (
  userId: string,
  meta: IssueTokenMeta = {},
): Promise<{ revokedCount: number }> => {
  const result = await prisma.refreshToken.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
  logger.info(
    {
      event: "logout_all",
      userId,
      revokedCount: result.count,
      ipAddress: meta.ipAddress,
    },
    "전체 기기 로그아웃",
  );
  return { revokedCount: result.count };
};

const findOrCreateOAuthUser = async (
  provider: OAuthProvider,
  profile: OAuthProfile,
  accessToken: string,
  refreshToken: string | undefined,
  meta: IssueTokenMeta = {},
): Promise<AuthResponse> => {
  const existing = await prisma.oAuthAccount.findUnique({
    where: {
      provider_providerId: { provider, providerId: profile.providerId },
    },
    include: { user: true },
  });

  if (existing) {
    await prisma.oAuthAccount.update({
      where: { id: existing.id },
      data: { accessToken, refreshToken: refreshToken ?? null },
    });
    if (!existing.user.isActive)
      throw new AppError(403, "비활성화된 계정입니다.");
    const tokens = await issueTokenPair(
      {
        sub: existing.user.id,
        email: existing.user.email,
        role: existing.user.role,
      },
      meta,
    );
    return { user: toUserDto(existing.user), tokens };
  }

  const user = await prisma.user.upsert({
    where: { email: profile.email },
    update: {},
    create: { email: profile.email, name: profile.name, hireDate: new Date() },
  });

  await prisma.oAuthAccount.create({
    data: {
      provider,
      providerId: profile.providerId,
      accessToken,
      refreshToken: refreshToken ?? null,
      userId: user.id,
    },
  });

  const tokens = await issueTokenPair(
    { sub: user.id, email: user.email, role: user.role },
    meta,
  );
  return { user: toUserDto(user), tokens };
};

const requestPasswordReset = async (
  dto: RequestPasswordResetDto,
): Promise<void> => {
  const user = await prisma.user.findUnique({ where: { email: dto.email } });
  if (!user) throw new AppError(400, "등록되지 않은 이메일입니다.");
  if (!user.phoneNumber) {
    throw new AppError(
      400,
      "휴대폰 번호가 등록되지 않았습니다. 관리자에게 문의하세요.",
    );
  }

  const code = String(Math.floor(Math.random() * 900000) + 100000);
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  const resetRecord = await prisma.passwordReset.create({
    data: {
      email: dto.email,
      code,
      expiresAt,
    },
  });

  const message = `[자산관리 ERP] ${user.name}님의 비밀번호 리셋 인증코드: ${code}`;
  const sent = await SmsService.sendSms(user.phoneNumber, message);

  if (!sent) {
    await prisma.passwordReset.delete({ where: { id: resetRecord.id } });
    throw new AppError(500, "SMS 발송에 실패했습니다. 다시 시도해주세요.");
  }

  logger.info({ email: dto.email }, "비밀번호 리셋 요청 - SMS 발송 완료");
};

const verifyResetCode = async (dto: VerifyResetCodeInput): Promise<void> => {
  const reset = await prisma.passwordReset.findFirst({
    where: { email: dto.email, code: dto.code },
  });

  if (!reset) throw new AppError(400, "올바르지 않은 인증코드입니다.");
  if (reset.usedAt) throw new AppError(400, "이미 사용된 인증코드입니다.");
  if (reset.expiresAt < new Date())
    throw new AppError(400, "인증코드가 만료되었습니다.");
  if (reset.attempts >= 5) {
    throw new AppError(
      400,
      "인증코드 재시도 횟수를 초과했습니다. 새 인증코드를 요청해주세요.",
    );
  }

  const user = await prisma.user.findUnique({ where: { email: dto.email } });
  if (!user) throw new AppError(404, "사용자를 찾을 수 없습니다.");

  const newHash = await bcrypt.hash(dto.newPassword, SALT_ROUNDS);

  await prisma.$transaction(async (tx) => {
    await tx.passwordReset.update({
      where: { id: reset.id },
      data: { usedAt: new Date() },
    });
    await tx.user.update({
      where: { id: user.id },
      data: { password: newHash },
    });
    await tx.passwordHistory.create({
      data: { userId: user.id, passwordHash: newHash },
    });
    await tx.userHistory.create({
      data: {
        userId: user.id,
        performedById: user.id,
        action: "PROFILE_UPDATED",
        reason: "비밀번호 리셋",
      },
    });
  });

  logger.info({ email: dto.email }, "비밀번호 리셋 완료");
};

export const authService = {
  login,
  acceptInvite,
  changePassword,
  refresh,
  logout,
  logoutAll,
  findOrCreateOAuthUser,
  issueTokenPair,
  requestPasswordReset,
  verifyResetCode,
};

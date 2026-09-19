import { z } from "zod";
import { Role } from "../generated/prisma/enums";

const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
const ALPHANUMERIC_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])/;

export const passwordSchema = z
  .string()
  .min(8, "비밀번호는 8자 이상이어야 합니다.")
  .regex(SPECIAL_CHAR_REGEX, "특수문자를 1자 이상 포함해야 합니다.");

export const passwordResetSchema = z
  .string()
  .min(8, "비밀번호는 8자 이상이어야 합니다.")
  .regex(ALPHANUMERIC_REGEX, "영문과 숫자를 조합하여 입력해주세요.");

export const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  password: passwordSchema,
});

export const acceptInviteSchema = z.object({
  token: z.string().min(1, "토큰이 필요합니다."),
  password: passwordSchema,
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "현재 비밀번호를 입력해주세요."),
  newPassword: passwordSchema,
});

export const inviteUserSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  name: z
    .string()
    .min(1, "이름은 1자 이상이어야 합니다.")
    .trim()
    .min(1, "이름은 공백만으로 구성할 수 없습니다."),
  hireDate: z.coerce.date({ error: "입사일(hireDate)은 필수입니다." }),
  role: z.nativeEnum(Role).optional(),
  teamId: z.string().optional(),
  phoneNumber: z
    .string()
    .regex(
      /^01[0-9]{8,9}$/,
      "올바른 휴대폰 번호 형식이 아닙니다. (예: 01012345678)",
    )
    .optional(),
});

export const requestPasswordResetSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
});

export const verifyResetCodeSchema = z
  .object({
    email: z.string().email("올바른 이메일 형식이 아닙니다."),
    code: z.string().regex(/^\d{6}$/, "인증코드는 6자리 숫자입니다."),
    newPassword: passwordResetSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type AcceptInviteInput = z.infer<typeof acceptInviteSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type InviteUserInput = z.infer<typeof inviteUserSchema>;
export type RequestPasswordResetInput = z.infer<
  typeof requestPasswordResetSchema
>;
export type VerifyResetCodeInput = z.infer<typeof verifyResetCodeSchema>;

import { z } from 'zod';
export declare const passwordSchema: z.ZodString;
export declare const passwordResetSchema: z.ZodString;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const acceptInviteSchema: z.ZodObject<{
    token: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export declare const changePasswordSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
}, z.core.$strip>;
export declare const inviteUserSchema: z.ZodObject<{
    email: z.ZodString;
    name: z.ZodString;
    role: z.ZodOptional<z.ZodEnum<{
        ADMIN: "ADMIN";
        TEAM_LEAD: "TEAM_LEAD";
        USER: "USER";
        ASSET_MANAGER: "ASSET_MANAGER";
    }>>;
    teamId: z.ZodOptional<z.ZodString>;
    phoneNumber: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const requestPasswordResetSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
export declare const verifyResetCodeSchema: z.ZodObject<{
    email: z.ZodString;
    code: z.ZodString;
    newPassword: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
export type LoginInput = z.infer<typeof loginSchema>;
export type AcceptInviteInput = z.infer<typeof acceptInviteSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type InviteUserInput = z.infer<typeof inviteUserSchema>;
export type RequestPasswordResetInput = z.infer<typeof requestPasswordResetSchema>;
export type VerifyResetCodeInput = z.infer<typeof verifyResetCodeSchema>;
//# sourceMappingURL=auth.schema.d.ts.map
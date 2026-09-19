import { z } from 'zod';
export declare const listUsersQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>, z.ZodTransform<number, string | number>>, z.ZodNumber>, z.ZodNumber>>;
    pageSize: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>, z.ZodTransform<number, string | number>>, z.ZodNumber>, z.ZodNumber>>;
    role: z.ZodOptional<z.ZodEnum<{
        ADMIN: "ADMIN";
        TEAM_LEAD: "TEAM_LEAD";
        USER: "USER";
        ASSET_MANAGER: "ASSET_MANAGER";
    }>>;
    isActive: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodBoolean]>, z.ZodTransform<boolean, string | boolean>>>;
    teamId: z.ZodOptional<z.ZodString>;
    q: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<{
        ADMIN: "ADMIN";
        TEAM_LEAD: "TEAM_LEAD";
        USER: "USER";
        ASSET_MANAGER: "ASSET_MANAGER";
    }>>;
    teamId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    reason: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export declare const deactivateUserSchema: z.ZodObject<{
    reason: z.ZodString;
}, z.core.$strict>;
export declare const activateUserSchema: z.ZodObject<{
    reason: z.ZodString;
}, z.core.$strict>;
export declare const reinviteUserSchema: z.ZodObject<{
    reason: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export declare const listUserHistoryQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>, z.ZodTransform<number, string | number>>, z.ZodNumber>, z.ZodNumber>>;
    pageSize: z.ZodDefault<z.ZodPipe<z.ZodPipe<z.ZodPipe<z.ZodUnion<readonly [z.ZodString, z.ZodNumber]>, z.ZodTransform<number, string | number>>, z.ZodNumber>, z.ZodNumber>>;
}, z.core.$strip>;
export type ListUsersQuery = z.infer<typeof listUsersQuerySchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type DeactivateUserInput = z.infer<typeof deactivateUserSchema>;
export type ActivateUserInput = z.infer<typeof activateUserSchema>;
export type ReinviteUserInput = z.infer<typeof reinviteUserSchema>;
export type ListUserHistoryQuery = z.infer<typeof listUserHistoryQuerySchema>;
//# sourceMappingURL=user.schema.d.ts.map
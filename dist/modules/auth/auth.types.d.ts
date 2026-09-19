import type { OAuthProvider, Role } from '../../generated/prisma/enums';
export interface JwtPayload {
    sub: string;
    email: string;
    role: Role;
    iat?: number;
    exp?: number;
}
export interface RegisterDto {
    email: string;
    password: string;
    name: string;
}
export interface LoginDto {
    email: string;
    password: string;
}
export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}
export interface UserDto {
    id: string;
    email: string;
    name: string;
    role: Role;
    isOutOfOffice: boolean;
    teamId: string | null;
    teamName: string | null;
    departmentId: string | null;
    departmentName: string | null;
}
export interface AuthResponse {
    user: UserDto;
    tokens: TokenPair;
}
export interface AcceptInviteDto {
    token: string;
    password: string;
}
export interface RequestPasswordResetDto {
    email: string;
}
export interface VerifyResetCodeDto {
    email: string;
    code: string;
    newPassword: string;
    confirmPassword: string;
}
export interface OAuthProfile {
    providerId: string;
    email: string;
    name: string;
}
export type { OAuthProvider };
//# sourceMappingURL=auth.types.d.ts.map
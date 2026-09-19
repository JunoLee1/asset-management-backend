import type { LoginDto, TokenPair, AuthResponse, JwtPayload, OAuthProfile, OAuthProvider, AcceptInviteDto, RequestPasswordResetDto } from './auth.types';
import type { ChangePasswordInput, VerifyResetCodeInput } from '../../schemas/auth.schema';
export interface IssueTokenMeta {
    userAgent?: string | null;
    ipAddress?: string | null;
}
export declare const authService: {
    login: (dto: LoginDto, meta?: IssueTokenMeta) => Promise<AuthResponse>;
    acceptInvite: (dto: AcceptInviteDto, meta?: IssueTokenMeta) => Promise<AuthResponse>;
    changePassword: (userId: string, dto: ChangePasswordInput, meta?: IssueTokenMeta) => Promise<void>;
    refresh: (token: string) => Promise<TokenPair>;
    logout: (token: string, meta?: IssueTokenMeta) => Promise<void>;
    logoutAll: (userId: string, meta?: IssueTokenMeta) => Promise<{
        revokedCount: number;
    }>;
    findOrCreateOAuthUser: (provider: OAuthProvider, profile: OAuthProfile, accessToken: string, refreshToken: string | undefined, meta?: IssueTokenMeta) => Promise<AuthResponse>;
    issueTokenPair: (payload: Omit<JwtPayload, "iat" | "exp">, meta?: IssueTokenMeta) => Promise<TokenPair>;
    requestPasswordReset: (dto: RequestPasswordResetDto) => Promise<void>;
    verifyResetCode: (dto: VerifyResetCodeInput) => Promise<void>;
};
//# sourceMappingURL=auth.service.d.ts.map
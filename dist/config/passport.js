"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_kakao_1 = require("passport-kakao");
const env_1 = require("./env");
const auth_service_1 = require("../modules/auth/auth.service");
const prisma_1 = require("../lib/prisma");
const AppError_1 = require("../lib/AppError");
const configurePassport = () => {
    // Local: 이메일/비밀번호 → done(null, UserDto)
    passport_1.default.use(new passport_local_1.Strategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const result = await auth_service_1.authService.login({ email, password });
            done(null, result.user);
        }
        catch (err) {
            if (err instanceof AppError_1.AppError && err.statusCode === 401) {
                done(null, false, { message: err.message });
            }
            else {
                done(err);
            }
        }
    }));
    // JWT: Authorization: Bearer <token> → done(null, UserDto)
    passport_1.default.use(new passport_jwt_1.Strategy({
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: env_1.env.jwt.secret,
    }, async (payload, done) => {
        try {
            // team.department 까지 펼쳐서 req.user 에 부서 정보 노출 (TEAM_LEAD 의 "내 부서" 자동 필터 등)
            const user = await prisma_1.prisma.user.findUnique({
                where: { id: payload.sub },
                include: { team: { include: { department: true } } },
            });
            if (!user?.isActive)
                return done(null, false);
            done(null, {
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
        }
        catch (err) {
            done(err);
        }
    }));
    // Google OAuth
    if (env_1.env.google.clientId) {
        passport_1.default.use(new passport_google_oauth20_1.Strategy({
            clientID: env_1.env.google.clientId,
            clientSecret: env_1.env.google.clientSecret,
            callbackURL: env_1.env.google.callbackUrl,
        }, async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                if (!email)
                    return done(new AppError_1.AppError(400, 'Google 계정에 이메일 정보가 없습니다.'));
                const result = await auth_service_1.authService.findOrCreateOAuthUser('GOOGLE', { providerId: profile.id, email, name: profile.displayName }, accessToken, refreshToken);
                done(null, result.user);
            }
            catch (err) {
                done(err);
            }
        }));
    }
    // Kakao OAuth
    if (env_1.env.kakao.clientId) {
        passport_1.default.use(new passport_kakao_1.Strategy({ clientID: env_1.env.kakao.clientId, callbackURL: env_1.env.kakao.callbackUrl }, async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile._json.kakao_account?.email;
                if (!email)
                    return done(new AppError_1.AppError(400, 'Kakao 계정에 이메일 정보가 없습니다.'));
                const result = await auth_service_1.authService.findOrCreateOAuthUser('KAKAO', { providerId: profile.id, email, name: profile.displayName }, accessToken, refreshToken);
                done(null, result.user);
            }
            catch (err) {
                done(err);
            }
        }));
    }
};
exports.configurePassport = configurePassport;
//# sourceMappingURL=passport.js.map
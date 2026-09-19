declare module 'passport-kakao' {
  import type { Request } from 'express'
  import { Strategy as PassportStrategy } from 'passport'

  interface KakaoProfile {
    id: string
    displayName: string
    provider: 'kakao'
    _json: {
      kakao_account?: {
        email?: string
        profile?: {
          nickname?: string
        }
      }
    }
  }

  interface StrategyOptions {
    clientID: string
    clientSecret?: string
    callbackURL: string
    passReqToCallback?: false
  }

  interface StrategyOptionsWithRequest {
    clientID: string
    clientSecret?: string
    callbackURL: string
    passReqToCallback: true
  }

  type VerifyCallback = (
    accessToken: string,
    refreshToken: string,
    profile: KakaoProfile,
    done: (err: Error | null, user?: unknown, info?: unknown) => void,
  ) => void

  type VerifyCallbackWithRequest = (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: KakaoProfile,
    done: (err: Error | null, user?: unknown, info?: unknown) => void,
  ) => void

  class Strategy extends PassportStrategy {
    constructor(options: StrategyOptions, verify: VerifyCallback)
    constructor(options: StrategyOptionsWithRequest, verify: VerifyCallbackWithRequest)
  }
}

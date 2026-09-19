export declare const env: {
    readonly port: number;
    readonly nodeEnv: "development" | "production" | "test";
    readonly databaseUrl: string;
    readonly jwt: {
        readonly secret: string;
        readonly refreshSecret: string;
        readonly expiresIn: string;
        readonly refreshExpiresIn: string;
    };
    readonly google: {
        readonly clientId: string;
        readonly clientSecret: string;
        readonly callbackUrl: string;
    };
    readonly kakao: {
        readonly clientId: string;
        readonly callbackUrl: string;
    };
    readonly smtp: {
        readonly gmailUser: string;
        readonly gmailAppPassword: string;
        readonly from: string;
    };
    readonly sms: {
        readonly serviceId: string;
        readonly accessKey: string;
        readonly secretKey: string;
        readonly fromNumber: string;
    };
    readonly frontendUrl: string;
};
//# sourceMappingURL=env.d.ts.map
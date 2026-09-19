import type { Request, Response } from 'express';
export declare const authController: {
    acceptInvite: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    refresh: (req: Request, res: Response) => Promise<void>;
    logout: (req: Request, res: Response) => Promise<void>;
    logoutAll: (req: Request, res: Response) => Promise<void>;
    me: (req: Request, res: Response) => void;
    changePassword: (req: Request, res: Response) => Promise<void>;
    oauthCallback: (req: Request, res: Response) => Promise<void>;
    setOutOfOffice: (req: Request, res: Response) => Promise<void>;
    requestPasswordReset: (req: Request, res: Response) => Promise<void>;
    verifyResetCode: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=auth.controller.d.ts.map
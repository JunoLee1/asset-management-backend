import type { Request, Response } from 'express';
export declare const userController: {
    list: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    deactivate: (req: Request, res: Response) => Promise<void>;
    activate: (req: Request, res: Response) => Promise<void>;
    reinvite: (req: Request, res: Response) => Promise<void>;
    listHistory: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=user.controller.d.ts.map
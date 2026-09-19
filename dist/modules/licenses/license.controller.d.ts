import type { Request, Response } from 'express';
export declare const licenseController: {
    list: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    remove: (req: Request, res: Response) => Promise<void>;
    assign: (req: Request, res: Response) => Promise<void>;
    unassign: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=license.controller.d.ts.map
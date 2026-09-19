import type { Request, Response } from 'express';
export declare const maintenanceController: {
    list: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    approve: (req: Request, res: Response) => Promise<void>;
    reject: (req: Request, res: Response) => Promise<void>;
    cancel: (req: Request, res: Response) => Promise<void>;
    assign: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=maintenance.controller.d.ts.map
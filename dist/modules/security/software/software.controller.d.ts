import type { Request, Response } from 'express';
export declare const softwareController: {
    list: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    updatePermission: (req: Request, res: Response) => Promise<void>;
    remove: (req: Request, res: Response) => Promise<void>;
    ingest: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=software.controller.d.ts.map
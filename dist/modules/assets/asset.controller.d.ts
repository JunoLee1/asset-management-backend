import type { Request, Response } from 'express';
export declare const assetController: {
    create: (req: Request, res: Response) => Promise<void>;
    list: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    retire: (req: Request, res: Response) => Promise<void>;
    uploadImage: (req: Request, res: Response) => Promise<void>;
    removeImage: (req: Request, res: Response) => Promise<void>;
    getHistory: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=asset.controller.d.ts.map
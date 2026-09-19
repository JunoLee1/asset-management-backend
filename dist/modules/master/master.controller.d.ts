import type { Request, Response, RequestHandler } from 'express';
export declare const departmentHandlers: {
    list: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    remove: (req: Request, res: Response) => Promise<void>;
    restore: (req: Request, res: Response) => Promise<void>;
};
export declare const teamHandlers: {
    list: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    remove: (req: Request, res: Response) => Promise<void>;
    restore: (req: Request, res: Response) => Promise<void>;
};
export declare const locationHandlers: {
    list: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    remove: (req: Request, res: Response) => Promise<void>;
    restore: (req: Request, res: Response) => Promise<void>;
};
export declare const vendorHandlers: {
    list: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    remove: (req: Request, res: Response) => Promise<void>;
    restore: (req: Request, res: Response) => Promise<void>;
};
export declare const assetCategoryHandlers: {
    list: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    remove: (req: Request, res: Response) => Promise<void>;
    restore: (req: Request, res: Response) => Promise<void>;
};
export declare const createVendorDraft: RequestHandler;
export declare const approveVendor: RequestHandler;
export declare const inactivateVendor: RequestHandler;
export declare const submitVendor: RequestHandler;
export declare const rejectVendor: RequestHandler;
export declare const blacklistVendor: RequestHandler;
export declare const getVendorDocuments: RequestHandler;
export declare const uploadVendorDocumentHandler: RequestHandler;
export declare const validateBrnHandler: RequestHandler;
//# sourceMappingURL=master.controller.d.ts.map
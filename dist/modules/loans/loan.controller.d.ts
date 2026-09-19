import type { Request, Response } from 'express';
export declare const loanController: {
    list: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    my: (req: Request, res: Response) => Promise<void>;
    overdue: (req: Request, res: Response) => Promise<void>;
    lookup: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    approve: (req: Request, res: Response) => Promise<void>;
    approveManager: (req: Request, res: Response) => Promise<void>;
    approveDept: (req: Request, res: Response) => Promise<void>;
    approveAdmin: (req: Request, res: Response) => Promise<void>;
    approveReturnManager: (req: Request, res: Response) => Promise<void>;
    finalizeReturn: (req: Request, res: Response) => Promise<void>;
    checkout: (req: Request, res: Response) => Promise<void>;
    receive: (req: Request, res: Response) => Promise<void>;
    reject: (req: Request, res: Response) => Promise<void>;
    cancel: (req: Request, res: Response) => Promise<void>;
    recall: (req: Request, res: Response) => Promise<void>;
    returnLoan: (req: Request, res: Response) => Promise<void>;
    inspect: (req: Request, res: Response) => Promise<void>;
    requestExtension: (req: Request, res: Response) => Promise<void>;
    approveExtensionManager: (req: Request, res: Response) => Promise<void>;
    approveExtensionAdmin: (req: Request, res: Response) => Promise<void>;
    rejectExtension: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=loan.controller.d.ts.map
import type { Request, Response } from 'express';
export declare const notificationController: {
    my: (req: Request, res: Response) => Promise<void>;
    markRead: (req: Request, res: Response) => Promise<void>;
    processOutbox: (req: Request, res: Response) => Promise<void>;
    runTerminationCheck: (req: Request, res: Response) => Promise<void>;
    runComplianceCheck: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=notification.controller.d.ts.map
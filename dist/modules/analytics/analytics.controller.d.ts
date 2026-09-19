import type { Request, Response } from 'express';
export declare const analyticsController: {
    getDistribution: (_req: Request, res: Response) => Promise<void>;
    getUtilization: (_req: Request, res: Response) => Promise<void>;
    getUtilizationByDepartment: (req: Request, res: Response) => Promise<void>;
    getDepartmentValue: (_req: Request, res: Response) => Promise<void>;
    getMaintenanceCost: (req: Request, res: Response) => Promise<void>;
    getComplianceExpiry: (_req: Request, res: Response) => Promise<void>;
    exportAsCsv: (req: Request, res: Response) => Promise<void>;
    exportAsExcel: (req: Request, res: Response) => Promise<void>;
    exportAsPdf: (req: Request, res: Response) => Promise<void>;
    exportAsHwpx: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=analytics.controller.d.ts.map
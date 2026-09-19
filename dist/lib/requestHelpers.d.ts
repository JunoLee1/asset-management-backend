import type { Request } from 'express';
import type { Role } from '../generated/prisma/enums';
export interface RequesterContext {
    id: string;
    role: Role;
}
export declare const getRequester: (req: Request) => RequesterContext;
export declare const requireId: (req: Request, name?: string) => string;
export interface AuditContext {
    ipAddress: string | null;
    userAgent: string | null;
}
export declare const getAuditContext: (req: Request) => AuditContext;
//# sourceMappingURL=requestHelpers.d.ts.map
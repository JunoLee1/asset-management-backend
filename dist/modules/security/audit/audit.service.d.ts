import { AuditAction } from '../../../generated/prisma/enums';
import type { Role } from '../../../generated/prisma/enums';
import type * as Prisma from '../../../generated/prisma/internal/prismaNamespace';
type Tx = Prisma.TransactionClient;
export interface LogAuditParams {
    action: AuditAction;
    targetType: string;
    targetId: string;
    performedById?: string | null;
    performedByRole?: Role | null;
    detail?: Record<string, unknown> | null;
    ipAddress?: string | null;
    tx?: Tx;
}
export declare function logAudit(params: LogAuditParams): Promise<void>;
export {};
//# sourceMappingURL=audit.service.d.ts.map
import type { Request, Response, NextFunction } from 'express';
import type { Role } from '../generated/prisma/enums';
export declare const authorize: (...roles: Role[]) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authorize.d.ts.map
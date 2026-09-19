import type { CreateDepartmentInput, UpdateDepartmentInput } from '../../schemas/master.schema';
import { type ListOptions } from './master.helpers';
export declare const departmentService: {
    list: (options?: ListOptions) => Promise<{
        name: string;
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        departmentId: string;
        teamLeadId: string | null;
    }[]>;
    getById: (id: string) => Promise<{
        _count: {
            teams: number;
        };
    } & {
        name: string;
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        leaderId: string | null;
    }>;
    create: (dto: CreateDepartmentInput) => Promise<{
        name: string;
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        leaderId: string | null;
    }>;
    update: (id: string, dto: UpdateDepartmentInput) => Promise<{
        name: string;
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        departmentId: string;
        teamLeadId: string | null;
    }>;
    softDelete: (id: string) => Promise<{
        name: string;
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        departmentId: string;
        teamLeadId: string | null;
    }>;
    restore: (id: string) => Promise<{
        name: string;
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        departmentId: string;
        teamLeadId: string | null;
    }>;
};
//# sourceMappingURL=department.service.d.ts.map
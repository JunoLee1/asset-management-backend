import type { ListOptions } from './master.helpers';
export declare const teamService: {
    list: (options?: ListOptions) => Promise<({
        department: {
            name: string;
        };
    } & {
        name: string;
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        departmentId: string;
        teamLeadId: string | null;
    })[]>;
    getById: (id: string) => Promise<{
        department: {
            name: string;
        };
    } & {
        name: string;
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        departmentId: string;
        teamLeadId: string | null;
    }>;
    create: (dto: {
        name: string;
        code: string;
        departmentId: string;
    }) => Promise<{
        name: string;
        code: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        departmentId: string;
        teamLeadId: string | null;
    }>;
    update: (id: string, dto: {
        name?: string;
        code?: string;
        departmentId?: string;
        teamLeadId?: string | null;
    }) => Promise<{
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
//# sourceMappingURL=team.service.d.ts.map
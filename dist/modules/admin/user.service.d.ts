import type { ListUsersQuery, UpdateUserInput, DeactivateUserInput, ActivateUserInput, ReinviteUserInput, ListUserHistoryQuery } from '../../schemas/user.schema';
import type { Role, UserHistoryAction } from '../../generated/prisma/enums';
import type { AuditContext } from '../../lib/requestHelpers';
import type { RequesterContext } from '../../lib/requestHelpers';
export interface UserListItem {
    id: string;
    email: string;
    name: string;
    role: Role;
    isActive: boolean;
    departmentName: string | null;
    inviteTokenExpiresAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare const userService: {
    list: (query: ListUsersQuery, requester?: RequesterContext) => Promise<{
        items: UserListItem[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>;
    getById: (id: string) => Promise<UserListItem>;
    update: (id: string, dto: UpdateUserInput, requester: RequesterContext, audit: AuditContext) => Promise<{
        phoneNumber: string | null;
        password: string | null;
        email: string;
        name: string;
        role: Role;
        teamId: string | null;
        id: string;
        createdAt: Date;
        phoneNumberHash: string | null;
        inviteToken: string | null;
        isActive: boolean;
        inviteTokenExpiresAt: Date | null;
        hireDate: Date;
        terminationDate: Date | null;
        isOutOfOffice: boolean;
        updatedAt: Date;
    }>;
    deactivate: (id: string, dto: DeactivateUserInput, requester: RequesterContext, audit: AuditContext) => Promise<{
        phoneNumber: string | null;
        password: string | null;
        email: string;
        name: string;
        role: Role;
        teamId: string | null;
        id: string;
        createdAt: Date;
        phoneNumberHash: string | null;
        inviteToken: string | null;
        isActive: boolean;
        inviteTokenExpiresAt: Date | null;
        hireDate: Date;
        terminationDate: Date | null;
        isOutOfOffice: boolean;
        updatedAt: Date;
    }>;
    activate: (id: string, dto: ActivateUserInput, requester: RequesterContext, audit: AuditContext) => Promise<{
        phoneNumber: string | null;
        password: string | null;
        email: string;
        name: string;
        role: Role;
        teamId: string | null;
        id: string;
        createdAt: Date;
        phoneNumberHash: string | null;
        inviteToken: string | null;
        isActive: boolean;
        inviteTokenExpiresAt: Date | null;
        hireDate: Date;
        terminationDate: Date | null;
        isOutOfOffice: boolean;
        updatedAt: Date;
    }>;
    reinvite: (id: string, dto: ReinviteUserInput, requester: RequesterContext, audit: AuditContext) => Promise<{
        phoneNumber: string | null;
        password: string | null;
        email: string;
        name: string;
        role: Role;
        teamId: string | null;
        id: string;
        createdAt: Date;
        phoneNumberHash: string | null;
        inviteToken: string | null;
        isActive: boolean;
        inviteTokenExpiresAt: Date | null;
        hireDate: Date;
        terminationDate: Date | null;
        isOutOfOffice: boolean;
        updatedAt: Date;
    }>;
    listHistory: (userId: string, query: ListUserHistoryQuery) => Promise<{
        items: ({
            performedBy: {
                email: string;
                name: string;
                id: string;
            };
        } & {
            userId: string;
            id: string;
            userAgent: string | null;
            ipAddress: string | null;
            createdAt: Date;
            action: UserHistoryAction;
            reason: string;
            before: import("@prisma/client/runtime/client").JsonValue | null;
            after: import("@prisma/client/runtime/client").JsonValue | null;
            performedById: string;
        })[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map
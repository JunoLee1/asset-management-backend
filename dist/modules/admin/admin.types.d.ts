import type { Role } from '../../generated/prisma/enums';
export interface InviteUserDto {
    email: string;
    name: string;
    hireDate: Date;
    role?: Role;
    teamId?: string;
    phoneNumber?: string;
}
export interface InviteUserResult {
    inviteToken: string;
    email: string;
    name: string;
}
//# sourceMappingURL=admin.types.d.ts.map
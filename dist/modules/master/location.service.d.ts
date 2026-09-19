import type { CreateLocationInput, UpdateLocationInput } from '../../schemas/master.schema';
import { type ListOptions } from './master.helpers';
export declare const locationService: {
    list: (options?: ListOptions) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        building: string;
        floor: string | null;
        room: string | null;
    }[]>;
    getById: (id: string) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        building: string;
        floor: string | null;
        room: string | null;
    }>;
    create: (dto: CreateLocationInput) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        building: string;
        floor: string | null;
        room: string | null;
    }>;
    update: (id: string, dto: UpdateLocationInput) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        building: string;
        floor: string | null;
        room: string | null;
    }>;
    softDelete: (id: string) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        building: string;
        floor: string | null;
        room: string | null;
    }>;
    restore: (id: string) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
        building: string;
        floor: string | null;
        room: string | null;
    }>;
};
//# sourceMappingURL=location.service.d.ts.map
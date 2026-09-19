"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("../generated/prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const env_1 = require("../config/env");
const adapter = new adapter_pg_1.PrismaPg({ connectionString: env_1.env.databaseUrl });
exports.prisma = new client_1.PrismaClient({ adapter });
//# sourceMappingURL=prisma.js.map
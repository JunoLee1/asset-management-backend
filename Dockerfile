FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# .npmrc 파일이 루트에 있다면 같이 복사해 줍니다
COPY package.json pnpm-lock.yaml .npmrc ./
COPY prisma ./prisma/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@latest --activate

# 여기도 .npmrc 포함해서 복사
COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/generated ./src/generated
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

EXPOSE 3001
CMD ["sh", "-c", "npx prisma migrate deploy && exec node dist/index.js"]
# Сборка с Node.js (для Prisma)
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate


# Стадия 2: Финальный образ с Bun
FROM oven/bun:latest
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY . .
EXPOSE 3000
CMD ["bun", "run", "dev"]
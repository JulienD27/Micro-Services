FROM node:18-alpine AS builder
WORKDIR /app
COPY todo-list-backend/package*.json ./
WORKDIR /app/todo-list-backend
RUN npm install
COPY todo-list-backend/ .

RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/todo-list-backend/package*.json ./
RUN npm install --only=production
COPY --from=builder /app/todo-list-backend/dist ./dist
COPY --from=builder /app/todo-list-backend/prisma ./prisma

RUN npx prisma generate

ENV NODE_ENV=production
CMD ["node", "dist/main"]

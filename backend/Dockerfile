FROM node:18-alpine AS builder

WORKDIR /app

COPY todo-list-backend/package*.json ./todo-list-backend/
WORKDIR /app/todo-list-backend
RUN npm install
COPY todo-list-backend/ .
RUN npm run build

FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/todo-list-backend .

ENV DATABASE_URL="mysql://todo_user:user123@mysql:3306/tododb"
COPY todo-list-backend/wait-for-mysql.sh ./wait-for-mysql.sh
RUN chmod +x ./wait-for-mysql.sh

RUN npm install --only=production
RUN npx prisma generate

ENV NODE_ENV=production
EXPOSE 3000

CMD ["sh", "-c", "./wait-for-mysql.sh && npx prisma db push && node dist/main"]


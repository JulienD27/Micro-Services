# Étape 1 : build React
FROM node:18-alpine AS build

WORKDIR /app

# Copie les fichiers nécessaires
COPY todo-list/package*.json ./todo-list/

WORKDIR /app/todo-list
RUN npm install

COPY todo-list/ .

RUN npm run build

# Étape 2 : NGINX pour servir le frontend
FROM nginx:alpine

COPY --from=build /app/todo-list/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

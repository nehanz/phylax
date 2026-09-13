# Stage 1: Build static assets
FROM node:20-alpine AS builder

WORKDIR /app

COPY frontend/dashboard/package*.json ./
RUN npm install

COPY frontend/dashboard/ ./

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY frontend/dashboard/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
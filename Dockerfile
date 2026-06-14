# ── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_API_URL=http://localhost:3001/api/v1
ARG VITE_TRAVELLER_APP_URL=http://localhost:3000

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_TRAVELLER_APP_URL=$VITE_TRAVELLER_APP_URL

RUN npm run build

# ── Stage 2: Serve ────────────────────────────────────────────────────────────
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

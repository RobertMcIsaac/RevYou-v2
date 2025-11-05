FROM node:current-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:current-alpine
WORKDIR /app
COPY package*.json ./
# RUN NODE_ENV=production && npm ci
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/modules/notification/template ./dist/modules/notification/template

EXPOSE 3000

CMD ["node", "dist/main.js"]
# builder container
FROM node:20-alpine3.17 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma prisma
RUN npx prisma generate

COPY src src
COPY tsconfig.json .
RUN npm run build

# final container
FROM node:20-alpine3.17
WORKDIR /app

ENV NODE_ENV=production
ENV IS_DOCKER=true

COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist dist
COPY --from=builder /app/prisma prisma

RUN npx prisma generate
CMD ["npm", "run", "start:prod"]
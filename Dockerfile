# FROM node:14
# RUN mkdir -p /app
# WORKDIR /app
# COPY package*.json /app/
# RUN npm i --production
# COPY . /app/
# RUN npm run build
# CMD ["node_modules/.bin/next", "start"]
# Install dependencies only when needed

FROM node:14.16.1-alpine3.12 AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
RUN npm install --frozen-lockfile
RUN npm i next-pwa
RUN npm i react
COPY next.config.js ./

# Rebuild the source code only when needed
FROM node:14.16.1-alpine3.12 AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm install --production --ignore-scripts --prefer-offline && npm run build && npm i next && npm i -g next

# Production image, copy all the files and run next
FROM node:14.16.1-alpine3.12 AS runner
WORKDIR /app

ENV NODE_ENV production
RUN npm i -g next
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=deps /app/next.config.js ./next.config.js
RUN npm i react

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
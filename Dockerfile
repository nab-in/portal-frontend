# FROM node:14
# RUN mkdir -p /app
# WORKDIR /app
# COPY package*.json /app/
# RUN npm i --production
# COPY . /app/
# RUN npm run build
# CMD ["node_modules/.bin/next", "start"]
# Install dependencies only when needed

FROM node:14.16.1-alpine3.12 AS builder
WORKDIR /app
COPY package.json ./
RUN npm i
RUN npm i next-pwa
RUN npm i react
COPY next.config.js ./
COPY . .
RUN npm i && npm i next && npm i -g react && npm i -g next
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN npm i 
RUN pm run build

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]
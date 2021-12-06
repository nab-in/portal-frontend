FROM node:14
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN npm i --production
COPY . /app/
RUN npm run build
CMD ["node_modules/.bin/next", "start"]

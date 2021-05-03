FROM node:14
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm i -g next
COPY package*.json ./
RUN npm i
COPY . ./
EXPOSE 3000
CMD npm run start

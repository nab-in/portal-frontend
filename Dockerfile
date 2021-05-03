FROM node:14
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
RUN npm i react react-dom
COPY . ./
EXPOSE 3000
CMD npm run start

FROM node:14
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN mkdir ./node_modules
COPY package*.json ./
COPY node_modules ./node_modules
RUN npm i
COPY . ./
CMD ["npm", "dev"]

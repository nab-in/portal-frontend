docker run -v $(pwd):/usr/src/app -w /usr/src/app node:14.15.4-alpine3.12 npm i
docker-compose down --remove-orphans
docker-compose up -d --build
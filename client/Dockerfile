FROM node:16-alpine

WORKDIR /home/node/app

ADD . .

RUN npm install

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache


ENTRYPOINT npm run start
FROM node:17.4.0-alpine3.14

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

RUN yarn add sass

COPY . .

CMD [ "yarn", "start" ]
FROM node:10-alpine
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY ./ ./
RUN yarn build

CMD ["yarn", "start"]
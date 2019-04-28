FROM node:10-alpine
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN npm install --prod
COPY . .

CMD ["npm", "start"]
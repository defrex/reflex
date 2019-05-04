FROM node:10-alpine
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --prod
COPY . .

CMD ["npm", "start"]
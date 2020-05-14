FROM node:10-alpine

WORKDIR /front-app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start" ]
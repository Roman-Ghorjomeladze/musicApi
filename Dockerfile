FROM node:21.6-alpine as dev

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .
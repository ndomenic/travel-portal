FROM node:latest as builder
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm start
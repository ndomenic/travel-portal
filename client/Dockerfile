FROM node:alpine
RUN mkdir -p /usr/src/app/client
COPY client/Dockerfile /usr/src/app/client
WORKDIR /usr/src/app/client

RUN npm install
COPY . /usr/src/app/client
RUN npm start
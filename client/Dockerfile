FROM node:alpine
RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client
COPY client /usr/src/app/client
RUN npm install
RUN npm start
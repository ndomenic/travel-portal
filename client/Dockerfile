FROM node:alpine
RUN mkdir -p /usr/src/app/client
WORKDIR /usr/src/app/client
COPY client/package.json /usr/src/app/client
COPY client/src /usr/src/app/client/src
COPY client/public /usr/src/app/client/public
RUN ls
RUN npm install
RUN npm start
FROM keymetrics/pm2:latest-alpine
RUN mkdir -p /usr/src/app/server
WORKDIR /usr/src/app/server
COPY server /usr/src/app/server
RUN npm install
RUN npm install pm2 -g
RUN pm2 start app.js
FROM node:alpine
RUN mkdir -p /usr/src/app/client
COPY client/package.json /usr/src/app/client
RUN cd /usr/src/app/client
RUN npm install
COPY . /usr/src/app/client
CMD ["npm", "start"]
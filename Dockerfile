FROM node:18-alpine

WORKDIR /usr/ekshop/api/product-service/

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package*.json /usr/ekshop/api/product-service/
RUN npm install

COPY . /usr/ekshop/api/product-service/

ENV PORT 6660
EXPOSE $PORT
CMD [ "npm", "start" ]

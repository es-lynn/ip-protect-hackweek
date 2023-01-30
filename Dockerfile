FROM node:16 AS node-modules-builder

RUN apt-get update -y
RUN apt-get install -y openssl

WORKDIR /usr/src/app

COPY . ./

RUN yarn install
RUN yarn setup
RUN yarn build:all

FROM node:16
WORKDIR /usr/src/app

COPY --from=node-modules-builder /usr/src/app/modules/backend ./modules/backend

RUN apt-get update -y
RUN apt-get install -y openssl

EXPOSE 8080
CMD ["node", "modules/backend/dist/src/main.js"]

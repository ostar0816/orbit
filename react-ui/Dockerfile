FROM node:9.11.1 as build-deps

WORKDIR /intermediate

COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM node:latest

RUN npm install -g pm2

WORKDIR /app

COPY --from=build-deps /intermediate/build ./build
COPY --from=build-deps /intermediate/server ./server
COPY --from=build-deps /intermediate/pm2-start.json ./

RUN cd ./server && yarn install

CMD ["pm2-runtime", "start", "pm2-start.json"]

EXPOSE 3000

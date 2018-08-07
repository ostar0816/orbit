FROM node:latest

RUN npm install -g pm2

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

CMD ["pm2-runtime", "start", "pm2-start.json"]

EXPOSE 8080

FROM node:16.10.0 as build

WORKDIR /app

COPY package.json /app/
# COPY yarn.lock /app/
COPY package.json /app/package.json

RUN yarn install

COPY ./ /app/

# WORKDIR /app/client

EXPOSE 3000

RUN yarn build

CMD ["yarn", "start"]

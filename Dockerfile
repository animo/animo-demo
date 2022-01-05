# FROM node:16.8.0 as build

# WORKDIR /app

# COPY package.json .
# COPY yarn.lock .
# COPY client/package.json client/package.json

# RUN yarn install

# COPY client client

# WORKDIR /app/client

# RUN yarn build

# FROM nginx 

# COPY ./client/build /usr/share/nginx/html

# EXPOSE 80

FROM node:16.8.0 as client

WORKDIR /client

FROM nginx
COPY --from=client /client /var/www/html

EXPOSE 80
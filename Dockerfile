FROM node:18 as build

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run typechain
RUN npm run build

FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

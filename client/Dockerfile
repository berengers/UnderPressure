FROM node:10 AS build

ADD . /app
WORKDIR /app
RUN npm install
RUN npm run build

FROM nginx:stable

COPY --from=build /app/build /var/www
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

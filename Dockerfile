FROM node:10.11.0 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . ./
RUN yarn build


FROM nginx:1.15.3
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
FROM node:16.15-alpine AS builder

ARG VERSION

LABEL name="chat-client"

LABEL version=VERSION

WORKDIR /usr/src/app

COPY . .

RUN npm i && npm run build

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

EXPOSE 80

COPY --from=builder /usr/src/app/dist/client/ .

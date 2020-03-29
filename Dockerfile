FROM golang:1.13.8-alpine as build-env
WORKDIR /go/src/viruskoll
RUN apk add --no-cache jq curl 
COPY . .
RUN go mod download
RUN go get && go build -o viruskollapp
RUN download_url=$(curl -s https://api.github.com/repos/go-swagger/go-swagger/releases/latest | \
  jq -r '.assets[] | select(.name | contains("'"$(uname | tr '[:upper:]' '[:lower:]')"'_amd64")) | .browser_download_url') && \
  curl -o /usr/local/bin/swagger -L'#' "$download_url" && \
  chmod +x /usr/local/bin/swagger && \
  mkdir swagger && \
  swagger generate spec -o ./swagger/swagger.json

FROM node:13.0-buster-slim as node-env
WORKDIR /web
RUN npm install yarn -g
COPY /web .
RUN yarn install && yarn build:prod

FROM alpine
COPY --from=build-env /go/src/viruskoll/viruskollapp /app/
COPY --from=node-env /web/public /app/web/public
COPY --from=node-env /web/src/swagger.html /app/web/public/swagger.html
COPY --from=build-env /go/src/viruskoll/swagger/swagger.json /app/web/public/build/swagger.json
COPY /geojson /geojson

WORKDIR /app
RUN ls -a
ENTRYPOINT ./viruskollapp
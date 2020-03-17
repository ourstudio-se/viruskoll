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

ENTRYPOINT ./viruskollapp
FROM golang:1.13.8 as build-env
WORKDIR /go/src/viruskoll

COPY . .
RUN go mod download
RUN go get && go build -o viruskollapp

ENTRYPOINT ./viruskollapp
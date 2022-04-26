FROM golang:1.17.5-alpine

RUN mkdir -p /server

WORKDIR /server

COPY . .

RUN go mod download

RUN go build -o server

ENTRYPOINT ["./server"]
# Inspired by 'Building a realtime dashboard with ReactJS, Go, gRPC, and Envoy' medium post

## Generate .proto for Golang

```
make build && cp proto/service.pb.go server/proto/ && cp proto/service.pb.go client/proto/
```

## Generate .proto for JS

```
protoc -I=. src/service.proto --js_out=import_style=commonjs,binary:. --grpc-web_out=import_style=commonjs,mode=grpcwebtext:.
```

## Build Docker Images

### Build on MACOS host

```sh
$ docker-compose -f docker-compose-macos.yml build
```

## Run Docker Containers

### Run on MACOS host

```sh
$ docker-compose -f docker-compose-macos.yml up -d
```
# Inspired by 'Building a realtime dashboard with ReactJS, Go, gRPC, and Envoy' medium post

## Install Redis

```
brew update
brew install redis
```

## Generate .proto

```
make build && cp proto/service.pb.go server/proto/ && cp proto/service.pb.go client/proto/
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
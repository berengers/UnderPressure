## Infrastructure Schema

![infrastructure schema](infra.png)

## Prerequisits

- Docker
- Docker-compose
- Nodejs and NPM

## Run full stack

```sh
docker-compose -f docker-compose.stack.yaml -f docker-compose.app.yaml build
docker-compose -f docker-compose.stack.yaml -f docker-compose.app.yaml up -d
```

## Dev workflow

```sh
## run server in dev mode
npm run startStack
npm run startServer

## run client in dev mode
cd client
npm start
```

## To login

```
email: tom@tom.com
password: password
```

## Postman

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/1e8fc4f77372695bf187)

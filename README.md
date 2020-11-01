## Infrastructure Schema

![infrastructure schema](infra.png)

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

## Introdução

Em desenvolvimento

## Descrição

Sistema de rastreamento veicular

### Paginas de acesso

- new-route: Criar nova rota
- driver: Iniciar rota
- admin: Visualizar todas as rotas
- metrics: Estatisticas da aplicação

### Scripts
``` sql
CREATE TABLE routes (id varchar(36) primary key, name varchar(255) not null, distance float not null, status varchar(255) not null, freight_price float, started_at datetime, finished_at datetime);
```

## Tecnologias

- React
- Typescript
- Socket.io
- Material UI
- Nestjs
- Nextjs
- Docker
- Apache Kafka
- Golang
- Grafana
- Mongodb
- Promotheus

## Instalação

```bash
$ npm install
$ npx prisma generate
```

## Rodando o nestjs

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Rodando o nextjs

```bash
# development
$ npm run dev

# production mode
$ npm run prod
```

## Testando o nestjs

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

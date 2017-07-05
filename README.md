# Utilizando Cache com Redis e Node.js


[![Travis](https://travis-ci.org/Kirmayrtomaz/cache_redis_node.svg?branch=master)](https://travis-ci.org/Kirmayrtomaz/cache_redis_node)
[![codecov.io](https://codecov.io/github/Kirmayrtomaz/cache_redis_node/coverage.svg?branch=master)](https://codecov.io/github/Kirmayrtomaz/cache_redis_node) [![Dependenceso](https://david-dm.org/Kirmayrtomaz/cache_redis_node/status.svg)](https://david-dm.org/Kirmayrtomaz/cache_redis_node)
[![Dev Dependences](https://david-dm.org/Kirmayrtomaz/cache_redis_node/dev-status.svg)](https://david-dm.org/Kirmayrtomaz/cache_redis_node/dev-status)
[![License](https://img.shields.io/badge/licence-MIT-blue.svg)](LICENSE)


# instalando dependencias

Esse projeto, mostra um exemplo em que consultaremos as organizações do github e salvaremos no banco de dados, e retornar a consulta caso já esteha cacheado.

Possuiremos duas rotas
  * **/orgs/{nomeDaOrganizacao}** -> que irá retornar dados da organização
  * **/orgs** -> que irá retornar todas as organizações que já foram consultadas



## Biblioteca do redis para instalar

```   javascript
npm i --save redis
```
or

```
yarn add redis
```

## Inicializando no projeto

```  javascript
const redis = require('redis');
const cache = redis.createClient();

```
## Verificando se a conexão ocorreu com sucesso

```   javascript
cache.on('connect', () => {
  console.log('REDIS READY');
});

cache.on('error', (e) => {
  console.log('REDIS ERROR', e);
});

```


## função para setar o cache

```  javascript
const timeInSecond = 'EX';
const time = 10;
cache.set(keyName, value, timeInSecond, time)
```
* KeyName => será a chave onde será salvo o valor
* value => será o valor que será salvo, no geral pode ser string, inteiro ou objeto de primeira ordem
* timeInSecond => tipo de temporizador que irá utilizar
  * 'EX' => Tempo em segundos
  * 'PX' => Tempo em milisegundos
  * 'NX' => Inserir se não existir
  * 'EX' => Inserir se existir



## função para setar dados de cache

```  javascript
cache.get(keyName);
```



## Criando um middleware para o express

```   javascript
const http = require('http');
const express = require('express');
const Promise = require('bluebird');

function cacheMiddleware(req, res, next) {
  return Promise.coroutine(function* () {
    const keyName = req.originalUrl;

    const cacheRes = yield getCache(keyName);

    if (cacheRes) {
      return res.json(cacheRes);
    }
    next();
  })();
}


const app = express(APP_PORT);
httpServer = http.Server(app);
app.use(cacheMiddleware);

app.get('/', (req, res) => {
  res.json({ status: 'The NODE_REDIS XD' });
});

```


## Criando um canal de PUB/SUB


```   javascript
const sub = redis.createClient(REDIS_PORT, REDIS_HOST);
const sub = redis.createClient(REDIS_PORT, REDIS_HOST);

sub.on('message', () => {

});

sub.subscribe('clean_cache');

pub.publish(canal, 'clean');

```


com `express.js` `mongo` `redis` que irá salv

Estas vão rodar em dos cenários, é criando um middleware simples para verificar se já existe cache e retornar os dados

E na outra etapa iremos setar o cache caso necessário, e limpar uma key através de um canal de **PUB/SUB**





Para subir as dependências externas do projeto
* Redis
* MongoDb

basta utilizar esse comando abaixo

```
docker-compose up
```

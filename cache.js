const redis = require('redis');
const Promise = require('bluebird');
const { REDIS_PORT, REDIS_HOST } = require('./config');

Promise.promisifyAll(redis.RedisClient.prototype);// promissificando redis

const cache = redis.createClient(REDIS_PORT, REDIS_HOST);


function cacheConnect() {
  return new Promise((resolve, reject) => {
    cache.on('connect', () => {
      console.log('REDIS READY');
      resolve();
    });

    cache.on('error', (e) => {
      console.log('REDIS: Ocorreu um erro ao executar o projeto ', e);
      reject();
    });
  });
}


function index() {
  return Promise.coroutine(function* () {
    cache.set('cachorro', 'dogao eh mao');

    const teste = yield cache.getAsync('cachorro');
    console.log(teste);
  })()
}

module.exports = {
  cacheConnect,
  cache,
};

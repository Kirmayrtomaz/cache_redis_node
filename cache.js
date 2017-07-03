const redis = require('redis');
const Promise = require('bluebird');
const { REDIS_PORT, REDIS_HOST } = require('./config');


Promise.promisifyAll(redis.RedisClient.prototype);// promissificando redis

var cache,pub;


function cacheConnect() {
  cache = redis.createClient(REDIS_PORT, REDIS_HOST);
  const sub = redis.createClient(REDIS_PORT, REDIS_HOST);
  pub = redis.createClient(REDIS_PORT, REDIS_HOST);

  sub.on('message', (channel) => {
  //console.log(`Message '${message}' on channel '${channel }' arrived!`);
  });

  sub.subscribe('clean_cache');
  return new Promise((resolve, reject) => {
    cache.on('connect', () => {
      //console.log('REDIS READY');
      resolve('Sucess');
    });

    cache.on('error', (e) => {
      //console.log('REDIS: Ocorreu um erro ao executar o projeto ', e);
      reject('Error');
    });
  });
}


function getCache(keyName) {

  return Promise.coroutine(function * (){

    let cacheResult = yield cache.getAsync(keyName);
     return cacheResult ? JSON.parse(cacheResult) : cacheResult;
  })()

}

function setCache(keyName, value, time) {

  return cache.setAsync(keyName, JSON.stringify(value), 'EX', time);
}


function cacheMiddleware(req, res, next) {
  Promise.coroutine(function* () {
    const keyName = req.originalUrl;
    const cacheRes = yield getCache(keyName);

    if (cacheRes) {
      return res.json(cacheRes);
    }
    next();
  })();
}

module.exports = {
  cacheConnect,
  cache,
  pub,
  getCache,
  setCache,
  cacheMiddleware,
};

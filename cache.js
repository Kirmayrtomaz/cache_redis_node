const redis = require('redis');
const Promise = require('bluebird');
const { REDIS_PORT, REDIS_HOST } = require('./config');


Promise.promisifyAll(redis.RedisClient.prototype);// promissificando redis

let cache;



function cacheConnect() {
  cache = redis.createClient(REDIS_PORT, REDIS_HOST);
  const sub = redis.createClient(REDIS_PORT, REDIS_HOST);

  sub.on('message', () => {
    cache.del('/orgs');
  });

  sub.subscribe('clean_cache');
  return new Promise((resolve, reject) => {
    cache.on('connect', () => {
      resolve('Sucess');
    });

    cache.on('error', () => {
      reject('Error');
    });
  });
}

function publish(canal) {
  const pub = redis.createClient(REDIS_PORT, REDIS_HOST);
  pub.publish(canal, 'clean');
}

function getCache(keyName) {
  return Promise.coroutine(function* () {
    const cacheResult = yield cache.getAsync(keyName);
    return cacheResult ? JSON.parse(cacheResult) : cacheResult;
  })();
}

function setCache(keyName, value, time) {
  return cache.setAsync(keyName, JSON.stringify(value), 'EX', time);
}


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

module.exports = {
  cacheConnect,
  cache,
  publish,
  getCache,
  setCache,
  cacheMiddleware,
};

const Promise = require('bluebird');

const sinon = require('sinon');
const proxyquire = require('proxyquire');
require('should-sinon');

describe('Cache', () => {
  it('Cache connect sucess', (done) => {
    const RedisClient = {
      prototype: {},
    };

    const createClient = function () {
      return {
        on: (mensagem, callback) => {
          if (mensagem === 'connect') {
            callback();
          } else if (mensagem === 'message') {
            callback();
          }
        },
        subscribe: () => {},
      };
    };
    const cache = proxyquire('./../cache.js', {
      redis: { createClient, RedisClient },
    });

    Promise.coroutine(function* () {
      const teste = yield cache.cacheConnect();
      teste.should.be.equal('Sucess');
      done();
    })();
  });

  it('Cache connect has Error', (done) => {
   const RedisClient = {
      prototype: {},
    };

   const createClient = function () {
      return {
        on: (mensagem, callback) => {
          if (mensagem === 'error') {
            callback();
          } else if (mensagem === 'message') {
            callback();
          }
        },
        subscribe: () => {},
      };
    };
   const cache = proxyquire('./../cache.js', {
      redis: { createClient, RedisClient },
      console: {
        log: () => {},
      },
    });

   Promise.coroutine(function* () {
      try {
        const teste = yield cache.cacheConnect();
      }catch (e) {
        done();
      }
    })();
 });

   it('Cache getCache', (done) => {
    const RedisClient = {
      prototype: {},
    };

    const createClient = function () {
      return {
        on: (mensagem, callback) => {
          if (mensagem === 'connect') {
            callback();
          } else if (mensagem === 'message') {
            callback();
          }
        },
        subscribe: (callback) => {
         },
         getAsync : sinon.stub().resolves(JSON.stringify({teste:1}))

         }

      };

    const cache = proxyquire('./../cache.js', {
      redis: { createClient, RedisClient },
    });

    Promise.coroutine(function* () {
      yield cache.cacheConnect()
      const teste =  yield  cache.getCache('keyName');

      teste.should.be.deepEqual({teste:1});
      done();
    })();
  });

it('Cache setCache with not exist', (done) => {
    const RedisClient = {
      prototype: {},
    };

    const createClient = function () {
      return {
        on: (mensagem, callback) => {
          if (mensagem === 'connect') {
            callback();
          } else if (mensagem === 'message') {
            callback();
          }
        },
        subscribe: (callback) => {},
        setAsync: sinon.stub().resolves()

      };
    }
    const cache = proxyquire('./../cache.js', {
      redis: { createClient, RedisClient },
    });

    Promise.coroutine(function* () {
      yield cache.cacheConnect()
      const teste =  yield  cache.setCache('keyName');
      done()
    })();
  });



it('Cache cacheMiddleware exists', (done) => {
    const RedisClient = {
      prototype: {},
    };

    const createClient = function () {
      return {
        on: (mensagem, callback) => {
          if (mensagem === 'connect') {
            callback();
          } else if (mensagem === 'message') {
            callback();
          }
        },
        subscribe: (callback) => {},
        getAsync : sinon.stub().resolves(JSON.stringify({teste:1}))



      };
    }
    const cache = proxyquire('./../cache.js', {
      redis: { createClient, RedisClient },
    });

    let res = {
      json: () =>{
        done()
      }
    }

    let req = {

    }

    let next = {

    }

    Promise.coroutine(function*(){

      yield  cache.cacheConnect();
      cache.cacheMiddleware(req, res, next);
    })();




  });



it('Cache cacheMiddleware not exists', (done) => {
    const RedisClient = {
      prototype: {},
    };

    const createClient = function () {
      return {
        on: (mensagem, callback) => {
          if (mensagem === 'connect') {
            callback();
          } else if (mensagem === 'message') {
            callback();
          }
        },
        subscribe: (callback) => {},
        getAsync : sinon.stub().resolves()



      };
    }
    const cache = proxyquire('./../cache.js', {
      redis: { createClient, RedisClient },
    });

    let res = {
      json: () =>{

      }
    }

    let req = {

    }

    let next = () => {
       done()
    }
    Promise.coroutine(function*(){
      yield  cache.cacheConnect();
      cache.cacheMiddleware(req, res, next);
    })();

  });

});

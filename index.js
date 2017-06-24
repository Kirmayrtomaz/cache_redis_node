const http = require('http');
const express = require('express');
const Promise = require('bluebird');

const { cacheConnect } = require('./cache');
const { APP_PORT } = require('./config');
const { getRouter } = require('./route');
const { dbConnect } = require('./db');

let httpServer;

function init() {
  httpServer.listen(APP_PORT, () => {
    console.log(`APP executado na porta ${APP_PORT}`);
  });
}

Promise.coroutine(function* () {
  yield dbConnect();
  yield cacheConnect();
  const app = express(APP_PORT);
  httpServer = http.Server(app);

  app.use(getRouter());

  app.get('/', (req, res) => {
    res.json({ status: 'The NODE_REDIS XD' });
  });


  init();
})();



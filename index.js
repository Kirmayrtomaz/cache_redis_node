const http = require('http');
const express = require('express');
const Promise = require('bluebird');


const { dbConnect } = require('./db');
const { APP_PORT } = require('./config');
const { getOrg, getAllOrgs } = require('./route');
const { cacheConnect, cacheMiddleware } = require('./cache');

let httpServer;

function init() {
  httpServer.listen(APP_PORT, () => {
    console.log(`APP executado na porta ${APP_PORT}`);
  });
}


Promise.coroutine(function* () {
  yield cacheConnect();
  yield dbConnect();

  const app = express(APP_PORT);
  httpServer = http.Server(app);
  app.use(cacheMiddleware);

  app.get('/', (req, res) => {
    res.json({ status: 'The NODE_REDIS XD' });
  });
  app.get('/orgs/:organization', getOrg);
  app.get('/orgs/', getAllOrgs);


  init();
})();



const express = require('express');
const Promise = require('bluebird');
const { getOrgs } = require('./services');

function getRouter() {
  const router = express.Router();

  router.route('/orgs').get((req, res) => {
    return Promise.coroutine(function*(){
      let organization = req.query.orgs;
      orgs = yield getOrgs(organization)

      res.json(orgs);
    })()
  });

  return router;
}


module.exports = {
  getRouter,
};

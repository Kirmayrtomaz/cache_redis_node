const Promise = require('bluebird');
const { getOrganization, getAllOrganizations } = require('./controller');
const { setCache } = require('./cache');

const getOrg = (req, res) => Promise.coroutine(function* () {
  const organization = req.params.organization;
  const cacheURL = req.originalUrl;
  try {
    const org = yield getOrganization(organization, cacheURL);

    if (org) {
      yield setCache(cacheURL, org, 10);
      return res.json(org);
    }

    return res.sendStatus(404);
  } catch (e) {
    res.status(500);
    return res.send(e.message);
  }
})();

const getAllOrgs = (req, res) => Promise.coroutine(function* () {
  const cacheKey = req.originalUrl;

  try {
    const allOrganizations = yield getAllOrganizations();
    if (allOrganizations && allOrganizations.length > 0) {
      yield setCache(cacheKey, allOrganizations, 10);
      return res.json(allOrganizations);
    }
    return res.sendStatus(404);
  } catch (e) {
    res.status(500);
    return res.send(e.message);
  }
})();

module.exports = {
  getOrg,
  getAllOrgs,
};

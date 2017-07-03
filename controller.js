const Promise = require('bluebird');
const { getOrgByGithub } = require('./services');
const { Orgs } = require('./db');
const { pub, setCache } = require('./cache');


function getOrganization(organization) {
  return Promise.coroutine(function* () {
    let org = yield Orgs.findOne(organization);
    if (org) {
      return org;
    }

    org = yield getOrgByGithub(organization);
    yield Orgs.save(org);
    pub.publish('clean_cache');

    return org;
  })();
}

function getAllOrganizations() {
  return Promise.coroutine(function* () {
    const orgs = yield Orgs.find();

    yield setCache('orgs', orgs, 10);

    return orgs.map((org) => org.name, []);
  })();
}

module.exports = {
  getOrganization,
  getAllOrganizations,
};

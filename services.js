const rp = require('request-promise');
const { GITHUB_URL } = require('./config');

function getOrgByGithub(repo) {
  return rp.get({
    uri: `${GITHUB_URL}/orgs/${repo}`,
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true,
  });
}

module.exports = {
  getOrgByGithub,
};


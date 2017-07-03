const axios = require('axios');
const { GITHUB_URL } = require('./config');


/**
 * new Promise((resolve,reject)=>{
    let json = {
      login: repo,
      name: 'Concrete Solutions',
      description: '',
      html_url: 'https://github.com/concretesolutions',
      avatar_url: 'https://avatars1.githubusercontent.com/u/858781?v=3',
      public_repos: 25
    }
    resolve(json)
  })
 *
 */


function getOrgByGithub(repo) {
  return axios.get(`${GITHUB_URL}/orgs/${repo}/repos`);
}

module.exports = {
  getOrgByGithub
};

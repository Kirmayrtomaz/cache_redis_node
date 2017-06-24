const axios = require('axios');
const { GITHUB_URL } = require('./config');

let json = {
  login: 'concretesolutions',
  name: 'Concrete Solutions',
  description: '',
  html_url: 'https://github.com/concretesolutions',
  avatar_url: 'https://avatars1.githubusercontent.com/u/858781?v=3',
  public_repos: 25
}

function getOrgs(repo) {
  return new Promise((resolve,reject)=>{

    resolve(json)
  })
  return axios.get(`${GITHUB_URL}/orgs/${repo}/repos`)
        .then((response) => response)
        .catch((error) => {
          throw Error(error);
        });
}

module.exports = {
  getOrgs
};

const Promise = require('bluebird');

const sinon = require('sinon');
const proxyquire = require('proxyquire');
require('should-sinon');


describe('Service', () => {
  it('Service', (done) => {
    const service = proxyquire('./../services', {
    'axios': {
      get: sinon.stub().resolves(
        {
          login: 'repo',
          name: 'Concrete Solutions',
          description: '',
          html_url: 'https://github.com/concretesolutions',
          avatar_url: 'https://avatars1.githubusercontent.com/u/858781?v=3',
          public_repos: 25
        })
    }
    });

    Promise.coroutine(function*(){
      yield service.getOrgByGithub();
      done();
    })();


  });
});

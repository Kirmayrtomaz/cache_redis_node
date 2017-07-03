const Promise = require('bluebird');

const sinon = require('sinon');
const proxyquire = require('proxyquire');
require('should-sinon');


describe('Controller', () => {
  it('get organization when not exist in database', (done) => {
    const controller = proxyquire('../controller', {
      './db': {
        Orgs: {
          findOne: sinon.stub().resolves(),
          save: sinon.stub().resolves(),
        },
      },
      './services': {
        getOrgByGithub: sinon.stub().resolves({ login: 'organization' }),
      },
      './cache': {
        pub: {
            publish: function(){}
        },
      },
    });

    Promise.coroutine(function* () {
      const result = yield controller.getOrganization('org');
      result.should.deepEqual({ login: 'organization' });
      done();
    })();
  });

it('get organization when  the exist in database', (done) => {
    const controller = proxyquire('../controller', {
      './db': {
        Orgs: {
          findOne: sinon.stub().resolves({ login: 'organization' }),
          save: sinon.stub().resolves(),
        },
      },
      './services': {
        getOrgByGithub: sinon.stub().resolves({ login: 'organization' }),
      },
      './cache': {
        pub: {
            publish: function(){}
        },
      },
    });

    Promise.coroutine(function* () {
      const result = yield controller.getOrganization('org');
      result.should.deepEqual({ login: 'organization' });
      done();
    })();
  });

it('get all organizations  in database', (done) => {
    const controller = proxyquire('../controller', {
      './db': {
        Orgs: {
          find: sinon.stub().resolves([{name:'org1'},{name: 'org2'}]),
        },
      },
      './cache': {
        setCache: sinon.stub().resolves()
      },
    });

    Promise.coroutine(function* () {
      const result = yield controller.getAllOrganizations('org');
      result.should.deepEqual(['org1','org2']);
      done();
    })();
  });
});

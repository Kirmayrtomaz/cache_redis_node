const sinon = require('sinon');
const proxyquire = require('proxyquire');
require('should-sinon');


describe('getOrg', () => {
  it('Route get Organization when has results', (done) => {
    const result = { login: 'organization' };
    const getOrganization = sinon.stub().resolves(result);
    const setCache = sinon.stub().resolves();
    const req = {
      params: {
        organization: 'org',
      },
    };

    const res = {
      json: (response) => {
        response.should.deepEqual(result);
        done();
      },
    };

    const route = proxyquire('./../route', {
      './controller': { getOrganization },
      './cache': { setCache },
    });

    route.getOrg(req, res);
  });
  it('Route get Organization when not exist result', (done) => {
    const getOrganization = sinon.stub().resolves(null);
    const setCache = sinon.stub().resolves();
    const req = {
      params: {
        organization: 'org',
      },
    };

    const res = {
      json: () => {
      },
      sendStatus: (status) => {
        status.should.equal(404);
        done();
      },
    };

    const route = proxyquire('./../route', {
      './controller': { getOrganization },
      './cache': { setCache },
    });

    route.getOrg(req, res);
  });

  it('Route get Organization when has Error', (done) => {
    const error = Error('Redis generic error');
    const getOrganization = sinon.stub().rejects(error);
    const setCache = sinon.stub().resolves();
    const req = {
      params: {
        organization: 'org',
      },
    };

    const res = {
      send: (response) => {
        response.should.equal('Redis generic error');
        done();
      },
      status: (status) => {
        status.should.equal(500);
      },
    };

    const route = proxyquire('./../route', {
      './controller': { getOrganization },
      './cache': { setCache },
    });

    route.getOrg(req, res);
  });
});



describe('getAllorgs', () => {
  it('Route get All Organizations when has results', (done) => {
    const result = ['org1', 'org2'];
    const getAllOrganizations = sinon.stub().resolves(result);
    const setCache = sinon.stub().resolves();
    const req = {
      originalUrl: 'url',
    };

    const res = {
      json: (response) => {
        response.should.deepEqual(result);
        done();
      },
    };

    const route = proxyquire('./../route', {
      './controller': { getAllOrganizations },
      './cache': { setCache },
    });

    route.getAllOrgs(req, res);
  });
  it('Route get All Organization when not exist result', (done) => {
    const getAllOrganizations = sinon.stub().resolves([]);
    const setCache = sinon.stub().resolves();
    const req = {
      originalUrl: 'url',
    };

    const res = {
      json: () => {},
      sendStatus: (status) => {
        status.should.equal(404);
        done();
      },
    };

    const route = proxyquire('../route', {
      './controller': { getAllOrganizations },
      './cache': { setCache },
    });

    route.getAllOrgs(req, res);
  });

  it('Route get Organization when has Error', (done) => {
    const error = Error('Redis generic error');
    const getAllOrganizations = sinon.stub().rejects(error);
    const setCache = sinon.stub().resolves();
    const req = {
      originalUrl: 'url',
    };

    const res = {
      send: (response) => {
        response.should.equal('Redis generic error');
        done();
      },
      status: (status) => {
        status.should.equal(500);
      },
    };

    const route = proxyquire('./../route', {
      './controller': { getAllOrganizations },
      './cache': { setCache },
    });

    route.getAllOrgs(req, res);
  });
});

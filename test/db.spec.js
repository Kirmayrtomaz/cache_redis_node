const Promise = require('bluebird');

const sinon = require('sinon');
const proxyquire = require('proxyquire');
require('should-sinon');


describe('DB', () => {
  it('Db Connect when has sucess', (done) => {
    const mongoose = {
      Schema() { },
      model: () => { },
      connect: () => { },
      connection: {
        on: () => { },
        once: (open, callback) => {
          callback();
        },
      },
    };

    const db = proxyquire('./../db.js', {
      mongoose,
    });

    Promise.coroutine(function* () {
      yield db.dbConnect();
      done();
    })();
  });

  it('Db Connect when has error', (done) => {
    const mongoose = {
      Schema() { },
      model: () => { },
      connect: () => { },
      connection: {
        on: (error, callback) => {
          callback();
        },
        once: () => {},
      },
    };

    const db = proxyquire('./../db.js', {
      mongoose,
    });


    Promise.coroutine(function* () {
      try {
        yield db.dbConnect();
      } catch (e) {
        done();
      }
    })();
  });


  it('Db find organizations when has sucess', (done) => {
    const mongoose = {
      Schema() { },
      model() {
        return {
          findOne () {
            return {
              exec: sinon.stub().resolves({ login: 'organization' })
            }
          },
        };
      },

    };

    const db = proxyquire('./../db.js', {
      mongoose,
    });
    Promise.coroutine(function* () {
      const result = yield db.Orgs.findOne('organization');
      result.should.deepEqual({ login: 'organization' });
      done();
    })();
  });

  it('Db find organizations when has sucess', (done) => {
    const mongoose = {
      Schema() { },
      model() {
        return {
          find () {
            return {
              exec: sinon.stub().resolves([{ login: 'organization' }])
            }
          },
        };
      },

    };

    const db = proxyquire('./../db.js', {
      mongoose,
    });
    Promise.coroutine(function* () {
      const result = yield db.Orgs.find('organization');
      result.should.deepEqual([{ login: 'organization' }]);
      done();
    })();
  });
});

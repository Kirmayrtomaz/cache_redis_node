
const mongoose = require('mongoose');
const Promise = require('bluebird');

const schema = new mongoose.Schema({ name: 'string' });
const Organization = mongoose.model('Org', schema);

function dbConnect() {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://localhost:27017/org');

    mongoose.connection.on('error', (e) => {
      reject(e);
    });
    mongoose.connection.once('open', (e) => {
      resolve(e);
    });
  });
}

const Orgs = (function () {
  const save = (data = {}) => Promise.coroutine(function* () {
    const orgsave = new Organization(data);
    yield orgsave.save();
  })();

  const findOne = organization => Organization.findOne({ name: organization }).exec();
  const find = () => Organization.find().exec();

  return {
    save,
    findOne,
    find,
  };
})();

module.exports = {
  dbConnect,
  Orgs,
};

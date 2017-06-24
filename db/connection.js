const Sequelize = require('sequelize');
const Promise = require('bluebird');

let db;

function dbConnect() {
  return Promise((resolve, reject) => {
    const db = new Sequelize('user', 'root', 'root', {
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
  });

    db.authenticate()
    .then(() => {
      console.log('DB Ready');
      resolve();
    })
    .catch((err) => {
      console.error('Error to connect with database', err);
      reject();
    });
  });
}
module.exports = {
  dbConnect
};

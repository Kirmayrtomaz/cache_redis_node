'use strict';

var Sequelize = require('sequelize');
var config    = require('./../config/config').db;
var db        = {};

var sequelize = new Sequelize(config.database, config.username, config.password, config);

db.orgs = orgs;

if (db[modelName].associate) {
  db[modelName].associate(db);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

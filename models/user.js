'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: DataTypes.INTERGER,
    name: DataTypes.STRING,
    imagem: DataTypes.STRING,
    github: DataTypes.STRING,
    reposPublic: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
const Sequelize = require('sequelize');

const Organization = sequelize.define('organization', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING,
  imagem: Sequelize.STRING,
  github: Sequelize.STRING,
  reposPublic: Sequelize.STRING
})


module.exports = {
  Organization
}

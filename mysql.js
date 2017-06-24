let Sequelize = require('sequelize')

const db = new Sequelize('user','root','root',{
  host: '127.0.0.1',
  port:'3306',
  dialect: 'mysql',
})


const User = sequelize.define('user', {
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: Sequelize.STRING,
  imagem: Sequelize.STRING,
  github: Sequelize.STRING,
  reposPublic: Sequelize.STRING
})


//inserir no baco
//remover do banco
//listar do banco
//atualizar do banco

function save (){
  return User.save().then(()=>{

    //clear cache
  })
}

function findByid(id){
  return User.findById(id)
}

function findAll(){
  return User.findAll()
}


function update (id,data){
  return User.update({},{where:{ id }})
}

function delete(id){
  return db.destroy({where:{
    id
  }})
}


db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

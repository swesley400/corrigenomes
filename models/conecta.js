
const Sequelize = require('sequelize');

const sequelize = new Sequelize('________', '____', '__________', {
  host: '___________',
  port: 4914,
  dialect:  '_____________' 
})


sequelize.authenticate().then(function(){
    console.log('Conexão realizada com sucesso');
}).catch(function(err){
    console.log('Não foi possivel conectar com o banco: ' + err)
}) 

module.exports = sequelize





 

const { Sequelize } = require('sequelize')
const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_USER,
    MYSQL_PWD,
    MYSQL_DB,

} =require('../config/config.default')

const seq= new Sequelize(MYSQL_DB,MYSQL_USER,MYSQL_PWD,{
    host:MYSQL_HOST,
    dialect:'mysql',


})
// try {
//     await seq.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }

// seq.authenticate().then(()=>{
//   console.log('数据库连接成功')
// }).catch((err)=>{

//    console.log('数据库连接失败',err)

// })

module.exports=seq
const {DataTypes}=require('sequelize')
const seq=require('../db/seq')
const User=seq.define('user',{
    // id会被sequelize自动创建
    user_name:{
        type:DataTypes.STRING,
        allowNull:false,//是否为空
        unique:true,
        comment:'用户名，唯一',
    },
    password:{
        type:DataTypes.CHAR(64),
        allowNull:false,
        comment:'密码',



    },
    is_admin:{
        type:DataTypes.BOOLEAN,
        allowNull:false,//
        defaultValue:0,
        comment:'是否为管理员, 0:不是管理员(默认); 1:是管理员',
        

    },
    
})
// User.sync({force:true}) 强制同步数据库 创建表格
module.exports=User


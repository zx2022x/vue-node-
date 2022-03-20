const {DataTypes}=require('sequelize')
const seq=require('../db/seq')
const Goods=require('./goods.model')
const Cart=seq.define('carts',{
    goods_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'商品的id',
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        comment:'用户的id',

    },
    number:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:1,
        comment:'商品的数量',


    },
    selected:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true,
        comment:'是否选中',


    }

})

Cart.belongsTo(Goods,{
     foreignKey:'goods_id',
     as:'goods_info',
})//外键goods_id在Cart表里面
// Cart.sync({force:true}) 
module.exports=Cart

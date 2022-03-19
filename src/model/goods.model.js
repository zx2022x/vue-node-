const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const Goods = seq.define('goods', {
    goods_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品名称',


    },
    goods_price: {
        type: DataTypes.DECIMAL(10, 2),//DECIMAL保持精度
        allowNull: false,
        comment: '商品价格',


    },
    goods_num:{
        type:DataTypes.INTEGER,//INTEGER容量大
        allowNull:false,
        comment:'商品的库存',


    },
    goods_img:{
        type:DataTypes.STRING,
        allowNull:false,
        comment:'商品图片的url',
    },
    goods_fm:{
        type:DataTypes.INTEGER,//INTEGER容量大
        allowNull:false,
        comment:'商品的库存',
        

    },
   


},{
    paranoid:true,//软删除
})
// Goods.sync({force:true}) 
// 强制同步数据库 创建表格
module.exports=Goods
const seq = require('../db/seq')
const { DataTypes } = require('sequelize')
const Address = require("./addr.model")
const Order = seq.define('orders', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '用户id',
    },
    // address_id: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     comment: '地址id',
    // },
    goods_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品名称',


    },
   
    goods_num: {
        type: DataTypes.INTEGER,//INTEGER容量大
        allowNull: false,
        comment: '商品的库存',


    },
    goods_img: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: '商品图片的url',
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),//限制
        allowNull: false,
        comment: '订单总金额',
    },
    order_number: {
        type: DataTypes.CHAR(16),//16为
        allowNull: false,
        comment: '订单号',
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
        comment: '订单状态(0: 未支付,1: 已支付, 2: 已发货, 3: 已签收, 4: 取消)',
    },
}
)
// Order.belongsTo(Address, {
//     sourceKey: 'id',
//     foreignKey: "address_id"
// })
// Order.sync({ force: true })
module.exports = Order

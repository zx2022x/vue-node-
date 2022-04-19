const { userDoesNotExist } = require('../constant/err.type')
const { createOrder, findAllOrder, updateOrder } = require('../service/order.service')
const  Address =require("../model/addr.model")
const  Order=require("../model/order.model")
class OrderController {
    //提交订单
    async create(ctx) {
        console.log("订单开始")
        try {

            const user_id = ctx.state.user.id
            const { goods_info, total } = ctx.request.body
            const order_number = 'PJ' + Date.now()//唯一
            const res = await createOrder({
                user_id,
                
                goods_info,
                total,
                order_number
            })
            ctx.body = {
                code: 0,
                message: '生成订单成功',
                result: res,
            }




        } catch (error) {
            console.log(error)
        }

    }
    ////获取订单列表
    async findAll(ctx) {
        try {
            
            Address.hasMany(Order, {
                sourceKey: 'user_id',
                foreignKey: "user_id"
            })
            Order.belongsTo(Address, {
                sourceKey: 'user_id',
                foreignKey: "user_id"
            })

            const { pageNum = 1, pageSize = 10, status = 0 } = ctx.request.query
            const res = await findAllOrder(pageNum, pageSize, status)
            
            ctx.body = {
                code: 0,
                message: '获取订单列表成功',
                result: res,

            }

        } catch (error) {
            console.log('订单错误'+error)
        }


    }
    //更新订单
    async update(ctx){
        const id=ctx.request.params.id
        const {status}=ctx.request.body
        const res=await updateOrder(id,status)
        ctx.body={
            code:0,
            message:'更新订单状态成功',
            result:res

        }


    }
    //两个表连接
//   async connect(){
//         Address.hasMany(Order, {
//             sourceKey: 'id',
//             foreignKey: "address_id"
//         })
//         Order.belongsTo(Address, {
//             sourceKey: 'id',
//             foreignKey: "address_id"
//         })
//         next()
//     }
}
module.exports = new OrderController()
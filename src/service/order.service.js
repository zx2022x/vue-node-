const Order = require('../model/order.model')
const Address=require('../model/addr.model')
class OrderService {
  //创建订单
  async createOrder(order) {
    return await Order.create(order)
  }
  //订单列表
  async findAllOrder(pageNum, pageSize, status) {
    try {
     
      const { count, rows } = await Order.findAndCountAll({
        
        attributes:['user_id','goods_info','total','order_number','status'],
      
        where: {
          status
        },
        offset: (pageNum - 1) * pageSize,
        limit: pageSize * 1,//limit限制页面列表数量
        include: {
          model: Address,
          
          attributes: ['consignee', 'phone', 'address'],
          where:{is_default:1}
      },
      
      })

      return {
        pageNum,
        pageSize,
        total: count,
        list: rows,//订单信息
  
      }

    } catch (error) {
       console.log('订单'+error)
    }
 
    
  }
  //更新订单
  async updateOrder(id,status){
    
     return await Order.update({status},{where:{id}})
  
    }
}
module.exports = new OrderService()
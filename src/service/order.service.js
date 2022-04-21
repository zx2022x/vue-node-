const Order = require('../model/order.model')
const Address=require('../model/addr.model')
class OrderService {
  //创建订单
  async createOrder(order) {
    return await Order.bulkCreate(order)
  }
  //订单列表
  async findAllOrder(pageNum, pageSize, status, user_id) {
    try {
      Order.hasOne(Address,{
        foreignKey: "user_id",
        sourceKey: "user_id"
      });
      Address.belongsTo(Order);
      const { count, rows } = await Order.findAndCountAll({
        
        attributes:['id','user_id','goods_name','goods_num','goods_img','total','order_number','status','createdAt','updatedAt'],
      
        where: {
          status,
          user_id

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
   //管理员获取订单列表
   async ADfindAllOrder(pageNum, pageSize, status) {
    try {
      Order.hasOne(Address,{
        foreignKey: "user_id",
        sourceKey: "user_id"
      });
      Address.belongsTo(Order);
      const { count, rows } = await Order.findAndCountAll({
        
        attributes:['id','user_id','goods_name','goods_num','goods_img','total','order_number','status','createdAt','updatedAt'],
      
        where: {
          status,
        

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
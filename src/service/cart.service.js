const {Op}=require('sequelize')
const Cart=require('../model/cart.model')

class CartService{

    async createOrUpdate(user_id,goods_id){
        console.log('开始了')
        try {
            let res= await Cart.findOne({
                where:{
                    [Op.and]:{//同时查找user_id,goods_id
                       user_id,
                       goods_id
                    }
                }
            })


            if(res){
                //已经存在一条记录,将number+1
              await res.increment('number')
                return await res.reload()
   
            }else{
              return await Cart.create({
                  user_id,
                  goods_id,//其他的有默认值了
              })
            }
       



        } catch (error) {
            console.log('错误是'+error)
        }
    //   let res= await Cart.findOne({
    //          where:{
    //              [Op.and]:{//同时查找user_id,goods_id
    //                 user_id,
    //                 goods_id
    //              }
    //          }
    //      })
        //  console.log('调试'+res)
        //  if(res){
        //      //已经存在一条记录,将number+1
        //    await res.increment('number')
        //      return await res.reload()

        //  }else{
        //    return await Cart.create({
        //        user_id,
        //        goods_id,//其他的有默认值了
        //    })
        //  }
    } 

}
module.exports=new CartService()

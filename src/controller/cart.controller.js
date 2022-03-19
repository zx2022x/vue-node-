const {createOrUpdate}=require('../service/cart.service')
class CartController{
    async add(ctx){
       //将商品加入购物车
      try {
          
        const user_id=ctx.state.user.id
        const goods_id=ctx.request.body.goods_id
        console.log('购物车')
        //操作数据库
        const res= await createOrUpdate(user_id,goods_id)
        //
        ctx.body={
            code:0,
            message:'添加到购物车成功',
            result:res,
 
 
 
        }
        

      } catch (error) {
        
        console.log('有错误')

          
      }
      


    }
}
module.exports=new CartController()
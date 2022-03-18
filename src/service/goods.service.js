const Goods=require('../model/goods.model')
class GoodsService{
    //插入商品的信息 goods是ctx.request.body create是插入方法
    async createGoods(goods){
     const res= await Goods.create(goods)
     return res.dataValues
    }
}
module.exports=new GoodsService()
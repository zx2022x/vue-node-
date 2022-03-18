const Goods=require('../model/goods.model')
class GoodsService{
    //插入商品的信息 goods是ctx.request.body create是插入方法
    async createGoods(goods){
     const res= await Goods.create(goods)
     return res.dataValues
    }
    //更新商品
    async updateGoods(id,goods){
     
            const res=await Goods.update(goods,{where:{id}})
            //res[0]=0 or 1
            return res[0]>0 ? true:false
        
            
    }
    //直接删除商品
    async removeGoods(id){
    const res= await  Goods.destroy({where:{id}})
    return res[0]>0 ? true:false
    }
    //下架商品
    async removeGoods_xj(id){
        const res= await  Goods.destroy({where:{id}})
        return res[0]>0 ? true:false
        }
  
}
module.exports=new GoodsService()
const {
  createOrUpdate,
  findCarts,
  updateCarts,
  removeCarts,
  selectAllCarts,
  unselectAllCarts
 } = require('../service/cart.service')
const { cartFormatError } = require('../constant/err.type')
class CartController {
  async add(ctx) {
    //将商品加入购物车
    try {

      const user_id = ctx.state.user.id
      const goods_id = ctx.request.body.goods_id
      console.log('购物车')
      //操作数据库
      const res = await createOrUpdate(user_id, goods_id)
      //
      ctx.body = {
        code: 0,
        message: '添加到购物车成功',
        result: res,



      }


    } catch (error) {

      console.log('有错误')


    }



  }
  //查找购物车列表
  async findAll(ctx) {
    try {

      const { pageNum = 1, pageSize = 10 } = ctx.request.query//这里我写错了一个字母

      const res = await findCarts(pageNum, pageSize)
      ctx.body = {
        code: 0,
        message: '获取商品列表成功',
        result: res,





      }
    } catch (error) {
      console.log('错误是' + error)
    }

  }
  //更新购物车
  async update(ctx) {
    try {

      const { id } = ctx.request.params
      const { number, selected } = ctx.request.body
      if (number === undefined && selected === undefined) {
        cartFormatError.message = 'number和selected不能同时为空'
        return ctx.app.emit('error', cartFormatError, ctx)
      }

      const res = await updateCarts({ id, number, selected })
      ctx.body = {
        code: 0,
        message: '更新购物车成功',
        result: res,


      }



    } catch (error) {
      console.log('错误十四' + error)
    }

  }
  //删除购物车
  async remove(ctx) {
    const { ids } = ctx.request.body
    const res = await removeCarts(ids)
    ctx.body = {
      code: 0,
      message: '删除购物车',
      result: res,

    }

  }
  //全部选中
  async selectAll(ctx) {
    try {

      const user_id = ctx.state.user.id 
      const res = await selectAllCarts(user_id)

      ctx.body = {
        code: 0,
        message: '全部选中',
        result: res


      }

    } catch (error) {
           
    }

  }
  //全部不选中
  async unselectAll(ctx){

    try {

      const user_id = ctx.state.user.id 
      const res = await unselectAllCarts(user_id)
      
      ctx.body = {
        code: 0,
        message: '全部不选中',
        result: res


      }

    } catch (error) {
           console.log('全部不选中'+error)
    }



  }

}
module.exports = new CartController()
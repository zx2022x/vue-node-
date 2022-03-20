const { Op } = require('sequelize')
const Cart = require('../model/cart.model')
const Goods = require('../model/goods.model')

class CartService {
    //加入购物车
    async createOrUpdate(user_id, goods_id) {
        console.log('开始了')
        try {
            let res = await Cart.findOne({
                where: {
                    [Op.and]: {//同时查找user_id,goods_id
                        user_id,
                        goods_id
                    }
                }
            })


            if (res) {
                //已经存在一条记录,将number+1
                await res.increment('number')
                return await res.reload()

            } else {
                return await Cart.create({
                    user_id,
                    goods_id,//其他的有默认值了
                })
            }




        } catch (error) {
            console.log('错误是' + error)
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
    //获取商品列表
    // async findCarts(pageNum, pageSize) {

    //     const offset = (pageNum - 1) * pageSize
    //     //rows商品列表的值
    //     const { count, rows } = await Cart.findAndCountAll({
    //         attributes:['id','number','selected'],//要查找的属性
    //         offset: offset,
    //         limit: pageSize * 1,//商品列表的值
    //         include:{
    //             model:Goods,//把Goods的表拉进来
    //             as:'goods_info',//把goods表名换成了goods_info
    //             attributes:['id','goods_name','goods_price','goods_img']
    //         }
    //         })
    //         console.log('搜索'+rows )
    //     return {
    //         pageNum,
    //         pageSize,
    //         total: count,
    //         list: rows
    //     }
    // }
    async findCarts(pageNum, pageSize) {
        try {

            const offset = (pageNum - 1) * pageSize
            const { count, rows } = await Cart.findAndCountAll({
                attributes: ['id', 'number', 'selected'],
                offset: offset,
                limit: pageSize * 1,
                include: {
                    model: Goods,
                    as: 'goods_info',
                    attributes: ['id', 'goods_name', 'goods_price', 'goods_img'],
                },
            })
            return {
                pageNum,
                pageSize,
                total: count,
                list: rows,
            }
        }

        //传过来的参数写错了 应该pageNum=1


        catch (error) {
            console.log('错误' + error)
        }
        //     const offset = (pageNum - 1) * pageSize
        //     const { count, rows } = await Cart.findAndCountAll({
        //       attributes: ['id', 'number', 'selected'],
        //       offset: offset,
        //       limit: pageSize * 1,
        //       include: {
        //         model: Goods,
        //         as: 'goods_info',
        //         attributes: ['id', 'goods_name', 'goods_price', 'goods_img'],
        //       },
        //     })
        //     return {
        //       pageNum,
        //       pageSize,
        //       total: count,
        //       list: rows,
        //     }
    }
    //更新购物车列表
    async updateCarts(params) {
        const { id, number, selected } = params
        const res = await Cart.findByPk(id)
        if (!res) return ''//找不到数据返回空串 加多了一个逗号

        number !== undefined ? (res.number = number) : ''
        res.selected = selected
        return await res.save()//保存number更改

    }
    //删除购物车
    async removeCarts(ids) {
        return await Cart.destroy({
            where: {
                id: {
                    [Op.in]: ids,//条件ids是一个数组的意思 in可以删除1个或多个的意思
                }
            }
        })
    }
    //全选
    async selectAllCarts(user_id) {
        return await Cart.update(
            { selected: true },//更新状态
            {
                where: {
                    user_id,//es6简写

                }
            })
    }
    //全不选
    async unselectAllCarts(user_id){

        return await Cart.update(
            { selected: false },//更新状态
            {
                where: {
                    user_id,//es6简写

                }
            })


    }

}
module.exports = new CartService()

const Goods = require('../model/goods.model')
const { Op } = require("sequelize");
class GoodsService {
        //插入商品的信息 goods是ctx.request.body create是插入方法
        async createGoods(goods) {
                const res = await Goods.create(goods)
                return res.dataValues
        }
        //更新商品
        async updateGoods(id, goods) {

                const res = await Goods.update(goods, { where: { id } })
                //res[0]=0 or 1
                return res[0] > 0 ? true : false


        }
        //直接删除商品,destroy返回0 ,1
        async removeGoods(id) {
                const res = await Goods.destroy({ where: { id } })
                return res > 0 ? true : false
        }
        //下架商品
        async removeGoods_xj(id) {
                const res = await Goods.destroy({ where: { id } })
                return res > 0 ? true : false

        }
        //上架商品
        async restoreGoods(id) {
                const res = await Goods.restore({ where: { id } })
                console.log('res为' + res)
                return res > 0 ? true : false

        }
        //商品列表pageNum页码,pageSize每页显示多少条
        async findGoods(pageNum, pageSize) {
                //获取总数
                // const count = await Goods.count()
                // const offset = (pageNum - 1) * pageSize //偏移量
                // const rows = await Goods.findAll({ offset: offset, limit: pageSize*1 })//商品信息
                try {

                        const offset = (pageNum - 1) * pageSize
                        const { count, rows } = await Goods.findAndCountAll(
                                {

                                        offset: offset,
                                        limit: pageSize * 1,
                                       
                                }
                        )
                        return {
                                pageNum,
                                pageSize,
                                total: count,
                                list: rows
                        }


                } catch (error) {

                }

        }

         //商品列表(已经分类)pageNum页码,pageSize每页显示多少条
         async findFenGoods(pageNum, pageSize,goods_fm) {
                //获取总数
                // const count = await Goods.count()
                // const offset = (pageNum - 1) * pageSize //偏移量
                // const rows = await Goods.findAll({ offset: offset, limit: pageSize*1 })//商品信息
                try {

                        const offset = (pageNum - 1) * pageSize
                        const { count, rows } = await Goods.findAndCountAll(
                                {

                                        offset: offset,
                                        limit: pageSize * 1,
                                        where:{goods_fm}//直接把条件goods_fm 放在这里
                                }
                        )
                        return {
                                pageNum,
                                pageSize,
                                total: count,
                                list: rows
                        }


                } catch (error) {

                }

        }
       
        
        //获取水果商品列表
        async findGoods(pageNum, pageSize) {
                //获取总数
                // const count = await Goods.count()
                // const offset = (pageNum - 1) * pageSize //偏移量
                // const rows = await Goods.findAll({ offset: offset, limit: pageSize*1 })//商品信息
                try {

                        const offset = (pageNum - 1) * pageSize
                        const { count, rows } = await Goods.findAndCountAll(
                                {

                                        offset: offset,
                                        limit: pageSize * 1,
                                        
                                }
                        )
                        return {
                                pageNum,
                                pageSize,
                                total: count,
                                list: rows
                        }


                } catch (error) {

                }

        }
       





        //软删除商品列表pageNum页码,pageSize每页显示多少条
        async rufindGoods(pageNum, pageSize) {
                //获取总数
                // const count = await Goods.count()
                // const offset = (pageNum - 1) * pageSize //偏移量
                // const rows = await Goods.findAll({ offset: offset, limit: pageSize*1 })//商品信息
                try {

                        const offset = (pageNum - 1) * pageSize
                        const { count, rows } = await Goods.findAndCountAll(
                                { 
                                        offset: offset, 
                                        limit: pageSize * 1,
                                        paranoid: false,
                                        where:{
                                               
                                                
                                                [Op.not]: [{ deletedAt:null}] //判断里面的条件不为真
                                                
                                                // [Op.not]: [{ [Op.is]: [{deletedAt:null}]}]
                                        }

                                })
                        return {
                                pageNum,
                                pageSize,
                                total: count,
                                list: rows
                        }


                } catch (error) {
                  console.log("error")
                  console.log(error)
                }

        }


}
module.exports = new GoodsService()
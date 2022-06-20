const path = require('path')

const { fileUploadError,
    unSupportedFileType,
    publishGoodsError,
    invalidGoodsID
} = require('../constant/err.type')
const {
    createGoods,
    updateGoods,
    removeGoods,
    removeGoods_xj,
    restoreGoods,
    findGoods,
    rufindGoods,
    findFenGoods,
    searchGoods } = require('../service/goods.service')
class GoodsController {
    //可以上传任何文件
    async upload(ctx, next) {
        const { file } = ctx.request.files
        const fileTypes = ['image/jpeg', 'image/png', 'image/webp']
        if (file) {
            //判断里面是否有['image/ipeg','image/png']
            if (!fileTypes.includes(file.type)) {
                return ctx.app.emit('error', unSupportedFileType, ctx)
            }//
            ctx.body = {
                code: 0,
                message: '图片上传成功',
                result: {
                    goods_img: path.basename(file.path)

                }
            }
        } else {
            return ctx.app.emit('error', fileUploadError, ctx)



        }



    }
    //上传商品
    async create(ctx) {
        try {
            //把createdAt,updatedAt从res去掉
            const { createdAt, updatedAt, ...res } = await createGoods(ctx.request.body)
            ctx.body = {
                code: 0,
                message: '发布商品成功',
                result: res,


            }
        } catch (error) {
            console.error(error)
            return ctx.app.emit('error', publishGoodsError, ctx)

        }


    }
    //编辑商品
    async update(ctx) {
        try {

            const res = await updateGoods(ctx.params.id, ctx.request.body)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '修改商品成功',
                    result: ''
                }
            } else {

                return ctx.app.emit('error', invalidGoodsID, ctx)


            }


        } catch (error) {

        }


    }
    //直接删除商品记录
    async remove(ctx) {
        await removeGoods(ctx.params.id)
        ctx.body = {
            
            code: 0,
            message: '删除成功',
            result: '',


        }
    }
    //商品下架
    async remove_xj(ctx) {
        const res = await removeGoods_xj(ctx.params.id)
        if (res) {

            ctx.body = {
                code: 0,
                message: '商品下架成功',
                result: '',


            }
        } else {
            return ctx.app.emit('error', invalidGoodsID, ctx)
        }

    }
    //上架商品
    async restore(ctx) {
        try {

            const res = await restoreGoods(ctx.params.id)
            if (res) {
    
                ctx.body = {
                    code: 0,
                    message: '商品上架成功',
                    result: '',
    
    
                }
            } else {
                console.log("没有")
                return ctx.app.emit('error', invalidGoodsID, ctx)
            }
            
        } catch (error) {
            console.log('商品发布'+error)
        }
      

    }
      //商品列表
      async findAll(ctx) {
        try {

            const { pageNum = 1, pageSize = 10} = ctx.request.query
            const res = await findGoods(pageNum, pageSize)
            ctx.body = {

                code: 0,
                message: '获取商品列表',
                result: res,//把它写成字符串了，导致读不出数据

            }


        } catch (error) {
               console.log('商品信息'+error)
        }
        //默认值pageNum=1,pageSize=10


    }
   
     //商品列表 分类过后的
     async findFenAll(ctx) {
        try {

            const { pageNum = 1, pageSize = 10, goods_fm} = ctx.request.query
            const res = await findFenGoods(pageNum, pageSize,goods_fm)
            ctx.body = {

                code: 0,
                message: '获取商品列表',
                result: res,//把它写成字符串了，导致读不出数据

            }


        } catch (error) {
               console.log('商品信息'+error)
        }
        //默认值pageNum=1,pageSize=10


    }

      //获取软删除商品列表
    async rufindAll(ctx) {
        try {

            const { pageNum = 1, pageSize = 10 } = ctx.request.query
            const res = await rufindGoods(pageNum, pageSize)
            ctx.body = {

                code: 0,
                message: '获取商品列表',
                result: res,//把它写成字符串了，导致读不出数据

            }


        } catch (error) {
               console.log('商品信息'+error)
        }
        //默认值pageNum=1,pageSize=10


    }
    //搜索商品
   async SearchItem(ctx){

    try {

        const { pageNum = 1, pageSize = 10, goods_name} = ctx.request.query
        const res = await searchGoods(pageNum, pageSize,goods_name)
        ctx.body = {

            code: 0,
            message: '获取商品列表',
            result: res,//把它写成字符串了，导致读不出数据q

        }


    } catch (error) {
           console.log('商品信息'+error)
    }
    //默认值pageNum=1,pageSize=10

    }

}
module.exports = new GoodsController()
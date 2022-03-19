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
    findAll } = require('../service/goods.service')
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
    //更新商品
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

    }
    //商品列表
    async findAll(ctx) {
        //默认值pageNum=1,pageSize=10
        const { pageNum = 1, pageSize = 10 } = ctx.request.query
        const res = await findGoods(pageNum, pageSize)
        ctx.body={
            code:0,
            message:'获取商品列表',
            result:'res',

        }

    }


}
module.exports = new GoodsController()
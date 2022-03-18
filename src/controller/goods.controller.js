const path=require('path')

const {fileUploadError,
       unSupportedFileType,
       publishGoodsError
      } =require('../constant/err.type')
const {createGoods} =require('../service/goods.service')
class GoodsController{
    //可以上传任何文件
    async upload(ctx,next){
        const{file}=ctx.request.files
        const fileTypes=['image/jpeg','image/png','image/webp']
        if(file){
            //判断里面是否有['image/ipeg','image/png']
            if(!fileTypes.includes(file.type)){
                return ctx.app.emit('error',unSupportedFileType,ctx)
            }//
            ctx.body={
                code:0,
                message:'图片上传成功',
                result:{
                    goods_img:path.basename(file.path)

                }
            }
        }else{
            return ctx.app.emit('error',fileUploadError,ctx)

            

        }
         


    }
    //上传商品
    async create(ctx){
        try {
          //把createdAt,updatedAt从res去掉
            const {createdAt,updatedAt,...res}=  await createGoods(ctx.request.body)
          ctx.body={
              code:0,
              message:'发布商品成功',
              result:res,


          }
        } catch (error) {
             console.error(error)
             return ctx.app.emit('error',publishGoodsError,ctx)
           
        }
     

    }
    

}
module.exports=new GoodsController()
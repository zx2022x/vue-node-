const path=require('path')
const {fileUploadError,unSupportedFileType} =require('../constant/err.type')
class GoodsController{
    //可以上传任何文件
    async upload(ctx,next){
        const{file}=ctx.request.files
        const fileTypes=['image/ipeg','image/png']
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
}
module.exports=new GoodsController()
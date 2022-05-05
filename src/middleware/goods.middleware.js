const {goodsFormatError}=require('../constant/err.type')
//验证参数
const validator=async (ctx,next)=>{
   try {
       ctx.verifyParams({
           goods_name:{type:'string',required:true},
           goods_price:{type:'number',required:true},
           goods_num:{type:'number',required:true},
           goods_img:{type:'string',required:true},
           goods_fm:{type:'number',required:true},//分类标记
           
       })
   } catch (error) {
       console.error(error)
       goodsFormatError.result=error
       return ctx.app.emit('error',goodsFormatError,ctx)
   }
   await next()
}
module.exports={
    validator,
}
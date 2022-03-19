const{invalidGoodsID}=require('../constant/err.type')
const validator=async (ctx,next)=>{
  try {
      ctx.verifyParams({
          goods_id:'number', //一字之差
       

      })
      console.log('skjsks')
  } catch (error) {
      console.error(error)
      invalidGoodsID.result=error
      console.log('skjsks是')
      return ctx.app.emit('error', invalidGoodsID,ctx)
      
  }
  await next()
}
module.exports={
    validator,
    
}
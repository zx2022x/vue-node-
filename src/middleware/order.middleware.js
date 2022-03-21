const {orderFormatError}=require('../constant/err.type')

// const validator=(rules)=>{
    // return async(ctx,next)=>{
    //     try {
    //      console.log('订单')
    //     return  ctx.verifyParams(rules)
         
    //     } catch (error) {
    //        console.error(error)
    //        orderFormatError.result=error
          
    //        return ctx.app.emit('error', orderFormatError,ctx)
    //     }
    //     console.log('放行')
    //     await next()
    // }


//     return async (ctx, next) => {
//         console.log('订单开始')
//         try {
//             ctx.verifyParams(rules)
         
//         } catch (error) {
//             console.error(error)
//             orderFormatError.result = error
           
//             return ctx.app.emit('error', orderFormatError, ctx)

//         }
//         console.log('订单放行')
//         await next()
//     }
// }

const validator = (rules) => {
  console.log('订单放行')
    return async (ctx, next) => {
      try {
        console.log('订单放行')
        ctx.verifyParams(rules)
      } catch (err) {
        console.error(err)
        orderFormatError.result = err
        return ctx.app.emit('error', orderFormatError, ctx)
      }
      console.log('订单放行')
      await next()
    }
  }
module.exports={
    validator
}

const {addrFormatError}=require('../constant/err.type')
const validator=(rules)=>{
    return async(ctx,next)=>{
        try {
        
        return  ctx.verifyParams(rules)
         
        } catch (error) {
           console.error(error)
           addrFormatError.result=error
          
           return ctx.app.emit('error', addrFormatError,ctx)
        }
   
        await next()
    }
}
module.exports={//这里之前写了一个bug
    validator,
}
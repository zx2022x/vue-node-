const {getUerInfo} = require('../service/user.service')
//判断密码是否为真
const {userFormateError,userAlreadyExited}=require('../consitant/err.type')
    const userValidator=async (ctx,next)=>{
    const {user_name,password}=ctx.request.body

    if(!user_name || !password){
        console.error('用户名或密码为空',ctx.request.body)
        //提交错误
        ctx.app.emit('error',{userFormateError},ctx)

        
        return 
        
    }
        await next()
    }
//判断用户是否存在
    const verifyUser=async (ctx,next)=>{
    const{user_name}=ctx.request.body
    if(getUerInfo({user_name})){
        ctx.status=409
        ctx.app.emit('error',userAlreadyExited,ctx)

        return 
    }
    await next();
}


module.exports={
    userValidator,
    verifyUser,

}
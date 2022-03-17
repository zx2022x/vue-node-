const {getUerInfo} = require('../service/user.service')

const {userFormateError,userAlreadyExited,userRegisterError}=require('../constant/err.type')
    //判断密码是否为真
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
    
    try {

        const res=await getUerInfo({user_name})
      
        console.log(res);
        //
        if(res){

        console.error('用户名已经存在',{user_name})
         
        ctx.app.emit('error',userAlreadyExited,ctx)
        
        return 
    }

    } catch (err) {
        console.error('获取用户信息错误',err)
        ctx.app.emit('error',userRegisterError,ctx)
        return
    }
    await next();
}


module.exports={
    userValidator,
    verifyUser,

}
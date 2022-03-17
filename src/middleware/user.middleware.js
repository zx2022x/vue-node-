const userValidator=async (ctx,next)=>{
    const {user_name,password}=ctx.request.body

    if(!user_name || !password){
        console.error('用户名或密码为空',ctx.request.body)
        ctx.status=400,
        ctx.body={
            code:'10001',
            message:'用户名或密码为空',
            result:'',

        }
        return 
        
    }
        await next();
}



module.exports={
    userValidator,}
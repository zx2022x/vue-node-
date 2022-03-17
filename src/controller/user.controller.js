const {createUser,getUerInfo}=require('../service/user.service')
class UserController{
    async register(ctx,next){
      
        const res=await createUser(user_name,password)
        ctx.body={
            code:0,
            message:'用户注册成功',
            result:{
                id:res.id,
                user_name:res.user_name,
                

            }

        }
        

        

        
    }
    async login(ctx,next){
        ctx.body='登录成功'
    }
}
module.exports=new UserController()
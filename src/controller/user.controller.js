const {createUser,getUerInfo}=require('../service/user.service')
class UserController{
    async register(ctx,next){
       //判断用户名是否为空
        const {user_name,password}=ctx.request.body
        
        //null是false 对象是true
        if(getUerInfo({user_name})){
            ctx.status=409
            ctx.body={
                code:'1000',
                message:'用户已经存在',
                result:'',


            }
            return 
        }
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
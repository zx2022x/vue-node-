const Router =require('koa-router')
const{userValidator,}=require('../middleware/user.middleware')
const {register,login}=require('../controller/user.controller')
const router=new Router({ prefix:'/users' })
// 注册接口
//userValidator是中间件
router.post('/register',userValidator,register)
// 登录接口
router.post('/login',login)



module.exports=router
const Router =require('koa-router')
const{
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin,
              }=require('../middleware/user.middleware')
const{auth}=require('../middleware/auth.middleware')

const {
    register,
    login,
    changePassword,
 }=require('../controller/user.controller')
const router=new Router({ prefix:'/users' })
// 注册接口
//userValidator是中间件
router.post('/register',userValidator,verifyUser,cryptPassword,register)
// 登录接口
router.post('/login',userValidator,verifyLogin,login)
//修改密码 patch请求允许只改一个参数
router.patch('/',auth,cryptPassword,changePassword)


module.exports=router
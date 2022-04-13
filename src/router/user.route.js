const Router =require('koa-router')
const{
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin,
              }=require('../middleware/user.middleware')
const{auth,hadAdminPermission}=require('../middleware/auth.middleware')

const {
    register,
    login,
    changePassword,
    changePassword1,
    search
    
 }=require('../controller/user.controller')
 const {
     GoodsController

}=require('../controller/goods.controller')
const router=new Router({ prefix:'/users' })
// 注册接口
//userValidator是中间件
router.post('/register',userValidator,verifyUser,cryptPassword,register)
// 登录接口
router.post('/login',userValidator,verifyLogin,login)
//用户自己修改密码 patch请求允许只改一个参数
router.patch('/',auth,cryptPassword,changePassword1)
// //用户自己修改名称 patch请求允许只改一个参数
// router.patch('/username',auth,changePassword1)
//管理员修改用户密码
router.patch('/adpa',cryptPassword,changePassword)
//获取用户列表
router.get('/',auth,hadAdminPermission,search)

module.exports=router
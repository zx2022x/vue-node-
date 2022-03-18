const Router=require('koa-router')
const {
    auth,
    hadAdminPermission,
}=require('../middleware/auth.middleware')
const {validator}=require('../middleware/goods.middleware')
const {upload,create} =require('../controller/goods.controller')
// const{validator}=require("sequelize/types/utils/validator-extras")

const router=new Router({prefix:'/goods'})


//请求的时候带数据，所以用post,只有管理员才能上传
// router.post('/upload',auth,hadAdminPermission,upload)
router.post('/upload',upload)
//发布商品接口
router.post('/', auth,hadAdminPermission,validator,create)

module.exports=router

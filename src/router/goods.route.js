const Router=require('koa-router')
const {
    auth,
    hadAdminPermission,
}=require('../middleware/auth.middleware')
const router=new Router({prefix:'/goods'})

const {upload} =require('../controller/goods.controller')
//请求的时候带数据，所以用post,只有管理员才能上传
// router.post('/upload',auth,hadAdminPermission,upload)
router.post('/upload',upload)
module.exports=router

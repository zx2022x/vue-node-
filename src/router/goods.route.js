const Router=require('koa-router')
const {
    auth,
    hadAdminPermission,
}=require('../middleware/auth.middleware')
const {validator}=require('../middleware/goods.middleware')
const {upload,
    create,
    update,
    remove,
    remove_xj,
    restore,
    findAll,
    rufindAll,
    findFenAll,
    SearchItem} =require('../controller/goods.controller')
// const{validator}=require("sequelize/types/utils/validator-extras")

const router=new Router({prefix:'/goods'})


//请求的时候带数据，所以用post,只有管理员才能上传
// router.post('/upload',auth,hadAdminPermission,upload)
router.post('/upload',upload)
//发布商品接口
router.post('/', auth,hadAdminPermission,validator,create)
// router.post('/', validator,create)
//修改商品接口 put适合发送多个参数
router.put('/:id',auth,hadAdminPermission,validator,update)
//硬删除
router.delete('/:id',auth,hadAdminPermission,remove)
//商品下架
router.post('/:id/off',auth,hadAdminPermission,remove_xj)
//商品上架
router.post('/:id/on',auth,hadAdminPermission,restore)
//获取商品列表
router.get('/',findAll)
//获取分类过后的商品列表
router.get('/item',findFenAll)
//搜索商品
router.get('/search',SearchItem)


//获取软删除商品列表(已下架)
router.get('/ru',rufindAll)
module.exports=router

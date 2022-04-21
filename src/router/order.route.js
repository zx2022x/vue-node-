const Router = require('koa-router')
const router = new Router({ prefix: '/orders' })
const { validator } = require('../middleware/order.middleware')
const { auth } = require('../middleware/auth.middleware')
const {create,findAll,update,findAllOrderAD}=require('../controller/order.controller')

//提交订单
router.post(
    '/',
    auth,
    // validator({
        
       
    //     goods_info: 'string',
    //     total: 'string',

    // }),
    create)

//获取订单列表 
router.get('/',auth,findAll)
//获取全部订单
router.get('/all',auth,findAllOrderAD)

//更新订单状态
router.patch('/:id',auth,validator({status:'number',}),
     update)
module.exports = router
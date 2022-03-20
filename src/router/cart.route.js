const Router=require('koa-router')
const router=new Router({prefix:'/carts'})
const {auth} =require('../middleware/auth.middleware')
const {validator}=require('../middleware/cart.middleware')
const {
    add,
    findAll,
    update,
    remove,
    selectAll,
    unselectAll} =require('../controller/cart.controller')

router.post('/',auth,validator({goods_id:'number'}),add,(ctx)=>{

    ctx.body='添加到购物车成功'
    

})
//购物车列表
router.get('/',auth,findAll)
//patch 适合更新一点 更新购物车
router.patch('/:id',auth,validator({
    number:{type:'number',required:false},
    selected:{type:'bool',required:false}
       }),update)
 //删除购物车
//  router.delete('/',auth,validator({ids:'arry'}),remove)
router.delete('/',auth,remove)
//全选
router.post('/selectAll',auth,selectAll)
//全不选
router.post('/unselectAll',auth,unselectAll)
//导出router对象
module.exports=router
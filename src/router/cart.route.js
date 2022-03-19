const Router=require('koa-router')
const router=new Router({prefix:'/carts'})
const {auth} =require('../middleware/auth.middleware')
const {validator}=require('../middleware/cart.middleware')
const {add} =require('../controller/cart.controller')
router.post('/',auth,validator,add,(ctx)=>{

    ctx.body='添加到购物车成功'
    

})
module.exports=router
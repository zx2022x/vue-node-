const Koa=require('koa');
const KoaBody=require('koa-body')
const userRouter=require('../router/user.route')
const app=new Koa()
app.use(KoaBody())//在所有路由注册之前
app.use(userRouter.routes())

module.exports=app

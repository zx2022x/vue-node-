const path =require('path')

const Koa=require('koa');

  






const KoaBody=require('koa-body')
const KoaStatic =require('koa-static')//处理静态文件
const parameter=require('koa-parameter')//参数校验
// const userRouter=require('../router/user.route')
// const goodsRouter=require('../router/goods.route')
// const errHandler=require('./errHandler')
const router=require('../router')
const errHandler=require('../app/errHandler')
const app=new Koa()
const cors = require('koa2-cors');
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        // return 'http://localhost:8080'; //这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))





app.use(KoaBody({
    multipart:true,//打开文件上传
    formidable:{
        uploadDir:path.join(__dirname,'../upload'),//__dirname,'../upload'当前文件绝对路径的上一层/upload
        keepExtensions:true,//是否保留文件扩展名
        
    },
   
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
     

}))//在所有路由注册之前
//注册路由

app.use(KoaStatic(path.join(__dirname,'../upload')))//配置静态资源，让游览器可以访问到
app.use(parameter(app))
app.use(router.routes()) //可以一次性注册所有router
app.use(router.allowedMethods())//对于不支持的请求，返回error
//统一的错误处理
app.on('error',errHandler)
module.exports=app

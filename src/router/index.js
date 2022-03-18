const fs=require('fs')

const Router=require('koa-router')

const router=new Router()
//当前目录__dirname,file当前路径下的文件名
fs.readdirSync(__dirname).forEach(file=>{
   if(file!=='index.js'){
     const r= require('./'+file)
     router.use(r.routes())
   }
})
module.exports=router
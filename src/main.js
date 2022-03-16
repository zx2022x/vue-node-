const Koa=require('koa');
const {APP_PORT}=require('./config/config.default')



const app =require('./app')







app.listen(APP_PORT,()=>{
    console.log(`serve is running on http://localhost:${APP_PORT}`)
})

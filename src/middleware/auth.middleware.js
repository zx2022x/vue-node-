const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const { tokenExpiredError, invalidToken ,hasNotAdminPermission} = require('../constant/err.type')

//验证token
const auth = async (ctx, next) => {
    try {
        const { authorization='' } = ctx.request.header
        //拿到token值
        const token = authorization.replace('Bearer ', '')
        //验证token
        //user中包含了payload的信息（id,user_name,is_admin)
        //user存到了state
        
        //jwt.verify比对不上，会抛出错误,用密钥JWT_SECRET来验证
        const user = jwt.verify(token, JWT_SECRET)
       
        ctx.state.user = user
        console.log(ctx.state.user)
    } catch (error) {

        switch (error.name) {
            case 'TokenExpiredError': console.error('token已过期', error)
                //token已过期的意思
                return ctx.app.emit('error', tokenExpiredError, ctx)
            case 'JsonWebTokenError':
                console.error('无效的token', error)
                return ctx.app.emit('error', invalidToken, ctx)



        }

    }


    await next();
}
//判断是否为管理员
const hadAdminPermission=async(ctx,next)=>{
       const{is_admin} =ctx.state.user
       if(!is_admin){
           console.error('该用户没有管理员权限',ctx.state.user)
           return ctx.app.emit('error',hasNotAdminPermission,ctx)


        }else{
            console.log('的代价')
        }
        await next()
}
module.exports = {
    auth,
    hadAdminPermission
}

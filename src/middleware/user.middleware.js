const bcrypt = require('bcryptjs')//引进加密包
const { getUerInfo } = require('../service/user.service')

const { userFormateError,
        userAlreadyExited,
        userRegisterError,
        userDoesNotExist,
        userLoginError,
        invalidPassword,





} = require('../constant/err.type')
//判断密码是否为真
const userValidator = async (ctx, next) => {
    const { user_name, password } = ctx.request.body

    if (!user_name || !password) {
        console.error('用户名或密码为空', ctx.request.body)
        //提交错误
        ctx.app.emit('error', { userFormateError }, ctx)


        return

    }
    await next()
}
//判断用户是否存在
const verifyUser = async (ctx, next) => {
    const { user_name } = ctx.request.body

    try {

        const res = await getUerInfo({ user_name })

        console.log(res);
        //相同名字不能注册
        if (res) {

            console.error('用户名已经存在', { user_name })

            ctx.app.emit('error', userAlreadyExited, ctx)

            return
        }

    } catch (err) {
        console.error('获取用户信息错误', err)
        ctx.app.emit('error', userRegisterError, ctx)
        return
    }
    await next();
}
//加密输入的密码
const cryptPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    var salt = bcrypt.genSaltSync(10);
    //传递明文密码,hash保存的是密文
    var hash = bcrypt.hashSync(password, salt);
    //把hash覆盖原来的密码
    ctx.request.body.password = hash
    await next()
}
//加密 管理员修改用户的密码
// const cryptMaPassword = async (ctx, next) => {
//     const { password } = ctx.request.body
//     var salt = bcrypt.genSaltSync(10);
//     //传递明文密码,hash保存的是密文
//     var hash = bcrypt.hashSync(password, salt);
//     //把hash覆盖原来的密码
//     ctx.request.body.password = hash
//     await next()
// }



const verifyLogin = async (ctx, next) => {
    //1.判断用户是否存在(不存在：报错)
   
    const { user_name, password } = ctx.request.body
    try {
        const res = await getUerInfo({ user_name })
        if (!res) {
            //
            console.error('用户名不存在', { user_name })
            return  ctx.app.emit('error',userDoesNotExist,ctx)
           
        }

         //密码是否匹配,bcrypt.compareSync返回的是true
    if(!bcrypt.compareSync(password,res.password)){
        return ctx.app.emit('error',invalidPassword,ctx)
        
       

   }


    } catch (error) {
            console.error(error)
            ctx.app.emit('error',userLoginError,ctx)
            

    }
 
    


    await next();

}

module.exports = {
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin,

}
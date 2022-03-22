const jwt = require('jsonwebtoken')//引入生成token包
const {
    createUser,
    getUerInfo,
    updateById,
    findUsers
} = require('../service/user.service')
const { userRegisterError } = require('../constant/err.type')
const { JWT_SECRET } = require('../config/config.default')
class UserController {
    //用户注册
    async register(ctx, next) {
        const { user_name, password } = ctx.request.body
        try {
            const res = await createUser(user_name, password)
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name,


                }

            }
        } catch (err) {
            console.log(err)
            ctx.app.emit('error', userRegisterError, ctx)

        }





    }
    //用户登录
    async login(ctx, next) {
        const { user_name } = ctx.request.body
        // ctx.body=`欢迎回来${user_name}`
        try {
            //从返回的结果对象中剔除password属性，将剩下的属性放到res对象
            const { password, ...res } = await getUerInfo({ user_name })
            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    //生成token,expiresIn为过期时间 1d

                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
                }

            }
            //  const res= await getUerInfo({user_name})
            //  const {password,...resUser}=res 把resUser的password去掉
        } catch (error) {
            console.error('用户登录失败', error)
        }


    }
    //更改密码
    async changePassword(ctx, next) {
        //1获取数据库
        const id = ctx.state.user.id
        const password = ctx.request.body.password
        if (await updateById({ id, password })) {
            ctx.body = {
                code: 0,
                message: '修改密码成功',
                result: '',


            }
        } else {
            ctx.body = {
                code: '10007',
                message: '修改密码失败',
                result: '',

            }
        }

    }
    //获取用户列表

    async search(ctx) {
        try {

            //默认值pageNum=1,pageSize=10
            const { pageNum = 1, pageSize = 10 } = ctx.request.query
            const res = await findUsers(pageNum, pageSize)
            ctx.body = {

                code: 0,
                message: '获取商品列表',
                result: res,//把它写成字符串了，导致读不出数据

            }

        } catch (error) {
            console.log('用户列表错误'+error)
        }


    }

}
module.exports = new UserController()
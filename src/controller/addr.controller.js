const { 
    createAddr, 
    findAllAddr,
    updateAddr,
    removeAddr,
    setDefaultAddr} = require('../service/addr.service')
class AddrController {
    //创建地址信息
    async create(ctx) {
        try {
            const user_id = ctx.state.user.id
            console.log('地址控制区  ---开头')//这里不能提前放变量
            const { consignee, phone, address } = ctx.request.body
            const res = await createAddr({ user_id, consignee, phone, address })
            ctx.body = {
                code: 0,
                message: '添加地址成功',
                result: res
            }
        } catch (error) {
            console.log('地址控制区')
            console.log(error)
        }

    }
    //获取地址列表
    async findAll(ctx) {
        const user_id = ctx.state.user.id
        const res = await findAllAddr(user_id)
        ctx.body = {
            code: 0,
            message: '获取列表成功',
            result: res
        }
    }
   //更新地址列表
   async update(ctx){
       const id=ctx.request.params.id
       const res=await updateAddr(id,ctx.request.body)
       ctx.body={
           code:0,
           message:'更新地址成功',
           result:res


       }

   }
   //移除地址信息
   async remove(ctx){
       const id=ctx.request.params.id
       const res=await removeAddr(id)
       ctx.body={
           code:0,
           message:'删除地址成功',
           result:res,


       }
   }
   //设置默认
   async setDefault(ctx){
       const user_id=ctx.state.user.id
        const id =ctx.request.params.id
        const res=await setDefaultAddr(user_id,id)
        ctx.body={
            code:0,
            message:'设置默认成功',
            result:res,
        }
   }
}
module.exports = new AddrController()


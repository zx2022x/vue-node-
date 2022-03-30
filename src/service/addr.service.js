const Address = require('../model/addr.model')
const Order = require("../model/order.model")
class AddrService {
    //获取更新列表
    async createAddr(addr) {
        return await Address.create(addr)

    }
    //获取地址列表
    async findAllAddr(user_id) {

        return await Address.findAll(

            {
                attributes: ['id', 'consignee', 'phone', 'address', 'is_default'],//要查找的对象
                where: { user_id }
            }

        )//返回的是数组

    }
    //更新地址列表
    async updateAddr(id, addr) {

        return await Address.update(addr, { where: { id } })
    }
    //删除地址列表
    async removeAddr(id) {

        return await Address.destroy({ where: { id } })

    }
    //设置默认
    async setDefaultAddr(user_id, id) {

        await Address.update(
            { is_default: false },//设置所有地址默认为0
            {
                where: {
                    user_id,

                },
            })
      return await Address.update(//返回的是1 true代表1
            { is_default: true },
            {
                where: {
                     id,
                }
            }
        )
    }

    async getAddressWithOrder ({id}) {
        let res = null
        console.log(777);
        try {
            res = await Address.findByPk(id, {
                include: {
                    model: Order
                }
            })
        } catch (e) {
            console.log(e);
        }

        return res
    }

}
module.exports = new AddrService()
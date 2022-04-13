const User=require('../model/user.model')

class UserService{
    //用户注册,插入数据user_name,password
    async createUser(user_name,password){
        //插入用户
        const res= await User.create({user_name,password})
        return res.dataValues
        
       
    }
      // async 返回的都是对象，任何对象在if(),是 trues
    async getUerInfo({id,user_name,password,is_admin}){
         const whereOpt={}
         //id存在 就拷贝到whereOpt
         id && Object.assign(whereOpt,{id})
         user_name && Object.assign(whereOpt,{user_name})
         password && Object.assign(whereOpt,{password})
         is_admin && Object.assign(whereOpt,{is_admin})
         //查询单条记录
       const res= await User.findOne({
             attributes:['id','user_name','password','is_admin'],
             where:whereOpt
         })
         console.log("res是:"+res)
         return res ? res.dataValues : null
        
    }
    //更新字段 可以通用
    async updateById({id,user_name,password,is_admin}){
       const whereOpt={id}
       const newUser={}
       console.log('userbb'+user_name)
       password && Object.assign(newUser,{password})
       is_admin && Object.assign(newUser,{is_admin})
       user_name && Object.assign(newUser,{user_name})
       //生成新的对象newUser  ???
       //User.update(newUser newUser里面属性是需要更新的参数
       const res=await User.update(newUser,{where:whereOpt})
       console.log(res)//返回一个[1] 为 true  or 0为false
       return res[0]>0 ? true:false
      }
    //获取用户列表
      //用户列表pageNum页码,pageSize每页显示多少条
      async findUsers(pageNum, pageSize) {
        //获取总数
        // const count = await Goods.count()
        // const offset = (pageNum - 1) * pageSize //偏移量
        // const rows = await Goods.findAll({ offset: offset, limit: pageSize*1 })//用户信息
        const offset = (pageNum - 1) * pageSize 
        const {count,rows}=await User.findAndCountAll({ offset: offset, limit: pageSize*1 })
        return{
                pageNum,
                pageSize,
                total:count,
                list:rows
        }

}

    
}
module.exports=new UserService()
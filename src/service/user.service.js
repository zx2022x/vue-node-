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
}
module.exports=new UserService()
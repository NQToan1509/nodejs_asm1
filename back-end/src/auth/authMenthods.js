const userToken=require('../models/userToken')

module.exports={
    verifyToken:(token)=>{
        const user = userToken.filter((item)=>item.token===token)
        if(user.length>0){
            return user
        }else{
            return 0
        }
    }
}

const authMenthods=require('./authMenthods')

exports.tokenAuth=async (req,res,next)=>{

    const token=req.query.Token
    if(token){
        const verifyToken= await authMenthods.verifyToken(token)
        console.log(verifyToken,token)
        if(verifyToken){
            next()
        }else{
           
            res.status(401).json({code:401,message:"Unauthorized"})
        }
    }else{
        res.status(401).json({code:401,message:"Unauthorized"})
    }
}

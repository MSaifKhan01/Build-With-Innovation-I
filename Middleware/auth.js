const jwt=require("jsonwebtoken")

require("dotenv").config()

const Auth=async(req,res,next)=>{
    const token=req.headers.authorization;
    console.log(token)

    if(token){
        const Decoded= jwt.verify(token,process.env.JWT_Secret)
        if(Decoded){
            req.body.userID=Decoded.userID
            req.body.role=Decoded.Role
            next()
        }else{
            res.status(400).send({"Msz":"Plz Login First"})
        }
    }else{
        res.status(400).send({"msz":"Didn't Login"})
    }
}

module.exports={Auth}
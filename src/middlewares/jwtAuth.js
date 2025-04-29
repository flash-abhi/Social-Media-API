import jwt from "jsonwebtoken"

 const jwtAuth = (req,res,next)=>{
const token = req.headers["authorization"];
if(!token){
    res.staus(400).send("Unauthorized Access")
}else{
    try{
        const payload = jwt.verify(token,"mMyWDpQd5eK5rTd0Qkz6OT4r6YxCaLyA");
    req.userId = payload.UserId;
    }catch(err){
        res.staus(400).send("unauthorized");
    }
    next();
}
}

export default jwtAuth;
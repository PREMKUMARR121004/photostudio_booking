import jwt  from "jsonwebtoken";

export const authMiddleware=(req,res,next)=>{
    const header=req.headers.authorization
    if(!header){
        return res.status(401).json("Authorization token required")
    }
    try{
        const toCheck=header.split(" ")[1]
        const verify =jwt.verify(toCheck,process.env.JWT_SECRET)
       req.user=verify
       next()

    }
    catch(error){
        return res.status(401).json("Invalid or expired token");
    }
}
